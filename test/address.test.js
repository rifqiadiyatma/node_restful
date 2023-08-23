import supertest from "supertest";
import { createManyTestContact, createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, removeAllTestAddresses, removeAllTestContacts, removeTestUser } from "./test-util";
import { web } from "../src/application/web";

describe('POST /api/contacts/:contactId/address', function() {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can create new address', async() => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "Jalan test",
        city: "Kota test",
        province: "Provinsi test",
        country: "Indonesia",
        postal_code: "123456"
      });
    
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('Jalan test');
    expect(result.body.data.city).toBe('Kota test');
    expect(result.body.data.province).toBe('Provinsi test');
    expect(result.body.data.country).toBe('Indonesia');
    expect(result.body.data.postal_code).toBe('123456');
  });

  it('should reject if bad request address', async() => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "Jalan test",
        city: "Kota test",
        province: "",
        country: "",
        postal_code: ""
      });
    
    expect(result.status).toBe(400);
  });

  it('should reject if contact is not found', async() => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post('/api/contacts/' + (testContact.id + 20) + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: "Jalan test",
        city: "Kota test",
        province: "Provinsi test",
        country: "Indonesia",
        postal_code: "123456"
      });
    
    expect(result.status).toBe(404);
  });
});

describe('GET /api/contacts/:contactId/address/:addressId', function() {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can create get address', async() => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');
    
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('Jalan test');
    expect(result.body.data.city).toBe('Kota test');
    expect(result.body.data.province).toBe('Provinsi test');
    expect(result.body.data.country).toBe('Indonesia');
    expect(result.body.data.postal_code).toBe('123456');
  });

  it('should reject if contact is not found', async() => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');
    
    expect(result.status).toBe(404);
  });

  it('should reject if address is not found', async() => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test');
    
    expect(result.status).toBe(404);
  });

});

describe('PUT /api/contacts/:contactId/addresses/:addressId', function() {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can update address', async() => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: "Jalan test Baru",
        city: "Kota test Baru",
        province: "Provinsi test Baru",
        country: "Indonesia Baru",
        postal_code: "1234567"
      });
    
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('Jalan test Baru');
    expect(result.body.data.city).toBe('Kota test Baru');
    expect(result.body.data.province).toBe('Provinsi test Baru');
    expect(result.body.data.country).toBe('Indonesia Baru');
    expect(result.body.data.postal_code).toBe('1234567');
  });

  it('should reject if request is not valid', async() => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: "Jalan test Baru",
        city: "Kota test Baru",
        province: "Provinsi test Baru",
        country: "",
        postal_code: ""
      });
    
    expect(result.status).toBe(400);
  });

  it('should reject if request is Address is not found', async() => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test')
      .send({
        street: "Jalan test Baru",
        city: "Kota test Baru",
        province: "Provinsi test Baru",
        country: "Indonesia Baru",
        postal_code: "1234567"
      });
    
    expect(result.status).toBe(404);
  });

  it('should reject if contact is not found', async() => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + (testContact.id + 1)+ '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: "Jalan test Baru",
        city: "Kota test Baru",
        province: "Provinsi test Baru",
        country: "Indonesia Baru",
        postal_code: "1234567"
      });
    
    expect(result.status).toBe(404);
  });

});

describe('DELETE /api/contacts/:contactId/addresses/:addressId', function() {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can delete address', async() => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');
    
    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });

  it('should reject if contact is not found', async () => {
      const testContact = await getTestContact();
      let testAddress = await getTestAddress();

      const result = await supertest(web)
        .delete('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
        .set('Authorization', 'test');

      expect(result.status).toBe(404);
  });

});

describe('GET /api/contacts/:contactId/addresses', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  })

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  })

  it('should can list addresses', async function () {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + "/addresses")
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });

  it('should reject if contact is not found', async function () {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/contacts/' + (testContact.id + 1) + "/addresses")
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});