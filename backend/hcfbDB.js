import mongoose from 'mongoose';
import express from 'express';

const connectDB = async() => {
    try {
        //update with database name
        await mongoose.connect('mongodb://localhost:27017/hcfbsTrackingSystem');
        console.log('MongoDB connected successfully');
    } catch(err ){
        console.log('DB connection error: ', err);
        process.exit(1);
    }
}

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
    aptNum: String,
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
        type: String,
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
        type: String,
    },
    gradYear: { 
        type: String,
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

const adminSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true
    },
    lastName: {
        String,
        required: true
    },
    email: {
        String,
        required: true
    }
});

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
    coverLetter: {
        type: Buffer
    },
    cv: {
        type: Buffer
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

    },
    rank: {
        type: String
    },

});

const Applicant = mongoose.model('Applicant', applicantSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
const Application = mongoose.model('Application', applicationSchema);

export {connectDB, Applicant, Admin, Scholarship,Application};
