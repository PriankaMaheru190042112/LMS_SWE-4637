const express = require("express")
const app = express()
const bodyParser= require("body-parser")
const cors =require("cors")
const mysql = require("mysql")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lms'
  });


app.get("/",(req,res)=>{
    connection.query('SELECT * FROM books', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results)
     });
})

app.post("/add",(req,res)=>{
 const {name, author, genre} = req.body
 connection.query('INSERT INTO books(name,author,genre) VALUES(?, ?, ?);',[name,author,genre], function (error, results) {
    if (error){
        console.log(error)
    }
 });

})

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id
    connection.query('DELETE FROM books WHERE id=?',id, function (error, results) {
       if (error){
           console.log(error)
       }
    });
   
   })

app.get("/update/:id",(req,res)=>{
    const id = req.params.id
    connection.query('SELECT * FROM books where id=?',id, function (error, results) {
        if (error){
            console.log(error)
        }
        res.send(results)
     });
})

app.put("/update/:id",(req,res)=>{
    const {id} = req.params
    const {name, author,genre} = req.body
    
    connection.query('UPDATE books SET name=?, author=?, genre=? where id=?',[name, author,genre,id], function (error, results,fields) {
        if (error){
            console.log(error)
        }
        res.send(results)
     });
})


app.get("/search", (req, res) => {
    const keyword = req.query.keyword;
    const query = `SELECT * FROM books WHERE name LIKE '%${keyword}%' OR author LIKE '%${keyword}%' OR genre LIKE '%${keyword}%' `;
  
    connection.query(query, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });


  app.get("/filter", (req, res) => {
    const filter = req.query.filter;
    const query = `SELECT * FROM books WHERE ${filter} = ?`;
  
    connection.query(query, [req.query.value], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
 
  app.post('/signup', (req, res) => {
    const { name,email, password } = req.body;
  
    // check if username already exists
    const sql = `SELECT * FROM users WHERE email = ?`;
  
    connection.query(sql, [email], (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        res.status(409).json({ message: 'Email already used' });

      } else {
        // hash password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) throw err;
  
          // insert new user into database
          const sql = `INSERT INTO users (name,email, password) VALUES (?, ?,?)`;
  
          connection.query(sql, [name,email, hashedPassword], (err, result) => {
            if (err) throw err;
            console.log('New user added to database');
            res.status(201).json({ message: 'User created successfully' });
          });
        });
      }
    });
  });  


  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // get user's hashed password from database
    const sql = `SELECT * FROM users WHERE email = ?`;
  
    connection.query(sql, [email], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        const hashedPassword = result[0].password;
  
        // compare hashed password from database with entered password
        bcrypt.compare(password, hashedPassword, (err, match) => {
          if (err) throw err;
          if (match) {
            // generate JWT and send it to client
            const token = jwt.sign({ email }, 'secret_key');
            res.status(200).json({ token });
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        });
      }
    });
  });  

  app.get("/home",(req,res)=>{
    connection.query('SELECT * FROM books', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results)
     });
})

app.listen(3001, ()=>{
    console.log("server running on port 3001")
})