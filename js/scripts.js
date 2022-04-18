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
  const searchBoxInput = document.getElementById('search-input');
  //Gets search Input field
  searchBoxInput.addEventListener('keyup', employeeSearch); //keyup event listener for search

  function employeeSearch(){
    const input = searchBoxInput.value.toLowerCase(); //gets input and saves Input
    const empCards = document.getElementByClassName('card'); //gets employees Cards
    const empNames = document.getElementByClassName('card-name'); //Gets employee names
    let employeeDisplayed = 0; //tracks number of employees found

    //when employee found, remove "notfound message"
    if (found === false){
      const noResultsFound = document.getElementById("no-results"); //get no result message
      noResultsFound.remove();
    };

    //loop for searching names
    for (let i = 0; i < employees.length; i++){
      if(empNames[i].textContent.toLowerCase().includes(input)){
          empCards[i].style.display = '';
          employeeDisplayed++;
          found = true;
      }else {
        empCards[i].style.display ='none';
      }
    }
    //not found display message
    if(employeeDisplayed == 0){
      galleryContainer.insertAdjacentHTML('beforeend', "<h1 id = 'no-results'> oops, no one found by that name </h1>");
      found = false;
    }
  }
