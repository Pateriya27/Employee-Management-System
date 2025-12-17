const API_BASE_URL = 'http://localhost:8080/api/employees';

document.getElementById('employeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    hideMessages();
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
        department: document.getElementById('department').value.trim(),
        position: document.getElementById('position').value.trim(),
        salary: parseFloat(document.getElementById('salary').value)
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    
    submitBtn.disabled = true;
    btnText.textContent = 'Registering...';
    btnLoader.style.display = 'inline-block';
    
    try {
        // Get stored user credentials (if available from login)
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        // For employee registration, use admin credentials (requires authentication)
        // In production, you would use JWT tokens or session-based auth
        const username = 'admin';
        const password = 'admin123';
        
        // Create Basic Auth header
        const authString = btoa(`${username}:${password}`);
        
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString}`
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Success
            showSuccessMessage(data);
            document.getElementById('employeeForm').reset();
        } else {
            // Error from server
            showErrorMessage(data);
        }
    } catch (error) {
        console.error('Error:', error);
        showErrorMessage({
            message: 'Network error. Please check if the server is running and try again. Make sure you are logged in.'
        });
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.textContent = 'Register Employee';
        btnLoader.style.display = 'none';
    }
});

function validateForm(data) {
    let isValid = true;
    
    // First name validation
    if (data.firstName.length < 2 || data.firstName.length > 50) {
        showFieldError('firstNameError', 'First name must be between 2 and 50 characters');
        isValid = false;
    }
    
    // Last name validation
    if (data.lastName.length < 2 || data.lastName.length > 50) {
        showFieldError('lastNameError', 'Last name must be between 2 and 50 characters');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFieldError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone number validation
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
        showFieldError('phoneNumberError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Department validation
    if (data.department.length < 2 || data.department.length > 100) {
        showFieldError('departmentError', 'Department must be between 2 and 100 characters');
        isValid = false;
    }
    
    // Position validation
    if (data.position.length < 2 || data.position.length > 100) {
        showFieldError('positionError', 'Position must be between 2 and 100 characters');
        isValid = false;
    }
    
    // Salary validation
    if (!data.salary || data.salary <= 0) {
        showFieldError('salaryError', 'Salary must be greater than 0');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.textContent = '');
}

function showSuccessMessage(data) {
    const successDiv = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    
    successText.textContent = `Employee ${data.firstName} ${data.lastName} has been registered successfully!`;
    
    successDiv.style.display = 'block';
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showErrorMessage(error) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    let message = 'Registration failed. Please try again.';
    
    if (error.message) {
        message = error.message;
    } else if (error.errors) {
        // Handle validation errors
        const errorMessages = Object.values(error.errors).flat();
        message = errorMessages.join(', ');
    }
    
    errorText.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideMessages() {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

// Real-time validation feedback
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function() {
        const fieldName = this.name;
        const value = this.value.trim();
        
        // Clear previous error
        const errorId = fieldName + 'Error';
        document.getElementById(errorId).textContent = '';
        
        // Validate on blur
        if (this.hasAttribute('required') && !value) {
            showFieldError(errorId, 'This field is required');
        }
    });
});

