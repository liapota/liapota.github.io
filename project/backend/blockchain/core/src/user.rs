use crate::{
    api::{Api, NEW_WALLET},
    db::connect_db,
    error::CoreError,
};
use serde::Deserialize;

pub async fn create_user_table_if_not_exists() -> Result<(), CoreError> {
    match connect_db().await {
        Ok(client) => {
            if let Err(error) = client
                .query(
                    "CREATE TABLE IF NOT EXISTS user_wallet (\
                                    id VARCHAR(255),\
                                    private_key VARCHAR(255),\
                                    public_key VARCHAR(255),\
                                    exp INT\
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

#[derive(Deserialize)]
pub struct UserKeyPair {
    pub privateKey: String,
    pub publicKey: String,
}

impl Drop for UserKeyPair {
    fn drop(&mut self) {
        unsafe {
            for byte in self.privateKey.as_bytes_mut() {
                *byte = 0x00;
            }
        }
    }
}

async fn create_user_key_pair(user_id: &str) -> Result<UserKeyPair, CoreError> {
    match Api::base().get(NEW_WALLET).await {
        Ok(str) => match serde_json::from_str(str.as_str()) {
            Ok(key_pair) => {
                let result: UserKeyPair = key_pair;
                match connect_db().await {
                    Ok(client) => match client
                        .query(
                            "INSERT ($1, $2, $3, 0) INTO user_wallet;",
                            &[&user_id, &result.privateKey, &result.publicKey],
                        )
                        .await
                    {
                        Ok(rows) => Ok(result),
                        Err(error) => Err(CoreError::bad_db_operation(error)),
                    },
                    Err(error) => Err(CoreError::no_db_connection(error)),
                }
            }
            Err(error) => Err(CoreError::api_response_parse_error(error)),
        },
        Err(error) => Err(error),
    }
}

pub async fn get_user_key_pair(user_id: &str) -> Result<UserKeyPair, CoreError> {
    match connect_db().await {
        Ok(client) => {
            match client
                .query(
                    "SELECT private_key, public_key FROM user_wallet WHERE id = $1;",
                    &[&user_id],
                )
                .await
            {
                Ok(rows) => match rows.is_empty() {
                    true => create_user_key_pair(user_id).await,
                    false => {
                        let row = rows.get(0).unwrap();
                        Ok(UserKeyPair {
                            privateKey: row.get(0),
                            publicKey: row.get(1),
                        })
                    }
                },
                Err(error) => Err(CoreError::bad_db_operation(error)),
            }
        }
        Err(error) => Err(CoreError::no_db_connection(error)),
    }
}

pub async fn get_user_exp(user_id: &str) -> Result<u64, CoreError> {
    match connect_db().await {
        Ok(client) => {
            match client
                .query(
                    "SELECT exp FROM user_wallet WHERE id = $1;",
                    &[&user_id],
                )
                .await
            {
                Ok(rows) => match rows.is_empty() {
                    true => Err(CoreError::unexpected_no_user()),
                    false => {
                        let row = rows.get(0).unwrap();
                        Ok(u64::from_str_radix(row.get(0), 10).unwrap())
                    }
                },
                Err(error) => Err(CoreError::bad_db_operation(error)),
            }
        }
        Err(error) => Err(CoreError::no_db_connection(error)),
    }
}