import path from "path";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";




const app = express();
app.use(corsMiddleware);
app.use(express.json());

const __dirname = path.resolve();

connectDB();
app.use("/api/users", userRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server started in production mode on port 8000`);
});

