use core::fmt;

pub struct CoreError {
    pub msg: String,
}

impl CoreError {
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

    pub fn api_error<T: std::fmt::Display>(error: T) -> Self {
        Self {
            msg: format!("Bad api operation: {}", error),
        }
    }

    pub fn api_response_parse_error<T: std::fmt::Display>(error: T) -> Self {
        Self {
            msg: format!("Cannot parse api response: {}", error),
        }
    }

    pub fn unexpected_no_user() -> Self {
        Self {
            msg: format!("Unexpected no user"),
        }
    }
}

impl fmt::Display for CoreError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.msg)
    }
}
