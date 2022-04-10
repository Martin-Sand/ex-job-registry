const Visit = require('../model/Visit')

const logVisit = async (req, res) => {
    let id = req.query.id

    Visit.find({}).limit(10).sort({$natural:-1}).then(r => console.log(r));

    if(!id){
        return res.status(400)
    }

    try{
        const {shortDate, time} = await get_timestamp();
        console.log(shortDate, time)

        let visit = {
            'elevatorID': id,
            'date': shortDate,
            'time': time 
        }

        let newVisit = await Visit.create(visit)

        // Parameter omitted
        const query = await Visit.find(visit);

        console.log(query.length)
        if(query.length === 0){
            console.log("Visit not saved")
            res.status(400);
        }
        else{
            res.status(200);
        }

    } catch(err) {
        console.log(err)
        //her: sende mail ved feil
    }
}

async function get_timestamp(){
    let dateOb = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + dateOb.getDate()).slice(-2);

    // current month
    let month = ("0" + (dateOb.getMonth() + 1)).slice(-2);

    // current year
    let year = dateOb.getFullYear();

    // current hours
    let hours = ("0" + (dateOb.getHours() + 1)).slice(-2);

    // current minutes
    let minutes = ("0" + (dateOb.getMinutes() + 1)).slice(-2);

    // current seconds
    let seconds = ("0" + (dateOb.getSeconds() + 1)).slice(-2);

    let shortDate = date + "-" + month + "-" + year;
    let time =  hours + ":" + minutes + ":" + seconds

    return{shortDate, time};
}

module.exports = logVisit;