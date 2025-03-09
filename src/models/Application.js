import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
    },
    scholarship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scholarship',
        required: true
    },
    cv: {
        type: Buffer,
        required: true
    },
    personalStatement: {
        type: String,
        required: true
    },
    fundsDispursed: {
        type: Boolean,
        required: true
    },
    dateSubmission: {
        type: Date,
        required: true

    },
    rank: {
        type: Number,
        required: true
    },

});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
