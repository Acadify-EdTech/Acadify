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

    document.getElementById("submit").addEventListener('click', (event) => {
        // Switch to the output tab
        document.querySelector("md-tabs").activeTabIndex = 0;
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


    // Current question index
    let currentQuestionIndex = 0;

    // List of questions
    let questions = [];

    let userCode = [];

    window.onload = async function () {
        const response = await fetch("http://localhost:4000/api/questions1");
        questions = await response.json();

        userCode = new Array(questions.length).fill('');

        // Display the first question
        displayQuestion(currentQuestionIndex);
    };

    function displayQuestion(index) {
        const question = questions[index];

        document.getElementById('title').textContent = question.title;
        document.getElementById('description').textContent = question.description;
        document.getElementById('language').textContent = question.language;
        document.getElementById('inputDescription').textContent = question.inputDescription;
        document.getElementById('outputDescription').textContent = question.outputDescription;

        // Display examples and test cases

        const examplesTable = document.getElementById('examples');
        while (examplesTable.rows.length > 1) {
            examplesTable.deleteRow(1);
        }
        question.examples.forEach((example) => {
            const row = examplesTable.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            cell1.textContent = example.input;
            cell2.textContent = example.output;
        });

        const testCasesTable = document.getElementById('testCases');
        while (testCasesTable.rows.length > 1) {
            testCasesTable.deleteRow(1);
        }
        question.testCases.forEach((testCase, index) => {
            const row = testCasesTable.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            cell1.textContent = testCase.input;
            cell2.textContent = testCase.output;
        });

        const testCaseTable = document.getElementById('testcaseTable');
        while (testCaseTable.rows.length > 1) {
            testCaseTable.deleteRow(1);
        }

        const results = testCaseResults[index];
        if (results) {
            // Display the stored results
            for (let result of results) {
                const row = testCaseTable.insertRow();
                const cell1 = row.insertCell();
                const cell2 = row.insertCell();
                const cell3 = row.insertCell();
                const cell4 = row.insertCell();
                cell1.textContent = result.input;
                cell2.textContent = result.expectedOutput;
                cell3.textContent = result.output;
                if (result.result === 'Passed') {
                    cell4.classList.add('passed');
                } else if (result.result === 'Failed') {
                    cell4.classList.add('failed');
                }
                cell4.textContent = result.result;
            }
        } else {
            const testCaseTable = document.getElementById('testcaseTable');
            while (testCaseTable.rows.length > 1) {
                testCaseTable.deleteRow(1);
            }
            question.testCases.forEach((testCase, index) => {
                const row = testCaseTable.insertRow();
                const cell1 = row.insertCell();
                const cell2 = row.insertCell();
                const cell3 = row.insertCell();
                const cell4 = row.insertCell();
                cell1.textContent = testCase.input;
                cell2.textContent = testCase.output;
                cell3.textContent = "";
                cell4.textContent = ""; 
            });
        }

        // Clear previous constraints
        document.getElementById('constraints').innerHTML = '';

        // Display constraints
        const constraintsList = document.getElementById('constraints');
        question.constraints.forEach((constraint) => {
            const li = document.createElement('li');
            li.textContent = constraint;
            constraintsList.appendChild(li);
        });

        const readOnlyCode = question.codePlaceholder;
        let userCodeForQuestion = userCode[index];

        if (!userCodeForQuestion) {
            userCodeForQuestion = readOnlyCode;
            userCode[index] = userCodeForQuestion;
        }

        editor.setValue(userCodeForQuestion, -1);
    }

    // Previous button
    document.getElementById('prevButton').addEventListener('click', function () {
        if (currentQuestionIndex > 0) {
            // Save user's code
            userCode[currentQuestionIndex] = editor.getValue();

            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
        }
    });

    // Next button
    document.getElementById('nextButton').addEventListener('click', function () {
        if (currentQuestionIndex < questions.length - 1) {
            // Save user's code
            userCode[currentQuestionIndex] = editor.getValue();

            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        }
    });
    let testCaseResults = [];
    document.getElementById('submit').addEventListener('click', async function () {
        const code = ace.edit("editor").getValue();
        const testCases = questions[currentQuestionIndex].testCases;

        // Show the progress bar
        document.getElementById('linearProgress').style.display = 'block';

        const response = await fetch('/submitCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code, testCases: testCases }),
        });

        const results = await response.json();
        // Store the results
        testCaseResults[currentQuestionIndex] = results;

        // Hide the progress bar
        document.getElementById('linearProgress').style.display = 'none';

        const table = document.getElementById('testcaseTable');

        // Clear the table
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        // Display the results in the table
        for (let result of results) {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell3 = row.insertCell();
            const cell4 = row.insertCell();
            cell1.textContent = result.input;
            cell2.textContent = result.expectedOutput;
            cell3.textContent = result.output;
            if (result.result === 'Passed') {
                cell4.classList.add('passed');
            } else if (result.result === 'Failed') {
                cell4.classList.add('failed');
            }
            cell4.textContent = result.result;
        }
    });

    // Switch functionality
    document.querySelector('md-switch').addEventListener('change', function () {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');
    });
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