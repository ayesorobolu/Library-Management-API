import express from "express";
import { logger } from "./middlewares/logger.js";
import { responseFormatter } from "./middlewares/responseFormatter.js";
import bookRouter from "./routes/bookRoutes.js";
import authorRouter from "./routes/authorRoutes.js";
import borrowRouter from "./routes/borrowRoutes.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(logger);
app.use(responseFormatter);

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Library API", 
    version: "1.0.0",
    endpoints: "/api/books, /api/authors, /api/borrows"
  });
});

app.use("/api/books", bookRouter);
app.use("/api/authors", authorRouter)
app.use("/api/borrows", borrowRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}) 