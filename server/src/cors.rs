//! Make server allow all origins for development.
use hyper::header::{
    HeaderValue, ACCESS_CONTROL_ALLOW_CREDENTIALS, ACCESS_CONTROL_ALLOW_HEADERS, ACCESS_CONTROL_ALLOW_METHODS,
    ACCESS_CONTROL_ALLOW_ORIGIN, ACCESS_CONTROL_REQUEST_HEADERS,
};
use hyper::{Body, Request, Response};
use std::env;

pub fn allow_origin(mut res: Response<Body>) -> Response<Body> {
    let header = res.headers_mut();
    let orgin = env::var("ALLOW_ORGIN").unwrap_or("*".to_string());
    header.insert(
        ACCESS_CONTROL_ALLOW_ORIGIN,
        HeaderValue::from_str(&orgin).expect("Failed to convert `ALLOW_ORGIN` environment variable to `HeaderValue`."),
    );
    header.insert(ACCESS_CONTROL_ALLOW_CREDENTIALS, HeaderValue::from_static("true"));
    res
}

pub fn preflight_requests(res: Request<Body>) -> Response<Body> {
    let headers = res.headers();
    let allow_headers = headers
        .get(ACCESS_CONTROL_REQUEST_HEADERS)
        .map(Clone::clone)
        .unwrap_or_else(|| HeaderValue::from_static(""));
    let response = Response::builder()
        .header(
            ACCESS_CONTROL_ALLOW_METHODS,
            HeaderValue::from_static("GET, POST, PUT, DELETE, PATCH"),
        )
        .header(ACCESS_CONTROL_ALLOW_HEADERS, allow_headers)
        .body(Body::empty())
        .unwrap();
    allow_origin(response)
}
