const  agent  = require("supertest");
const { mockCleaner } = require("./mocks/cleaners.mock");
const { describe, test, } = require("node:test")
const app = require("../../app");



describe("Endpoints: Cleaners", () => {
  test("should get all cleaners", async () => {
    await agent(app)
      .get(`/cleaners/cleaners`)
      .set("Content-Type", "application/json").expect(200);
  });
});