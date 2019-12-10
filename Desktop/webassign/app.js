var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;
var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.render('home', { days: days, months: months, years: years });

});

var rooms = [{
        title: " Hide away resot",
        price: 110.00,
        img: "house1.jpg"
    },
    {
        title: "vancouver house",
        price: 120.00,
        img: "house2.jpg"
    },
    {
        title: "ahmedabad junction house",
        price: 90.00,
        img: "house3.jpg"
    },
    {
        title: "sikkim house",
        price: 40.00,
        img: "house4.jpg"
    },
    {
        title: "manipal house",
        price: 37.00,
        img: "house5.jpg"
    },
    {
        title: "kashmir house",
        price: 130.00,
        img: "house6.jpg"
    }
];

var cities = ["mumbai", "banglore", "ahmedabad", "chennai"];


var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = [];
var years = [];

for (var i = 2019; i > 1900; i--) {
    years.push(i);
}
for (var i = 1; i <= 31; i++) {
    days.push(i);
}

app.get('/rooms', function(req, res) {
    res.render('rooms', { rooms: rooms, days: days, months: months, years: years });
});



app.post('/', (req, res) => {
    //Validation Booking
    if (req.body.booking) {
        var where = req.body.where;
        var checkIn = req.body.checkIn;
        var checkOut = req.body.checkOut;
        var guests = req.body.guests;
        var err = 0;

        var errMsg = [];

        var info = { where: cities[where], checkIn: checkIn, checkOut: checkOut, guests: guests };

        if (checkIn > checkOut) {
            err++;
            errMsg.push("Check out must be after Check in!");
        }

        if (err > 0)
            res.render('home', { errMsg: errMsg });
        else {
            var roomsTemp = [];
            roomsTemp = JSON.parse(JSON.stringify(rooms));

            roomsTemp.forEach(room => {
                room.price = room.price * guests;
            });
            res.render('rooms', { rooms: roomsTemp, info: info });
        }
        //VALIDATION REGISTRATION
    } else if (req.body.register) {
        var form = { fname: req.body.f_name, lname: req.body.l_name, password: req.body.password, year: req.body.byear, month: req.body.bmonth, day: req.body.bday };

        var msg = [];
        msg = registration(form);
        console.log(msg);

        if (err > 0)
            res.render(req.body.page, { msg: msg, rooms: rooms, days: days, months: months, years: years });
        else {
            var roomsTemp = [];
            roomsTemp = JSON.parse(JSON.stringify(rooms));

            roomsTemp.forEach(room => {
                room.price = room.price * guests;
            });
            res.render(req.body.page, { msg: msg, rooms: rooms, days: days, months: months, years: years });
        }
    }

});


app.listen(PORT);

console.log("Server Online!");

function registration(form) {
    var error = 0;
    var errMsg = [];
    var regexp = /[a-zA-Z]/g;

    for (var i = 0; i < form["fname"].length; i++) {
        if (!form["fname"][i].match(regexp)) {
            error++;
            errMsg.push("Name must contain only letters.\n");
            break;
        }
    }

    for (var i = 0; i < form["lname"].length; i++)
        if (!form["lname"][i].match(regexp)) {
            error++;
            errMsg.push("Name must contain only letters.\n");
            break;
        }

    if (form["year"] < 2001) {
        errMsg.push("You must be older than 18 years old.");
    }
    console.log(errMsg);
    if (error == 0)
        return ["Registration Completed!"];
    else
        return errMsg;
}