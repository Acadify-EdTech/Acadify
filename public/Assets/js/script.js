document.addEventListener('DOMContentLoaded', function() {
    let bodyContainer = document.querySelector('.bodyContainer');
    let timer = null;

    bodyContainer.addEventListener('scroll', function() {
        bodyContainer.classList.add('scrolling');

        if (timer !== null) {
            clearTimeout(timer);
        }

        timer = setTimeout(function() {
            bodyContainer.classList.remove('scrolling');
        }, 500); // 1000ms after scrolling stops
    });
});