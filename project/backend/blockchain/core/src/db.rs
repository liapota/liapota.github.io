use tokio_postgres::{Client, NoTls};

use crate::error::CoreError;

pub async fn connect_db() -> Result<Client, CoreError> {
    match tokio_postgres::connect("host=postgres dbname=heartbeat username=postgres", NoTls).await {
        Ok((client, connection)) => {
            tokio::spawn(async move {
                if let Err(error) = connection.await {
                    eprintln!("Cannot make client connection with postgres: {}", error);
                }
            });
            Ok(client)
        }
        Err(error) => Err(CoreError::no_db_connection(error)),
    }
}
