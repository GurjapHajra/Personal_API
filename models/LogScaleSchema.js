const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logScaleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    names: {
        type: Array,
        required: true
    },
    values: {
        type: Array,
        required: true
    },
    links: {
        type: Array,
        required: true
    }
},{timestamps: true})

const user = mongoose.model("user", logScaleSchema)
module.exports = user;