document.addEventListener('DOMContentLoaded', function() {
    
    $('[data-toggle="tooltip"]').tooltip();

    function validateInput(selector) {
        var input = document.querySelector(selector);
        if (input.value.trim() === '') {
            input.classList.add('is-invalid');
            return false;
        } else {
            input.classList.remove('is-invalid');
            return true;
        }
    }

    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate inputs
        var isServiceSelected = validateInput('#service-select');
        var isDateSelected = validateInput('#date-input');
        var isTimeSelected = validateInput('#time-input');
        var isBarberSelected = validateInput('#barber-select'); 
        var isNameEntered = validateInput('#name-input');
        var isEmailEntered = validateInput('#email-input');
        var isPhoneEntered = validateInput('#phone-input');

        // If all validations pass
        if (isServiceSelected && isDateSelected && isTimeSelected && isBarberSelected && isNameEntered && isEmailEntered) {
            // Process the booking

            // Show a success message
            alert('Thank you for booking with Stylish Strokes!'); // Temporary alert
        }
    });
});

document.getElementById('chatbot-toggle-button').addEventListener('click', function() {
    var iframeContainer = document.getElementById('chatbot-iframe-container');
    iframeContainer.style.display = iframeContainer.style.display === 'none' ? 'block' : 'none';
});

$(document).ready(function(){
    $('input, select').focus(function(){
      $(this).css('background-color', '#e8f0fe');
    }).blur(function(){
      $(this).css('background-color', 'white');
    });
  });

  function validatePhoneNumber(phone) {
  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(phone);
}

// $('#booking-form').submit(function(event){
// //   event.preventDefault();
// //   var phone = $('#phone-input').val();
// //   var cardNumber = $('#card-number-input').val(); // Assuming you have a field for credit card input

// //   if (!validatePhoneNumber(phone)) {
// //     alert('Please enter a valid phone number (10 to 12 digits).');
// //     return false;
// //   }

// //   if (!validateCreditCard(cardNumber)) {
// //     alert('Please enter a valid credit card number between 8 and 19 digits.');
// //     return false;
// //   }

//   // Add more validations as needed
//   alert('Form is valid!');
//   // Process the form submission here
// });

