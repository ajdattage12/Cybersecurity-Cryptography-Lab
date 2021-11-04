const bcrypt = require("bcrypt");
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existingPassword = bcrypt.compareSync(password, users[i].passwordHash)
        if (users[i].username === username && existingPassword === true) {
          
          let secureUser = {...users[i]}
          delete secureUser.passwordHash;
          
          console.log("This line of code")

          res.status(200).send(secureUser)
          return;
        }
      }
      console.log("No User found");
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      console.log('Registering User')
      console.log(req.body)
      
      const { username, password, firstName, lastName, email } = req.body 

      const salt = bcrypt.genSaltSync(5);
      console.log(salt);
      const passwordHash = bcrypt.hashSync(password, salt);
      console.log(passwordHash);
      
      let newUser = {
        username,
        email,
        firstName,
        lastName,
        passwordHash
      }

      users.push(newUser)
      console.log(users)
      delete secureUser.passwordHash;
      // users.push(req.body)
      let secureInfo = {...newUser}
      res.status(200).send(secureInfo)

    }
  }