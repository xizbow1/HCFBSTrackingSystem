import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    dueDate: { 
        type: Date,
        required: true
    },
    funderName: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    fundsAllocated: {
        type: Number,
        required: true
    },
    fundingType: {
        type: String,
        required: true
    },
    numOfApps: { 
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

export default Scholarship;
