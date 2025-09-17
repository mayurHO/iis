const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Temporary']
    },
    jobImg: {
        type: String // URL or path to the image
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);