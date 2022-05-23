const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ysodk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
        const productColloction = client.db('motorbike').collection('products');
        const bookingColloction = client.db('motorbike').collection('bookings');
        const userColloction = client.db('motorbike').collection('users');
        
        app.get('/product',async(req,res)=>{
            const query = {};
            const cursor = productColloction.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })

        app.put('/user/:email',async(req,res)={

        })

        //user dashbord
        app.get('/booking',async(req,res)=>{
          const parbooked = req.query.email;
          const query = {parbooked:parbooked}
          const parBooking = await bookingColloction.find(query).toArray()
          res.send(parBooking)
        })

        //booking post
        app.post('/booking',async(req,res)=>{
          const booking = req.body;
          const query ={bookingId: booking.service }
          const exixt = await bookingColloction.findOne(query)
          if(exixt){
            return res.send({success: false,booking:exixt})
          }
          const result = await bookingColloction.insertOne(booking);
          return res.send({success:true, result})
        })
    }
    finally{

    }

}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello motorbike')
})

app.listen(port, () => {
  console.log(`motorbike app listening on port ${port}`)
})