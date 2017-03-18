var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');
//set view engine
app.set('view engine', 'ejs');
//static file - serve CSS
app.use(express.static('./public'));
//render Controller
todoController(app);


//listen on port 3000
app.listen(3000, function() {
    console.log("The frontend server is running on port 3000!");
});
