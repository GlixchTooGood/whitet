document.addEventListener('DOMContentLoaded', function() {
    const sodaPackButton = document.getElementById('sodaPack');
    const packOpenDiv = document.getElementById('packOpen');
  
    if (sodaPackButton && packOpenDiv) {
      sodaPackButton.addEventListener('click', function() {
        packOpenDiv.style.display = 'block';
  
        // Add a 1-second delay before allowing hiding on click
        setTimeout(function() {
          packOpenDiv.addEventListener('click', function() {
            packOpenDiv.style.display = 'none';
            // Remove the click listener to prevent multiple hiding
            packOpenDiv.removeEventListener('click', arguments.callee);
          });
        }, 1000); // 1000 milliseconds = 1 second
      });
    } else {
      console.error('One or both elements not found.');
    }
  });