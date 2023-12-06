const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();

router.post('/signup', async(req,res)=>{
    const {name, email, password, address } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `insert into users values(?,?,?,?,?)`;
    db.query(sql, [1,name, email, password, address], (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
        }
        else{
            res.status(201).json({messsage: 'User registered successfully'});
        }
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    const sql = 'select * from users where email = ?';
    db.query(sql, [email], async (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.length === 0) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        const user = result[0];
  
        const passwordMatch = password === user.password;
  
        if (passwordMatch) {
          const token = jwt.sign({ userId: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
          res.status(200).json({ token });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      }
    })
  })


  module.exports = router;