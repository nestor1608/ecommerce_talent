import cors from 'cors';
import { config } from './environment.js';

export const corsOptions = {
    origin: config.clientUrl,
    credentials: true,
    optionsSuccessStatus: 200,
};

export default cors(corsOptions);
