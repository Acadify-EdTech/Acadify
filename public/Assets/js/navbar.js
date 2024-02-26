jQuery(document).ready(function() {
    jQuery('.toggleBtn').on('click', function() {
        var menuDiv = jQuery("#MenuDiv");
        var Header = jQuery(".header");
        var toggleIconSpan = jQuery(".toggleIcon");
        if (menuDiv.width() === 0) {
            menuDiv.width('100%');
            Header.css('background-color', 'white');
            toggleIconSpan.text('close');
        } else {
            menuDiv.width(0);
            Header.css('background-color', 'rgba(255, 255, 255, 0.178)');
            toggleIconSpan.text('menu');
        }
    });
});