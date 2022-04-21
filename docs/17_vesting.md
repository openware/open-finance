---
tags:
  - vesting
  - ICO
---

## IVesting





### Contents
<!-- START doctoc -->
<!-- END doctoc -->



### Functions

#### `addInvestor`

📋   &nbsp;&nbsp;
Add investor and receivable amount for future claiming

> Can be called only before vesting process starts. If called twice for the same investor, the second call overwrites the data


##### Declaration
```solidity
  function addInvestor(
    address investor,
    uint256 amount,
    uint256 iuPercent
  ) external
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`investor` | address | Address of investor
|`amount` | uint256 | Tokens amount which investor should receive in general
|`iuPercent` | uint256 | Which percent of tokens should be available immediately after vesting cliff (represented with 2 decimals: 1000 = 10.00%)

#### `addInvestors`

📋   &nbsp;&nbsp;
The same as addInvestor, but for multiple investors

> Provided arrays should have the same length


##### Declaration
```solidity
  function addInvestors(
    address[] investors,
    uint256[] amounts,
    uint256 iuPercent
  ) external
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`investors` | address[] | Array of investors
|`amounts` | uint256[] | Array of receivable amounts
|`iuPercent` | uint256 | Which percent of tokens should be available immediately after vesting cliff (represented with 2 decimals: 1000 = 10.00%)

#### `removeInvestor`

📋   &nbsp;&nbsp;
Remove investor



##### Declaration
```solidity
  function removeInvestor(
    address investor
  ) external
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`investor` | address | Address of investor

#### `claimIuTokens`

📋   &nbsp;&nbsp;
Claim Initial Unlock tokens immediately after vesting cliff

> Can be called once for each investor

##### Declaration
```solidity
  function claimIuTokens(
  ) external
```




#### `claimLockedTokens`

📋   &nbsp;&nbsp;
Claim locked tokens


##### Declaration
```solidity
  function claimLockedTokens(
  ) external
