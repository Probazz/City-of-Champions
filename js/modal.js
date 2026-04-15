// Modal functionality
function initializeModals() {
    const modals = {
        prayer: {
            modal: document.getElementById('prayerModal'),
            overlay: document.getElementById('prayerModal-overlay'),
            trigger: document.querySelector('.prayer-btn')
        },
        login: {
            modal: document.getElementById('loginModal'),
            overlay: document.getElementById('loginModal-overlay'),
            trigger: document.querySelector('.member-login')
        }
    };

    // Setup each modal
    Object.values(modals).forEach(({ modal, overlay, trigger }) => {
        if (!modal || !overlay || !trigger) return;

        // Open modal
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close modal
        const closeButtons = modal.querySelectorAll('.modal-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => closeModal(modal, overlay));
        });

        // Close on overlay click
        overlay.addEventListener('click', () => closeModal(modal, overlay));
    });

    // Handle form submissions
    const prayerForm = document.getElementById('prayerForm');
    const loginForm = document.getElementById('loginForm');
    const submitPrayer = document.getElementById('submitPrayer');
    const submitLogin = document.getElementById('submitLogin');

    if (submitPrayer) {
        submitPrayer.addEventListener('click', handlePrayerSubmit);
    }

    if (submitLogin) {
        submitLogin.addEventListener('click', handleLoginSubmit);
    }
}

function closeModal(modal, overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const messageSpan = toast.querySelector('.toast-message');
    
    toast.className = 'toast';
    toast.classList.add(`toast-${type}`);
    messageSpan.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

async function handlePrayerSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('prayerForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!data.name || !data.email || !data.prayer) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        showToast('Prayer request submitted successfully');
        closeModal(
            document.getElementById('prayerModal'),
            document.getElementById('prayerModal-overlay')
        );
        form.reset();
    } catch (error) {
        showToast('Error submitting prayer request', 'error');
    }
}

async function handleLoginSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!data.email || !data.password) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        showToast('Login successful');
        closeModal(
            document.getElementById('loginModal'),
            document.getElementById('loginModal-overlay')
        );
        form.reset();
    } catch (error) {
        showToast('Invalid email or password', 'error');
    }
}

// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeModals);
