---
tags:
  - Open Finance
  - Authentication
  - HMAC
  - JWT
---
# Authentication

Any symmetric and asymmetric JWT authentication mechanism can be used over SSL.

## Payload

```json
{ 
    iat: 1565687278,								// Timestamp when JWT is issued
    exp: 1565693278,								// Timestamp of expiration
    sub: 'session',									// Session topic
    iss: 'opendax',									// Identity provider service name
    aud: [ 'finex', 'supabase' ],					// Service which can consume JWT
    jti: 'QT4fwpMeJf36',							// Random string for logout
    uid: '8bc0231b-bcda-4898-b14f-ba81ca2c253a',	// Unique ID for user
    // -------------------- All part below are optional --------------------
    email: 'admin@barong.io',						// User email
    role: 'trader',									// User role
    level: 3,										// KYC level
    state: 'active',								// Database Status
}
```

## Shared secret Authentication

HMAC is a standard mechanism used for authentication on API servers. It uses a shared secret to generate a token for every request.

## Asymmetric key Authentication
A preferred method for security reasons.

RSA or EC is an asymmetric signature mechanism, it allows each peer to generate a secret privately and sign messages without sharing any secret.

