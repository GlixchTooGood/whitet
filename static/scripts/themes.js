document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById('themeSelect');

    // Apply the saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.className = savedTheme;
        if (themeSelect) {
            themeSelect.value = savedTheme;
        }
    }

    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            document.documentElement.className = this.value;
            localStorage.setItem('theme', this.value);
        });
    }
});
