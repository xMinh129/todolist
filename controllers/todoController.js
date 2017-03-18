var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//Middleware to parse the body
var urlencodedParser = bodyParser.urlencoded({extended:false});
//connect to MongoDB
mongoose.connect('mongodb://test:test@ds135680.mlab.com:35680/minhtodolist');
//create a db schema
var todoSchema = new mongoose.Schema({
  item:String
});
//Create a model in the schema, similar to that in Rails
var Todo = mongoose.model('Todo',todoSchema);
/* Testing DB
//var data =[{item: 'buy milk'},{item:'buy soda'}];
var itemOne = Todo({item: 'buy flower'}).save(function(err){
  if (err) throw err;
  console.log('Item saved');
});
*/
//export controller module
module.exports = function(app){

app.get('/todo', function(req,res){
  //get all the dab from mongodb and pass it, if error throw error, else render data
  Todo.find({}, function(err,data){
    if(err) throw err;
    res.render('todo', {todos: data});
  });
});
app.post('/todo',urlencodedParser, function(req, res){
  //creating a new record in todo, parse the data from the view
  var newTodo = Todo(req.body).save(function(err, data){
    console.log('Item saved');
    res.json(data);
  });

});
app.delete('todo/:item',function(req,res){
  //find the item in the db, and remove it
  Todo.find({items: req.param.item.replace(/\-/g, " ")}).remove(function(err,data){
    if (err) throw err;
    res.json(data);
  });
});
}
