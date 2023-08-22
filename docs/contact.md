# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :
-Authorization : token

Request Body :

```json
{
  "first_name": "rifqi",
  "last_name": "adiyatma",
  "email": "rifqia@gmail.com",
  "phone": "0812121212"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "rifqi",
    "last_name": "adiyatma",
    "email": "rifqia@gmail.com",
    "phone": "0812121212"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :
-Authorization : token

Request Body :

```json
{
  "first_name": "rifqi new",
  "last_name": "adiyatma new",
  "email": "rifqia@gmail.com",
  "phone": "0812121212"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "rifqi new",
    "last_name": "adiyatma new",
    "email": "rifqia@gmail.com",
    "phone": "0812121212"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :
-Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "rifqi new",
    "last_name": "adiyatma new",
    "email": "rifqia@gmail.com",
    "phone": "0812121212"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :
-Authorization : token

Query Params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : Number of page, default 1
- size : Size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "rifqi new",
      "last_name": "adiyatma new",
      "email": "rifqia@gmail.com",
      "phone": "0812121212"
    },
    {
      "id": 2,
      "first_name": "rifqi new",
      "last_name": "adiyatma new",
      "email": "rifqia@gmail.com",
      "phone": "0812121212"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :
-Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```
