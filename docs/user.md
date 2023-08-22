# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "rifqi",
  "password": "rahasia",
  "name": "rifqi a"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "rifqi",
    "name": "rifqi a"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpont : POST /api/users/login

Request Body :

```json
{
  "username": "rifqi",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or password wrong"
}
```

## Update User API

Request Body : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "rifqi a new",
  "password": "new password"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "rifqi",
    "name": "rifqi a new"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "rifqi",
    "name": "rifqi a"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : Delete /api/users/logout

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
