var socket = io();




window.onload = async function(){ 


  
  //geolocation functions
  
  const success = async (position) => {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;

    longitudeCoor.innerText = longitude;
    latitudeCoor.innerText = latitude;

    var coor = [longitude, latitude]

    console.log(coor)
  }
  const error = (error) => {
    current_location.textContent = `Couldn't access your location \n Reason: ${PositionError.message}`;
  }
  const getLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success,error);
    }
    else 
      current_location.textContent = `Your browser does not support this feature`;

  }


  //get coordinates

  var geoLoc = await getLocation()
  //Get elements in HTML
  var serviceButton= document.getElementById('serviceBtn');
  var repButton= document.getElementById('repBtn');
  var inspectionButton= document.getElementById('inspectionBtn');

  var latitudeCoor = document.getElementById('latCoor');
  var longitudeCoor = document.getElementById('longCoor');

  var header = document.getElementById('ElevatorIDHeader');

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const elevatorID = urlParams.get('id')

  header.innerText = "Elevator ID: " + elevatorID


  //onclick functions
  serviceButton.onclick = function(coor) {
    var coor = latitudeCoor.innerText + ',' + longitudeCoor.innerText
    socket.emit('new_visit', [elevatorID, coor, "Service"]);
  }
  repButton.onclick = function() {
    var coor = latitudeCoor.innerText + ',' + longitudeCoor.innerText
    socket.emit('new_visit', [elevatorID, coor, "Reperation"]);
  }
  inspectionButton.onclick = function() {
    var coor = latitudeCoor.innerText + ',' + longitudeCoor.innerText
    socket.emit('new_visit', [elevatorID, coor, "Inspection"]);
  }


  //Open HM on visit registered
  socket.on('handyman', function(open_hm) {
    location.href = open_hm;
  });



};

