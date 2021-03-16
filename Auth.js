const { Router } = require('express')
//const bcrypt = require('bcryptjs')
const config = require('./Configer')
const jwt = require('jsonwebtoken')
//const { check, validationResult } = require('express-validator')
const router = Router()

// /auth/register
router.post(
    '/register',
    async (req, res) => {
    try 
    {
      const { login, password, status} = req.body;
      let candidate = config.read('./users.json').find(element => element.login == login);
      if (candidate) 
      {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = { login, password: hashedPassword, status};
      
      let res = config.read('./users.json');
      res.push(user);
      config.write('./users.json', res);

      res.status(201).json({ message: 'User created' });
    } 
    catch (e) 
    {
      res.status(500).json({ message: 'Something was wrong. Try later' });
    }
  })

// /auth/login
router.post(
    '/login',
    async (req, res) => {
        try 
        {
            const { login, password } = req.body;
            //console.log(req.body);
            const user = config.read('./users.json').find(element => element.login == login)
            if (!user) 
            {
              console.log('Invalid login');
              return res.status(401).json({ message: 'Invalid login or password' })
            }
            // const isMatch = await bcrypt.compare(password, user.password)
            let isMatch = password == user.password;

            if (!isMatch) 
            {
              console.log('Invalid password');
              return res.status(401).json({ message: 'Invalid login or password' });
            }
            const token = jwt.sign(
                { userStatus: user.status},
                'jwtSecret',
                { expiresIn: '1h' }
            )
            //console.log(token);
            res.json({ token })
        }
        catch (e) {
          console.log(e);
          res.status(500).json({ message: 'Something was wrong. Try later' })
        }
    })

module.exports = router