$(document).ready(function() {
    $('#payment-form').on('submit', function(e) {
        e.preventDefault(); // Prevent the actual form submission

        var cardName = $('#card-name').val().trim();
        var cardNumber = $('#card-number').val().trim();
        var cardExpiry = $('#card-expiry').val().trim();
        var cardCVV = $('#card-cvv').val().trim();

        if(cardName && cardNumber && cardExpiry && cardCVV) {
            alert('Payment information submitted successfully.');

        } else {
            alert('Please fill out all required fields.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var barberSelect = document.getElementById('barber-select');
    var dateInput = document.getElementById('date-input');
    var timeInput = document.getElementById('time-input');

    // Barber's off days
    var offDays = {
        'Laura': [0], // Laura is off on Mondays
        'Jonah': [2]  // Jonah is off on Wednesdays
    };

    // Disable unavailable dates and provide feedback messages
    function disableDates(date) {
        var day = date.getDay();
        var barber = barberSelect.value;

        // Disable weekends
        if (day === 5 || day === 6) return { disabled: true, message: "Weekends are not available for booking." };

        // Disable barber's off days
        if (offDays[barber] && offDays[barber].includes(day)) {
            return { disabled: true, message: barber + " is not available on this day. Please select another date." };
        }

        return { disabled: false };
    }

    // Update the date picker for available dates
    barberSelect.addEventListener('change', function() {
        var today = new Date();
        var maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() + 1); // 1 year from now

        // Refresh the date input to check against new barber's schedule
        dateInput.setAttribute("min", today.toISOString().split("T")[0]);
        dateInput.setAttribute("max", maxDate.toISOString().split("T")[0]);
    });

    // Validate date and time input
    dateInput.addEventListener('change', function() {
        var selectedDate = new Date(dateInput.value);

        // Check if the date is valid
        var dateStatus = disableDates(selectedDate);
        if (dateStatus.disabled) {
            alert(dateStatus.message);
            dateInput.value = ''; // Reset the date input
        }
    });

    // Enforce booking time constraints
    timeInput.addEventListener('change', function() {
        var selectedTime = timeInput.value;
        var timeParts = selectedTime.split(':');
        var hours = parseInt(timeParts[0], 10);
        var minutes = parseInt(timeParts[1], 10);
        
        // Convert the selected time to minutes for easier comparison
        var selectedTimeInMinutes = (hours * 60) + minutes;
        
        // Define the booking time constraints in minutes
        var openingTimeInMinutes = 7 * 60; // 7:00 AM
        var closingTimeInMinutes = 22 * 60; // 10:00 PM

        // Check if the selected time is within allowed booking hours
        if (selectedTimeInMinutes < openingTimeInMinutes || selectedTimeInMinutes > closingTimeInMinutes) {
            alert("Bookings are only available from 7 AM to 10 PM.");
            timeInput.value = ''; // Reset the time input
        }
    });
});


// Function to validate name input to allow only string values
function validateNameInput(selector) {
    var input = document.querySelector(selector);
    if (!/^[a-zA-Z\s]*$/.test(input.value.trim())) {
        input.classList.add('is-invalid');
        return false;
    } else {
        input.classList.remove('is-invalid');
        return true;
    }
}

// Function to display an alert when leaving the name input field if it contains numbers
function handleNameInputBlur() {
    var input = document.querySelector('#name-input');
    if (!/^[a-zA-Z\s]*$/.test(input.value.trim())) {
        alert('Please enter a valid name (only alphabets and spaces are allowed).');
    }
}

// Validate name input on form submission
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate name input
    var isNameValid = validateNameInput('#name-input');

    // If name validation fails
    if (!isNameValid) {
        // Show an error message or handle the error as per your requirement
        alert('Please enter a valid name (only alphabets and spaces are allowed).');
    } else {
        // Continue with form submission or any other action
        // Process the booking
        alert('Thank you for booking with Stylish Strokes!');
    }
});

// Add event listener for blur event on name input field
document.getElementById('name-input').addEventListener('blur', function() {
    handleNameInputBlur();
});

$(document).ready(function(){
    $('#phone-input').blur(function(){
        var phone = $(this).val();
        if (phone.trim() !== '' && !validatePhoneNumber(phone)) {
            alert('Please enter a valid phone number (10 to 12 digits).');
        }
    });

    // $('#booking-form').submit(function(event){
    //     event.preventDefault();
    //     var phone = $('#phone-input').val();
    //     var cardNumber = $('#card-number-input').val(); // Assuming you have a field for credit card input

    //     if (!validatePhoneNumber(phone)) {
    //         alert('Please enter a valid phone number (10 to 12 digits).');
    //         return false;
    //     }

    //     if (!validateCreditCard(cardNumber)) {
    //         alert('Please enter a valid credit card number.');
    //         return false;
    //     }

    //     // Add more validations as needed
    //     alert('Form is valid!');
    //     // Process the form submission here
    // });
});

// Function to validate cardholder's name input to allow only string values
function validateCardholderNameInput(selector) {
    var input = document.querySelector(selector);
    if (!/^[a-zA-Z\s]*$/.test(input.value.trim())) {
        input.classList.add('is-invalid');
        return false;
    } else {
        input.classList.remove('is-invalid');
        return true;
    }
}

// Function to display an alert when leaving the cardholder's name input field if it contains numbers
function handleCardholderNameInputBlur() {
    var input = document.querySelector('#card-name');
    if (!/^[a-zA-Z\s]*$/.test(input.value.trim())) {
        alert('Please enter a valid name for the cardholder (only alphabets and spaces are allowed).');
    }
}

// Add event listener for blur event on cardholder's name input field
document.getElementById('card-name').addEventListener('blur', function() {
    handleCardholderNameInputBlur();
});

$(document).ready(function(){
    $('#card-number').blur(function(){
        var cardNumber = $(this).val().replace(/\s+/g, ''); // Remove spaces from the input
        if (cardNumber.trim() !== '' && validateCardNumber(cardNumber)) {
            if (cardNumber.length >= 8 && cardNumber.length <= 19) {
                // Perform action when card number is correct
                console.log('Card number is valid:', cardNumber);
            } else {
                alert('Please enter a valid card number (between 8 and 19 digits, spaces allowed).');
            }
        } else {
            alert('Please enter a valid card number (between 8 and 19 digits, spaces allowed).');
        }
    });
});

function validateCardNumber(cardNumber) {
    // Check if the input consists only of digits
    return /^\d+$/.test(cardNumber);
}

document.addEventListener('DOMContentLoaded', function() {
    var today = new Date();
    var month = today.getMonth() + 1; // JavaScript months are zero-based
    var year = today.getFullYear();

    // Set the minimum allowed expiration date
    var minDate = year + '-' + (month < 10 ? '0' : '') + month;

    // Set the min attribute of the card expiry input field
    document.getElementById('card-expiry').setAttribute('min', minDate);
});

$(document).ready(function(){
    $('#card-cvv').blur(function(){
        var cvv = $(this).val().trim();
        if (cvv.length < 3 || cvv.length > 4 || isNaN(cvv)) {
            alert('Please enter a valid CVV (3 to 4 digits).');
        }
    });
});