// Get the packages we need
const express = require('express');
const mongoose = require('mongoose');

// bodyParser helps us works with the body of incoming requests
const bodyParser = require('body-parser');
const Kombucha = require('./models/kombucha');

// create our express application
const app = express();

// use the body-parser packagage in our application
app.use(bodyParser.urlencoded({
	extended: true
}));

// use environment defined port of 3000
const port = process.env.PORT || 3000;

// create our express router
const router = express.Router();

// Commect to kombucha locker mongoDB
mongoose.connect('mongodb://localhost:27017/kombuchalocker');

// initial dummy route for testing
// http://localhost:3000/api
router.get('/', (req, res) => {
	res.json({ message: 'You are running dangerously low on kombucha' });
});

// create a new route with prefix /kombuchas
// kombucha plural
const kombuchasRoute = router.route('/kombuchas');

// create a new route with the /kombuchas/:kombucha_id
// kombucha singular
const kombuchaRoute = router.route('/kombuchas/:kombucha_id');

// create endpoint /api/kombuchas for POSTS
kombuchasRoute.post((req, res) => {
	// create a new instance of the Kombucha model
	const kombucha = new Kombucha();

	// set the kombucha properties that come from the POST data
	kombucha.name = req.body.name;
	kombucha.type = req.body.type;
	kombucha.quantity = req.body.quantity;

	// Save the kombucha and check for errors
	// mongoose's save method
	kombucha.save((err) => {
		if (err) res.send(err);
		res.json({ message: 'Kombucha added to the locker!', data: kombucha});
	});
});

// create endpoint /api/kombuchas for GETS
// get all the kombuchas
kombuchasRoute.get((req, res) => {

	// use Kombucha model to find all kombucha
	// mongoose's find method
	Kombucha.find((err, kombucha) => {
		if (err) res.send(err);
		res.json(kombucha);
	});
});

// create endpoint /api/kombuchas/:kombucha_id for GETS
// get one kombucha
kombuchaRoute.get((req, res) => {
	// use Kombucha model to find a specific kombucha
	Kombucha.findById(req.params.kombucha_id, (err, kombucha) => {
		if (err) res.send(err);
		res.json(kombucha);
	});
});

// create endpoint /api/kombuchas/:kombucha_id for PUTS
kombuchaRoute.put((req, res) => {
	// use Kombucha model to find specific kombucha
	// mongoose's findById method
	Kombucha.findById(req.params.kombucha_id, (err, kombucha) => {
		if (err) res.send(err);

		// update existing kombucha quantity
		kombucha.quantity = req.body.quantity;

		// save method from mongoose to save the kombucha and check for errors
		kombucha.save((err) => {
			if (err) res.send(err);
			res.json(kombucha);
		});
	});
});

// create endpoint /api/kombuchas/:kombucha_id for DELETE
kombuchaRoute.delete((req, res) => {
	// use Kombucha model to find a specific kombucha and remove it
	// mongoose's findByIdAndRemove method
	Kombucha.findByIdAndRemove(req.params.kombucha_id, (err, kombucha) => {
		if (err) res.send(err);
		res.json ({ message: 'Kombucha removed from the locker!', data: kombucha });
	});
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
// @ http://localhost:3000/api
app.listen(port);
console.log(`Insert kombucha on port ${port}`);
