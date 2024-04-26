const express = require('express');
const { getEvents, registerEvent, getEvent, getUserEvent, createEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const eventRouter = express.Router();


// GET All Events
eventRouter.get('/all', protect, getEvents);
// GET a Specific Event
eventRouter.get('/:eventId', protect, getEvent)
// Registe for an Event
eventRouter.post('/:eventId', protect, registerEvent)
// Get Current User Registred Event
eventRouter.get('/me', protect, getUserEvent)
// Create New Event
eventRouter.post('/create', protect, createEvent)

module.exports = eventRouter