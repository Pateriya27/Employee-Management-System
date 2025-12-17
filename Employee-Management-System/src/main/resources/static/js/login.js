const API_BASE_URL = 'http://localhost:8080/api/users';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    hideMessages();
    
    // Get form data
    const formData = {
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value
    };
    
    // Validate form
    if (!formData.username || !formData.password) {
        showErrorMessage({ message: 'Please fill in all fields' });
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    
    submitBtn.disabled = true;
    btnText.textContent = 'Signing in...';
    btnLoader.style.display = 'inline-block';
    
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Success - store user info in sessionStorage
            sessionStorage.setItem('user', JSON.stringify({
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            }));
            
            showSuccessMessage(data);
            
            // Redirect to employee management page after 2 seconds
            setTimeout(() => {
                window.location.href = 'employee-register.html';
            }, 2000);
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
        btnText.textContent = 'Sign In';
        btnLoader.style.display = 'none';
    }
});

function showSuccessMessage(data) {
    const successDiv = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    
    successText.textContent = `Welcome back, ${data.firstName}! Redirecting...`;
    
    successDiv.style.display = 'block';
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showErrorMessage(error) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    let message = 'Login failed. Please check your credentials and try again.';
    
    if (error.message) {
        message = error.message;
    }
    
    errorText.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.textContent = '');
}

function hideMessages() {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

