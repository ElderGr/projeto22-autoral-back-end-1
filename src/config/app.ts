import express from 'express';
import cors from 'cors';
import router from '../routes/router';
import handleApplicationErrors from '@/middlewares/handleApplicationErrors';

const app = express();
app.use(cors())
app.use(express.json())
app.use(router)
app.use(handleApplicationErrors)


app.listen(5000, () => {
    console.log(`server listening to port 5000`);
})