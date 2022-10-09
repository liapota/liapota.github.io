use core::{
    balance::Balance,
    response::{bad_request, not_allowed, not_implemented},
    transaction::{transfer_dr, transfer_matic, ApiCoinTransaction},
};
use serde::Deserialize;
use std::{
    fs::File,
    io::{prelude::*, BufReader},
};

use hyper::{body::to_bytes, header, http::HeaderValue, Body, HeaderMap, Request, Response};

use crate::{
    handle::{HandleResult, ResponseError},
    user::User,
};

struct KeyPair {
    pub public: String,
    pub private: String,
}

impl Clone for KeyPair {
    fn clone(&self) -> Self {
        Self {
            public: self.public.clone(),
            private: self.private.clone(),
        }
    }
}

const MIN_BANK_METIC_AMOUNT: f32 = 0.035;
const GAS_AMOUNT: f32 = 0.01;

struct BankChain {
    pub pairs: Vec<KeyPair>,
    pub actual_index: usize,
}

impl BankChain {
    pub fn load() -> Self {
        let file = File::open("bankchain").unwrap();
        let reader = BufReader::new(file);

        let mut pairs: Vec<KeyPair> = Vec::new();
        for line in reader.lines() {
            let line = format!("{}", line.unwrap());
            let mut splitted = line.split(' ');
            pairs.push(KeyPair {
                public: splitted.nth(0).unwrap().to_string(),
                private: splitted.nth(0).unwrap().to_string(),
            });
        }
        for pair in &pairs {
            println!(
                "Bankchain pair (public: {}, private:{}) is accepted",
                pair.public, pair.private
            );
        }
        BankChain {
            pairs: pairs,
            actual_index: 0,
        }
    }

    pub async fn get_bank_keys(&mut self) -> Result<KeyPair, String> {
        let mut index = self.actual_index;
        while index < self.pairs.len() {
            match Balance::from(&self.pairs[index].public).await {
                Ok(balance) => {
                    if balance.maticAmount > MIN_BANK_METIC_AMOUNT {
                        break;
                    }
                }
                Err(error) => return Err(format!("{}", error)),
            }
            index += 1
        }
        if self.actual_index < index && index < self.pairs.len() {
            match Balance::from(&self.pairs[self.actual_index].public).await {
                Ok(balance) => match transfer_dr(ApiCoinTransaction {
                    fromPrivateKey: self.pairs[self.actual_index].private.clone(),
                    toPublicKey: self.pairs[index].public.clone(),
                    amount: balance.coinsAmount,
                })
                .await
                {
                    Ok(_result) => {}
                    Err(error) => return Err(format!("{}", error)),
                },
                Err(error) => return Err(format!("{}", error)),
            };
        }
        self.actual_index = index;
        if self.actual_index < self.pairs.len() {
            return Ok(self.pairs[self.actual_index].clone());
        }
        Err("Not enough bank chains for transaction support".to_string())
    }
}

pub async fn handle_transactions_get(headers: &HeaderMap<HeaderValue>) -> HandleResult {
    Ok(not_implemented())
}

#[derive(Deserialize)]
struct TransactionInfo {
    pub to: String,
    pub amount: f32,
}

pub async fn handle_transaction_post(mut req: Request<Body>) -> HandleResult {
    match User::from(req.headers()).await {
        Ok(user) => match to_bytes(req.body_mut()).await {
            Ok(bytes) => match serde_json::from_slice(&bytes) {
                Ok(result) => {
                    let info: TransactionInfo = result;
                    match User::from_id(info.to.as_str()).await {
                        Ok(to_user) => match transfer_dr(ApiCoinTransaction {
                            fromPrivateKey: user.private_key.clone(),
                            toPublicKey: to_user.public_key.clone(),
                            amount: info.amount,
                        })
                        .await
                        {
                            Ok(_result) => {
                                match BankChain::load().get_bank_keys().await {
                                    Ok(keys) => {
                                        match transfer_matic(ApiCoinTransaction {
                                            fromPrivateKey: keys.private,
                                            toPublicKey: to_user.public_key.clone(),
                                            amount: GAS_AMOUNT,
                                        })
                                        .await
                                        {
                                            Ok(_result) => {}
                                            Err(error) => {
                                                println!("Bad matic transfer from bank: {}", error)
                                            }
                                        }
                                    }
                                    Err(_error) => panic!("Not enough bank keys"),
                                };
                                Ok(Response::builder()
                                    .header("Content-Type", "plain/text; charset=utf-8")
                                    .header(header::ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                                    .header(header::ACCESS_CONTROL_ALLOW_HEADERS, "*")
                                    .body("ok".into())
                                    .unwrap())
                            }
                            Err(error) => Err(ResponseError {
                                msg: format!("Cannot make transfer: {}", error),
                            }),
                        },
                        Err(_error) => Ok(not_allowed()),
                    }
                }
                Err(error) => Ok(bad_request(format!(
                    "Cannot parse transaction info json: {}",
                    error
                ))),
            },
            Err(error) => Ok(bad_request(format!("Bad body: {}", error))),
        },
        Err(_error) => Ok(not_allowed()),
    }
}

pub async fn handle_transaction_from_bank_post(mut req: Request<Body>) -> HandleResult {
    match to_bytes(req.body_mut()).await {
        Ok(bytes) => match serde_json::from_slice(&bytes) {
            Ok(result) => {
                let info: TransactionInfo = result;
                match User::from_id(info.to.as_str()).await {
                    Ok(to_user) => match BankChain::load().get_bank_keys().await {
                        Ok(keys) => match transfer_dr(ApiCoinTransaction {
                            fromPrivateKey: keys.private.clone(),
                            toPublicKey: to_user.public_key.clone(),
                            amount: info.amount,
                        })
                        .await
                        {
                            Ok(_result) => match transfer_matic(ApiCoinTransaction {
                                fromPrivateKey: keys.private,
                                toPublicKey: to_user.public_key.clone(),
                                amount: GAS_AMOUNT,
                            })
                            .await
                            {
                                Ok(_result) => Ok(Response::builder()
                                    .header("Content-Type", "plain/text; charset=utf-8")
                                    .header(header::ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                                    .header(header::ACCESS_CONTROL_ALLOW_HEADERS, "*")
                                    .body("ok".into())
                                    .unwrap()),
                                Err(_error) => Ok(not_allowed()),
                            },
                            Err(_error) => Ok(not_allowed()),
                        },
                        Err(_error) => panic!("Not enough bank keys"),
                    },
                    Err(_error) => Ok(not_allowed()),
                }
            }
            Err(error) => Ok(bad_request(format!(
                "Cannot parse transaction info json: {}",
                error
            ))),
        },
        Err(error) => Ok(bad_request(format!("Bad body: {}", error))),
    }
}
