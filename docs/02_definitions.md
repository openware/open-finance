---
title: Get started
tags:
  - Open Finance
---
# General definitions

The protocol is aimed to be used through web-socket but is not limited to it, any bi-directional communication protocol can be used to implement this standard.

Every event is formatted in a JSON array like the following:

```
[type, request_id, method, arguments]
```

| Element    | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| type       | This element identifies the type of the event (see the table below) |
| request_id | This is a request ID set by the client to identify the request and the corresponding response. It must be an unsigned integer. It's absent for events. |
| method     | method name to be called                                     |
| arguments  | list of arguments for the method                             |

## Types of messages

| Type ID | Short description |
| ------- | ----------------- |
| 1       | Request           |
| 2       | Response          |
| 3       | Public event      |
| 4       | Private event     |

## Numerical values

Because precision in finance matters very much the **Float type must not be used**, it's an approximate data type which mean values are round up. **Decimal or String representation** should be preferred. A common practice is to use Decimal type inside independent systems and String for communication between systems. This is why every numerical values which matters in this protocol is stored in a string.

## Units of time definition

|   unit | symbol |
| -----: | :----- |
| second | s      |
| minute | m      |
|   hour | h      |
|    day | d      |
|   week | w      |
|  month | M      |
|   year | y      |

The biggest unit of time possible must be chosen to represent a time period.

For example `5m` must be chosen instead of `300s`.
