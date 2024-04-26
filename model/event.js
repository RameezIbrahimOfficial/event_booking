const mongoose = require('mongoose')


const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    available_ticket: { type: Number, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Event', EventSchema)