// Functions for the student dashboard

// Fetch all available scholarships
async function fetchScholarships() {
    try {
        document.getElementById('allScholarshipsInner').innerHTML = '<div class="uk-text-center"><div uk-spinner="ratio: 3"></div><p>Loading scholarships...</p></div>';
        
        const response = await fetch('/api/scholarships');
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error('Failed to retrieve scholarships');
        }
        
        // Clear loading indicator
        document.getElementById('allScholarshipsInner').innerHTML = '';
        
        // Display scholarships
        if (data.data && data.data.length > 0) {
            data.data.forEach(scholarship => {
                writeScholarshipFromDB(scholarship, "allScholarships");
            });
        } else {
            document.getElementById('allScholarshipsInner').innerHTML = '<p class="uk-text-center">No scholarships available at this time.</p>';
        }
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        document.getElementById('allScholarshipsInner').innerHTML = `
            <div class="uk-alert-danger" uk-alert>
                <p>Error loading scholarships. Please try again later.</p>
            </div>
        `;
    }
}

// Fetch user's applied scholarships
async function fetchMyScholarships() {
    try {
        document.getElementById('myScholarshipsInner').innerHTML = '<div class="uk-text-center"><div uk-spinner="ratio: 3"></div><p>Loading your scholarships...</p></div>';
        
        // Get the auth token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('User not authenticated');
        }
        
        const response = await fetch('/api/applications/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        document.getElementById('myScholarshipsInner').innerHTML = '';
        
        if (data.data && data.data.length > 0) {
            data.data.forEach(application => {
                // Each application contains a scholarship object we can use
                writeScholarshipWithStatus(application, "myScholarships");
            });
        } else {
            document.getElementById('myScholarshipsInner').innerHTML = '<p class="uk-text-center">You haven\'t applied to any scholarships yet.</p>';
        }
    } catch (error) {
        console.error('Error fetching your scholarships:', error);
        document.getElementById('myScholarshipsInner').innerHTML = `
            <div class="uk-alert-danger" uk-alert>
                <p>Error loading your scholarships. Please try again later.</p>
            </div>
        `;
    }
}

// Display scholarship with application status
function writeScholarshipWithStatus(application, menu) {
    const scholarship = application.scholarship;
    const randomID = "id_" + Math.floor(Math.random() * 1000000);
    
    // Convert database dates to JavaScript Date objects
    const dueDate = new Date(scholarship.dueDate);
    const submissionDate = new Date(application.dateSubmission);
    
    // Format dates
    const dueDateStr = `${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
    const submissionDateStr = `${submissionDate.getMonth() + 1}/${submissionDate.getDate()}/${submissionDate.getFullYear()}`;
    
    // Status badge based on application status
    let statusBadge = '';
    if (application.fundsDispursed) {
        statusBadge = '<span class="status-badge status-awarded">Awarded</span>';
    } else {
        statusBadge = '<span class="status-badge status-pending">Pending</span>';
    }

    // Format the scholarship with application status
    const scholarshipHTML = `
    <div id="${randomID}" class="scholarship">
        <div class="scholarshipTitle">
            <div class="titleWrapper">
                <h1>${scholarship.name} ${statusBadge}</h1>
                <h2>${scholarship.funderName}</h2>
            </div>
            <h3><i class="ri-calendar-check-line" style="margin-right:5px;"></i> Applied: ${submissionDateStr}</h3>
        </div>
        <div class="scholarshipMiddle">
            <div class="application-details">
                <p><strong>Due Date:</strong> ${dueDateStr}</p>
                <p><strong>Amount:</strong> $${scholarship.fundsAllocated.toLocaleString()}</p>
                <p><strong>Status:</strong> ${application.fundsDispursed ? 'Awarded' : 'Under Review'}</p>
                <p><strong>Your Ranking:</strong> ${application.rank > 0 ? application.rank : 'Not yet ranked'}</p>
            </div>
        </div>
    </div>`;

    document.getElementById(`${menu}Inner`).insertAdjacentHTML('beforeend', scholarshipHTML);
}

// Submit a scholarship application
async function submitApplication(scholarshipId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            UIkit.notification({
                message: 'You must be logged in to apply',
                status: 'danger',
                pos: 'top-center',
                timeout: 5000
            });
            return false;
        }
        
        const personalStatement = document.getElementById('personalStatement').value;
        const cvFile = document.getElementById('cvFile').files[0];
        
        if (!personalStatement || !cvFile) {
            UIkit.notification({
                message: 'Please complete all fields',
                status: 'danger',
                pos: 'top-center',
                timeout: 5000
            });
            return false;
        }
        
        const formData = new FormData();
        formData.append('scholarshipId', scholarshipId);
        formData.append('personalStatement', personalStatement);
        formData.append('cv', cvFile);
        
        const response = await fetch('/api/applications', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        const result = await response.json();
        
        if (response.ok) {
            UIkit.notification({
                message: 'Application submitted successfully!',
                status: 'success',
                pos: 'top-center',
                timeout: 5000
            });
            
            // Close the application modal
            UIkit.modal(document.getElementById('formSubmissionModal')).hide();
            
            // Refresh my scholarships tab
            fetchMyScholarships();
            
            return true;
        } else {
            UIkit.notification({
                message: result.message || 'Error submitting application',
                status: 'danger',
                pos: 'top-center',
                timeout: 5000
            });
            return false;
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        UIkit.notification({
            message: 'Error submitting application. Please try again.',
            status: 'danger',
            pos: 'top-center',
            timeout: 5000
        });
        return false;
    }
}

// Initialize dashboard
function initDashboard() {
    // Load all scholarships on page load
    fetchScholarships();
    
    // Set up tab change handlers
    document.getElementById('allTab').addEventListener('click', () => changeTab('allScholarships'));
    document.getElementById('myTab').addEventListener('click', () => {
        changeTab('myScholarships');
        fetchMyScholarships();
    });
    document.getElementById('pfTab').addEventListener('click', () => changeTab('myProfile'));
}

// Call init on window load
window.addEventListener('DOMContentLoaded', initDashboard);
