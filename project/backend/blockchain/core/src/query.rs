use std::collections::HashMap;

fn query_key_value(param: &str) -> (&str, &str) {
    let mut iter = param.splitn(2, "=");
    (
        iter.next().unwrap_or_default(),
        iter.next().unwrap_or_default(),
    )
}

pub fn parse_query(query: &str) -> HashMap<&str, &str> {
    let mut parsed = HashMap::new();
    for param in query.split("&") {
        let (key, value) = query_key_value(param);
        parsed.insert(key, value);
    }
    parsed
}

pub fn get_query_bool(value: &str) -> Option<bool> {
    match value {
        "1" | "yes" | "true" | "da" => Some(true),
        "0" | "no" | "false" | "net" => Some(false),
        _ => None,
    }
}