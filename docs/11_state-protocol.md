---
tags:
  - State Channels
  - Custody
  - Blockchain
  - web3
  - Signing
---

# State channels protocol

After login, server MUST keeps track of the end-user balance in an atomic and FIFO way, every time the balance is update the server must send a balance change event signed.

The Clients must perform a signature before sending additional orders.

Status: Draft

:exclamation: For discussion purposes only

### Request:

```json
[1, 42, "create_order", ["spot://wbtcusdt", "m", "sell", "0.100000", "1234567"]]
```

### Response:

```json
[2, 42, "create_order", ["5b2c0ea2-9363-11eb-adb6-1831bf9834b0"]]
// Later and asynchronously
signed([3, 43, "bal", {"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": [900.00, 100.00]}])
```

