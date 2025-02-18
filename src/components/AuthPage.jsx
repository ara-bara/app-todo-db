import { useState } from "react";
import axios from "axios";

const AuthPage = () => {
   const [formData, setFormData] = useState({
      username: "",
      password: "",
   });

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [authType, setAuthType] = useState("login"); // "login" або "register"

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         // Оновлений URL для запитів до бекенду
         const url = authType === "register"
            ? "http://localhost:5001/register" // правильний URL для реєстрації
            : "http://localhost:5001/login";   // правильний URL для логіну

         const res = await axios.post(url, formData);

         alert(res.data.message); // Виводимо повідомлення з сервера

         if (authType === "login") {
            localStorage.setItem("token", res.data.token);
         }

         // Очищення форми після реєстрації
         setFormData({ username: "", password: "" });

         // Закриття модального вікна
         setIsModalOpen(false);
      } catch (err) {
         alert(err.response?.data?.message || "Помилка авторизації");
      }
   };

   return (
      <div style={{ textAlign: "center" }}>
         <h2>To-Do App</h2>
         <button onClick={() => { setAuthType("login"); setIsModalOpen(true); }}>Увійти</button>
         <button onClick={() => { setAuthType("register"); setIsModalOpen(true); }} style={{ marginLeft: "10px" }}>Зареєструватися</button>

         {/* Модальне вікно */}
         {isModalOpen && (
            <div style={{
               position: "fixed",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               backgroundColor: "white",
               padding: "20px",
               boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
               borderRadius: "8px",
               zIndex: 1000
            }}>
               <h3>{authType === "login" ? "Авторизація" : "Реєстрація"}</h3>
               <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     name="username"
                     placeholder="Логін"
                     value={formData.username}
                     onChange={handleChange}
                     required
                     autoComplete="username"
                  />

                  <input
                     type="password"
                     name="password"
                     placeholder="Пароль"
                     value={formData.password}
                     onChange={handleChange}
                     required
                     autoComplete="current-password"
                  />

                  <div style={{ marginTop: "10px" }}>
                     <button type="submit">{authType === "login" ? "Увійти" : "Зареєструватися"}</button>
                     <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginLeft: "10px" }}>Закрити</button>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
};

export default AuthPage;
