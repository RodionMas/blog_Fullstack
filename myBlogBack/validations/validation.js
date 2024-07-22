import { body } from "express-validator";

export const loginValidator = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть больше 5 символов").isLength({ min: 5 }),
];

export const registerValidator = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть больше 5 символов").isLength({ min: 5 }),
  body("fullName", "Поле имя должно быть больше 2 символов").isLength({ min: 2 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const postCreateValidator = [
  body("title", "Введите заголовок статьи").isLength({ min: 2 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 2 }).isString(),
  body("tags", "Неверный формат тегов(укажите массив)").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
