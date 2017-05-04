var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

var port = 3000;


app.use(express.static(__dirname + '/public'));

app.get('/:id',function(req,res){
	var letter = /\D/g;
	var string = req.url.substring(1);

	if(letter.test(string)){
		//converts string to unix time
		var givenDate = new Date(string);
		var timeOffset = new Date().getTimezoneOffset()*60;
		var unix = givenDate.getTime()/1000 - timeOffset;
		//converts unix time to date
		var fullDate = getDate(unix);
		var re =/NaN/;
		re.test(fullDate)? fullDate=null: null;
	}
	else{
		var unix = string;
		var fullDate = getDate(unix);
	}

	res.json({
		"unix": unix,
		"natural": fullDate
	
	})
})
app.listen((process.env.PORT || port),function(){
	console.log(`Listening on port ${port}`)
})

function getDate(unix){
	var monthNames =["January","February","March","April",
	"May","June","July","August","September","October",
	"November","December"];
	var date = new Date(unix*1000);
	var month = monthNames[date.getMonth()];
	var day = date.getDate();
	var year = date.getFullYear();
	var fullDate = month+' ' +day+' ' +year;
	return fullDate;
}