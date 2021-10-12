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
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Functions](#functions)
- [Events](#events)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



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

## SimpleVault


Custody smart contracts aim to provide a secure trading environment by holding the assets on the erc20 chain so that the user and broker can freely trade off-chain.


### Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Globals](#globals)
- [Modifiers](#modifiers)
- [Functions](#functions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Globals


| Var | Type | Description |
| --- | --- | --- |
| BROKER_ROLE | bytes32 | Broker role identifier value |
| WITHDRAW_TYPE | bytes32 | Withdrawal type identifier value |

### Modifiers

#### `onlyValidMovingFundParams`

📋   &nbsp;&nbsp;
Modifier to check information required for deposits and withdrawals.



##### Declaration
```solidity
  modifier onlyValidMovingFundParams(
    address account
  )
```

##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`account` | address | Account address to check

### Functions

#### `initialize`

📋   &nbsp;&nbsp;
The constructor function sets the contract name and broker's address.



##### Declaration
```solidity
  function initialize(
    string name_,
    address broker_
  ) public initializer
```

##### Modifiers:
| Modifier |
| --- |
| initializer |

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
Deposit the asset with given amount into custody



##### Declaration
```solidity
  function deposit(
    address asset,
    uint256 amount
  ) public returns (bool)
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`asset` | address | Asset address to deposit
|`amount` | uint256 | Quantity of assets to be deposited

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
    address asset,
    uint256 amount
  ) internal onlyValidMovingFundParams returns (bool)
```

##### Modifiers:
| Modifier |
| --- |
| onlyValidMovingFundParams |

##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`account` | address | Account address
|`asset` | address | Asset address to deposit
|`amount` | uint256 | Quantity of assets to be deposited

##### Returns:
| Type | Description |
| --- | --- |
|`bool` | Return 'true' when deposited
#### `withdraw`

📋   &nbsp;&nbsp;
Withdraw the asset with given payload to the caller



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
|`payload` | bytes | Withdrawal payload consists of rid (unique identifier id), deadline, destination, and the list of withdrawal asset and amount
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
  ) internal onlyValidMovingFundParams returns (bool)
```

##### Modifiers:
| Modifier |
| --- |
| onlyValidMovingFundParams |

##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`account` | address | Account address
|`payload` | bytes | Withdrawal payload consists of rid (unique identifier id), deadline, destination, and the list of withdrawal asset and amount
|`signature` | bytes | Broker signature

##### Returns:
| Type | Description |
| --- | --- |
|`bool` | Return 'true' when withdrawn
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




