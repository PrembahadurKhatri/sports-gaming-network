import express from 'express'
import dotenv from 'dotenv'
import uploadRoutes from './routes/upload'

dotenv.config();//This tells Node: Read the .env file.

const app = express()

app.use(express.json())//So Express can understand JSON.

//Register upload routes
app.use('/api', uploadRoutes);



app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})
