//in controllers
const mysqlConnection = require("../mysql_connection")

exports.signup = (req, res, next) => {
    mysqlConnection.query("INSERT INTO users VALUES (NULL, '2thomas@google.com', 'mdp', 'nomDeFamille', 'prenom', 1, 'a12z2e3r5t8')", (err, results, fields) => {
        if (err) {
            res.send(err)
        } else {
            res.status(201).json({ message : "User created" });
        }
    })
    mysqlConnection.end()
}

exports.login = (req, res, next) => {

}