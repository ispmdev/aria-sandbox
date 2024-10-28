document.addEventListener('DOMContentLoaded', function () {
    const languageSelect = document.getElementById('language-select');

    // Function to update the lang attribute
    function updateLangAttribute(lang) {
        document.documentElement.lang = lang;
    }

    // Function to handle language change
    function handleLanguageChange(event) {
        const selectedLang = event.target.value;
        
        // Update the lang attribute immediately for accessibility
        updateLangAttribute(selectedLang);

        // Determine the URL to navigate to based on selected language
        let newUrl = '/aria-sandbox/'; // Updated base URL for English
        if (selectedLang === 'fr') {
            newUrl = '/aria-sandbox/fr'; // Updated base URL for French
        }

        // Navigate to the new URL
        window.location.href = newUrl;
    }

    // Event listener for dropdown change
    languageSelect.addEventListener('change', handleLanguageChange);

    // Optional: Set the dropdown based on the current URL
    function setDropdownBasedOnURL() {
        const currentPath = window.location.pathname;
        if (currentPath.startsWith('/aria-sandbox/fr')) { // Updated path check for French
            languageSelect.value = 'fr';
            updateLangAttribute('fr');
        } else {
            languageSelect.value = 'en';
            updateLangAttribute('en');
        }
    }

    // Initialize dropdown state on page load
    setDropdownBasedOnURL();
});

// Get Elements
const menuButton = document.getElementById('menu-button');
const closeButton = document.getElementById('close-button');
const sideDrawer = document.getElementById('side-drawer');
const overlay = document.getElementById('overlay');

const searchButton = document.getElementById('search-button');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const closeSearchButton = document.getElementById('close-search-button');

// Functions for Sliding Drawer
function openDrawer() {
    sideDrawer.classList.add('open');
    overlay.classList.add('visible');
    overlay.classList.remove('hidden');
    sideDrawer.setAttribute('aria-hidden', 'false');
    menuButton.setAttribute('aria-expanded', 'true');
    // Set focus to the first link in the drawer
    const firstLink = sideDrawer.querySelector('a');
    firstLink.focus();
    // Prevent body from scrolling when drawer is open
    document.body.style.overflow = 'hidden';
}

function closeDrawerFunc() {
    sideDrawer.classList.remove('open');
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');
    sideDrawer.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
    // Return focus to the menu button
    menuButton.focus();
    // Restore body scrolling
    document.body.style.overflow = '';
}

// Event Listeners for Drawer
menuButton.addEventListener('click', openDrawer);
closeButton.addEventListener('click', closeDrawerFunc);
overlay.addEventListener('click', closeDrawerFunc);

// Close drawer with Esc key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (sideDrawer.classList.contains('open')) {
            closeDrawerFunc();
        }
        if (searchContainer.classList.contains('active')) {
            closeSearch();
        }
    }
});

// Functions for Search Input
function openSearch() {
    searchContainer.classList.add('active');
    searchButton.setAttribute('aria-expanded', 'true');
    searchContainer.setAttribute('aria-hidden', 'false');
    searchInput.focus();
}

function closeSearch() {
    searchContainer.classList.remove('active');
    searchButton.setAttribute('aria-expanded', 'false');
    searchContainer.setAttribute('aria-hidden', 'true');
    searchButton.focus();
}

// Event Listeners for Search
searchButton.addEventListener('click', function() {
    if (searchContainer.classList.contains('active')) {
        closeSearch();
    } else {
        openSearch();
    }
});

closeSearchButton.addEventListener('click', closeSearch);

// Trap focus inside the sliding drawer when open
sideDrawer.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        const focusableElements = sideDrawer.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// Trap focus inside the search container when active
searchContainer.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        const focusableElements = searchContainer.querySelectorAll('input, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }
});


// Get Elements
const openModalButton = document.getElementById('open-modal');
const closeModalButton = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
let focusableElements;
let firstFocusableElement;
let lastFocusableElement;

// Function to open the modal
function openModal() {
    modal.classList.add('active');
    modalOverlay.classList.add('active');
    modal.removeAttribute('hidden');
    modalOverlay.removeAttribute('hidden');

    // Find all focusable elements in the modal
    focusableElements = modal.querySelectorAll(focusableElementsString);
    if (focusableElements.length > 0) {
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
        firstFocusableElement.focus();
    }

    // Prevent body from scrolling
    document.body.style.overflow = 'hidden';
}

// Function to close the modal
function closeModal() {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
    modal.setAttribute('hidden', '');
    modalOverlay.setAttribute('hidden', '');

    // Return focus to the open modal button
    openModalButton.focus();

    // Restore body scrolling
    document.body.style.overflow = '';
}

// Event Listener to open the modal
openModalButton.addEventListener('click', openModal);

// Event Listener to close the modal
closeModalButton.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Event Listener for keyboard navigation (Escape key and focus trapping)
document.addEventListener('keydown', function(event) {
    const isModalOpen = modal.classList.contains('active');

    if (event.key === 'Escape' && isModalOpen) {
        closeModal();
    }

    if (isModalOpen && event.key === 'Tab') {
        // If Shift + Tab
        if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                event.preventDefault();
                lastFocusableElement.focus();
            }
        } else { // If Tab
            if (document.activeElement === lastFocusableElement) {
                event.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }
});