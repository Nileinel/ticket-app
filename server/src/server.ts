import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './services/db.service';
import { ticketRouter } from './routes/ticket.routes';

dotenv.config({ path: '../.env' });

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
    console.error('MongoDB URI is not defined in the environment variables.');
    process.exit(1);
}

connectToDatabase(MONGO_URI).then(() => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(express.json());

    app.use('/tickets', ticketRouter);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error: any) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
});