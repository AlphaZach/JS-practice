var express = require('express'), 
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
    
var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views')); //__dirname mean the current directory


app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes); // use the todo router

app.listen(port, function(){
    console.log("App is running on port " + port);
})