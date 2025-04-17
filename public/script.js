console.log("Memix main script loaded.");

// Add any global JavaScript functionality here.
// For example, smooth scrolling for anchor links:
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        try {
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        } catch (error) {
            console.warn("Smooth scroll target not found:", this.getAttribute('href'));
        }
    });
});

// You could add more complex features like dynamically loading tool previews, etc.
