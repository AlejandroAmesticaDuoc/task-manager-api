const express = require("express");
const taskRoutes = require("./routes/task.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Task Manager API running on port ${PORT}`);
  });
}

module.exports = app;
