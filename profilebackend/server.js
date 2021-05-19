import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "./module/userSchima.js";

//App Config
dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 8000;
const connection_url = process.env.DATABASE;

app.use(cookieParser());
app.use(express.json());

//App MiddleWares

// Authentication  for about Page
const middleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User not Found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthrasied:No token Provided");
    console.log(err);
  }
};

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`connection sucessfull`);
  })
  .catch((err) => console.log(`no connection`));

//App EndPoints
app.get("/", (req, res) =>
  res.status(200).send("Hello world its Home page from app.js")
);

//----------Async-Await-----------------//

app.post("/register", async (req, res) => {
  const { name, email, phoneNo, work, password, conPassword } = req.body;
  if (!name || !email || !phoneNo || !work || !password || !conPassword) {
    return res.status(422).json({ error: "Please fill all the details" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User already Exist" });
    }
    const user = new User({
      name,
      email,
      phoneNo,
      work,
      password,
      conPassword,
    });

    //Password Saving

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: "User register Sucessfully" });
    } else {
      res.status(500).jason({ error: "Fail to register" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please Fill all the details first" });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) {
      //   return res.status(400).json({ error: "User Error" });
      const match = await bcrypt.compare(password, userLogin.password);

      //Authentication

      const token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!match) {
        res.status(400).json({ error: "Invalid Cridientials pass" });
      } else {
        res.json({ message: "User SignIn Sucessfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Cridientials mail" });
    }
  } catch (err) {
    console.log(err);
  }
});

//---------------Promises Format---------------//

// app.post("/register", (req, res) => {
//   const { name, email, phoneNo, work, password, conPassword } = req.body;
//   if (!name || !email || !phoneNo || !work || !password || !conPassword) {
//     return res.status(422).json({ error: "please fill the field prop[erly" });
//   }
//   User.findOne({ email: email })
//     .then((userExist) => {
//       // res.json({ message: req.body });
//       // res.send("mera register page");
//       if (userExist) {
//         return res.status(422).json({ error: "This ID is already register" });
//       }
//       const user = new User({
//         name,
//         email,
//         phoneNo,
//         work,
//         password,
//         conPassword,
//       });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered sucessfully" });
//         })
//         .catch((err) => res.status(500).json({ error: "Failed to Register" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/about", middleware, (req, res) => {
  res.send(req.rootUser);
});
app.get("/getdata", middleware, async (req, res) => {
  res.send(req.rootUser);
});
app.post("/contact", middleware, async (req, res) => {
  try {
    const { name, email, phoneNo, message } = req.body;

    if (!name || !email || !phoneNo || !message) {
      console.log("Error in contact form");
      return res.json({ error: "Please fill the contact Form" });
    }
    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phoneNo,
        message
      );
    }
    await userContact.save();
    res.status(201).json({ message: "User Contact Sucessfull" });
  } catch (error) {
    console.log(error);
  }
});
app.get("/signin", (req, res) =>
  res.status(200).send("Hello world its SignIn")
);
app.get("/signup", (req, res) =>
  res.status(200).send("Hello world its Singup")
);

// LogOut Page
app.get("/logout", (req, res) => {
  console.log(`hello logot page`);
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

//App Listener
app.listen(port, () => console.log(`listening on localhost:${port}`));
