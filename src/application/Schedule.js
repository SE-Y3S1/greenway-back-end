const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
        name : {
            type: String,
            required: true
        },
        date : {
            type: Date,
            required: true
        },
        Time : {
            type: String,
            required: true
        },
        GarbageType : {
            type: String,
            required: true
        },
        collectionZone : {
            type: String,
            required: true
        },
        AssignedVehicle : {
            type: String,
            required: true
        },
        frequancy : {
            type: String,
            required: true
        }
})

const Schedule = mongoose.model("Schedule",scheduleSchema);

module.exports = Schedule;