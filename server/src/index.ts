import express from 'express';
import path from 'path';
import apiRoutes from './routes/api';

const app = express();
const PORT = process.env.PORT || 3001;

// Parse JSON request body
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist/client')));
  
  // Handle any requests that don't match the ones above
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/client/index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
