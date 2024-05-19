// exit-window.js
document.addEventListener('DOMContentLoaded', function () {
    // Code to run after the page is loaded
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get('name');
    const nic = queryParams.get('nic');
    const vehicleNumber = queryParams.get('vehicleNumber');
    const phoneNumber = queryParams.get('phoneNumber');
    const slotNumber = queryParams.get('slotNumber');
    const entryTime = queryParams.get('entryTime');
    const charges = queryParams.get('charges');

    showExitDetails(name, nic, vehicleNumber, phoneNumber, slotNumber, entryTime, charges);
});

function showExitDetails(name, nic, vehicleNumber, phoneNumber, slotNumber, entryTime, charges) {
    // Display exit details on the page
    document.getElementById('driverName').textContent = `Driver Name: ${name}`;
    document.getElementById('nic').textContent = `NIC: ${nic}`;
    document.getElementById('vehicleNumber').textContent = `Vehicle Number: ${vehicleNumber}`;
    document.getElementById('phoneNumber').textContent = `Phone Number: ${phoneNumber}`;
    document.getElementById('slotNumber').textContent = `Parking Slot: ${slotNumber}`;
    document.getElementById('entryTime').textContent = `Entry Time: ${entryTime}`;
    document.getElementById('charges').textContent = `Charges: Rs.${charges}`;
}
