$(document).ready(function(){
    const randomUsersUrl = "https://randomuser.me/api/?results=18&nat=us";
    const employeesList = document.querySelector('.employees-list');
    const statusParagraph = document.getElementById('status');

    /*
    * Callback
    * */

    const insertEmployees = function(data) {
        data.results.forEach((item) => {
            employeesList.innerHTML += generateEmployee(item);
        });
        statusParagraph.style.display = "none";
    }

    const generateEmployee = function(data){
        return `
            <div class="employee-item">
            <img src="${data.picture.large}" alt="${data.name.first}' profile picture">
                <div class="employee-info">
                    <h3>${data.name.first} ${data.name.last}</h3>
                    <p>${data.email}</p>
                    <p>${data.location.city}</p>
                </div>
            </div>
        `;
    }

    /*
    * Fetch part
    * */

    fetch(randomUsersUrl).then(res => res.json()).then(insertEmployees);
});