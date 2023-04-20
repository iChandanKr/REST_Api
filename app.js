const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/userLogin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const schema = new mongoose.Schema({
  Name: {
    type: String,
    // required: true,
  },
  Age: {
    type: Number,
    // required:true
  },
  Email: {
    type: String,
    // required:true
  },
});

const user = mongoose.model("user", schema);
app.post("/post", (req, res) => {
  console.log("inside post fuction");
  const data = new user({
    Name: req.body.Name,
    Age: req.body.Age,
    Email: req.body.Email,
  });
  console.log(data);
  const value = data
    .save()
    .then((value) => {
    //   console.log(value);
      res.json(value);
    })
    .catch((err) => {
      console.log(err);
    });
  
});

app.get("/user-list", (req, res) => {
  const list = user
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/delete-users',(req,res)=>{
    user.deleteOne({Name:"Ajit"}).then(()=>{
        console.log("user is deleted");
    }).catch((err)=>{
        console.log(err);
    })
});

app.listen(3001, console.log("listening on port no 3000"));
