var socket = io();

const success = (position) => {
  console.log(position)
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;

  var coor = 'Longitute = ' + longitude + '\n' + 'latitude = ' + latitude;
  console.log(coor)

  return coor
}
const error = (error) => {
  current_location.textContent = `Couldn't access your location \n Reason: ${PositionError.message}`;
}
const getLocation = async () => {
  if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(success,error);
  else 
    current_location.textContent = `Your browser does not support this feature`;
}



window.onload = async function(){ 

  var coor = await getLocation()
  console.log(coor)

  var serviceButton= document.getElementById('serviceBtn');
  var repButton= document.getElementById('repBtn');
  var inspectionButton= document.getElementById('inspectionBtn');

  var header = document.getElementById('ElevatorIDHeader');

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const elevatorID = urlParams.get('id')

  header.innerText = "Elevator ID: " + elevatorID

  serviceButton.onclick = function() {
    socket.emit('new_visit', [elevatorID, coor]);
  }
  repButton.onclick = function() {
    socket.emit('new_visit', [elevatorID, coor]);
  }
  inspectionButton.onclick = function() {
    socket.emit('new_visit', [elevatorID, coor]);
  }

  socket.on('handyman', function(open_hm) {
    location.href = open_hm;
  });
};

