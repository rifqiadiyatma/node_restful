# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/address

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Nama Jalan",
  "city": "Kota",
  "province": "Provinsi",
  "country": "Negara",
  "postal_code": "Kode Pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Nama Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "Kode Pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/address/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Nama Jalan",
  "city": "Kota",
  "province": "Provinsi",
  "country": "Negara",
  "postal_code": "Kode Pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Nama Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "Kode Pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/address/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Nama Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "Kode Pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Address is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:contactId/address

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Nama Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "country": "Negara",
      "postal_code": "Kode Pos"
    },
    {
      "id": 2,
      "street": "Nama Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "country": "Negara",
      "postal_code": "Kode Pos"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/address/:addressId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Address is not found"
}
```
