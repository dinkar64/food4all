const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
    donorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title:{
        type: String,
        required:true
    },
    postTime: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    acceptedTime: {
        type: Schema.Types.Date
    },
    peopleFed: {//NAME TO BE DECIDED
        type: Number,

    },
    status: {
        type: String
    },
    images: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    location: {
        type: { type: String },
        coordinates: [Number]
    },
    donorName: {
        type: String
    }
    //ADDITIONAL FIELDS CAN BE ADDED BELOW

});

donationSchema.index({ location: "2dsphere" })

module.exports = mongoose.model('Donation', donationSchema);