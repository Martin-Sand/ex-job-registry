var socket = io();


window.onload = function(){
    var list = document.getElementById('visitList');
    var filterButton = document.getElementById('filterBtn');
    var id = '';
    socket.emit('default_list');

    filterButton.onclick = function() {
        var elevatorID = document.getElementById('elevatorIDfilter').value;
        var daysBackward = document.getElementById('daysFilter').value;
        console.log(elevatorID, daysBackward);
        socket.emit('filter_list', [elevatorID, daysBackward]);
    };

    socket.on('visit_list', function(visit_list) {
        list.innerHTML = "";
        visit_list.forEach(function (item, index) {
            list.appendChild(create_list_item(item));
        });
    });
}

function create_list_item(item){
    const container = document.createElement('div')
    container.classList.add("listItem");

    const id = document.createElement('p');
    const type = document.createElement('p');
    const coor = document.createElement('p');
    const date = document.createElement('p');

    const new_date = change_date_format(item.createdAt)

    const id_content = document.createTextNode(item.elevatorID);
    const type_content = document.createTextNode(item.jobType);
    const coor_content = document.createTextNode('(' + item.coordinates + ')')
    const date_content = document.createTextNode(new_date);

    id.appendChild(id_content);
    type.appendChild(type_content);
    coor.appendChild(coor_content)
    date.appendChild(date_content);


    container.appendChild(id);
    container.appendChild(type);
    container.appendChild(coor)
    container.appendChild(date);

    return(container);
};

function change_date_format(date){
    const iso_date = new Date(date)
    console.log(iso_date)
    var year = iso_date.getFullYear();
    var month = iso_date.getMonth()+1;
    var dt = iso_date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    const new_date = (year+'-' + month + '-'+dt);

    return new_date;
}