let incorrectGuesses = 0;

document.addEventListener('DOMContentLoaded', function () {
    var userInput = localStorage.getItem('userInput');
    if (userInput) {
        userInput = userInput.toUpperCase(); // Ensure the user input is in uppercase
        generateInputFields(userInput);
    }
});

function generateInputFields(userInput) {
    var length = userInput.length; // Get the length of the user's input
    var container = document.getElementById('inputContainer'); // Get the container where the input fields will be added
    container.innerHTML = '';  // Clear any existing input fields in the container

    // Generate and add the new input fields
    for (var i = 0; i < length; i++) {
        // Create a new input field
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = '';
        inputField.className = 'generatedfields';
        inputField.readOnly = true;
        container.appendChild(inputField);  // Append the input field to the container
    }

    const divToShow = document.getElementById("maincon");
    divToShow.style.display = "block";

    // Call the function to set up the listeners after showing the main container
    setupKeyboardListeners(userInput);
}

function setupKeyboardListeners(userInput) {
    var buttons = document.querySelectorAll('.letters');  // Get all buttons with the class 'letters'
    var inputFields = document.querySelectorAll('.generatedfields');  // Get all generated input fields

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            handleButtonClick(button, inputFields, userInput);
        });
    });
}

function handleButtonClick(button, inputFields, userInput) {
    var clickedLetter = button.innerText;
    var matched = false;
    var matchedIndices = []; // Track matched indices
    var gameWinner = document.getElementById("GameWinner");
    var disabledButton = document.querySelectorAll('.letters');

    for (var i = 0; i < userInput.length; i++) {
        if (userInput[i] === clickedLetter && inputFields[i].value !== clickedLetter) {
            if (!matchedIndices.includes(i)) {
                inputFields[i].value = clickedLetter;
                matched = true;
                matchedIndices.push(i);

                // Change the border color of the correct input field
                inputFields[i].style.borderColor = 'green';
                setTimeout(function (field) {
                    field.style.borderColor = ''; // Reset the border color after 2 seconds
                }, 2000, inputFields[i]);
                break; // Exit the loop after filling one occurrence
            }
        }
    }

    if (!matched) {
        inputFields.forEach(function (field) {
            field.style.borderColor = 'red';
        });
        setTimeout(function () {
            inputFields.forEach(function (field) {
                field.style.borderColor = ''; // Reset the border color after 2 seconds
            });
        }, 2000);

        // Show next hangman image
        incorrectGuesses++;
        showHangmanImage();
    }

    if (checkWin(inputFields, userInput)) {
        setTimeout(function () {
            gameWinner.style.display = 'block';
            disabledButton.forEach(disabledButton => {
                disabledButton.disabled = true;
            });
        }, 500); // 500 milliseconds delay
    }
}

function checkWin(inputFields, userInput) {
    for (var i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value !== userInput[i]) {
            return false;
        }
    }
    return true;
}

function showHangmanImage() {
    var hangmanImages = document.querySelectorAll('.hangman');
    var gameOver = document.getElementById("GameOver");
    var disabledButton = document.querySelectorAll('.letters');
    // Hide all hangman images
    hangmanImages.forEach(function (img) {
        img.style.display = 'none';
    });

    if (incorrectGuesses <= hangmanImages.length) {
        hangmanImages[incorrectGuesses - 1].style.display = 'block';
    }

    // If the maximum number of incorrect guesses is reached, show game over alert
    if (incorrectGuesses >= hangmanImages.length) {
        setTimeout(function () {
            gameOver.style.display = 'block';
            disabledButton.forEach(disabledButton => {
                disabledButton.disabled = true;
            });
        }, 1000); // 500 milliseconds delay
    }
}
