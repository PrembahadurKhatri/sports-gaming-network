//server is a peerson who communicate with clients: 
//Analogy->server= waiter , chef=database
// src/server.ts

import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

// Read PORT from .env, otherwise use 5000
const PORT = process.env.PORT || 5000;

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});



/*
1. Project setup ✅
2. app.ts ✅
3. server.ts
4. MongoDB connection (db.ts)
5. Test that the server starts and MongoDB connects
6. User model
7. Register route
8. Register controller
9. Multer (file upload middleware)
10. Cloudinary configuration
11. Registration service (upload image + hash password + save user)
12. Test registration
13. Login
14. JWT authentication
*/