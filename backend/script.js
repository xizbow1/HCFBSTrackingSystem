import { connectDB, Applicant, Admin, Scholarship, Application } from './hcfbDB.js';


// Connect to database
async function testDatabase() {
  try {
    await connectDB();
    console.log('Database connection successful');
    
    // Test creating documents
    await createTestData();
    
    // Test querying relationships
    await testRelationships();
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Create test data
async function createTestData() {
  try {
    // Create test applicant
    const testApplicant = new Applicant({
      firstName: 'Test',
      lastName: 'Student',
      email: 'test@example.com',
      phone: '555-123-4567',
      street: '123 Test St',
      city: 'Testville',
      zip: '12345',
      state: 'CA',
      gpa: '3.8',
      college: 'Test University',
      studentType: 'Undergraduate',
      major: 'Computer Science',
      transcripts: Buffer.from('test transcript'),
      pic: Buffer.from('test image')
    });
    await testApplicant.save();
    console.log('Test applicant created:', testApplicant._id);

    // Create test scholarship
    const testScholarship = new Scholarship({
      name: 'Test Scholarship',
      dueDate: new Date('2025-12-31'),
      funderName: 'Test Foundation',
      description: 'A test scholarship',
      fundsAllocated: 5000,
      fundingType: 'Full',
      numOfApps: 0,
      creationDate: new Date(),
      endDate: new Date('2026-01-31'),
      requirements: 'GPA 3.0 or higher'
    });
    await testScholarship.save();
    console.log('Test scholarship created:', testScholarship._id);

    // Create test application
    const testApplication = new Application({
      applicant: testApplicant._id,
      scholarship: testScholarship._id,
      personalStatement: 'This is a test personal statement',
      fundsDispursed: false,
      dateSubmission: new Date()
    });
    await testApplication.save();
    console.log('Test application created:', testApplication._id);

    // Update references
    testApplicant.application = [testApplication._id];
    await testApplicant.save();
    
    testScholarship.applications = [testApplication._id];
    await testScholarship.save();

    return { testApplicant, testScholarship, testApplication };
  } catch (error) {
    console.error('Error creating test data:', error);
    throw error;
  }
}

// Test relationships
async function testRelationships() {
  // Test populating applicant with applications
  const applicant = await Applicant.findOne().populate('application');
  console.log('Populated applicant:', applicant.firstName, 'has applications:', 
              applicant.application.length > 0 ? 'Yes' : 'No');

  // Test populating application with scholarship and applicant
  const application = await Application.findOne()
    .populate('applicant')
    .populate('scholarship');
  console.log('Application links to:', 
              application.applicant.firstName,
              'for scholarship:', 
              application.scholarship.name);
}

testDatabase();