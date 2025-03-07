class Projects {
    constructor(ProjectName, CoverImage, Description) {
        this.ProjectName = ProjectName;
        this.CoverImage = CoverImage;
        this.Description = Description;
    }

    renderCard(container) {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card">
                <img src="${this.CoverImage}" class="card-img-top" alt="${this.ProjectName}">
                <div class="card-body">
                    <h5 class="card-title">${this.ProjectName}</h5>
                    <button class="btn btn-primary details-btn" data-description="${this.Description}">
                        Details
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    }
}

const projectsList = [
    new Projects(
        'M.F. Hussain Portfolio',
        'Images/MF.png',
        'Wonderful Portfolio on Artist in WordPress using all its features and themes, published in 2024.'
    ),
    new Projects(
        'Biography of Kashyap',
        'Images/pic1.jpg',
        'A new Portfolio website showcasing my own knowledge in web development and coding.'
    ),
    new Projects(
        'Online Watch Selling Website',
        'Images/11.jpg',
        'Responsive Website Made in Django Framework and Python Coding.'
    ),
];

const container = document.getElementById('project');
projectsList.forEach(project => project.renderCard(container));

const modal = document.getElementById('mymodal');
const modalBody = document.querySelector('.modal-body');
const closeButton = document.querySelector('.close');

// Event listener for displaying project details
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('details-btn')) {
        const description = e.target.getAttribute('data-description');
        modalBody.textContent = description;
        modal.style.display = 'block';
    }
});

// Close modal when clicking the close button
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// --------------------
// FORM VALIDATION & EMAIL SUBMISSION
// --------------------

function validateAndSendEmail() {
    // Get values from form inputs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const errorMessage = document.getElementById("error-message");

    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Reset error message
    errorMessage.textContent = "";

    // Validation checks
    if (name === '') {
        errorMessage.textContent = "Name is required!";
        return false;
    }

    if (email === '') {
        errorMessage.textContent = "Email is required!";
        return false;
    } else if (!emailPattern.test(email)) {
        errorMessage.textContent = "Invalid email format!";
        return false;
    }

    if (message === '') {
        errorMessage.textContent = "Message is required!";
        return false;
    }

    // If validation passes, send email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        name: name,
        email: email,
        message: message,
    }).then(function(response) {
        alert("Success! Form Submitted.");
        document.getElementById('contact-form').reset(); // Reset form
    }).catch(function(error) {
        alert("Error sending email: " + error);
    });

    return false; // Prevent default form submission
}

// Attach the function to the submit button
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    validateAndSendEmail();
});
