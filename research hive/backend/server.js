const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));

// Test Route
app.get('/', (req, res) => {
    res.send('Researcher Hive API is running...');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);
const networkingRoutes = require('./routes/networking');
app.use('/api/networking', networkingRoutes);
const messagingRoutes = require('./routes/messaging');
app.use('/api/messages', messagingRoutes);
const researchRoutes = require('./routes/research');
app.use('/api/research', researchRoutes);