```




#### `getToPayTokens`

📋   &nbsp;&nbsp;
Get total amount of tokens this contract will pay investors after vesting is started

> NOTE: toPayTokens is not updated when tokens are transferred to investors


##### Declaration
```solidity
  function getToPayTokens(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | Total tokens
#### `getReleasableLockedTokens`

📋   &nbsp;&nbsp;
Get current available locked tokens



##### Declaration
```solidity
  function getReleasableLockedTokens(
    address investor
  ) external returns (uint256)
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`investor` | address | address

##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | Amount of tokens ready to be released
#### `getInvestorData`

📋   &nbsp;&nbsp;
Get investor data



##### Declaration
```solidity
  function getInvestorData(
    address investor
  ) external returns (uint256 iuAmount, uint256 releasedLockedTokens, uint256 totalLockedTokens)
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`investor` | address | address

##### Returns:
| Type | Description |
| --- | --- |
|`iuAmount` | uint256 Initial Unlock token amount
|`releasedLockedTokens` | uint256 Released tokens
|`totalLockedTokens` | uint256 Total locked tokens
#### `getStartTime`

📋   &nbsp;&nbsp;
Get vesting start time



##### Declaration
```solidity
  function getStartTime(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | start time in seconds from epoch
#### `getPeriodDays`

📋   &nbsp;&nbsp;
Get vesting period in days



##### Declaration
```solidity
  function getPeriodDays(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | vesting period in days
#### `getCliffDays`

📋   &nbsp;&nbsp;
Get vesting cliff in days



##### Declaration
```solidity
  function getCliffDays(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | vesting cliff in days
#### `getClaimingIntervalDays`

📋   &nbsp;&nbsp;
Get claiming interval in days



##### Declaration
```solidity
  function getClaimingIntervalDays(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | claiming interval in days


### Events

#### `TokensReceived`

📋   &nbsp;&nbsp;
An investor received tokens


  

##### Params:
| Param | Type | Indexed | Description |
| --- | --- | :---: | --- |
|`investor` | address |  | Address of investor, who received tokens
|`amount` | uint256 |  | Amount of tokens received
|`isLockedTokens` | bool |  | Whether received tokens were locked- or iu-tokens
## Vesting


Vesting smart contract allows to grand investors their tokens gradually during some period of time.
Before vesting starts, an admin must verify that Vesting smart contract has enough tokens on vesting token (ERC20) balance.
Tokens can be claimed whenever convenient, though new tokens are released once per specified *Claiming interval*. Thus, there would be no available tokens right after previous claiming.
Vesting process is linear, meaning that for equal periods of time investors will receive equal amount of tokens (except for vesting cliff).
During *Vesting cliff* no tokens are released. E.g. for 10 days vesting cliff, investors can receive their tokens on 11th day.
*Initial Unlock (IU) tokens* are tokens granted to investors right after cliff date.
*Claiming interval* is a time frequency when users can claim their tokens. If interval is equal 30 days, new tokens will be released and available for claiming every 30 days after cliff date.

To deploy a contract one need to specify address of ERC20 token, which will be vested, vesting start (seconds since epoch time),
vesting period (in days), vesting cliff (in days) and claiming interval (in days).
To add an investor an admin must specify their address, vesting token amount and percentage of IU tokens of that amount.

NOTE: Investors can be added only before vesting starts.
NOTE: Contract is upgradeable to ensure if any security issues are found, they can be patched right away.


### Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Globals](#globals)
- [Functions](#functions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Globals


| Var | Type | Description |
| --- | --- | --- |
| start | uint256 |  |
| end | uint256 |  |
| periodDays | uint256 |  |
| cliffDate | uint256 |  |
| claimingIntervalDays | uint256 |  |
| toPayTokens | uint256 |  |
| RATE_BASE | uint256 |  |
| token | contract IERC20 |  |
| _investors | mapping(address => struct Vesting.Investor) |  |


### Functions

#### `initialize`

📋   &nbsp;&nbsp;
initialize function to support upgrading


##### Declaration
```solidity
  function initialize(
  ) public initializer
```

##### Modifiers:
| Modifier |
| --- |
| initializer |



#### `addInvestor`

📋   &nbsp;&nbsp;
Add investor and receivable amount for future claiming

> Can be called only before vesting process starts. If called twice for the same investor, the second call overwrites the data


##### Declaration
```solidity
  function addInvestor(
    address investor,
    uint256 amount,
    uint256 iuPercent
  ) public onlyOwner
```

##### Modifiers:
| Modifier |
| --- |
| onlyOwner |

##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`investor` | address | Address of investor
|`amount` | uint256 | Tokens amount which investor should receive in general
|`iuPercent` | uint256 | Which percent of tokens should be available immediately after vesting cliff (represented with 2 decimals: 1000 = 10.00%)

#### `addInvestors`

📋   &nbsp;&nbsp;
The same as addInvestor, but for multiple investors

> Provided arrays should have the same length


##### Declaration
```solidity
  function addInvestors(
    address[] investors,
    uint256[] amounts,
    uint256 iuPercent
  ) external onlyOwner
```

##### Modifiers:
| Modifier |
| --- |
| onlyOwner |

##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`investors` | address[] | Array of investors
|`amounts` | uint256[] | Array of receivable amounts
|`iuPercent` | uint256 | Which percent of tokens should be available immediately after vesting cliff (represented with 2 decimals: 1000 = 10.00%)

#### `removeInvestor`

📋   &nbsp;&nbsp;
Remove investor



##### Declaration
```solidity
  function removeInvestor(
    address investor
  ) public onlyOwner
```

##### Modifiers:
| Modifier |
| --- |
| onlyOwner |

##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`investor` | address | Address of investor

#### `claimIuTokens`

📋   &nbsp;&nbsp;
Claim Initial Unlock tokens immediately after vesting cliff

> Can be called once for each investor

##### Declaration
```solidity
  function claimIuTokens(
  ) external
```




#### `claimLockedTokens`

📋   &nbsp;&nbsp;
Claim locked tokens


##### Declaration
```solidity
  function claimLockedTokens(
  ) external
```




#### `getToPayTokens`

📋   &nbsp;&nbsp;
Get total amount of tokens this contract will pay investors after vesting is started

> NOTE: toPayTokens is not updated when tokens are transferred to investors


##### Declaration
```solidity
  function getToPayTokens(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | Total tokens
#### `getReleasableLockedTokens`

📋   &nbsp;&nbsp;
Get current available locked tokens



##### Declaration
```solidity
  function getReleasableLockedTokens(
    address investor
  ) external returns (uint256)
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`investor` | address | address

##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | Amount of tokens ready to be released
#### `getInvestorData`

📋   &nbsp;&nbsp;
Get investor data



##### Declaration
```solidity
  function getInvestorData(
    address investor
  ) external returns (uint256 iuAmount, uint256 releasedLockedTokens, uint256 totalLockedTokens)
```


##### Args:
| Arg | Type | Description |
| --- | --- | --- |
|`investor` | address | address

##### Returns:
| Type | Description |
| --- | --- |
|`iuAmount` | uint256 Initial Unlock token amount
|`releasedLockedTokens` | uint256 Released tokens
|`totalLockedTokens` | uint256 Total locked tokens
#### `getStartTime`

📋   &nbsp;&nbsp;
Get vesting start time



##### Declaration
```solidity
  function getStartTime(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | start time in seconds from epoch
#### `getPeriodDays`

📋   &nbsp;&nbsp;
Get vesting period in days



##### Declaration
```solidity
  function getPeriodDays(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | vesting pedion in days
#### `getCliffDays`

📋   &nbsp;&nbsp;
Get vesting cliff in days



##### Declaration
```solidity
  function getCliffDays(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | vesting cliff in days
#### `getClaimingIntervalDays`

📋   &nbsp;&nbsp;
Get claiming interval in days



##### Declaration
```solidity
  function getClaimingIntervalDays(
  ) external returns (uint256)
```



##### Returns:
| Type | Description |
| --- | --- |
|`uint256` | claiming interval in days


