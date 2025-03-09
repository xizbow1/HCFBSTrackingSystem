import mongoose from 'mongoose';

// Applicant schema
const applicantSchema = new mongoose.Schema({
    firebaseUID: {
        type: String,
        required: true,
        unique: true
    },
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
        type: String // Fixed typo from Type to type
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
        ref: 'Application'
    }]
});

// Admin schema
const adminSchema = new mongoose.Schema({
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
        required: true
    },
    super: {
        type: Boolean,
        required: true
    },
    read: {
        type: Boolean,
        required: true
    },
    write: {
        type: Boolean,
        required: true
    } 
});

// Scholarship schema
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

// Application schema
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

// Check if models are already defined to prevent the "overwrite model" error
const Applicant = mongoose.models.Applicant || mongoose.model('Applicant', applicantSchema);
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
const Scholarship = mongoose.models.Scholarship || mongoose.model('Scholarship', scholarshipSchema);
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export { Applicant, Admin, Scholarship, Application };
