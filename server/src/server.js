import app from './app.js';
import connectDB from './config/database.js';
import { config } from './config/environment.js';

// Connect to database
connectDB();

const PORT = config.port;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
