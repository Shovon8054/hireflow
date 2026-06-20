import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("HireFlow API Running");
});

export default app;