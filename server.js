//import modules
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const path = require('path');

//Define port for local testing and env.PORT for deployment
const PORT = process.env.PORT || 3000;

//import DB-connection
const connectDB = require('./config/dbConn');

//import controller for DB
// ....

//import MongoDB schemas
const Visit = require('./model/Visit')


//create server
const app = express();
const server = http.createServer(app);

//Create sockets
const { Server } = require('socket.io');
const io = new Server(server);

//set static folder
app.use(express.static('public'));

//Routes
//Frontpage route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//register visit route
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/register_visit.html'));
});


//When user connects
io.on('connection', (socket) => {
    console.log('User connected');

    //Client wants default list selection
    socket.on('default_list', () => {
        //Get list of 10 latest jobs from DB
        var N = 10;
        Visit.find({}).limit(N).sort({$natural:-1}).then(r => {
            //send list to client
            io.emit('visit_list', r);
        });
    })

    socket.on('new_visit', (data_array) => {
        try{
            const id = data_array[0];
            const coor = data_array[1];
            
            let visit = {
                'elevatorID': id,
                'coor': coor
            }
            try{
                Visit.create(visit).then( () => {
                    var open_hm = 'handyman://open';
                    io.emit("handyman", open_hm);
                });
            }catch(err){
                console.log(err)
            }

            
        } catch(err) {
            console.log(err);
            //her: sende mail ved feil
        }
    })

    socket.on('criteria_list', (criteria) => {
        //criteria in this form
        /* 
        criteria = {
            elevatorID: a,
            jobType: b,
            fromDate: c,
            toDate: d
        }
        */
    });

})

//connect to mongoDB
connectDB();

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
    server.listen(PORT, () => console.log('Server running on port ' + PORT))
})
