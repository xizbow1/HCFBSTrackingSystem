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
    default: false
  },
  dateSubmission: {
    type: Date,
    default: Date.now
  },
  rank: {
    type: String
  }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
