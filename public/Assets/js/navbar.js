document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.querySelector('.toggleBtn');
    toggleButton.addEventListener('click', toggleNav);
});

function toggleNav() {
    var menuDiv = document.getElementById("MenuDiv");
    menuDiv.style.width = menuDiv.style.width === "100%" ? "0" : "100%";
}