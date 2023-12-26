var customers = []

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = {
        id: getCurrentId(),
        name: form.name.value,
        dob: form.dob.value,
        nationality: form.nationality.value,
        aadhar: form.aadhar.value,
        mobile: form.mobile.value,
        address: form.address.value,
        city: form.city.value,
        bankName: form.bankName.value,
        accountName: form.accountName.value,
        accountNumber: form.accountNumber.value,
        ifsc: form.ifsc.value,
        bankAddress: form.bankAddress.value,
        make: form.make.value,
        model: form.model.value,
        manufacturer: form.manufacturer.value,
        dateOfManufacture: form.dateOfManufacture.value,
        country: form.country.value,
        number: form.number.value,
        chassisNumber: form.chassisNumber.value,
        engineType: form.engineType.value
      };

      incrementId();
  
      try {
        const response = await fetch('https://reqres.in/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          const jsonResponse = await response.json();
          // console.log(jsonResponse);

          // saving things to local storage
          customers = retrieveCustomers();
          customers.push(formData);
          storeCustomers(customers);
          
          // Navigate to the customer list page
          window.location.href = 'customer-list.html';
        } else {
          console.error('Error submitting form data:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
    });
});


    
function restrictToTextOnly(event) {
    const input = event.target.value;
    const textOnly = input.replace(/[^a-zA-Z\s]/g, '');
    event.target.value = textOnly;
}

const textOnlyInputs = document.getElementsByClassName('text-only');

for (let i = 0; i < textOnlyInputs.length; i++) {
    textOnlyInputs[i].addEventListener('input', restrictToTextOnly);
}



function restrictToNumbersOnly(event) {
    const input = event.target.value;
    const numbersOnly = input.replace(/[^0-9]/g, '');
    event.target.value = numbersOnly;
}

const numbersOnlyInputs = document.getElementsByClassName('numbers-only');
  
for (let i = 0; i < numbersOnlyInputs.length; i++) {
    numbersOnlyInputs[i].addEventListener('input', restrictToNumbersOnly);
}



function getCurrentId() {
  // Get the current ID from localStorage or set it to 0 if it doesn't exist
  const currentId = parseInt(localStorage.getItem('currentId')) || 0;
  return currentId;
}

function incrementId() {
  const newId = getCurrentId() + 1;
  // Save the new ID to localStorage
  localStorage.setItem('currentId', newId);
  return newId;
}

function retrieveCustomers() {
  const storedCustomers = localStorage.getItem('customers');
  return Array.isArray(JSON.parse(storedCustomers)) ? JSON.parse(storedCustomers) : [];
}

function storeCustomers(customers) {
  localStorage.setItem('customers', JSON.stringify(customers));
}