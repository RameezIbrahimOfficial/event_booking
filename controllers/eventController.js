const bcrypt = require('bcrypt')
const userModel = require('../model/user')
const eventModel = require('../model/event')
const userEventModel = require('../model/userEvent')
const asyncHandler = require('express-async-handler')



// @desc GET All Events
// @route GET /api/events
// @access Private 
const getEvents = asyncHandler(async (req, res) => {
    const user = req.user;

    const events = await eventModel.find({})
    res.status(200).json({
        status: "success",
        data: events
    })

})

// @desc GET Event
// @route GET /api/event/:eventId
// @access Private 
const getEvent = asyncHandler(async (req, res) => {
    const user = req.user;
    const { eventId } = req.params

    const event = await eventModel.findOne({ _id: eventId })
    res.status(200).json({
        status: "success",
        data: event
    })

})

// @desc Register Event
// @route POST /api/event/:eventId
// @access Private
const registerEvent = asyncHandler(async (req, res) => {
    const userEmail = req.user
    const { eventId } = req.params;

    const user = await userModel.findOne({ email: userEmail.email })

    const event = await eventModel.findOne({ _id: eventId })

    if (!event) {
        res.status(404).json({ message: "Event not Found" })
    }

    if (event.available_ticket == 0) {
        res.status(400).json({ message: "No Ticket Available for this event" })
    }

    console.log(event);

    await eventModel.updateOne({ _id: eventId }, {
        available_ticket: event.available_ticket - 1
    })

    const userEvents = await userEventModel.findOne({ email: userEmail })
    if (!userEvents) {
        await userEventModel.create({
            userId: user._id,
            booked_events: [{ eventId: event._id }]
        })
    } else {
        await userEventModel.updateOne({ userId: user._id }, {
            $push: { booked_events: { eventId: event._id } }
        })
    }

    res.status(201).json({
        status: "success",
    })
})

// @desc GET User Registered Event
// @route GET /api/event/me
// @access Private 
const getUserEvent = asyncHandler(async (req, res) => {
    const userEmail = req.user;
    const user = await userModel.findOne({ email: userEmail.email })

    const events = await userEventModel.find({ userId: user._id }).populate({
        path: 'userId',
        model: 'User'
    }).populate({
        path: 'eventId',
        model: 'Event'
    })
    res.status(200).json({
        status: "success",
        data: events
    })

})

// @desc Crate Event
// @route POST /api/event/add
// @access Private 
const createEvent = asyncHandler(async (req, res) => {
    const { name, date, venue, available_ticket } = req.body
    const user = req.user;

    if (!name || !date || !venue || !available_ticket) {
        res.status(400).json({ message: 'All fields are required' })
    }

    const event = await eventModel.create({
        name,
        date,
        venue,
        available_ticket
    })
    res.status(200).json({
        status: "success",
        data: event
    })

})

module.exports = { getEvent, getEvents, registerEvent, getUserEvent, createEvent }