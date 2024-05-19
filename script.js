document.addEventListener('DOMContentLoaded', function () {
    // Code to run after the page is loaded
    updateEntryTime();
});

function submitForm() {
    const name = getValue('name');
    const nic = getValue('nic');
    const vehicleNumber = getValue('vehicleNumber');
    const phoneNumber = getValue('phoneNumber');

    if (validateForm(name, nic, vehicleNumber, phoneNumber)) {
        fetch('http://localhost:3000/api/submitDriverDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, nic, vehicleNumber }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.promptForName) {
                // Driver found, prompt for exit page
                showAlert('Driver found. Proceed to exit page.', 'success');
                showExitPage(data.promptForName);
            } else {
                // Driver not found, proceed to new page for additional details
                showAlert('Driver not found. Proceed to enter additional details.', 'info');
                window.location.href = 'new-page.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('Error checking driver details. Please try again.', 'error');
        });
    }
}

function showExitPage(driverDetails) {
    // Function to show the exit page with driver details
    const exitPage = document.getElementById('exitPage');
    if (exitPage) {
        exitPage.style.display = 'block';
        exitPage.innerHTML = `
            <h2>Exit Parking</h2>
            <p>Driver Name: ${driverDetails.name}</p>
            <p>NIC: ${driverDetails.nic}</p>
            <p>Vehicle Number: ${driverDetails.vehicleNumber}</p>
            <p>Parking Time: ${driverDetails.entryTime}</p>
            <button onclick="exitParking()">Exit Parking</button>
        `;
    }
}

function exitParking() {
    const confirmation = confirm('Are you sure you want to exit the parking?');
    if (confirmation) {
        const exitTime = new Date().toLocaleString();
        updateExitTime(exitTime);

        // Make an API call to the back end to handle the exit process
        fetch('http://localhost:3000/api/exitParking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ exitTime }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showAlert('Exit successful. Charges: Rs.' + data.totalCharges, 'success');
            disableExitButton(); // Disable the exit button after successful exit
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('Error during exit. Please contact the parking attendant.', 'error');
        });
    }
}

function updateEntryTime() {
    const entryTimeField = document.getElementById('entryTime');
    if (entryTimeField) {
        const currentTime = new Date();
        entryTimeField.value = currentTime.toLocaleString();
    }
}

function updateExitTime(exitTime) {
    const exitTimeField = document.getElementById('exitTime');
    if (exitTimeField) {
        exitTimeField.value = exitTime;
    }
}

function showAlert(message, type) {
    // You can customize this function to show a styled alert instead of using the default browser alert
    alert(message);
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : null;
}

function validateForm(name, nic, vehicleNumber, phoneNumber) {
    // Basic validation for demonstration purposes
    if (!name || !nic || !vehicleNumber || !phoneNumber) {
        showAlert('All fields are required.', 'error');
        return false;
    }
    return true;
}
