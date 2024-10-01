import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.options('*', cors());

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Webservice is listening on port ${PORT}`);
});
