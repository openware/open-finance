---
tags:
  - Open Finance
  - Event streams
---
# Public events streams

## Kline (also known as OHLC)

**Arguments**

| Argument      | Description                                               |
| ------------- | --------------------------------------------------------- |
| Timestamp     | Timestamp of the period start                             |
| Open price    | Price of the first trade in the period                    |
| High price    | Highest price of the period                               |
| Low price     | Lowest price of the period                                |
| Close price   | Price of the last price of the period                     |
| Period volume | (optional) Sum of trades amount of the period             |
| Average price | (optional) Weighted average price of trades of the period |

```json
[
  3,
  "kline.15m.ethusd",
  [
    1588791600,
    0.025353,
    0.025353,
    0.025353,
    0.025353,
    10,
    0.025353
  ]
]
```

## Tickers

```json
[
  3,
  "tickers",
  [
    [
      "ethbtc",
      1588791600,
      0.025353,
      0.025353,
      0.025353,
      0.025353,
      10,
      0.025353,
      0.025353,
      "+3.94%"
    ],
    ["bchbtc", 1588791600, 0.025353, 0.025353, 0.025353, 0.025353, 10, 0.025353, 0.025353, "-0.94%"]
  ]
]
```

**Payload**

Array of tickers

| Argument      | Description                                               |
| ------------- | --------------------------------------------------------- |
| Market ID     | market unique identifier                                  |
| Time          | Timestamp of the period start                             |
| Min price     | Lowest price of the period                                |
| Max price     | Highest price during the period                           |
| Open price    | Price of the first trade in the period                    |
| Close price   | Price of the last price of the period                     |
| Volume        | Trading volume in quote currency                          |
| Amount        | Trading amount in base currency                           |
| VWAP          | Volume-weighted average price during the period           |
| Price change% | Percentage of price change during the period              |

## Trade

```json
[3, "trade", ["btcusd", 1, "1", "1", 1589211189, "buy", "21"]]
```

**Payload**

| Argument   | Description                          |
| ---------- | ------------------------------------ |
| Market ID  | Market unique identifier             |
| Trade ID   | Trade unique identifier              |
| Price      | Trade Price                          |
| Amount     | Trade amount                         |
| Timestamp  | Trade created_at timestamp           |
| Taker type | Side of taker order, "buy" or "sell" |
| Source     | Source ID                            |

## Orderbook

### Snapshot

Orderbook Snapshot

```json
[3, "ethusdt.obs", [0, [["10", "1"]], [["5", "1"]]]]
```

| Argument | Description                     |
| -------- | ------------------------------- |
| Sequence | Sequentially increasing number  |
| Sells    | Array of sell side price levels |
| Buys     | Array of buy side price levels  |

### Increment

Orderbook update

```json
[3, "ethusdt.obi", [1, "asks", ["10", "1"]]]
```

**Payload**

| Argument   | Description                                             |
| ---------- | ------------------------------------------------------- |
| Sequence   | Sequentially increasing number                          |
| Side       | Side updated, "asks" or "bids"                          |
| PriceLevel | Price and amount, an empty amount means that the price level has been deleted |
