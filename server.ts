import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/router";

dotenv.config({ path: ".env.dev" });

const PORT = process.env.PORT || 6525;

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, (e?: Error) => {
  if (e) {
    console.error(`Failed to start server:`, e.message);
    process.exit(1);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

export default app;
