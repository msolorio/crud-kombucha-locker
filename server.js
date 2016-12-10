// Get the packages we need
const express = require('express');

// create our express application
const app = express();

// use environment defined port of 3000
const port = process.env.PORT || 3000;

// create our express router
const router = express.Router();

// initial dummy route for testing
// http://localhost:3000/api
router.get('/', (req, res) => {
	res.json({ message: 'You are running dangerously low on kombucha' });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
// @ http://localhost:3000/api
app.listen(port);
console.log(`Insert kombucha on port ${port}`);
