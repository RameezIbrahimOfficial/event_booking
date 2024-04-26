const mongoose = require('mongoose')


const UserEventSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    booked_events: [{eventId: { type: mongoose.Types.ObjectId }}]
},{ timestamps: true })

module.exports = mongoose.model('UserEvent', UserEventSchema)