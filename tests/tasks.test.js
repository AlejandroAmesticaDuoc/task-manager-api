const request = require("supertest");
const app = require("../src/app");
const TaskModel = require("../src/models/task.model");

beforeEach(() => {
  TaskModel.reset();
});

describe("GET /health", () => {
  it("should return status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("POST /api/tasks", () => {
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test task", description: "A test" });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe("Test task");
    expect(res.body.data.id).toBe(1);
  });

  it("should return 400 if title is missing", async () => {
    const res = await request(app).post("/api/tasks").send({ description: "No title" });
    expect(res.statusCode).toBe(400);
  });
});

describe("GET /api/tasks", () => {
  it("should return empty array initially", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it("should return all tasks", async () => {
    await request(app).post("/api/tasks").send({ title: "Task 1" });
    await request(app).post("/api/tasks").send({ title: "Task 2" });
    const res = await request(app).get("/api/tasks");
    expect(res.body.data).toHaveLength(2);
  });
});

describe("GET /api/tasks/:id", () => {
  it("should return a task by id", async () => {
    await request(app).post("/api/tasks").send({ title: "Find me" });
    const res = await request(app).get("/api/tasks/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("Find me");
  });

  it("should return 404 for non-existent task", async () => {
    const res = await request(app).get("/api/tasks/999");
    expect(res.statusCode).toBe(404);
  });
});

describe("PUT /api/tasks/:id", () => {
  it("should update a task", async () => {
    await request(app).post("/api/tasks").send({ title: "Old title" });
    const res = await request(app)
      .put("/api/tasks/1")
      .send({ title: "New title", status: "completed" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("New title");
    expect(res.body.data.status).toBe("completed");
  });
});

describe("DELETE /api/tasks/:id", () => {
  it("should delete a task", async () => {
    await request(app).post("/api/tasks").send({ title: "Delete me" });
    const res = await request(app).delete("/api/tasks/1");
    expect(res.statusCode).toBe(200);
    const check = await request(app).get("/api/tasks/1");
    expect(check.statusCode).toBe(404);
  });
});
