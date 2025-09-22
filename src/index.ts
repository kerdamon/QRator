import express, { type Request, type Response } from "express";
import { WORLD_CONSTANT } from "./world/constants.js";

const app = express();
const port = "3000";

app.get("/", (req: Request, res: Response) => {
  res.send(WORLD_CONSTANT);
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
