use hyper::{Body, Response};

pub struct ResponseError {
    pub msg: String,
}

pub type HandleResult = Result<Response<Body>, ResponseError>;
