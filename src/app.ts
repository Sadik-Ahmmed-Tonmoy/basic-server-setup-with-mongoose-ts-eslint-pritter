import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
// app.use(cors());

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello developer, I know you can do it !');
});

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
