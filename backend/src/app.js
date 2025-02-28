const express = require('express');
const aiRoutes = require('./routes/ai-route');
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3300;
console.log("PORT VALUE: ", process.env.PORT);


const frontendPath = path.join(__dirname, "../frontend/build"); // Corrected path

//middle-ware
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",  // Allow React Vite frontend
  credentials: true,  // Allow cookies/auth headers
}));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"))
  })
}

//ai-routes
app.use('/ai', aiRoutes)


const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is live on Port ${port}`);
    });
  } catch (error) {
    console.log("Server ISSUE");
  }
};

start();
