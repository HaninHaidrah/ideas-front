const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const MONGO_URL =
  "mongodb+srv://haneen:07973923@cluster0.p1flg.mongodb.net/items?retryWrites=true&w=majority";

// mongodb://haneen:<password>@cluster0-shard-00-00.p1flg.mongodb.net:27017,cluster0-shard-00-01.p1flg.mongodb.net:27017,cluster0-shard-00-02.p1flg.mongodb.net:27017/?ssl=true&replicaSet=atlas-dbb0ir-shard-0&authSource=admin&retryWrites=true&w=majority
mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected");
});
const {
  getItem,
  createItem,
  updateItem,
  getOneItem,
} = require("./scr/controllers/item.controller");

app.get("/items", getItem);
app.get("/items/:productName", getOneItem);

app.post("/items", createItem);
app.put("/items/:Item_id", updateItem);

app.listen(PORT, () => {
  console.log(` app listening on port ${PORT}`);
});
