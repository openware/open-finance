# Trading protocol with state channels

Open Finance use the JWT encoding for exchanging signed payload using ES256

Status: Draft

:exclamation: For discussion purposes only

### Request:

Encoded:

```
eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.WzEsNDIsImNyZWF0ZV9vcmRlciIsWyJzcG90Oi8vd2J0Y3VzZHQiLCJtIiwic2VsbCIsIjAuMTAwMDAwIiwiMTIzNDU2NyJdXQ.5loqiXkMd9nM_69chZl5xr9bHP93HjLYMnRSMVfqfspff-pHErfZT9mGYwvwe5lRTpvB3HWCVXW4NpB8ROv62Q
```

Header

```json
{
  "alg": "ES256",
  "typ": "JWT"
}
```

Payload

```json
[1, 42, "create_order", ["spot://wbtcusdt", "m", "sell", "0.100000", "1234567"]]
```

### Response:

```json
[2, 42, "create_order", ["5b2c0ea2-9363-11eb-adb6-1831bf9834b0", 0.90, 0.10]]
```

## 

