use hyper::{HeaderMap, http::HeaderValue};

use crate::cookie::get_from_cookie;



pub struct User {
    id: String,
    public_key: String,
    private_key: String,
}

pub enum UserError {
    NotAllowed,
    NoDbConnection,
}

impl User {
    pub async fn from(headers: &HeaderMap<HeaderValue>) -> Result<Self, UserError> {
        match get_from_cookie(headers, "user") {
            Some(id) => {
                
            },
            None => UserError::NotAllowed
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