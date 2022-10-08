use std::{net::SocketAddr, convert::Infallible};

use api::transactions::handle_transactions_get;
use hyper::{service::{make_service_fn, service_fn}, Server, Request, Response, Body, Method};
use core::{response::{internal_server_error, not_found, not_allowed}, user::create_user_table_if_not_exists};

fn print_request_data(req: &Request<Body>) {
    if let Some(user_id) = req.headers().get("x-user-id") {
        println!(
            "Pick user id from 'x-user-id': {}",
            user_id.to_str().unwrap()
        );
    } else if let Some(user_id) = guest_user_cookie(req.headers()) {
        println!("Pick user from 'Cookie: user': {}", &user_id);
    }
}

async fn handle_request(req: Request<Body>) -> Result<Response<Body>, Infallible> {
    match req.method() {
        &Method::GET => {
            println!("GET {}", req.uri().path());
            print_request_data(&req);
            match req.uri().path() {
                "/transactions" => {
                    match handle_transactions_get(req.headers()).await {
                        Ok(response) => Ok(response),
                        Err(error) => Ok(internal_server_error(error.msg)),
                    }
                }
                _ => Ok(not_found()),
            }
        }
        &Method::POST => {
            println!("POST {}", req.uri().path());
            print_request_data(&req);
            return match req.uri().path() {
                "/cart" => {
                    return match handle_cart_post(
                        req.headers(),
                        req.uri().query().unwrap_or_default(),
                    )
                    .await
                    {
                        Ok(response) => Ok(response),
                        Err(error) => Ok(internal_server_error(error.msg)),
                    }
                }
                "/person" => {
                    return match handle_person_post(req).await {
                        Ok(response) => Ok(response),
                        Err(error) => Ok(internal_server_error(error.msg)),
                    }
                }
                _ => Ok(not_found()),
            };
        }
        &Method::DELETE => {
            println!("DELETE {}", req.uri().path());
            print_request_data(&req);
            return match req.uri().path() {
                "/cart" => {
                    return match handle_cart_delete(
                        req.headers(),
                        req.uri().query().unwrap_or_default(),
                    )
                    .await
                    {
                        Ok(response) => Ok(response),
                        Err(error) => Ok(internal_server_error(error.msg)),
                    }
                }
                _ => Ok(not_found()),
            };
        }
        &Method::PATCH => {
            println!("PATCH {}", req.uri().path());
            print_request_data(&req);
            return match req.uri().path() {
                "/cart" => {
                    return match handle_cart_patch(
                        req.headers(),
                        req.uri().query().unwrap_or_default(),
                    )
                    .await
                    {
                        Ok(response) => Ok(response),
                        Err(error) => Ok(internal_server_error(error.msg)),
                    }
                }
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
    create_user_table_if_not_exists();

    let make_svc =
        make_service_fn(|_conn| async { Ok::<_, Infallible>(service_fn(handle_request)) });

    let server = Server::bind(&addr).serve(make_svc);

    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }
    TokioResult::Ok(())
}
