// Assignment Code
var generateBtn = document.querySelector("#generate");

// Function to prompt user for password options
function getPasswordOptions() {
  // parseInt converts string input to an integer
  var length = parseInt(prompt("How many characters would you like your password to be?"));

  if (isNaN(length) === true || length < 8 || length > 128) {
    alert("Password length must be between 8 and 128 characters.");
    return null;
  }

  // Confirm whether or not to include different character types
  var hasLowercase = confirm("Click OK to include lowercase characters.");
  var hasUppercase = confirm("Click OK to include uppercase characters.");
  var hasNumbers = confirm("Click OK to include numeric characters.");
  var hasSpecial = confirm("Click OK to include special characters.");

  // Check if at least one character type is selected
  if (hasLowercase === false &&
      hasUppercase === false &&
      hasNumbers === false &&
      hasSpecial === false) {
    alert("Must select at least one character type.");
    return null;
  }

  // Store user input
  var passwordOptions = {
    length: length,
    hasLowercase: hasLowercase,
    hasUppercase: hasUppercase,
    hasNumbers: hasNumbers,
    hasSpecial: hasSpecial
  };

  return passwordOptions;
}

// Function to generate password with user options
function generatePassword() {
  var options = getPasswordOptions();
  if (!options) return '';

  var possibleCharacters = '';
  var guaranteedCharacters = '';
  var generatedPassword = '';

  // Functions for generating random characters
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSpecial() {
    var specialChars = '!@#$%^&*()_+{}:"<>?[];,./\'\\`~';
    return specialChars[Math.floor(Math.random() * specialChars.length)];
  }

  // Build a string of possible characters and guarantee at least one of each selected type
  if (options.hasLowercase) {
    possibleCharacters += 'abcdefghijklmnopqrstuvwxyz';
    guaranteedCharacters += getRandomLower();
  }

  if (options.hasUppercase) {
    possibleCharacters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    guaranteedCharacters += getRandomUpper();
  }

  if (options.hasNumbers) {
    possibleCharacters += '0123456789';
    guaranteedCharacters += getRandomNumber();
  }

  if (options.hasSpecial) {
    possibleCharacters += '!@#$%^&*()_+{}:"<>?[];,./\'\\`~';
    guaranteedCharacters += getRandomSpecial();
  }

  // Generate the password
  for (var i = 0; i < options.length; i++) {
    if (i < guaranteedCharacters.length) {
      generatedPassword += guaranteedCharacters[i];
    } else {
      generatedPassword += possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
    }
  }

  // Shuffle the generated password to avoid the guaranteed characters being at the start
  generatedPassword = generatedPassword.split('').sort(function() { return 0.5 - Math.random() }).join('');

  return generatedPassword;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  console.log(password);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
