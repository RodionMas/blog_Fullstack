import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  loginValidator,
  postCreateValidator,
  registerValidator,
} from "./validations/validation.js";
import { validationResult } from "express-validator";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";
import checkAuth from "./utils/checkAuth.js";
import {
  create,
  getAll,
  getLastTags,
  getOne,
  remove,
  update,
} from "./Controllers/PostController.js";
import multer from "multer";
import cors from 'cors';
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.mvd0kfc.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log(err, "Ошибка");
  });

const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return req.status(404).json({
        message: "Неверный email",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Неверный email или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "tokenJWT",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...user._doc,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
});

app.post("/auth/register", registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "tokenJWT",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    // res.json(user);
    res.json({
      ...user._doc,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
});

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/auth/me", checkAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Такого пользователя не существует",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
});
app.get("/posts", getAll);
app.get("/posts/tags", getLastTags);
app.get("/posts/:id", getOne);
app.delete("/posts/:id", checkAuth, remove);
app.patch("/posts/:id", checkAuth, postCreateValidator, update);
app.post("/posts", checkAuth, postCreateValidator, create);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
