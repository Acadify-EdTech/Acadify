define("ace/theme/gruvbox-css",["require","exports","module"], function(require, exports, module){
    module.exports = `
    .ace-gruvbox .ace_gutter-active-line {
        background-color: #312823; /* Darker background */
    }
    
    .ace-gruvbox {
        color: var(--md-sys-color-on-background); /* Light gray */
    }
    
    .ace-gruvbox .ace_invisible {
        color: #312823; /* Darker background */
    }
    
    .ace-gruvbox .ace_marker-layer .ace_selection {
        background: rgba(229, 191, 169, 0.15);
    }
    
    .ace-gruvbox.ace_multiselect .ace_selection.ace_start {
        box-shadow: 0 0 3px 0px rgba(229, 191, 169, 0.15);
    }
    
    .ace-gruvbox .ace_keyword {
        color: var(--md-sys-color-primary); /* Light teal */
    }
    
    .ace-gruvbox .ace_comment {
        font-style: italic;
        color: var(--md-sys-color-outline); /* Light brown */
    }
    
    .ace-gruvbox .ace-statement {
        color: #B8BB26; /* Bright yellow */
    }
    
    .ace-gruvbox .ace_variable {
        color: #FABD2F; /* Bright orange */
    }
    
    .ace-gruvbox .ace_variable.ace_language {
        color: #FABD2F; /* Bright orange */
    }
    
    .ace-gruvbox .ace_constant {
        color: rgb(255, 137, 137); /* Light magenta */
    }
    
    .ace-gruvbox .ace_constant.ace_language {
        color: rgb(255, 137, 137) /* Light magenta */
    }
    
    .ace-gruvbox .ace_constant.ace_numeric {
        color: rgb(255, 137, 137); /* Light magenta */
    }
    
    .ace-gruvbox .ace_string {
        color: rgb(166, 255, 137); /* Light green */
    }
    
    .ace-gruvbox .ace_support {
        color: #B8BB26; /* Bright yellow */
    }
    
    .ace-gruvbox .ace_support.ace_function {
        color: #B8BB26; /* Bright yellow */
    }
    
    .ace-gruvbox .ace_storage {
        color: rgb(115, 206, 138); /* Light teal */
    }
    
    .ace-gruvbox .ace_keyword.ace_operator {
        color: rgb(115, 206, 138); /* Light teal */
    }
    
    .ace-gruvbox .ace_punctuation.ace_operator {
        color: rgb(115, 206, 138); /* Light teal */
    }
    
    .ace-gruvbox .ace_marker-layer .ace_active-line {
        background: #443B35; /* Darker gray */
    }
    
    .ace-gruvbox .ace_marker-layer .ace_selected-word {
        border-radius: 4px;
        border: 1px solid #665C54; /* Brown */
    }
    
    .ace-gruvbox .ace_print-margin {
        width: 5px;
        background: #312823; /* Darker background */
    }
    
    .ace-gruvbox .ace_indent-guide {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACAQMAAACjTyRkAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFACs1za2aRocSpAAAAAJ0Uk5TTf8eRhP9AAAADElEQVR4nGNgYGgAAACEAIHJde6SAAAAAElFTkSuQmCC) right repeat-y;
    }
    
    .ace-gruvbox .ace_indent-guide-active {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACAQMAAACjTyRkAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFACs1za2aRocSpAAAAAJ0Uk5TTf8eRhP9AAAADElEQVR4nGNgYGgAAACEAIHJde6SAAAAAElFTkSuQmCC) right repeat-y;
    }
    `;
    }); 
    
    

define("ace/theme/gruvbox",["require","exports","module","ace/theme/gruvbox-css","ace/lib/dom"], function(require, exports, module){exports.isDark = true;
exports.cssClass = "ace-gruvbox";
exports.cssText = require("./gruvbox-css");
var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass, false);

});                (function() {
                    window.require(["ace/theme/gruvbox"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            