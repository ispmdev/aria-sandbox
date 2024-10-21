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