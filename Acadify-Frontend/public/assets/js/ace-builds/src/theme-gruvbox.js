define("ace/theme/gruvbox-css",["require","exports","module"], function(require, exports, module){
    module.exports = `
    .ace-gruvbox .ace_gutter-active-line {
        background-color: var(--theme-color-1);
      }
      
      .ace-gruvbox {
        color: var(--theme-color-2);
      }
      
      .ace-gruvbox .ace_invisible {
        color: var(--theme-color-1);
      }
      
      .ace-gruvbox .ace_marker-layer .ace_selection {
        background: var(--theme-color-4);
      }
      
      .ace-gruvbox.ace_multiselect .ace_selection.ace_start {
        box-shadow: 0 0 3px 0px var(--theme-color-4);
      }
      
      .ace-gruvbox .ace_keyword {
        color: var(--theme-color-6);
      }
      
      .ace-gruvbox .ace_comment {
        font-style: italic;
        color: var(--theme-color-5);
      }
      
      .ace-gruvbox .ace-statement {
        color: var(--theme-color-7);
      }
      
      .ace-gruvbox .ace_variable {
        color: var(--theme-color-8);
      }
      
      .ace-gruvbox .ace_variable.ace_language {
        color: var(--theme-color-8);
      }
      
      .ace-gruvbox .ace_constant {
        color: var(--theme-color-8);
      }
      
      .ace-gruvbox .ace_constant.ace_language {
        color: var(--theme-color-8);
      }
      
      .ace-gruvbox .ace_constant.ace_numeric {
        color: var(--theme-color-8);
      }
      
      .ace-gruvbox .ace_string {
        color: var(--theme-color-9);
      }
      
      .ace-gruvbox .ace_support {
        color: var(--theme-color-7);
      }
      
      .ace-gruvbox .ace_support.ace_function {
        color: var(--theme-color-7);
      }
      
      .ace-gruvbox .ace_storage {
        color: var(--theme-color-10);
      }
      
      .ace-gruvbox .ace_keyword.ace_operator,
      .ace-gruvbox .ace_punctuation.ace_operator {
        color: var(--theme-color-10);
      }
      
      .ace-gruvbox .ace_marker-layer .ace_active-line {
        background: var(--theme-color-3);
      }
      
      .ace-gruvbox .ace_marker-layer .ace_selected-word {
        border-radius: 4px;
        border: 1px solid var(--theme-color-5);
      }
      
      .ace-gruvbox .ace_print-margin {
        width: 5px;
        background: var(--theme-color-1);
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
            