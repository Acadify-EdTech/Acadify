document.addEventListener('DOMContentLoaded', function () {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/gruvbox");
    editor.session.setMode("ace/mode/c_cpp");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        cursorStyle: "smooth",
        highlightActiveLine: false,
        fontSize: "14px",
        wrap: true
    });

    document.querySelector("md-tabs").addEventListener('change', (event) => {
        event.target.parentElement.querySelectorAll('[role="tabpanel"]').forEach(function (el) {
            el.setAttribute("hidden", true);
        });
        event.target.parentElement.querySelectorAll('[role="tabpanel"]')[event.target.activeTabIndex].removeAttribute("hidden");
    });

    document.getElementById("run").addEventListener('click', (event) => {
        // Switch to the output tab
        document.querySelector("md-tabs").activeTabIndex = 1;
    });

    // Get the md-outlined-button element
    var timerButton = document.querySelector('.timer');

    // Set the countdown time in seconds (1 hour = 60 minutes = 3600 seconds)
    var countdownTime = 3600;

    // Update the timer every second
    var countdownInterval = setInterval(function () {
        // Calculate the minutes and seconds from countdownTime
        var minutes = Math.floor(countdownTime / 60);
        var seconds = countdownTime % 60;

        // Pad the minutes and seconds with leading zeros if necessary
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // Update the timer button text
        timerButton.textContent = minutes + ':' + seconds;

        // Decrease the countdown time
        countdownTime--;

        // If the countdown time reaches 0, clear the interval
        if (countdownTime < 0) {
            clearInterval(countdownInterval);
            timerButton.textContent = '00:00';
        }
    }, 1000);


    window.onload = async function () {
      const response = await fetch("http://localhost:4000/api/questions1");
      const questions = await response.json();

      questions.forEach((question) => {
        document.getElementById('title').textContent = question.title;
        document.getElementById('description').textContent = question.description;
        document.getElementById('language').textContent = question.language;
        document.getElementById('inputDescription').textContent = question.inputDescription;
        document.getElementById('outputDescription').textContent = question.outputDescription;

        // Assuming examples and testCases are arrays of objects with 'input' and 'output' properties
        const examplesTable = document.getElementById('examples');
        question.examples.forEach((example) => {
          const row = examplesTable.insertRow();
          const cell1 = row.insertCell();
          const cell2 = row.insertCell();
          cell1.textContent = example.input;
          cell2.textContent = example.output;
        });

        const testCasesTable = document.getElementById('testCases');
        question.testCases.forEach((testCase, index) => {
            const row = testCasesTable.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            cell1.textContent = testCase.input;
            cell2.textContent = testCase.output;
        });

        // Assuming constraints is an array of strings
        const constraintsList = document.getElementById('constraints');
        question.constraints.forEach((constraint) => {
          const li = document.createElement('li');
          li.textContent = constraint;
          constraintsList.appendChild(li);
        });

        editor.setValue(question.codePlaceholder, -1);

      });
    };
});

jQuery(document).ready(function () {
    jQuery('#run').click(function () {
        var code = ace.edit("editor").getValue();
        var customInput = document.getElementById('customInput').value.trim() !== "" ? document.getElementById('customInput').value : "Null";
        var outputAnswer = jQuery('.outputAnswer');
        var linearProgress = jQuery('md-linear-progress');
        jQuery('html, body').animate({
            scrollTop: jQuery('.output').offset().top
        }, 1000);
        linearProgress.show();

        if (code.trim() === "") {
            outputAnswer.html('No input provided!')
                .addClass('outputError')
                .removeClass('outputSuccess');
        } else {
            linearProgress.show();

            jQuery.ajax({
                type: 'POST',
                url: '/run',
                data: { code: code, customInput: customInput },
                success: function (data) {
                    linearProgress.hide();

                    data = '<pre>' + data + '</pre>';
                    if (data.startsWith('<pre>Compilation error') || data.startsWith('<pre>Execution timed out')) {
                        outputAnswer.addClass('outputError').removeClass('outputSuccess');
                    } else {
                        outputAnswer.addClass('outputSuccess').removeClass('outputError');
                    }

                    outputAnswer.html(data);
                },
                error: function (error) {
                    linearProgress.hide();
                    outputAnswer.html('<pre>' + error.responseText + '</pre>')
                        .addClass('outputError')
                        .removeClass('outputSuccess');
                }
            });
        }
    });
});