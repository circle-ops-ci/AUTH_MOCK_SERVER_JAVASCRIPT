<a name="table-of-contents"></a>
## Table of contents

- [Get Started](#get-started)
- [AUTH API](#auth-api)
- Testing
	- [Mock Server](#mock-server)
	- [CURL Testing Commands](#curl-testing-commands)
	- [Other Language Versions](#other-language-versions)

<a name="get-started"></a>
# Get Started

- Get API code and API secret on web admin console
- Refer to [mock server](#mock-server) sample code 

<a name="auth-api"></a>
# AUTH API
Refer to [here](https://github.com/CYBAVO/AUTH_MOCK_SERVER#register-new-user) for detailed API documentation.


<a name="mock-server"></a>
# Mock Server

## Setup Configuration
>	Set following configuration in mockserver.app.conf
>> Require API code and API secret on web admin console

```
"api_server_url": "BACKEND_SERVER_URL",
"api_code": "SERVICE_API_CODE",
"api_secret": "SERVICE_API_SECRET"
```

## Register mock server URL
>	Operate on web admin console

Callback URL

```
http://localhost:8892/v1/mock/callback
```

## How to compile
- Execute
	- npm install
	- npm start

> Required version: node v10.19.0 or later (npm v6.13.4 or later)

<a name="curl-testing-commands"></a>
## CURL Testing Commands

Refer to [here](https://github.com/CYBAVO/AUTH_MOCK_SERVER#curl-testing-commands) for curl testing commands.

<a name="other-language-versions"></a>
## Other Language Versions
- [GO](https://github.com/CYBAVO/AUTH_MOCK_SERVER)
- [PHP](https://github.com/CYBAVO/AUTH_MOCK_SERVER_PHP)


