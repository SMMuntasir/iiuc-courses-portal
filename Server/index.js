const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// nodemon index.js

//middleware
app.use(cors());
app.use(express.json());

// {
//   origin:[
//     'http://localhost:5173',
//     'tutornest-fd03f.web.app',
//     'tutornest-fd03f.firebaseapp.com'
//   ],
//   credentials:true,
// }

//routes
app.get('/', (req, res) => {
  res.send('hi');
})




const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@mun322.bo9kg.mongodb.net/?retryWrites=true&w=majority&appName=Mun322`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("IIUC-Course").collection("Ass-11");
    const BookedTutors = client.db("IIUC-Course").collection("BookedTutors");

    app.get("/tutors", async (req, res) => {
      console.log(req.query.Language)
      if (req.query.Language) {
        const query = { language: req.query.Language };
        const result = await database.find(query).toArray();
        return res.send(result);
      }

      // If no query, fetch all tutors
      const result = await database.find().toArray();
      res.send(result);
    })

    app.get("/tutor/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await database.findOne(query);//
      // console.log(result);
      res.send(result);
    })

    app.post("/bookedTeacher", async (req, res) => {
      const data = req.body;
      const result = await BookedTutors.insertOne(data);
      res.send(result);
    })

    app.get("/myBookedTeacher", async (req, res) => {
      const cursor = req.query.email;
      const query = { bookedEmail: cursor };
      const result = await BookedTutors.find(query).toArray();
      // console.log(result);
      res.send(result);
    })
    app.get("/myTutorials", async (req, res) => {
      const cursor = req.query.email;
      const query = { email: cursor };
      const result = await database.find(query).toArray();
      // console.log(result);
      res.send(result);
    })
    // /find-tutors?Language=${searchS}

    app.post("/myTutorials", async (req, res) => {
      const data = req.body;
      const result = await database.insertOne(data);
      res.send(result);
    })

    app.delete("/myTutorials/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await database.deleteOne(query);
      res.send(result);
    })

    app.put("/myBookedTeacher", async (req, res) => {
      const cursor = req.query.email;
      const result = await database.updateOne(
        { email: cursor },
        { $inc: { reviews: 1 } }
      );
      res.send(result);
    })

    app.put("/UpdateTutorials/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const option = { upsert: true };
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: data.name,
          email: data.email,
          price: data.price,
          language: data.language,
          description: data.description,
          photoURL: data.photoURL,
            
        }
      };
      const result = await database.updateOne(query, update, option);
      res.send(result);
    })
    // app.get("/myTutorials")

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})