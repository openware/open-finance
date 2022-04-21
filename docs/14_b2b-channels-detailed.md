### State appData

| Field | Name                | Description                                                  |
| ----- | ------------------- | ------------------------------------------------------------ |
| bu    | Balance update      | Current state of the platforms balances respectively in each other platform. |
| oos   | Open orders summary | The sum of amounts in base and quote of all open open orders for both platforms, they can open orders in the other platform remote markets. |
| cl    | Collateral          | Collaterals locked by XLN for the current trading session.   |



In the following example we use "0xa" as platform A address and "0xb" as platform B address, platform A will buy 0.1 ETH for 200 USDC on platform B, both platforms will use a collateral from XLN of 0.011 BTC worth of 220 USDC.

1. Broker A provides valid signed lock to Broker B

   ```json
   {
     "cl": {
       // Collateral of platform A
       "0xa": [
           // [ETH mainnet, WBTC address, 0 WBTC available, 0.11 WBTC locked]
           ["0x1", "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", "0", "0.011"]
       ]
     }
   }
   ```

2. Broker B provides his lock to Broker A

   ```json
   {
     "cl": {
       // Collateral of platform A
       "0xa": [
           // [ETH mainnet, WBTC address, 0 WBTC available, 0.11 WBTC locked]
           ["0x1", "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", "0", "0.011"]
       ],
       // Collateral of platform B
       "0xb": [
           // [ETH mainnet, WBTC address, 0 WBTC available, 0.11 WBTC locked]
           ["0x1", "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", "0", "0.011"]
       ]
     }
   }
   ```

3. Broker A creates an order

   ```json
   {
     "cl": {
       // Collateral of platform A
       "0xa": [
           // [ETH mainnet, WBTC address, 0 WBTC available, 0.11 WBTC locked]
           ["0x1", "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", "0", "0.011"]
       ],
       // Collateral of platform B
       "0xb": [
           // [ETH mainnet, WBTC address, 0 WBTC available, 0.11 WBTC locked]
           ["0x1", "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", "0", "0.011"]
       ]
     },
     "oos": {
       // Summary of open orders of platform A on platform B "eth/usdc" market
       "0xb" : {
         "0xa" : {
           "eth/usdc": {"b": ["0.2", "100", "200", "150"]}
           // {"buy": [Average amount in base, Min price of orders, Max price of orders, Average amount in quote]}
         }
       }
     }
   }
   ```

4. Broker B matches the order

   ```json
   {
     "cl": {
       // Collateral of platform A
       "0xa": [
           // [ETH mainnet, WBTC address, 0 WBTC available, 0.11 WBTC locked]
           ["0x1", "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", "0", "0.011"]
       ],
       // Collateral of platform B
       "0xb": [
           // [ETH mainnet, WBTC address, 0 WBTC available, 0.11 WBTC locked]
           ["0x1", "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", "0", "0.011"]
       ]
     },
     "bu": {
       // Balance of platform A on platform B
       "0xb": {
         "0xa": [
           // [ETH mainnet, ETH (native) token, 0 ETH available, 0.1 ETH locked]
           ["0x1", "0x0", "0", "0.1"],
         ],
       },
       // Balance of platform B on platform A
       "0xa": {
         "0xb": [
           // [ETH mainnet, USDC address, 0 USDC available, 200 USDC locked]
           ["0x1", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0", "200"]
         ]
       }
     }
   }
   ```

5. Close the channel with isFinal state

With this final state each broker can release the collateral on XLN and claim his funds on chain from the other broker smart contract.



## Open Questions

- Can we avoid to commit state after every trade
  - Solution: Negotiate a big collateral between brokers so the settlement can be done on bigger period of time or when a broker needs the liquidity
- Dispute process needs to be designed