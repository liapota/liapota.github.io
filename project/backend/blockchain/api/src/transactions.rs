use core::{
    balance::Balance,
    response::not_implemented,
    transaction::{transfer_dr, ApiCoinTransaction},
};
use lazy_static::lazy_static;
use std::{
    fmt::format,
    fs::File,
    io::{prelude::*, BufReader},
    sync::Mutex,
};

use hyper::{http::HeaderValue, Body, HeaderMap, Request};

use crate::handle::HandleResult;

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
                    if (balance.maticAmount > MIN_BANK_METIC_AMOUNT) {
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
                    Ok(result) => {}
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

lazy_static! {
    static ref BANK_CHAIN: Mutex<BankChain> = Mutex::new(BankChain::load());
}

pub async fn handle_transactions_get(headers: &HeaderMap<HeaderValue>) -> HandleResult {
    Ok(not_implemented())
}

pub async fn handle_transaction_post(req: &Request<Body>) -> HandleResult {

    Ok(not_implemented())
}
