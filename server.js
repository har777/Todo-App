//--------------------------Defining Setup Stuff------------------------------------------
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;

//--------------------------Configuration Stuff-------------------------------------------
mongoose.connect('mongodb://har777:har777@mongo.onmodulus.net:27017/Ype2vuwy');
//mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu


app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

//--------------------------Basic Model for Todo------------------------------------------
var Todo = mongoose.model('Todo', {
  text : String,
  done : Boolean
});

//------------------------- Routing and defining GET, POST and DELETE api's for todo------

app.get('/api/todos', function(req, res){
  Todo.find(function(err, todos){
    if(err)
      res.send(err);
    
    res.json(todos);
  });
});


app.post('/api/todos', function(req, res){
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo){
    if(err)
      res.send(err);
   
    Todo.find(function(err, todos){
      if(err)
        res.send(err);
      res.json(todos);
    });
  });
});


app.delete('/api/todos/:todo_id', function(req, res){
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo){
    if(err)
      res.send(err);
   
    Todo.find(function(err, todos){
      if(err)
        res.send(err);
      res.json(todos);
    });
  });
});


app.get('*', function(req, res){
  res.sendfile('./public/index.html');
});

//--------------------------Listening------------------------------------------------------	
app.listen(port, '0.0.0.0');
console.log("App on port " + port);

