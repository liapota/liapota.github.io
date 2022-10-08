use tokio_postgres::{Client, NoTls};

pub struct DbError {
    pub msg: String,
}

impl DbError {
    pub fn cannot_connect<T: std::fmt::Display>(error: T) -> DbError {
        DbError {
            msg: format!("Cannot make client connection with postgres: {}", error),
        }
    }

    pub fn bad_operation<T: std::fmt::Display>(error: T) -> DbError {
        DbError {
            msg: format!("Cannot make operation with postgres: {}", error),
        }
    }
}

pub async fn connect_db() -> Result<Client, DbError> {
    match tokio_postgres::connect("host=postgres", NoTls).await {
        Ok((client, connection)) => {
            tokio::spawn(async move {
                if let Err(error) = connection.await {
                    eprintln!("Cannot make client connection with postgres: {}", error);
                }
            });
            Ok(client)
        }
        Err(error) => Err(DbError::cannot_connect(error)),
    }
}
