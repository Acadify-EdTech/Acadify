//FIXME #15 

jQuery(document).ready(function() {
    jQuery('.toggleBtn').on('click', function() {
        var menuDiv = jQuery("#MenuDiv");
        var Header = jQuery(".header");
        var toggleIconSpan = jQuery(".toggleIcon");
        if (menuDiv.width() === 0) {
            menuDiv.width('100%');
            Header.css('background-color', 'white');
        } else {
            menuDiv.width(0);
            Header.css('background-color', 'var(--md-sys-color-surface-container)');
        }
    });

        jQuery('.navButton').each(function() {
            if (jQuery(this).attr('href') === window.location.pathname) {
                var html = jQuery(this).prop('outerHTML').replace('md-outlined-button', 'md-filled-button');
                jQuery(this).replaceWith(html);
            }
        });

});

jQuery(document).ready(function() {
    if (window.location.pathname === '/codeEditor') {
        var html = jQuery('#solutions').prop('outerHTML').replace('md-outlined-button', 'md-filled-button');
        jQuery('#solutions').replaceWith(html);
    }

    const anchorEl = jQuery('#root-anchor');
    const menuEl = jQuery('#root-menu');

    anchorEl.click(() => { menuEl.prop('open', !menuEl.prop('open')); });
});