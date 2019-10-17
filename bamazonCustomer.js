//This code is strongly inspired by the class about the song and album databases
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,

    user: "root",
  
    password: "Putain815",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
  });


function productSearch() {
    inquirer.prompt([
        {
            type: "number",
            message: "What is the id of the product you would like to buy ?",
            name: "index1"
        },
        {
            type: "number",
            message: "How many units of this product would you like to buy",
            name: "index2"
        }
    ]).then(response => {
        connection.query("SELECT * FROM bamazon.products WHERE item_id=1;", [response.index1,response.index2], function(err,res) {
            if(err) throw err;
            if(res) console.log(JSON.stringify(res,null,10));
            else console.log("Insufficient quantity!");

        })
    })
}

productSearch();