# Finex Websocket API for private requests

Websocket API is mounted at `/api/v2/open_finance`. If you pass a JWT header, your
connection will be authenticated, otherwise it will be considered anonymous.


## Subscribe to streams

Example

```json
[1, 2, "subscribe", ["private", ["order", "trade", "balances"]]]
```

## Get your open orders

Request Parameters

| Field            | Example                                |
| -----------------| -------------------------------------- |
| Market [optional]| "btcusd"                               |
| Page   [optional]| 1                                      |
| Limit  [optional]| 25                                     |
| State  [optional]| wait/cancel/done/reject/pending/trigger_wait/trigger_cancel/trigger_reject |
#### Get all your orders
```json
[1, 2, "list_orders", ["", 0, 0, ""]]
```
#### Get all your open orders by market
```json
[1, 2, "list_orders", ["btcusd", 0, 0, "wait"]]
```
#### Get your open orders by state with pagination

```json
[1, 2, "list_orders", ["", 1, 25, "wait"]]
```

```json
[
    2,
    2,
    "list_orders",
    [
        [
            "btcusd",
            97,
            "6dcc2c8e-c295-11ea-b7ad-1831bf9834b0",
            "sell",
            "w",
            "l",
            "9120",
            "0",
            "0.25",
            "0.25",
            "0",
            0,
            1594386563,
            "0.25",
            "0.25",
        ]
    ]
]
```

## Get orders by uuids

```json
[
  1,
  3,
  "list_orders_by_uuids",
  [
    "6dcc2c8e-c295-11ea-b7ad-1831bf9834b0",
    "4fec493d-c2a2-11ea-b670-1831bf9834b0"
  ]
]
```

```json
[
  2,
  3,
  "list_orders_by_uuids",
  [
    [
      "btcusd",
      97,
      "6dcc2c8e-c295-11ea-b7ad-1831bf9834b0",
      "sell",
      "w",
      "l",
      "9120",
      "0",
      "0.25",
      "0.25",
      "0",
      0,
      1594386563,
      "0.25",
      "0.25",
    ],
    [
      "btcusd",
      98,
      "4fec493d-c2a2-11ea-b670-1831bf9834b0",
      "sell",
      "c",
      "m",
      "0",
      "0",
      "0.25",
      "0.25",
      "0",
      0,
      1594392096,
      "0.25",
      "0.25",
    ]
  ]
]
```

### Order response schema

| Field           | Example                                |
| --------------- | -------------------------------------- |
| Market          | "btcusd"                               |
| ID              | 97                                     |
| UUID            | "6dcc2c8e-c295-11ea-b7ad-1831bf9834b0" |
| Side            | "sell"                                 |
| State           | "w"                                    |
| Type            | "l"                                    |
| Price           | "9120"                                 |
| Avg. Price      | "0"                                    |
| Volume          | "0.25"                                 |
| Orig. Volume    | "0.25"                                 |
| Executed Volume | "0"                                    |
| Trades Count    | 0                                      |
| Timestamp       | 1594386563                             |
| MakerFee        | "0.25"                                 |
| TakerFee        | "0.25"                                 |


## Get order trades

```json
[1, 42, "list_order_trades", ["ab224fef-c2a2-11ea-b670-1831bf9834b0"]]
```

```json
[
  2,
  42,
  "list_order_trades",
  [
    [
      "btcusd",
      33,
      "9120",
      "0.25",
      "2280",
      100,
      "ab224fef-c2a2-11ea-b670-1831bf9834b0",
      "buy",
      "buy",
      "0.0005",
      "btc",
      1594392250
    ]
  ]
]
```

### Trade response schema

| Field     | Example                                |
| --------- | -------------------------------------- |
| Market    | "btcusd"                               |
| ID        | 33                                     |
| Price     | "9120"                                 |
| Amount    | "0.25"                                 |
| Total     | "2280"                                 |
| OrderID   | 100                                    |
| OrderUUID | "ab224fef-c2a2-11ea-b670-1831bf9834b0" |
| OrderSide | "buy"                                  |
| TakerSide | "buy"                                  |
| Fee       | "0.0005"                               |
| Fee Unit  | "btc"                                  |
| Timestamp | 1594392250                             |

## Create order

Arguments:

| Arg    | Comment                              |
| ------ | ------------------------------------ |
| Market |                                      |
| Type   | M is Market L is Limit P is PostOnly |
| Side   | buy or sell                          |
| amount | sting, int, float                    |
| price  | ignored for market order             |
| quote_amount | [OPTIONAL] Only for market buy orders, allows to set how much you are willing to spend to buy a currency |

