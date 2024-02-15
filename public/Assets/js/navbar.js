document.addEventListener('DOMContentLoaded', function() {
    function toggleNav() {
        var menuDiv = document.getElementById("MenuDiv");
        menuDiv.style.width = menuDiv.style.width === "100%" ? "0" : "100%";
    }

    document.querySelector('.toggleBtn').addEventListener('click', toggleNav);
});