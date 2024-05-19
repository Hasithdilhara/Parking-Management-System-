document.addEventListener('DOMContentLoaded', function () {
    // Code to run after the page is loaded
    initializeForm();
});

function initializeForm() {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get('name');
    const nic = queryParams.get('nic');
    const vehicleNumber = queryParams.get('vehicleNumber');

    // Set the pre-filled data in the form
    document.getElementById('driverName').value = name;
    // Set other form elements as needed
}

function submitAdditionalDetails() {
    // Get the values from the form
    const driverName = getValue('driverName');
    // Get other form values as needed

    // Check if the required fields are filled
    if (validateAdditionalDetails(driverName)) {
        // Make a fetch request to submit additional details
        fetch('/api/submitAdditionalDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ driverName }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showAlert('Additional details submitted successfully!', 'success');
            // Handle any additional logic or redirection after successful submission
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('Error submitting additional details. Please try again.', 'error');
        });
    }
}

function showAlert(message, type) {
    // You can customize this function to show a styled alert instead of using the default browser alert
    alert(message);
}

function getValue(id) {
    return document.getElementById(id).value;
}

function validateAdditionalDetails(driverName) {
    // Basic validation for demonstration purposes
    if (!driverName) {
        showAlert('Driver name is required.', 'error');
        return false;
    }
    // Add more validation as needed
    return true;
}

// Add additional functions as needed
