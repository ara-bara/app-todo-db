import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Завантажуємо змінні середовища

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Дозволяє запити з фронтенду
app.use(express.json()); // Обробка JSON у запитах

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("✅ Підключено до MongoDB"))
   .catch(err => console.error("❌ Помилка підключення до MongoDB:", err.message));

// Стандартний маршрут
app.get('/', (req, res) => {
   res.send('Сервер працює!');
});

// Простий приклад користувацької моделі (збереження у БД)
const UserSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Реєстрація
app.post('/register', async (req, res) => {
   try {
      const { username, password } = req.body;

      if (!username || !password) {
         return res.status(400).json({ message: "Заповніть всі поля" });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
         return res.status(400).json({ message: "Користувач уже існує" });
      }

      const newUser = new User({ username, password });
      await newUser.save();

      res.json({ message: "Реєстрація успішна!" });
   } catch (error) {
      res.status(500).json({ message: "Помилка сервера" });
   }
});

// Авторизація (простий варіант без токенів)
app.post('/login', async (req, res) => {
   try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user || user.password !== password) {
         return res.status(400).json({ message: "Невірний логін або пароль" });
      }

      res.json({ message: "Вхід успішний!" });
      import express from "express";
      import mongoose from "mongoose";
      import dotenv from "dotenv";
      import cors from "cors"; // Якщо потрібно дозволити кросдоменної взаємодії

      dotenv.config();

      const app = express();
      const port = process.env.PORT || 5001;

      // Підключення до MongoDB
      mongoose
         .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         })
         .then(() => console.log("✅ Підключено до MongoDB"))
         .catch((err) => console.error("❌ Помилка підключення до MongoDB:", err.message));

      // Середовище для JSON
      app.use(express.json());

      // Додаємо CORS, щоб дозволити запити з інших доменів (фронтенд)
      app.use(cors());

      // Маршрут для реєстрації
      app.post("/register", (req, res) => {
         // Логіка для реєстрації користувача
         // Тут має бути код для створення користувача в БД
         res.json({ message: "Реєстрація успішна!" });
      });

      // Маршрут для логіну
      app.post("/login", (req, res) => {
         // Логіка для входу користувача
         // Тут має бути код для перевірки користувача
         res.json({ message: "Успішний вхід!", token: "токен_пользователя" });
      });

      app.listen(port, () => {
         console.log(`🚀 Сервер працює на порту ${port}`);
      });

   } catch (error) {
      res.status(500).json({ message: "Помилка сервера" });
   }
});

// Запуск сервера
app.listen(port, () => {
   console.log(`🚀 Сервер працює на порту ${port}`);
});
