import express from 'express';
import cors from 'cors';
import router from '../routes/router';

const app = express();
app.use(cors())
app.use(express.json())
app.use(router)


app.listen(5000, () => {
    console.log(`server listening to port 5000`);
})