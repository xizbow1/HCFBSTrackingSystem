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
        ref: 'Application',
        required: true
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

const Applicant = mongoose.model('Applicant', applicantSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
const Application = mongoose.model('Application', applicationSchema);

export {connectDB, Applicant, Admin, Scholarship,Application};