Responds with ok and uuid of new order if order is pushed to engine.
Response with error and short description in case of failure.

Example

```json
[1, 42, "create_order", ["btcusd", "m", "sell", "0.250000", "9120.00"]]
```

Response

```json
[2, 42, "create_order", ["4fec493d-c2a2-11ea-b670-1831bf9834b0"]]
```

## Cancel user order

Arguments:

| Arg    | Desc                               |
| ----   | ---------------------------------- |
| Market | market                             |
| UUID   | order UUID                         |


Example

```json
[1, 42, "cancel_order", [["btcusd", "bc8b9e47-ac5f-443c-ae7b-e4e9758df20b"],["ethusd","ac1b9e47-ac5f-443c-ae7b-e4e9758df20b"]]]
```

Response

```json
[2, 42, "cancel_order", []]
```

## Cancel all user orders

Example

```json
[1, 42, "cancel_all", []]
```

Response

```json
[2, 42, "cancel_all", []]
```

## Bulk order create

Arguments: array or _Create order_ params

Responds with array of:

- uuid for crated order
- "error" if some error ocurred

Example

```json
[
  1,
  42,
  "create_bulk",
  [
    ["btcusd", "l", "buy", "0.250000", "9120.00"],
    ["btcusd", "l", "sell", "0.250000", "9120.00"]
  ]
]
```

Response

```json
[
  2,
  42,
  "create_bulk",
  [
    "04852bd8-c2a3-11ea-b670-1831bf9834b0",
    "04855535-c2a3-11ea-b670-1831bf9834b0"
  ]
]
```

## Get your deposit/withdraw histories with pagination

Arguments:

| Arg    | Example                           |
| ----   | --------------------------------- |
| State  | "confirmed"                       |
| Page   | 1                                 |
| Limit  | 25                                |

```json
[1, 2, "get_deposits", ["confirmed", 1, 25]] OR [1, 2, "get_withdraws", ["confirmed", 1, 25]]
```

```json
[
    2,
    2,
    "get_deposits",
    [
        [
            9,
            "fda0dc69-7f8c-47e0-996d-e73caabc4835",
            "eth",
            "confirmed",
            "1000",
            "0x51a20564eaba83669460c4f45efbde9c",
            2,
            "0x12",
            1594392250,
            1594392250
        ]
    ]
]
```

```json
[
    2,
    2,
    "get_withdraws",
    [
        [
            9,
            "fda0dc69-7f8c-47e0-996d-e73caabc4835",
            "eth",
            "confirmed",
            "1000",
            "0x51a20564eaba83669460c4f45efbde9c",
            2,
            "0x12",
            1594392250,
            1594392250
        ]
    ]
]
```


### Deposit response schema

| Field       | Example                                |
| ---------   | -------------------------------------- |
| ID          | 9                                      |
| UserID      | "fda0dc69-7f8c-47e0-996d-e73caabc4835" |
| CurrencyID  | "eth"                                  |
| State       | "confirmed"                            |
| Amount      | "1000"                                 |
| TxId        | "0x51a20564eaba83669460c4f45efbde9c"   |
| BlockNumber | 13172922                               |
| RemoteID    | "0x12"                                 |
| ExpiresAt   |  1594392250                            |
| CreatedAt   | 1594392250                             |

### Withdraw response schema

| Field       | Example                                |
| ---------   | -------------------------------------- |
| ID          | 9                                      |
| UserID      | "fda0dc69-7f8c-47e0-996d-e73caabc4835" |
| CurrencyID  | "eth"                                  |
| State       | "confirmed"                            |
| Amount      | "1000"                                 |
| TxId        | "0x51a20564eaba83669460c4f45efbde9c"   |
| BlockNumber | 13172922                               |
| RemoteID    | "0x12"                                 |
| ExpiresAt   | 1594392250                             |
| CreatedAt   | 1594392250                             |

## Set config value

Arguments:

| Arg        | Example                           |
| ----       | --------------------------------- |
| Component  | "finex"                           |
| Key        | "finex_var"                       |
| Value      | ["1", "2"] / "confirmed"          |
| Scope      | "public"/"private"/"secret"       |

```json
[1, 2, "set_config", ["finex", "auth", true, "public"]]
```

```json
[2,2,"set_config",[]]
```

## Get config secret

```json
[1, 2, "get_config", []]
```

```json
[2,2,"get_config",
  [
    {
      "finex":{
        "private":{"key_private":"value_private"},
        "public":{"key_public":"value_public"},
        "secret":{"key_secret":"******"}
      }
    }
  ]
]
```
