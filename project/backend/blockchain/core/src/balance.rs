use serde::Deserialize;

use crate::{
    api::{Api, BALANCE},
    error::CoreError,
};

#[derive(Deserialize)]
pub struct Balance {
    pub maticAmount: f32,
    pub coinsAmount: f32,
}

impl Balance {
    pub async fn from(public_key: &str) -> Result<Self, CoreError> {
        match Api::base()
            .get(BALANCE.replace("%", public_key).as_str())
            .await
        {
            Ok(result_str) => match serde_json::from_str(result_str.as_str()) {
                Ok(result) => Ok(result),
                Err(error) => Err(CoreError::api_response_parse_error(error)),
            },
            Err(error) => Err(error),
        }
    }
}
