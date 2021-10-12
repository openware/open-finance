---
tags:
  - Open Finance
---
# Limits Request

Limits describe a way to communicate the trading limits of a counterpart that has an account at the clearinghouse. The platform can subscribe to the spending limit of customers who are connected through the clearinghouse.

Request for limits consists only of "UID" arguments. 
### Example of "**get_limits**" request:

```
[1,42,"get_limits",["ID9DA24A1CE5", "ID2CA21D41A9", "ID5BA21D4C6B"...]
```

The *arguments* part of the response contains nested arrays representing the account's limits. Each array in the arguments section contains detailed information about one account and its limits.

|  №   | Name        | Data type |    Example     |
| :--: | ----------- | :-------: | :------------: |
|  1   | uid         |  string   | "ID5BA21D4CE5" |
|  2   | status      |  string   |    "active"    |
|  3   | timestamp   |  integer  | 1588678984376  |
|  4   | instruments |  integer  |       2        |
|  5   | instrument  |  string   |   "BTC/USD"    |
|  6   | maxBuy      |  string   |      "250"     |
|  7   | maxSell     |  string   |      "100"     |

### Example of **get_limits** response:

```
[2,42,"get_limits",[["ID5BA21D4CE5", "active", 1588678984376, 2, "BTC/USD", "250", "100", "ETH/USD", "620", "285"], [...], [...]]
```

