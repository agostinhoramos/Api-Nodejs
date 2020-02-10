const express = require('express');
const router = express.Router();

// CRUD
const controller = require('../app/controllers/publishControllers');
// Create a new publ
router.post('/create/', controller.create);
// Retrieve a single publ with id
router.get('/retrieve/:id', controller.retrieve);
// Update a publ with id
router.post('/update/', controller.update);
// Delete a publ with id
router.get('/delete/:id', controller.delete);

//Extra
router.post('/like/', controller.like);
router.post('/dislike/', controller.dislike);

module.exports = router;