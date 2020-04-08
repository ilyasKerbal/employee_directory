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
                <div style="display: none;" class="details-box">
                    <div class="details">
                        <img src="${data.picture.large}" alt="${data.name.first}' profile picture">
                         <h3>${data.name.first} ${data.name.last}</h3>
                         <p>${data.email}</p>
                         <hr>
                         <p>${data.phone}</p>
                         <p>${data.location.street.number} ${data.location.street.name}, ${data.location.city} ${data.location.postcode}, ${data.location.state} ${data.location.country}</p>
                         <p><strong>Birth date:</strong> ${data.dob.date.substr(0, 10)}</p>
                     </div>
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

    $('.employees-list').on('click', function (event) {
        if(event.target.className !== "employees-list"){
            let content = "";
            if(event.target.className !== "employee-item"){
                content = $(event.target).parents('.employee-item').find(".details-box").html();
            }else{
                content = $(event.target).find(".details-box").html();
            }
            $.fancybox.open(content);
        }
    });
});