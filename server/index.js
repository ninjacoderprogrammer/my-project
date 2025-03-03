const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employe");
const PORT = 3001;
const app = express();
app.use(express.json()); //Enables parsing of JSON request bodies.
app.use(cors());  //Enables CORS to allow cross-origin requests.

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;
    await EmployeeModel.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("user : ", user);

        res.json("User already exist for this email!!"); //If a user with the same email exists
      }
    });

    await EmployeeModel.create(req.body)
      .then((employees) => res.json(employees))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log("Error occured in register : ", error);
    res.status(500);
  }
});

app.post("/login", async (req, res) => {
  console.log("Req body : ", req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json("INVALID DATA!!");
    }
    await EmployeeModel.findOne({ email: email }).then((user) => {
      console.log("user : ", user);
      if (!user) {
        res.status(404).json("User doesn't Exist !!!");
      } else if (user.password != password) {
        res.status(401).json("Incorrect Password");
      } else {
        res.status(200).json("success");
      }
    });
  } catch (error) {
    console.log("Error Occured in Login : ", error);
    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log("server is running on : ", PORT);
});
