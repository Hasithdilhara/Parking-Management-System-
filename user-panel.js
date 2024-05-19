// user-panel.js
document.addEventListener('DOMContentLoaded', function () {
    // Code to run after the page is loaded
});

function submitDriverDetails() {
    // Function to be implemented to submit driver details
    // This function will be called when the "Submit Details" button is clicked
    // Make a fetch request to the server to save the driver details
    fetch('http://localhost:3000/api/submitDriverDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: getValue('name'),
            nic: getValue('nic'),
            vehicleNumber: getValue('vehicleNumber'),
            // Include other driver details as needed
        }),
    })
    .then(response => response.json())
    .then(data => {
        // After successfully submitting driver details, redirect to the exit window or new page
        openExitWindow(data);
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Error submitting driver details. Please try again.', 'error');
    });
}

function openExitWindow(data) {
    // Function to be implemented to open the exit window with the provided data
    // Check if the user has submitted driver details (promptForName is false)
    if (!data.promptForName) {
        // If driver details are already available, redirect to the exit window
        window.location.href = 'exit-window.html';
    } else {
        // If driver details were submitted on the new page, redirect to that page
        window.location.href = 'new-page.html';
    }
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : null;
}

function showAlert(message, type) {
    alert(message);
}
