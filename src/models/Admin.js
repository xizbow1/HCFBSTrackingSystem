import mongoose from 'mongoose';

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

const Admin = mongoose.model('Applicant', adminSchema);

export default Admin;