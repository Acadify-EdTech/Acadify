document.addEventListener('DOMContentLoaded', function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/gruvbox");
    editor.session.setMode("ace/mode/c_cpp");
});