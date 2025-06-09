import express from 'express';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import tagRoutes from './routes/tagRoutes';
import taskTagRoutes from './routes/taskTagRoutes';

const app = express();

app.use(express.json());
app.use('/api/todo/user', userRoutes);
app.use('/api/todo/task', taskRoutes);
app.use('/api/todo/tag', tagRoutes);
app.use('/api/todo/taskTag', taskTagRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

export default app;