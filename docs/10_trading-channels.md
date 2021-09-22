---
tags:
  - Open Finance
  - Trading channels
---

# Trading channels

Trading channels are a specific implementation of state channels specifically designed for trading purposes. State channels are a technique for scaling blockchains by running most of the process off-chain and committing only the result to the blockchain. Every trading step is an off-chain transition from a state to an other, transitions are performed between the trader (client) and the broker (server). Each party sign each transition at every step. If both parties sign the final step, any of them can use this final state to withdraw the funds of the final balance.



## Approach 1: Simple Example (server initiative)

In this approach we leave the initiative of messages to the server, the client only acknowledge the messages. This way the server can immediately send trade notifications to the client. *Create Order* and *Finalize* requests are made by the client outside of the state channel protocol which brings the benefit of having the server to accept the order before the state is changed.


```mermaid
sequenceDiagram;
    Trader-->>Broker: Request setup
    Broker->>Trader: Setup
    Trader->>Broker: Setup ACK
    Trader-->>Broker: Create Order request
    Broker->>Trader: Create Order
    Trader->>Broker: Create Order ACK
    Broker->>Trader: Trade
    Trader->>Broker: Trade ACK
    Trader-->>Broker: Request Finalize
    Broker->>Trader: Finalize
    Trader->>Broker: Finalize ACK

```

## Approach 2: Simple Example (cooperative approach)

In this approach we add a translation method *Yield* which doesn't change the state but gives the opportunity to the other party to initiate a state transition. This way we can have some gain in performances by reducing the number of round trips of the trading session.

In this example the *Create Order* and *Finalize* transition is initiated directly by the Trader.


```mermaid
sequenceDiagram;
    Trader->>Broker: Setup
    Broker->>Trader: Setup ACK
    Trader->>Broker: Create Order
    Broker->>Trader: Create Order ACK
    Trader->>Broker: Yield
    Broker->>Trader: Trade
    Trader->>Broker: Trade ACK
    Broker->>Trader: Yield
    Trader->>Broker: Finalize
    Broker->>Trader: Finalize ACK

```


## State format

A state is a simple array containing the following elements:

```
[increment, balances, open_orders, outcomes]
```


| Element    | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| increment       | Number incrementing at every turn |
| balances | Available and locked balances of the trader |
| open_orders     | List of open orders of the trader |
| outcomes  | Result of the current outcomes for the trader and broker for this session |

### Increment

This number has to be incremented by one when a party issue a new state, by signing a new state the party implicitly validates the previous state issued by the other party.

### Balances

Balances define the current available funds available for trading, the user might be able to limit the amount of funds he wants to allocate to the current trading session.

:construction: We can probably store only the available balances, so when an order is created we reduce the amount of available balance according to this order (by the "locked" amount).:construction:

### Open orders

List of current open orders of the trader, the trader updates this list when he creates an order and the server when there is a trade.

### Outcomes

Represent the amount to be paid at the end of the trading session by the trader to the broker and the other way around.

Those outcomes can be used at some point for further trading, a trader could decide to buy a token at the beginning of the session and sell before the end the session, in this case the outcomes of the session would be the profits or losses.

## Native Multi-Blockchains support

The trading channel protocol is intended to be used over multiple blockchains. The trader can lock funds on one blockchains and request payment of the outcomes on an other one.

https://besu.hyperledger.org/en/stable/Concepts/NetworkID-And-ChainID/

We aim to support more than Ethereum layer 1 & 2 networks, so we can't just use Chain ID and Network ID who are just working for Ethereum layers.

The simplest option is to define the list of supported networks.

:construction: To be defined. :construction:



## Disputes

:construction: To be defined. :construction:



## Replay attack

Signed states are intended to be used on a specific exchange smart-contract on a specific blockchain.

:construction: Protection against replay attack must be defined :construction: