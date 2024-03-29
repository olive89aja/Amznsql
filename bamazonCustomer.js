//This code is strongly inspired by the class about the song and album databases
var inquirer = require("inquirer");
var mysql = require("mysql");
//var connection = mysql.createConnection({multipleStatements: true});


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
            message: "What is the id, between 1 and 10, of the product you would like to buy ?",
            name: "x1"
        },
        {
            type: "number",
            message: "How many units of this product would you like to buy ?",
            name: "x2"
        }
    ]).then(response => {
        connection.query("SELECT * FROM bamazon.products WHERE item_id=? AND stock_quantity>=?", [response.x1,response.x2], function(err,res) {
            if(err) throw err;
            console.log("Welcome to our store, these are your results based on your answers : ")
            console.log(JSON.stringify(res,null,10));
        
            if(res.length === 0) {console.log("Insufficient quantity!"); }
   
   //console.log(response.x2);
//    var store=res;
//    console.log(store.price);
console.log("You bought " + response.x2 + res[0].product_name + " and the cost was")
console.log("$" + res[0].price*response.x2);

var inventory=res[0].stock_quantity - response.x2;
console.log("Only " + inventory + " left");  
//product purchase 
         connection.query("UPDATE bamazon.products SET stock_quantity = stock_quantity -? WHERE item_id=?", [response.x2,response.x1], function(err,res) {
         if(err) throw err;
          //console.log("Number of products remaining" + JSON.stringify(res,null,10));
         console.log("Have a nice day! Thank you for your business");   
         })

      
    })
    
})};

productSearch();

