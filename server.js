const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // import cors
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors()); // use cors middleware
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);
app.get('/', (req, res) => res.send("Server is working!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
