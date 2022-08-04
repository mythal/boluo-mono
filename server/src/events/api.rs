use ts_rs::TS;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, TS)]
#[ts(export)]
pub struct Token {
    pub token: Option<String>,
}
