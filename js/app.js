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

    /*
    * Event Listener
    * */

    $('header input').on("input", function () {
        let searchFor = $(this).val().toLowerCase();
        if(searchFor.length > 0){
            $(".employee-item").each(function () {
                const currentEmployee = $(this).find('h3').text().toLowerCase();
                if(currentEmployee.indexOf(searchFor) >= 0){
                    $(this).show();
                }else {
                    $(this).hide();
                }
            });
        }else {
            $(".employee-item").show();
        }
        if($(".employee-item:not(:hidden)").length === 0){
            statusParagraph.style.display = "";
        }else{
            statusParagraph.style.display = "none";
        }
    });
});