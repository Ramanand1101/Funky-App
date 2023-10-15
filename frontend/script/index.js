const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let slideIndex = 0;

function showSlide(index) {
    if (index < 0) {
        slideIndex = 0;
    } else if (index >= slider.children.length - 3) {
        // Assuming 3 slides are visible at once
        slideIndex = slider.children.length - 3;
    } else {
        slideIndex = index;
    }

    const offset = -slideIndex * (100 / 3) + '%'; // Each slide is 33.33% wide
    slider.style.transform = `translateX(${offset})`;
}

prevBtn.addEventListener('click', () => {
    showSlide(slideIndex - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(slideIndex + 1);
});
// Get the user icon element by its ID
const userIcon = document.getElementById('user-icon');

// Add a click event listener to the user icon
userIcon.addEventListener('click', function() {
    // Redirect the user to login.html when the user icon is clicked
    window.location.href = './login.html';
});
