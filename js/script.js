//========================================
//  Treehouse FSJS Techdegree
//  Project 5 - Public API Requests
// =========================================

/*********** Global Variables *****************/
let employees = []; //array of employees
const urlAPI = `https://ramdomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob&noinfo &nat=US`;
const galleryContainer = document.getElementById('gallery');


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
