function saveUserInput() {
    var userInput = document.getElementById('userInput').value;
    if (/[^a-zA-Z]/.test(userInput)) {  // Check if the input contains any non-letter character
        alert('Please input text only! No numbers or special characters allowed.');
        document.getElementById('userInput').value = '';  // Clear the input field

    } else if (userInput === "") {
        alert('Please input something!');
    }
    else {
        localStorage.setItem('userInput', userInput);
        window.location.href = 'hangman.html';  // Redirect to the second HTML file
    }
}