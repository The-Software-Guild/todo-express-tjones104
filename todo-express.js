// todo express

// In this project you will create an Express Server that manages a ToDo List 
// with endpoints to interact with the List.

// Create a simple Express Server that manages a list of todos (which at this point will just 
// be held in an array on the server, since we haven't gotten to including databases yet).
// please use the uuid package to simulate _id 's as in the last assignments. https://github.com/uuidjs/uuid

// Create endpoints that:

// allows new todo items to be posted to the array,
// When posting a new todo, you must generate a unique id for that todo (consider using the uuid npm package),
// returns the entire list of todos,
// allows the user to update a todo by its _id,
// allows the user to delete a todo by its _id, and
// allows the user to retrieve a single todo by its _id.
// add RESTful status codes to all req including the upcoming error handler

// BONUS: add a default error handler and sucessful handle and test your errors

// DOUBLE_bonus: create a frontend client portal to connect and perform these CRUD opperations (hint: check out the 
// axios npm package for making HTTP request from a node based frontend application)

// TRIPPLE_bonus: refactor the frontend to React.js

const express = require("express");
const morgan = require("morgan");
const app = express();
const { v4: uuidv4 } = require("uuid");

// constants
const PORT = 8080;

// fake data array
const todos = [
    {   
        content:'Walk the dog',
        _id: uuidv4(), 
    }, 
    {   
        content:'Pay rent',
        _id: uuidv4(), 
    }, 
    {   
        content:'Dentist at 8am',
        _id: uuidv4(), 
    }
];

const foundtodo = [];


// application level middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// routes
// GET
app.get("/", (req, res) => {
    res.render("todos.ejs", { todos: todos, foundtodo : foundtodo});
});

// POST
app.post("/addtodo", (req, res) =>{
    let newTodo = req.body.newtodo;
    todos.push({content : newTodo, _id : uuidv4()});
    res.redirect("/");
});

app.post('/updatetodo', (req, res) =>{
  if ((todos.findIndex(function(todos) {return todos._id == req.body._id})) != -1){
    let index = todos.findIndex(function(todos) {return todos._id == req.body._id})
    todos[index].content = req.body.content
    res.redirect("/");
  }else{
    res.status(404).send('The todo was not found');
  }
});

app.post("/removetodo", (req, res) =>{
    if ((todos.findIndex(function(todos) {return todos._id == req.body._id})) != -1){
        let index = todos.findIndex(function(todos) {return todos._id == req.body._id})
        todos.splice(index, 1);
        res.redirect("/");
      }else{
        res.status(404).send('The todo was not found');
      }
});

app.post("/findtodo", (req, res) =>{
    if ((todos.findIndex(function(todos) {return todos._id == req.body._id})) != -1){
        foundtodo.push(todos.filter(function(todos) {return todos._id == req.body._id})[0]);
        res.redirect("/");
      }else{
        res.status(404).send('The todo was not found');
      }
});

// server startup logic
app.listen(PORT, () => {
  console.log(`Server started | Link: http://localhost:${PORT}/`);
});
