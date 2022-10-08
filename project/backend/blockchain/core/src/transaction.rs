use serde::{Deserialize, Serialize};

use crate::{
    api::{Api, TRANSACTION_DR, TRANSACTION_MATIC, TRANSACTION_NFT},
    db::connect_db,
    error::CoreError,
};

pub async fn create_transaction_tables_if_not_exists() -> Result<(), CoreError> {
    match connect_db().await {
        Ok(client) => {
            if let Err(error) = client
                .query(
                    "CREATE TABLE IF NOT EXISTS dr_transaction (\
                                    hash VARCHAR(255),\
                                    from VARCHAR(255),\
                                    to VARCHAR(255),\
                                    amount DECIMAL\
                                );",
                    &[],
                )
                .await
            {
                return Err(CoreError::bad_db_operation(error));
            }
            if let Err(error) = client
                .query(
                    "CREATE TABLE IF NOT EXISTS matic_transaction (\
                                    hash VARCHAR(255),\
                                    from VARCHAR(255),\
                                    to VARCHAR(255),\
                                    amount DECIMAL\
                                );",
                    &[],
                )
                .await
            {
                return Err(CoreError::bad_db_operation(error));
            }
            if let Err(error) = client
                .query(
                    "CREATE TABLE IF NOT EXISTS nft_transaction (\
                                    hash VARCHAR(255),\
                                    from VARCHAR(255),\
                                    to VARCHAR(255),\
                                    token_id INT\
                                );",
                    &[],
                )
                .await
            {
                return Err(CoreError::bad_db_operation(error));
            }
            Ok(())
        }
        Err(error) => Err(error),
    }
}

#[derive(Serialize)]
pub struct ApiCoinTransaction {
    pub fromPrivateKey: String,
    pub toPublicKey: String,
    pub amount: f32,
}

#[derive(Serialize)]
pub struct ApiNftTransaction {
    pub fromPrivateKey: String,
    pub toPublicKey: String,
    pub tokenId: u64,
}

#[derive(Deserialize)]
pub struct TransactionResult {
    transactionHash: String,
}

async fn money_transaction(
    info: ApiCoinTransaction,
    path: &str,
) -> Result<TransactionResult, CoreError> {
    match Api::base()
        .post(path, serde_json::to_string(&info).unwrap().as_str())
        .await
    {
        Ok(result_str) => match serde_json::from_str(result_str.as_str()) {
            Ok(result) => Ok(result),
            Err(error) => Err(CoreError::api_response_parse_error(error)),
        },
        Err(error) => Err(CoreError::api_error(error)),
    }
}

pub async fn transfer_dr(info: ApiCoinTransaction) -> Result<TransactionResult, CoreError> {
    money_transaction(info, TRANSACTION_DR).await
}

pub async fn transfer_matic(info: ApiCoinTransaction) -> Result<TransactionResult, CoreError> {
    money_transaction(info, TRANSACTION_MATIC).await
}

pub async fn transfer_nft(info: ApiNftTransaction) -> Result<TransactionResult, CoreError> {
    match Api::base()
        .post(
            TRANSACTION_NFT,
            serde_json::to_string(&info).unwrap().as_str(),
        )
        .await
    {
        Ok(result_str) => match serde_json::from_str(result_str.as_str()) {
            Ok(result) => Ok(result),
            Err(error) => Err(CoreError::api_response_parse_error(error)),
        },
        Err(error) => Err(CoreError::api_error(error)),
    }
}
