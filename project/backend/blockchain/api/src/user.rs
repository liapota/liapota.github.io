use core::{
    balance::{self, Balance},
    db::connect_db,
    response::internal_server_error,
    user::{self, get_user_exp, get_user_key_pair},
};
use std::fmt;

use hyper::{header, http::HeaderValue, HeaderMap, Response};
use serde::Serialize;

use crate::{cookie::get_from_cookie, handle::HandleResult};

pub struct User {
    pub id: String,
    pub public_key: String,
    pub private_key: String,
}

pub struct UserError {
    pub msg: String,
}

impl UserError {
    pub fn not_allowed() -> Self {
        Self {
            msg: format!("Operation not allowed"),
        }
    }

    pub fn core_error<T: std::fmt::Display>(error: T) -> Self {
        Self {
            msg: format!("ApiCoreError: {}", error),
        }
    }

    pub fn no_db_connection<T: std::fmt::Display>(error: T) -> Self {
        Self {
            msg: format!("Cannot make client connection with postgres: {}", error),
        }
    }

    pub fn bad_db_operation<T: std::fmt::Display>(error: T) -> Self {
        Self {
            msg: format!("Cannot make operation with postgres: {}", error),
        }
    }
}

impl fmt::Display for UserError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.msg)
    }
}

impl User {
    pub async fn from_id(id: &str) -> Result<Self, UserError> {
        match get_user_key_pair(id).await {
            Ok(key_pair) => Ok(Self {
                id: id.to_string(),
                public_key: key_pair.publicKey.clone(),
                private_key: key_pair.privateKey.clone(),
            }),
            Err(error) => Err(UserError::core_error(error)),
        }
    }

    pub async fn from(headers: &HeaderMap<HeaderValue>) -> Result<Self, UserError> {
        match get_from_cookie(headers, "user") {
            Some(id) => Self::from_id(id.as_str()).await,
            None => Err(UserError::not_allowed()),
        }
    }

    pub async fn coins(&self) -> Result<f32, UserError> {
        match Balance::from(&self.public_key).await {
            Ok(balance) => Ok(balance.coinsAmount),
            Err(error) => Err(UserError::core_error(error)),
        }
    }

    pub async fn exp(&self) -> Result<u64, UserError> {
        match get_user_exp(self.id.as_str()).await {
            Ok(exp) => Ok(exp),
            Err(error) => Err(UserError::core_error(error)),
        }
    }
}

impl Drop for User {
    fn drop(&mut self) {
        unsafe {
            for byte in self.private_key.as_bytes_mut() {
                *byte = 0x00;
            }
        }
    }
}

#[derive(Serialize)]
pub struct UserOutput {
    id: String,
    exp: u64,
    coins: f32,
}

#[derive(Serialize)]
pub struct UsersOutput {
    users: Vec<UserOutput>,
}

impl UserOutput {
    pub async fn from(user: &User) -> Result<Self, UserError> {
        Ok(Self {
            id: user.id.clone(),
            exp: match user.exp().await {
                Ok(result) => result,
                Err(error) => return Err(error),
            },
            coins: match user.coins().await {
                Ok(result) => result,
                Err(error) => return Err(error),
            },
        })
    }
}

impl UsersOutput {
    pub async fn from(users: &Vec<User>) -> Result<Self, UserError> {
        let mut user_outputs: Vec<UserOutput> = Vec::new();
        for user in users {
            match UserOutput::from(user).await {
                Ok(out) => user_outputs.push(out),
                Err(error) => return Err(error),
            }
        }
        Ok(Self {
            users: user_outputs,
        })
    }
}

pub async fn get_other_users(headers: &HeaderMap<HeaderValue>) -> Result<Vec<User>, UserError> {
    match get_from_cookie(headers, "user") {
        Some(id) => match connect_db().await {
            Ok(client) => {
                match client
                    .query(
                        "SELECT id, private_key, public_key FROM user_wallet WHERE id != $1;",
                        &[&id.as_str()],
                    )
                    .await
                {
                    Ok(rows) => {
                        let mut users: Vec<User> = Vec::new();
                        for row in rows {
                            users.push(User {
                                id: row.get(0),
                                private_key: row.get(1),
                                public_key: row.get(2),
                            })
                        }
                        Ok(users)
                    }
                    Err(error) => Err(UserError::bad_db_operation(error)),
                }
            }
            Err(error) => Err(UserError::no_db_connection(error)),
        },
        None => Err(UserError::not_allowed()),
    }
}

pub async fn handle_user_get(headers: &HeaderMap<HeaderValue>) -> HandleResult {
    match User::from(headers).await {
        Ok(user) => match UserOutput::from(&user).await {
            Ok(output) => Ok(Response::builder()
                .header("Content-Type", "application/json; charset=utf-8")
                .header(header::ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                .header(header::ACCESS_CONTROL_ALLOW_HEADERS, "*")
                .body(serde_json::to_string(&output).unwrap().into())
                .unwrap()),
            Err(error) => Ok(internal_server_error(format!("{}", error))),
        },
        Err(error) => Ok(internal_server_error(format!("{}", error))),
    }
}

pub async fn handle_users_get(headers: &HeaderMap<HeaderValue>) -> HandleResult {
    match get_other_users(headers).await {
        Ok(users) => match UsersOutput::from(&users).await {
            Ok(output) => Ok(Response::builder()
                .header("Content-Type", "application/json; charset=utf-8")
                .header(header::ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                .header(header::ACCESS_CONTROL_ALLOW_HEADERS, "*")
                .body(serde_json::to_string(&output).unwrap().into())
                .unwrap()),
            Err(error) => Ok(internal_server_error(format!("{}", error))),
        },
        Err(error) => Ok(internal_server_error(format!("{}", error))),
    }
}
