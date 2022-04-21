---
tags:
  - custody
  - state-channels
  - cross-chain
---

# Custody

## What is Custody?

In our project, we allow user to connect their Metamask wallet onto our platform, providing them a more secure environment for their assets. Users can then deposit funds onto the custody wallet. This deposit to the custody wallet will then open a state channel off-chain. By following nitro protocols on the state channel, we can then have instant finality to user balances after each transaction. This allows the user to have locked balances and make partial/full withdrawals from the custody wallet, back to the Metamask.

# Smart Contracts

## IVault


IVault is the interface to implement custody


### Contents
<!-- START doctoc -->
<!-- END doctoc -->



### Functions

#### `getLastId`

📋   &nbsp;&nbsp;
Get last ledger id (deposits and withdrawals id).



##### Declaration
```solidity
  function getLastId(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | Ledger id.


### Events

#### `Deposited`

📋   &nbsp;&nbsp;
Deposited event


  

##### Params:
| Param | Type | Indexed | Description |
| --- | --- | :---: | --- |
|`id` | uint256 | :white_check_mark: | Ledger id
|`account` | address | :white_check_mark: | Account address
|`asset` | address | :white_check_mark: | Asset address to deposit
|`amount` | uint256 |  | Quantity of assets to be deposited
|`rid` | bytes32 |  | Request id from broker
#### `Withdrawn`

📋   &nbsp;&nbsp;
Withdrawn event


  

##### Params:
| Param | Type | Indexed | Description |
| --- | --- | :---: | --- |
|`id` | uint256 | :white_check_mark: | Ledger id
|`account` | address | :white_check_mark: | Account address
|`asset` | address | :white_check_mark: | Asset address to deposit
|`amount` | uint256 |  | Quantity of assets to be deposited
|`rid` | bytes32 |  | Request id from broker
## SimpleVault


Custody smart contracts aim to provide a secure trading environment by holding
the assets on the erc20 chain so that the user and broker can freely trade off-chain.


### Contents
<!-- START doctoc -->
<!-- END doctoc -->

### Globals


| Var | Type | Description |
| --- | --- | --- |
| BROKER_ROLE | bytes32 | Broker role identifier value |
| DEPOSIT_TYPE | bytes32 | Deposit type identifier value |
| WITHDRAW_TYPE | bytes32 | Withdrawal type identifier value |

### Modifiers

#### `onlyValidSignature`

📋   &nbsp;&nbsp;
Modifier to check information required for deposits and withdrawals.



##### Declaration
```solidity
  modifier onlyValidSignature(
    address account,
    bytes32 action,
    bytes payload,
    bytes signature
  )
```

##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`account` | address | Account address to check
|`action` | bytes32 | Action type. One of DEPOSIT_TYPE and WITHDRAW_TYPE
|`payload` | bytes | Payload consists of rid (unique identifier id), expire, destination, and the assets list with amount
|`signature` | bytes | Broker signature

### Functions

#### `constructor`

📋   &nbsp;&nbsp;
The constructor function sets the contract name and broker's address.



##### Declaration
```solidity
  function constructor(
    string name_,
    address broker_
  ) public
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`name_` | string | Contract name
|`broker_` | address | Broker name

#### `name`

📋   &nbsp;&nbsp;
Get contract name.



##### Declaration
```solidity
  function name(
  ) public returns (string)
```



##### Returns:
| Type | Description |
| --- | --- |
|`string` | Contract name
#### `changeBroker`

📋   &nbsp;&nbsp;
Change broker address who signed the withdrawal signature.



##### Declaration
```solidity
  function changeBroker(
    address newBroker
  ) external onlyRole
```

##### Modifiers:
| Modifier |
| --- |
| onlyRole |

##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`newBroker` | address | Broker address

#### `getLastId`

📋   &nbsp;&nbsp;
Get last ledger id (deposits and withdrawals id).



##### Declaration
```solidity
  function getLastId(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | Ledger id.
#### `deposit`

📋   &nbsp;&nbsp;
Deposit the assets with given payload from the caller



##### Declaration
```solidity
  function deposit(
    bytes payload,
    bytes signature
  ) public returns (bool)
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`payload` | bytes | Deposit payload consists of rid (unique identifier id), expire, destination, and the list of deposit asset and amount
|`signature` | bytes | Broker signature

##### Returns:
| Type | Description |
| --- | --- |
|`bool` | Return 'true' when deposited
#### `_deposit`

📋   &nbsp;&nbsp;
Internal deposit process and increment ledger id



##### Declaration
```solidity
  function _deposit(
    address account,
    bytes payload,
    bytes signature
  ) internal onlyValidSignature returns (bool)
```

##### Modifiers:
| Modifier |
| --- |
| onlyValidSignature |

##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`account` | address | Account address
|`payload` | bytes | Deposit payload consists of rid (unique identifier id), expire, destination, and the list of deposit asset and amount
|`signature` | bytes | Broker signature

##### Returns:
| Type | Description |
| --- | --- |
|`bool` | Return 'true' when deposited
#### `withdraw`

📋   &nbsp;&nbsp;
Withdraw the assets with given payload to the caller



##### Declaration
```solidity
  function withdraw(
    bytes payload,
    bytes signature
  ) public returns (bool)
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`payload` | bytes | Withdrawal payload consists of rid (unique identifier id), expire, destination, and the list of withdrawal asset and amount
|`signature` | bytes | Broker signature

##### Returns:
| Type | Description |
| --- | --- |
|`bool` | Return 'true' when withdrawn
#### `_withdraw`

📋   &nbsp;&nbsp;
Internal withdraw process and increment ledger id



##### Declaration
```solidity
  function _withdraw(
    address account,
    bytes payload,
    bytes signature
  ) internal onlyValidSignature returns (bool)
```

##### Modifiers:
| Modifier |
| --- |
| onlyValidSignature |

##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`account` | address | Account address
|`payload` | bytes | Withdrawal payload consists of rid (unique identifier id), expire, destination, and the list of withdrawal asset and amount
|`signature` | bytes | Broker signature

##### Returns:
| Type | Description |
| --- | --- |
|`bool` | Return 'true' when withdrawn
#### `_extractPayload`

📋   &nbsp;&nbsp;
Internal function to extract payload data



##### Declaration
```solidity
  function _extractPayload(
    address account,
    bytes32 sigHash,
    bytes payload
  ) internal returns (bytes32, uint64, address, struct SimpleVault.Asset[])
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`account` | address | Account address
|`sigHash` | bytes32 | Broker signature keccak256 hash
|`payload` | bytes | Payload consists of rid (unique identifier id), expire, destination, and the assets list with amount

##### Returns:
| Type | Description |
| --- | --- |
|`bytes32` | rid
|`uint64` | expire
|`address` | destination
|`Asset` | Array of assets
#### `_transferAssetFrom`

📋   &nbsp;&nbsp;
Transfers the given amount of this AssetHolders's asset type from a supplied ethereum address.



##### Declaration
```solidity
  function _transferAssetFrom(
    address asset,
    address from,
    uint256 amount
  ) internal
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`asset` | address | Asset address to transfer
|`from` | address | Ethereum address to be credited
|`amount` | uint256 | Quantity of assets to be transferred

#### `_transferAssetTo`

📋   &nbsp;&nbsp;
Transfers the given amount of this AssetHolders's asset type to a supplied ethereum address.



##### Declaration
```solidity
  function _transferAssetTo(
    address asset,
    address destination,
    uint256 amount
  ) internal
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`asset` | address | Asset address to transfer
|`destination` | address | Ethereum address to be credited
|`amount` | uint256 | Quantity of assets to be transferred



