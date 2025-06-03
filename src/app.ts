import express from 'express';
import userRoutes from './routes/userRoutes';
// import taskRoutes from './routes/taskRoutes';
// import other routes...

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
// app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

export default app;