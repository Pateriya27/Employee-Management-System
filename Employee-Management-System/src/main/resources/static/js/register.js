const API_BASE_URL = 'http://localhost:8080/api/users';

document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    hideMessages();
    
    // Get form data
    const formData = {
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim()
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
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Success
            showSuccessMessage(data);
            document.getElementById('registrationForm').reset();
        } else {
            // Error from server
            showErrorMessage(data);
        }
    } catch (error) {
        console.error('Error:', error);
        showErrorMessage({
            message: 'Network error. Please check if the server is running and try again.'
        });
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.textContent = 'Register';
        btnLoader.style.display = 'none';
    }
});

function validateForm(data) {
    let isValid = true;
    
    // Username validation
    if (data.username.length < 3 || data.username.length > 50) {
        showFieldError('usernameError', 'Username must be between 3 and 50 characters');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFieldError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation
    if (data.password.length < 6) {
        showFieldError('passwordError', 'Password must be at least 6 characters');
        isValid = false;
    }
    
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
    
    successText.textContent = data.message || 
        `Welcome ${data.firstName}! Your account has been created successfully.`;
    
    successDiv.style.display = 'block';
    
    // Scroll to success message
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
    
    // Scroll to error message
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

