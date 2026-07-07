/*
//Your app.ts should only have 4 things:
1)Import Express
2)Create app
3)app.use(express.json())
4)Export app

// Nothing else.
*/

//npm install cors
//npm install -D @types/cors



import express from "express";//Imports the Express library.
import cors from "cors";//CORS = Cross-Origin Resource Sharing यसले CORS middleware लाई project मा import गर्छ।
import authRoutes from "./routes/auth.routes";
const app = express();//Creates an Express application.

app.use(
    cors({
        origin: "http://localhost:5173",//fronted port ma connect gareko
        credentials: true,
    })
);
app.use(express.json());//"If the frontend sends JSON, automatically convert it into req.body."

//Auth Routes
app.use("/api/auth",authRoutes);

export default app; // Exports the app for use in server.ts.

/*
CORS भनेको के हो?
CORS = Cross-Origin Resource Sharing
Browser ले सुरक्षा कारणले एउटा website लाई अर्को website सँग freely communicate गर्न दिँदैन।
उदाहरण:
Frontend
http://localhost:5173

Backend
http://localhost:5000
यी दुई different origin हुन्।
किन?
URL	Origin
http://localhost:5173	localhost:5173
http://localhost:5000	localhost:5000
Port फरक भएकाले origin फरक हुन्छ।
त्यसैले Browser भन्छ:
"Backend ले अनुमति नदिएसम्म request पठाउन मिल्दैन।"
*/