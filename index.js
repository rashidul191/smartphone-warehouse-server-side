const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yemf5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const productCollection = client.db("smartPhone").collection("product");

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });

    // real/load all date Get method
    app.get("/product", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = productCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });

    // read/load single date get method
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });

    // single date database post method
    app.post("/product", async (req, res) => {
      const addNewProduct = req.body;
      const result = await productCollection.insertOne(addNewProduct);
      res.send(result);
    });

    // DELETE single data form database
    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    // UPDATE quantity
    app.put("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const quantity = req.body.quantity;
      const updateDoc = {
        $set: {
          quantity: quantity,
        },
      };
      const result = await productCollection.updateOne(query, updateDoc);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// get response server
app.get("/", (req, res) => {
  res.send("Smart-Phone Warehouse Running server side");
});

// listen port
app.listen(port, () => {
  console.log("listen port: ", port);
});
