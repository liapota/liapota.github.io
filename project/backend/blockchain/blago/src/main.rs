use hyper::body::HttpBody as _;
use std::io::BufRead;
use std::io::Write;

use hyper::client::Client;
use hyper_tls::HttpsConnector;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    Ok(())
}
