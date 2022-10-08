use std::collections::HashMap;

use hyper::{HeaderMap, http::HeaderValue};


fn cookie_parse(cookie_str: &str) -> HashMap<String, String> {
    let mut result: HashMap<String, String> = HashMap::new();
    let pairs: Vec<String> = cookie_str
        .split(';')
        .map(|s| s.trim().to_string())
        .collect();
    for key_value_string in pairs {
        let mut splitted = key_value_string.split('=');
        let key = splitted.nth(0).unwrap();
        let value = splitted.nth(0).unwrap_or_default();
        result.insert(key.to_string(), value.to_string());
    }
    result
}

pub fn get_from_cookie(headers: &HeaderMap<HeaderValue>, key: &str) -> Option<String> {
    match headers.get("Cookie") {
        Some(cookie_str) => {
            let cookie = cookie_parse(cookie_str.to_str().unwrap());
            match cookie.get(key) {
                Some(value) => Some(value.clone()),
                None => None
            }
        },
        None => None
    }
}