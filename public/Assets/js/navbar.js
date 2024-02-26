jQuery(document).ready(function() {
    jQuery('.toggleBtn').on('click', function() {
        var menuDiv = jQuery("#MenuDiv");
        if (menuDiv.width() === 0) {
            menuDiv.width('100%');
        } else {
            menuDiv.width(0);
        }
    });
});