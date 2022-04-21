# Drivers Overview

### Description

Drivers are used to listen to market data through a websocket, generate trade events and publish them to an output. 

**In general, a driver does the following steps:**

1. Connects to a websocket.
2. Subscribes to trade events for each market.
3. Starts reading trade events messages.
4. Parses the messages to return trade events.
5. Publishes trade events to the output.

**Trade event struct:**
```
type Event struct {
    ID        uint64
    Market    string
    Price     decimal.Decimal
    Amount    decimal.Decimal
    Total     decimal.Decimal
    TakerType TakerType
    CreatedAt int64
    Source    string
}
```
At the moment, you can choose between `OpenDAX` and `Cryptowatch` driver.
### Configuration

You can set driver configuration in `finex/config/finex.yaml` (hereinafter - `config file`), or by setting corresponding environment variables.

### Connection

By default, a driver reconnects every `5` seconds if it cannot read data from the connection. This period can be adjusted by setting the `period` value in `config file` or `FINEX_QUOTES_RECONNECT_PERIOD` variable.

# OpenDAX Driver

### Description

The OpenDAX driver is used to communicate with an OpenDAX websocket to receive trade events.

### Setup

- Set the `driver` to `opendax` and add websocket `url` in `config file`.

    ```
     quote_feed:
  		driver: opendax
  		url: wss://alpha.yellow.org/api/v1/finex/ws
    ```
- Or set these values to `FINEX_QUOTES_DRIVER` and `FINEX_QUOTES_URL` environment variables.

## Subscribing to markets

The driver goes through the list of markets, takes a currency pair for each market, generates a message with method `subscribe` and sends it to a websocket.

**Message example:**

```json
[1,42,"subscribe",["public",["eurusd.trades"]]]
```

**Response example:**

```json
[2,42,"subscribe",["public",["eurusd.trades"]]]
```

The response returns the list of **all** current subscriptions for the current connection after the subscription is performed.


## Receiving trade events

After subscribing, the driver starts reading from a websocket for trade events messages.

**Message example:**
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

These messages are parsed by the `parseOpendaxMsg()` method to return trade events. The events are published to the `outbox` and `output` channels.


# Cryptowatch Driver

### Description

[Cryptowatch](https://cryptowat.ch/home) offers a real-time WebSocket API for streaming normalized cryptocurrency market data. The Cryptowatch driver is used to receive trade events via cryptowatch websocket.

### Setup

1. Set the `driver` to `cryptowatch` in `config file` or to `FINEX_QUOTES_DRIVER` environment variable.

    ```
     quote_feed:
  		driver: cryptowatch
    ```
2. Set `FINEX_QUOTES_API_KEY` environment variable with your cryptowatch public key. You can get your cryptowatch key [here](https://cryptowat.ch/account/api-access).

At startup, the driver checks for the presence of the API key, as well as the authentication status.

## Subscribing to markets

The driver goes through the list of markets, takes the `marketID` for each market, generates a subscribe request  message and sends it to the websocket.

**Message structure:**

```
type SubscribeRequest struct {
	Subscriptions []Subscription `json:"subscriptions"`
}

type Subscription struct {
	StreamSubscription `json:"streamSubscription"`
}

type StreamSubscription struct {
	Resource string `json:"resource"`
}
```
**Composing a message:**
```
message := struct {
		Subscribe SubscribeRequest `json:"subscribe"`
	}{}
    
resource := fmt.Sprintf("instruments:%d:trades", marketID)
message.Subscribe.Subscriptions = append(message.Subscribe.Subscriptions, Subscription{StreamSubscription: StreamSubscription{Resource: resource}})
```


**Message example:**

```
{"subscribe":{"subscriptions":[{"streamSubscription":{"resource":"instruments:231:trades"}}]}}
```

## Receiving trade events

After subscribing, the driver starts reading from a websocket for trade events messages.

**Message structure:**
```
type Update struct {
	MarketUpdate struct {
		Market struct {
			ExchangeID     string `json:"exchangeId"`
			CurrencyPairId int    `json:"currencyPairId,string"`
		} `json:"market"`

		TradesUpdate struct {
			Trades []Trade `json:"trades"`
		} `json:"tradesUpdate"`
	} `json:"marketUpdate"`
}

type Trade struct {
	Timestamp     int64 `json:"timestamp,string"`
	TimestampNano int   `json:"timestampNano,string"`

	Price     string `json:"priceStr"`
	Amount    string `json:"amountStr"`
	OrderSide string `json:"orderSide"`
}
```

**Message example:**
```json
{"marketUpdate":{"market":{"exchangeId":"27","currencyPairId":"165","marketId":"588"},"tradesUpdate":{"trades":[{"externalId":"ETHUSDT:565914008","timestamp":"1638494140","timestampNano":"1638494140209000000","priceStr":"4520.37","amountStr":"0.0543","amountQuoteStr":"245.456091","orderSide":"BUYSIDE"},{"externalId":"ETHUSDT:565914009","timestamp":"1638494140","timestampNano":"1638494140239000000","priceStr":"4520.37","amountStr":"0.2365","amountQuoteStr":"1069.067505","orderSide":"BUYSIDE"}]}}}
```

These messages are parsed by the `parseCryptowatchMsg()` method to return trade events. The events are published to the `outbox` and `output` channels.


