import { web } from "../src/application/web.js";
import { createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test-util.js";
import supertest from "supertest";

describe('POST /api/contacts', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can create new contact', async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set('Authorization', 'test')
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@gmail.com",
        phone: "0812121212"
      });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBeDefined();
      expect(result.body.data.first_name).toBe("test");
      expect(result.body.data.last_name).toBe("test");
      expect(result.body.data.email).toBe("test@gmail.com");
      expect(result.body.data.phone).toBe("0812121212");
  });

  it('should reject if request is not valid', async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set('Authorization', 'test')
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@gmail.com",
        phone: "0812121212321321321321321321321"
      });

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set('Authorization', 'test');

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBe(testContact.id);
      expect(result.body.data.first_name).toBe(testContact.first_name);
      expect(result.body.data.last_name).toBe(testContact.last_name);
      expect(result.body.data.email).toBe(testContact.email);
      expect(result.body.data.phone).toBe(testContact.phone);
  });

  it('should return 404 if contact is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + (testContact.id + 1))
      .set('Authorization', 'test');

      expect(result.status).toBe(404);
  });
});

describe('PUT /api/contacts/:contactId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can update existing contact', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set('Authorization', 'test')
      .send({
        first_name: "rifqi",
        last_name: "adiyatma",
        email: "rifqi@gmail.com",
        phone: "081212121"
      });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBe(testContact.id);
      expect(result.body.data.first_name).toBe('rifqi');
      expect(result.body.data.last_name).toBe('adiyatma');
      expect(result.body.data.email).toBe("rifqi@gmail.com");
      expect(result.body.data.phone).toBe("081212121");
  });

  it('should reject if request is invalid', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set('Authorization', 'test')
      .send({
        first_name: "",
        last_name: "",
        email: "aa",
        phone: ""
      });

      expect(result.status).toBe(400);
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + (testContact.id + 1))
      .set('Authorization', 'test')
      .send({
        first_name: "rifqi",
        last_name: "adiyatma",
        email: "rifqi@gmail.com",
        phone: "081212121"
      });

      expect(result.status).toBe(404);
  });
});

describe('DELETE /api/contacts/:contactId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can delete existing contact', async () => {
    let testContact = await getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it('should reject if contact is not found', async () => {
    let testContact = await getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + (testContact.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });

});