use core::response::not_implemented;

use hyper::{HeaderMap, http::HeaderValue};

use crate::handle::HandleResult;

pub async fn handle_transactions_get(headers: &HeaderMap<HeaderValue>) -> HandleResult {
    Ok(not_implemented())
}