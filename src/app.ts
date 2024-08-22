import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
// const port = 3000

// parser
app.use(express.json());
app.use(cors());

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// app.use('/api/v1', router);




// app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
