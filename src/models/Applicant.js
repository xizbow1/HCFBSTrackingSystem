import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: { 
        type: String,
        required: true
    },
    street: { 
        type: String,
        required: true
    },
    aptNum: {
        type: String
    },
    city: { 
        type: String,
        required: true
    },
    zip: { 
        type: String,
        required: true
    },
    state: { 
        type: String,
        required: true
    },
    gpa: { 
        type: Number,
        required: true
    },
    college: { 
        type: String,
        required: true
    },
    studentType: {
        type: String,
        required: true
    },
    major: { 
        type: String,
        required: true
    },
    transcripts: { 
        type: Buffer,
        required: true
    },
    highschool: {
        Type:String
    },
    hsGradYear: { 
        type: Date,
    },
    gradYear: { 
        type: Date,
        required: true
    },
    pic: { 
        type: Buffer,
        required: true
    },
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }]
});

const Applicant = mongoose.model('Applicant', applicantSchema);

export default Applicant;
