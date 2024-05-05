require('dotenv').config();
const express= require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const multer = require("multer");
const upload = multer();
app.use(upload.any());
const cors = require("cors");
app.use(cors());
app.use(cors({credentials:true,origin:"http://localhost:3000"}));

const connectDB= require('./db/connect')
app.use("/uploads", express.static("uploads"));

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const authenticateUser = require('./middleware/authentication');

//router
const authRouter= require('./routes/auth');
//const projectRouter= require('./routes/Project');
// const partnerRouter= require('./routes/Partner');
app.use(express.json())
app.use('/api/v1/', authRouter);

//middleware
//app.use('/api/v2/',authenticateUser,getAdmin);
// app.use('/api/v2/',partnerRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);     


const port=process.env.PORT;

const start = async()=>{

    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
          console.log(`Server is listening on port ${port}`);
        });
      } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1); // Exit the process with an error code
      }
}

start();