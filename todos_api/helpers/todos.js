var db = require("../models");

exports.getTodos = function(req,res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.createTodo = function(req,res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo); //send status 201 then send json
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.getTodo = function(req,res){
    db.Todo.findById(req.params.todoId) // params will be filled with whatever the route variables are, now we using :toDoId, so we pass the req.params.toDoId
    .then(function(foundId){
        res.json(foundId);
    })
    .catch(function(err){
        res.send(err);
    });
}

exports.updateTodo = function(req,res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId},req.body, {new: true}) //{new: true} will let the response be updated version
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        console.log(err);
    });
}

exports.deleteTodo = function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: 'We delete!'});
    })
    .catch(function(err){
        console.log(err);
    });
}

module.exports = exports;