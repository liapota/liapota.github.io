use hyper::body::HttpBody as _;
use hyper::{
    client::{HttpConnector},
    Client, Uri,
};
use hyper_tls::HttpsConnector;
use std::io::{BufRead, Read};

use crate::error::CoreError;

const BASE_URI: &str = "https://hackathon.lsp.team/hk";
pub const BALANCE: &str = "/v1/wallets/%/balance";
pub const NEW_WALLET: &str = "/v1/wallets/new";

pub struct Api {
    base_uri: String,
    client: Client<HttpsConnector<HttpConnector>>,
}

impl Api {
    pub fn from(base_uri: &str) -> Self {
        Api {
            base_uri: base_uri.to_string(),
            client: Client::builder().build::<_, hyper::Body>(HttpsConnector::new()),
        }
    }

    pub fn base() -> Self {
        Self::from(BASE_URI)
    }

    fn make_uri(&self, path: &str) -> Uri {
        (self.base_uri.clone() + &path.to_string())
            .as_str()
            .parse()
            .unwrap()
    }

    pub async fn get(&self, path: &str) -> Result<String, CoreError> {
        let mut result_str: String = String::new();
        match self.client.get(self.make_uri(path)).await {
            Ok(mut resp) => {
                while let Some(chunk) = resp.body_mut().data().await {
                    match chunk {
                        Ok(unwrapped) => match String::from_utf8(unwrapped.to_vec()) {
                            Ok(str) => result_str.push_str(str.as_str()),
                            Err(error) => return Err(CoreError::api_response_parse_error(error)),
                        },
                        Err(error) => return Err(CoreError::api_response_parse_error(error)),
                    }
                }
                Ok(result_str)
            }
            Err(error) => Err(CoreError::api_error(error)),
        }
    }
}
