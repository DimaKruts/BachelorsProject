const { Router } = require('express')
//const bcrypt = require('bcryptjs')
const config = require('./Configer')
const jwt = require('jsonwebtoken')
const router = Router()

// /auth/login
router.post(
    '/login',
    async (req, res) => {
        try 
        {
            const { name, password } = req.body;
            const user = config.read('./users.json').find(element => element.name == name);
            if (!user) 
            {
              console.log('Invalid login');
              return res.status(401).json({ message: 'Invalid login or password' });
            }
            // const isMatch = await bcrypt.compare(password, user.password)
            let isMatch = password == user.password;

            if (!isMatch) 
            {
              console.log('Invalid password');
              return res.status(401).json({ message: 'Invalid login or password' });
            }
            const token = jwt.sign(
                { userStatus: user.status, userName:name},
                'jwtSecret',
                { expiresIn: '1h' }
            )
            res.json({ token, userStatus:user.status, userName:name});
        }
        catch (e) {
          console.log(e);
          res.status(500).json({ message: 'Something was wrong. Try later' });
        }
    });
// /auth/addUser
router.post('/addUser', function(request, response){
  try 
  {
    const { name, password, status} = request.body;
    if(!(name && password && status))
    {
      return response.sendStatus(418);
    }
    let candidate = config.read('./users.json').find(element => element.name == name);
    if (candidate) 
    {
      return response.sendStatus(400);
    }
    //const hashedPassword = await bcrypt.hash(password, 12)
    //const user = { name, password: hashedPassword, status};
    const user = { name, password, status};
    
    let res = config.read('./users.json');
    res.push(user);
    config.write('./users.json', res);

    response.sendStatus (201);
  } 
  catch (e) 
  {
    console.log(e);
    response.sendStatus(500);
  }
});
// /auth/user
router.get('/user', (req, res) => 
{
  let users = config.read('./users.json');
  let user = users.map(element => {return {name: element.name, status: element.status };})
  res.send(user); 

});
// /auth/delUser
router.post('/delUser', function(request, response){
  try 
  {
    const { name } = request.body;
    let list = config.read('./users.json');

    list = list.filter(item => item.name  != name );
    config.write('./users.json', list);
    response.sendStatus(202);
  } 
  catch (e) 
  {
    response.sendStatus(500);
    console.log(e);
  }
});
module.exports = router
