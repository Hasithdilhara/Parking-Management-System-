// admin-script.js
document.addEventListener('DOMContentLoaded', function () {
    // Code to run after the page is loaded
    loadSystemOverview();
    loadParkedVehicles();
    loadTotalRevenue();
});

async function loadSystemOverview() {
    try {
        const response = await fetch('http://localhost:3000/api/systemOverview');
        const data = await response.json();

        document.getElementById('totalSlots').textContent = `Total Slots: ${data.totalSlots}`;
        document.getElementById('availableSlots').textContent = `Available Slots: ${data.availableSlots}`;
    } catch (error) {
        console.error('Error fetching system overview:', error);
    }
}

async function loadParkedVehicles() {
    try {
        const response = await fetch('http://localhost:3000/api/parkedVehicles');
        const data = await response.json();

        const parkedVehiclesList = document.getElementById('parkedVehiclesList');
        parkedVehiclesList.innerHTML = '';

        data.forEach(vehicle => {
            const listItem = document.createElement('li');
            listItem.textContent = vehicle;
            parkedVehiclesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching parked vehicles:', error);
    }
}

async function loadTotalRevenue() {
    try {
        const response = await fetch('http://localhost:3000/api/totalRevenue');
        const data = await response.json();

        document.getElementById('totalRevenue').textContent = `Total Revenue: Rs.${data.totalRevenue}`;
    } catch (error) {
        console.error('Error fetching total revenue:', error);
    }
}
