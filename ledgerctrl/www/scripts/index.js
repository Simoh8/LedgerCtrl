document.getElementById('menu-toggle').addEventListener('click', function () {
    let menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});


document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    fetch('/api/method/customapp.api.send_contact_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("successMessage").classList.remove("hidden");
                setTimeout(() => {
                    document.getElementById("successMessage").classList.add("hidden");
                }, 3000);
            } else {
                console.error("Error:", data.error);
            }
        })
        .catch(error => console.error("Fetch Error:", error));
});



function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let startTime = performance.now();

    function step(currentTime) {
        let elapsedTime = currentTime - startTime;
        let progress = Math.min(elapsedTime / duration, 1);
        obj.textContent = Math.floor(start + progress * range);
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// Start counter animation
document.addEventListener("DOMContentLoaded", () => {
    animateValue("businessCount", 1, 100, 2000);
    animateValue("financeCount", 1, 75, 2000);
    animateValue("inventoryCount", 1, 50, 2000);
    animateValue("crmCount", 1, 60, 2000);
});

// Chart.js for Business Distribution
const ctx = document.getElementById('businessChart').getContext('2d');
const businessChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Financial Management", "Inventory", "HR", "CRM"],
        datasets: [{
            label: "Businesses",
            data: [75, 50, 40, 60], // Sample Data
            backgroundColor: ["#0097a7", "#f6b26b", "#ff6f61", "#4caf50"],
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});