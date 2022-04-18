//========================================
//  Treehouse FSJS Techdegree
//  Project 5 - Public API Requests
// =========================================

/*********** Global Variables *****************/
let employees = []; //array of employees
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob&noinfo &nat=US`;
const galleryContainer = document.getElementById('gallery');
const searchBox = document.querySelector('.search-container');
const bodyHtml = document.querySelector('body');
let currentModalIndex;
let found = true;


/************** Get Employee Data ******************/
fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

  /**************** Display Employee Data ********************/
  function displayEmployees(employeeData) {
    employees = employeeData;

    //store created employee Data
    let employeeHTML = '';

    //Loop though each employee to create html
    employeeData.forEach((employee,index) => {
      const name = employee.name;
      const email = employee.email;
      const city = employee.location.city;
      const state = employee.location.state;
      const picture = employee.picture;

      employeeHTML += `
        <div class="card" data-index="${index}">
          <div class="card-img-container">
            <img class="card-img" src="${picture.large}" alt=profile picture">
            </div>
            <div class="card-info-container">
              <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
              <p class="card-text">${email}</p>
              <p class="card-text cap">${city}, ${state}</p>
            </div>
          </div>
      `;
    });
    galleryContainer.insertAdjacentHTML('beforeend', employeeHTML); //Display employee info on screen
  }

  /*****************Display Search Box **********************/
  const searchField = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>`;

// Display search field on screen
searchBox.insertAdjacentHTML('beforeend', searchField);

  /********************* Searching for Employee *******************************/
  const searchBoxInput = document.getElementById('search-input');    //Gets search input field
searchBoxInput.addEventListener('keyup', employeeSearch);          // Keyup event listener for search

function employeeSearch() {

    const input = searchBoxInput.value.toLowerCase();   //Gets input and continuously saves to "input"
    const empCards = document.getElementsByClassName('card');       //Gets employee cards
    const empNames = document.getElementsByClassName('card-name');  //Gets eemployee names
    let employeesDisplayed = 0;    // Tracks number of employees found

    // If employee found, removes "Not found message"
    if(found === false){
        const noResultsFound = document.getElementById("no-results");   // Gets no results message
        noResultsFound.remove();
    };

    // Loop for searching names
    for (let i= 0; i < employees.length; i++) {
        if (empNames[i].textContent.toLowerCase().includes(input)) {
            empCards[i].style.display = '';
            employeesDisplayed++;
            found = true;
        } else {
            empCards[i].style.display = 'none';
        }
    }
    // Not found message display
    if(employeesDisplayed == 0) {
        galleryContainer.insertAdjacentHTML('beforeend', "<h1 id = 'no-results'>Oops, their are no students by that name.</h1>");
        found = false;
    }
}

/***************** Display Modal (student focus pop-up) ********************************/
function displayModal(index) {

    const {name, dob, phone, email, location :{city, street, state, postcode}, picture} = employees[index];
    const newFormatPhone = phone.replace(/-/,' ');  // Format phone number
    const birthday = formatDateOfBirth(dob);        // Format date of birth

    const modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${city}</p>
                    <hr>
                    <p class="modal-text">${newFormatPhone}</p>
                    <p class="modal-text">${street.number} ${street.name}, ${city}, ${state} ${postcode}</p>
                    <p class="modal-text">Birthday: ${birthday}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;

    bodyHtml.insertAdjacentHTML('beforeend', modalHTML); //Put in Document
    const modalClose = document.getElementById('modal-close-btn'); //close button
    const modalButtons = document.querySelector('.modal-btn-container'); //prev and next buttons
    const nextEmployee = document.getElementById('modal-next'); //next button
    const prevEmployee = document.getElementById('modal-prev'); //previous button

//close modal
modalClose.addEventListener('click', e =>{
  document.body.removeChild(document.body.lastElementChild);
});

//selecting next employee in Modal
modalButtons.addEventListener('click', e => {
  if(e.target === nextEmployee && currentModalIndex < employees.length -1){
    currentModalIndex++;
  }else if(e.target === nextEmplyee && currentModalIndex == employees.length -1) {
    currentModalIndex = 0;
  }else if(e.target === prevtEmplyee && currentModalIndex > 0) {
    currentModalIndex --;
  }else if(e.target === prevtEmplyee && currentModalIndex == 0) {
    currentModalIndex = employee.length - 1;
  }
  document.body.removeChild(document.body.lastElementChild); //remove modal before displaying next modal
  displayModal(currentModalIndex);
});
}

/******************* DOB Function **********************/
function formatDateOfBirth(dateOfBirth){

    const year = dateOfBirth.date.slice(0.4);
    const month = dateOfBirth.date.slice(5,7);
    const day = dateOfBirth.date.slice(8/10);
    return `${month}/${day}/${year}`;
}

/****************** eventListener to display Modal***************/
galleryContainer.addEventListener('click', e =>{

    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');
    currentModalIndex = index;
    displayModal (currentModalIndex);
});
