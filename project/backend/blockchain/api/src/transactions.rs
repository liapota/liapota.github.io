use core::response::not_implemented;
use std::{
    fs::File,
    io::{prelude::*, BufReader},
    sync::Mutex,
};

use hyper::{http::HeaderValue, Body, HeaderMap, Request};

use crate::handle::HandleResult;

const BANK_PRIVATE_KEY: &str = "221cc157931b5bebdca1f0c8b29f4602d62bc7a1ca1bb4d420b0ec6d2798fcf6";
const BANK_PUBLIC_KEY: &str = "0x4341b74258e91b77e00a3534C02d1a5aF43a6f55";

struct KeyPair {
    pub public: String,
    pub private: String,
}

struct BankChain {
    pub pairs: Mutex<Vec<KeyPair>>,
}

impl BankChain {
    pub fn load() -> Self {
        let file = File::open("bankchain").unwrap();
        let reader = BufReader::new(file);

        for line in reader.lines() {
            let splitted = line;
        }
        BankChain { pairs: Mutex::new(Vec::new()) }
    }
}

pub async fn handle_transactions_get(headers: &HeaderMap<HeaderValue>) -> HandleResult {
    Ok(not_implemented())
}

pub async fn handle_transaction_post(req: &Request<Body>) -> HandleResult {
    Ok(not_implemented())
}
