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
            console.log("Here are your results" + JSON.stringify(res,null,10));
        
            if(res.length === 0) {console.log("Insufficient quantity!"); }
   
   
        connection.query("UPDATE bamazon.products SET stock_quantity = stock_quantity -1 WHERE item_id=1", function(err,res) {
         if(err) throw err;
         console.log("Inventory updated"+JSON.stringify(res,null,10));
         console.log("Have a nice day");         
          
        
        })

      
    })
    
})};

productSearch();


//  productPurchase()
//  { inquirer.prompt([
//         {
//             type: "number",
//             message: "What is the id, between 1 and 10, of the product you would like to buy ?",
//             name: "x1"
//         },
//         {
//             type: "number",
//             message: "How many units of this product would you like to buy ?",
//             name: "x2"
//         }
//     ]).then(response => {
   
     
// })
// })}

// productPurchase();