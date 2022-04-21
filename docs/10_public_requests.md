# Finex Websocket API for public requests

## Get currencies list

```json
[1, 2, "get_currencies", []]
```

```json
[
2,
2,
"get_currencies",
    [
        [
            "eth",
            "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
            4,
            18,
            8
        ]
    ]
]
```

### Currency response schema

| Field            | Example                                      |
| ---------------- | -------------------------------------------- |
| Id               | "eth"                                        |
| Address          | "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae" |
| ChainID          | 4                                            |
| Decimals         | 18                                           |
| DisplayPrecision | 8                                            |

## Get markets list

```json
[1, 2, "get_markets", []]
```

```json
[
2,
2,
"get_markets",
    [
        [
           "ethusdt",
           "spot",
           "eth",
           "usdt",
           "enabled",
           10,
           4,
           2,
           1.00,
           1000,
           1
        ]
    ]
]
```

### Currency response schema

| Field            | Example         |
| ---------------- | --------------- |
| Id               | "ethusdt"       |
| Type             | "spot"          |
| base_unit        | "eth"           |
| quote_unit       | "usdt"          |
| state            | "enabled"       |
| position         | 10              |
| amount_precision | 4               |
| price_precision  | 2               |
| min_price        | 1.00            |
| max_price        | 10000           |
| min_amount       | 1               |
