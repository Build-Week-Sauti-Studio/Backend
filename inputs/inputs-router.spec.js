const server = require("../api/server.js");
const request = require("supertest");

describe("inputs router", () => {
  it("should return status 401 without auth", async () => {
    const res = await request(server).get("/api/inputs");

    expect(res.status).toBe(401);
  });

  it("should be a json response", async () => {
    const res = await request(server).get("/api/inputs");

    expect(res.type).toBe("application/json");
  });

  it("should return status 404 without exsisting id", async () => {
    const res = await request(server).get("/api/inputs/:id");

    expect(res.type).toBe("application/json");
  });
  it("should be a json response", async () => {
    const res = await request(server).post("/api/inputs/");

    expect(res.type).toBe("application/json");
  });

  it("should return status 404 without exsisting id", async () => {
    const res = await request(server).post("/api/inputs/:id");

    expect(res.type).toBe("application/json");
  });

  it("should return status 404 without exsisting id", async () => {
    const res = await request(server).put("/api/inputs/:id");

    expect(res.type).toBe("application/json");
  });

  it("should return status 404 without exsisting id", async () => {
    const res = await request(server).delete("/api/inputs/:id");

    expect(res.type).toBe("application/json");
  });
});
