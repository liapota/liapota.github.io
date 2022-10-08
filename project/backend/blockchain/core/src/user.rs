use crate::{db::{connect_db, DbError}, error::CoreError};
use serde::{Deserialize, Serialize};

pub async fn create_user_table_if_not_exists() -> Result<(), DbError> {
    match connect_db().await {
        Ok(client) => {
            if let Err(error) = client
                .query(
                    "CREATE TABLE IF NOT EXISTS user_wallet (\
                                    id,\
                                    public_key,\
                                    private_key\
                                );",
                    &[],
                )
                .await
            {
                return Err(DbError::bad_operation(error));
            }
            Ok(())
        }
        Err(error) => Err(error),
    }
}

#[derive(Deserialize)]
pub struct UserKeyPair {
    privateKey: String,
    publicKey: String,
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

pub async fn get_user_key_pair() -> Result<UserKeyPair, CoreError> {
    
}


