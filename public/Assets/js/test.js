document.addEventListener('DOMContentLoaded', function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/gruvbox");
    editor.session.setMode("ace/mode/c_cpp");
});

jQuery(document).ready(function () {
    jQuery('#run').click(function () {
        var code = ace.edit("editor").getValue();
        // Show the progress indicator
        jQuery('md-linear-progress').show();

        jQuery.ajax({
            type: 'POST',
            url: '/run',
            data: { code: code },
            success: function (data) {
                // Hide the progress bar
                jQuery('md-linear-progress').hide();

                // Wrap data in a <pre> tag
                
                console.log(data); // Add this line
                
                // Check if the response starts with "Compilation error"
                if (data.startsWith('Compilation error')) {
                    data = '<pre>' + data + '</pre>';
                    // Display the compiler error
                    jQuery('.outputAnswer').html(data);
                    // Add error class and remove success class
                    jQuery('.output').addClass('outputError').removeClass('outputSuccess');
                } else {
                    jQuery('.outputAnswer').html(data);
                    // Add success class and remove error class
                    jQuery('.output').addClass('outputSuccess').removeClass('outputError');
                }
            },
            error: function () {
                // Hide the progress bar
                jQuery('md-linear-progress').hide();
            }
        });
    });
});