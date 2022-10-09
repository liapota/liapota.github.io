use std::{convert::Infallible, net::SocketAddr};

use api::{
    cookie::get_from_cookie,
    transactions::{
        handle_transaction_from_bank_post, handle_transaction_post, handle_transactions_get,
    },
    user::{handle_user_get, handle_users_get},
};
use core::{
    response::{internal_server_error, not_allowed, not_found},
    user::create_user_table_if_not_exists,
};
use hyper::{
    header,
    service::{make_service_fn, service_fn},
    Body, Method, Request, Response, Server,
};

fn print_request_data(req: &Request<Body>) {
    if let Some(user_id) = req.headers().get("x-user-id") {
        println!(
            "Pick user id from 'x-user-id': {}",
            user_id.to_str().unwrap()
        );
    } else if let Some(user_id) = get_from_cookie(req.headers(), "user") {
        println!("Pick user from 'Cookie: user': {}", &user_id);
    }
}

async fn handle_request(req: Request<Body>) -> Result<Response<Body>, Infallible> {
    match req.method() {
        &Method::GET => {
            println!("GET {}", req.uri().path());
            print_request_data(&req);
            match req.uri().path() {
                "/transactions" => match handle_transactions_get(req.headers()).await {
                    Ok(response) => Ok(response),
                    Err(error) => Ok(internal_server_error(error.msg)),
                },
                "/user" => match handle_user_get(req.headers()).await {
                    Ok(response) => Ok(response),
                    Err(error) => Ok(internal_server_error(error.msg)),
                },
                "/users" => match handle_users_get(req.headers()).await {
                    Ok(response) => Ok(response),
                    Err(error) => Ok(internal_server_error(error.msg)),
                },
                _ => Ok(not_found()),
            }
        }
        &Method::POST => {
            println!("POST {}", req.uri().path());
            print_request_data(&req);
            return match req.uri().path() {
                "/transaction" => match handle_transaction_post(req).await {
                    Ok(response) => Ok(response),
                    Err(error) => Ok(internal_server_error(error.msg)),
                },
                "/transaction_from_bank" => match handle_transaction_from_bank_post(req).await {
                    Ok(response) => Ok(response),
                    Err(error) => Ok(internal_server_error(error.msg)),
                },
                _ => Ok(not_found()),
            };
        }
        &Method::DELETE => {
            println!("DELETE {}", req.uri().path());
            print_request_data(&req);
            return match req.uri().path() {
                _ => Ok(not_found()),
            };
        }
        &Method::PATCH => {
            println!("PATCH {}", req.uri().path());
            print_request_data(&req);
            return match req.uri().path() {
                _ => Ok(not_found()),
            };
        }
        &Method::OPTIONS => {
            return Ok(Response::builder()
                .header(header::ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                .header(header::ACCESS_CONTROL_ALLOW_HEADERS, "*")
                .body("Allowed".into())
                .unwrap())
        }
        _ => Ok(not_allowed()),
    }
}

type TokioResult<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;

#[tokio::main]
async fn main() -> TokioResult<()> {
    let addr = SocketAddr::from(([127, 0, 0, 1], 4242));
    match create_user_table_if_not_exists().await {
        Ok(()) => {}
        Err(error) => panic!("Cannot create user table: {}", error),
    }

    let make_svc =
        make_service_fn(|_conn| async { Ok::<_, Infallible>(service_fn(handle_request)) });

    let server = Server::bind(&addr).serve(make_svc);

    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }
    TokioResult::Ok(())
}
