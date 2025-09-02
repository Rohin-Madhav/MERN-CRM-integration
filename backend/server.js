require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const crmRoutes = require("./routes/crmRoutes")

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api",crmRoutes);


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  next(err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running:${PORT}`);
});
