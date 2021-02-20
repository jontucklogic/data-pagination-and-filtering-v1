/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Header variable
const header = document.querySelector('.header');

// Search bar
const searchBar = `
   <label for="search" class="student-search">
      <p id="alert-message"></p>
      <input id="search" placeholder="Search by name...">
      <button type="button" id="search-btn"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;

header.insertAdjacentHTML('beforeend', searchBar);


// Number of students to display at any given time
const perPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   // Variables to represent the index of the first and last student on the current page
   const startIndex = (page * perPage) - perPage;
   const endIndex = (page * perPage);

   // Select student list UL from the DOM and reset it to an empty string
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   // Loop through the student objects and rendering each student and their details to the UI
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;

         studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // Determine the number of pages needed in order to display all students
   const numOfPages = Math.ceil(list.length / perPage);

   // Selecting the pagination list UL from the DOM and reset it to an empty string
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   // Loop through and determine how many buttons should be displayed based on the value of 'numOfPages'
   for (let i = 1; i <= numOfPages; i++) {
      const button = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;

      linkList.insertAdjacentHTML('beforeend', button);

      linkList.querySelector('button').className = 'active';
   }

   // Click event listener on all buttons to add and remove active class
   linkList.addEventListener('click', (e) => {
      const target = e.target;

      if (target.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         target.className = 'active';

         showPage(list, target.textContent);
      }
   })
}


// Search DOM Variables
const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');

// Search student function
function searchStudent() {
   const userValue = searchInput.value.toLowerCase();
   const filteredStudents = [];

   if (searchInput.value.length !== 0) {
      for (let i = 0; i < data.length; i++) {
         const firstName = data[i].name.first.toLowerCase();
         const lastName = data[i].name.last.toLowerCase();

         if (firstName.includes(userValue) || lastName.includes(userValue)) {
            filteredStudents.push(data[i]);
         }
      }

      // Call functions and update students displayed as well as the pagination
      showPage(filteredStudents, 1);
      addPagination(filteredStudents);

      // Alert message when no students have been found from search
      alertDisplay(filteredStudents);

   } else {

      // Display all students if search field is empty
      showPage(data, 1);
      addPagination(data);
   }

}

// Alert function
function alertDisplay(array) {
   const alertMessage = document.querySelector('#alert-message');

   if (array.length === 0) {
      alertMessage.style.color = 'red';
      alertMessage.textContent = 'No Results Found. Please Try Searching Again.';
   } else {
      alertMessage.textContent = '';
   }
}

// 'keyup' event to search student
searchInput.addEventListener('keyup', () => {
   searchStudent();
})

// 'click' event to search student
searchBtn.addEventListener('click', (e) => {
   e.preventDefault();

   searchStudent();
})

// Call functions
showPage(data, 1);
addPagination(data);