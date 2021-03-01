
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Geluye190034',
    database: 'cse316finalproj'
    


});
// Q!. how to delete the sql query (test collection)
//Q2. how to connect sql with html (pool testing)
//q3. edit rows
const express = require('express');
const app = express();
const url = require('url');

app.get('/', (req, res) => {
writeSearch(req, res);
});

app.get('/testcollection', (req, res) => {
    testcollectionfunc(req,res);
});

app.get('/labhome', (req, res) => {
    LabHomefunc(req,res);
});


app.get('/poolmapping', (req, res) => {
    poolmapfunc(req,res);
});
app.get('/welltesting', (req, res) => {
    welltestfunc(req,res);
});
app.get('/employee', (req, res) => {
    employeefunc(req,res);
});
app.get('/addrow', (req, res) => {
    addrowfunc(req,res);
});
app.get('/addrow2', (req, res) => {
    addrowfunc2(req,res);
});
app.get('/deletevalue', (req, res) => {
    deletevalue(req,res);
});
app.get('/myfunction', (req, res) => {
    myFunction(req,res);
});

//      TRIAL
app.get('/callhtmlpage', (req, res) => {
    res.sendFile(__dirname + '/apptest.html')
//     var sql = "SELECT * FROM PoolMap ";
//   db.query(sql, flightNo, function(err, rows, fields) {
});


app.get('/callhtml2', (req, res) => {
    res.sendFile(__dirname + '/trialtestcoll.html')
});



port = process.env.port || 3000;
app.listen(port, () => {
    console.log('server started!');
});

function writeSearch(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html'});
    let query = url.parse( req.url, true).query;
    let email = query.email ? query.email : '';
    let passcode = query.passcode ? query.passcode : '';

    let html = `
     <!DOCTYPE html>
<html>
<body>

<h1>Login In Page</h1>

<form>
  <label for="Lab Id">ID:</label><br>
  <input type="text" id="email" name="email"><br>
  <label for="lname">Password:</label><br>
  <input type="text" id="passcode" name="passcode"> 
  <input type="submit" value="Login">
  </form>
</body>
</html>    `;
console.log(email);
console.log(passcode);
    
      
        let sql = `select * from Authentication`;
        db.query(sql, function(err, result) {

            if(err) throw err;
            for (let item of result){
                if (item.email == email){
                      html += `
                    <form action='/labhome' method= 'get'>
                    <button type="submit" name = "labHome" value = "Submit"> Authentication Succesfull!(Click here now) </button></form> </pre>`;
                    // let addNewUser = `insert into Authentication values("` + email + `", "`+ passcode + `");`
                    // // let addNewUser = `insert into Authentication values("pppppp", "111111");`
                    // db.query(addNewUser, function(err, result){
                    //     if(err) throw err;
                    //     console.log("Adding new user........")
                    // });
                    
                }else{
                 
                }
                // html += `
                //     <pre>
                //         Email: ` + item.email + `
                //         Passcode: ` + item.passcode + `
                        
                //     <pre/> `;
            }
            
        
            res.write(html+ '\n\n</body>\n</html>');
            res.end();
        });
};

function testcollectionfunc(req, res){
        res.writeHead(200, { 'Content-Type': 'text/html'});
        let query = url.parse( req.url, true).query;
        let employeeID = query.employeeID ? query.employeeID : '';
        let testBarcode = query.testBarcode ? query.testBarcode : '';
        //let testBarcode = query.passcode ? query.passcode : '';
                        
        let html = `
        <!DOCTYPE html>
        <html>
        <body>
        <h1>Test Collection</h1>
        <style type = text/css>
                        table, tr, th, td {
                            border: 1px solid black;
                            height: 50px;
                            vertical-align: bottom;
                            padding: 15px;
                            text-align: left;
                        }
                    </style>
        <form>
            <label for="fname">Employee ID:</label><br>
            <input type="text" id="employeeID" name="employeeID"><br>
            <label for="lname">Test Barcode:</label><br>
            <input type="text" id="testBarcode" name="testBarcode"> 
            <input type="submit" value="Add">
        </form>
        </body>
        </html>   `;
        console.log(employeeID);
        console.log(testBarcode);
        var check = 0;
        let date_ob = new Date();
            let checkExist = `select testBarcode from EmployeeTest`
            db.query(checkExist, function(err, result){
                if(err) throw err
                for (let item of result){
                    
                    if (item.testBarcode == testBarcode){
                        check += 1;
                        console.log(check)
                    }
                    
                }
                if (check == 0 && testBarcode != 0){
                    let addNewBarcode = `insert into EmployeeTest(testBarcode, employeeID, collectionTime) values("`+ testBarcode+`", "`+ employeeID+`", "`+date_ob+`") ON DUPLICATE KEY UPDATE testBarcode = "`+testBarcode+`"AND employeeID = employeeID;`
                    db.query(addNewBarcode, function(err, result){
                        if(err) throw err
                        console.log("Adding new Barcode........")  
                    });
                }
                let sqlPrint = `select * from EmployeeTest`;
                db.query(sqlPrint, function(err, result) {
                    if(err) throw err;
                    for (let item of result){
                        // print all information from sql
                        html += `<br><br>
                        <table>
                            <tr>
                                <th> Test Barcode </th>
                                <th> Employee ID</th>
                            </tr>
                            <tr>
                                <th> `+item.testBarcode+`</th>
                                <th> `+item.employeeID+`</th>
                            </tr>
                        </table>
                        <button onclick=" "> Delete </button>`;
                    }
                    res.write(html+ '\n\n</body>\n</html>');
                    res.end();
                });
            }); 
};

// new function
function deleteTestBarcode(){
    console.log("working");
//     <a id="modalContinue" value="Continue" >Yes </a>
// "getResponse(" + testbarcode + ");"  
    // let deleteInfo = `delete from EmployeeTest where testBarcode = "`+testBarcode+`"`;
    // db.query(deleteInfo, function(err, result){
    //     if(err) throw err
                
    //     console.log("Delete testBarcode........")
                    
    // });
}


 function LabHomefunc(req, res){
                        res.writeHead(200, { 'Content-Type': 'text/html'});
                        let query = url.parse( req.url, true).query;
                        
                                       
                       let html = `
                                       <!DOCTYPE html>
                                       <html>
                                       <body>
                                       
                                       <h1>LabHome</h1>
                                    
                                       
                                       </body>
                                       </html>   `;
                                       html += `
                                       <form action='/testcollection' method= 'get'>
                                       <button name = 'add' value =''> Test Collection </button></form> </pre>`;

                                       html += `
                                       <form action='/poolmapping' method= 'get'>
                                       <button name = 'add' value =''> Pool Mapping </button></form> </pre>`;
 
                                       html += `
                                       <form action='/welltesting' method= 'get'>
                                       <button name = 'add' value =''> Well Testing </button></form> </pre>`;
                                  
                                  
                                    res.write(html+ '\n\n</body>\n</html>');
                                    res.end();
 };


function welltestfunc(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html'});
    let query = url.parse( req.url, true).query; 
    let poolBarcode = query.poolBarcode ? query.poolBarcode : '';
    let wellBarcode = query.wellBarcode ? query.wellBarcode : '';
    let result2 = query.result2 ? query.result2 : '';
    
                   
   let html = `
                   <!DOCTYPE html>
                   <html>
                   <body>
                   
                   <h1>Well Testing</h1>
                    <style type = text/css>
                        table, tr, th, td {
                            border: 1px solid black;
                            height: 50px;
                            vertical-align: bottom;
                            padding: 15px;
                            text-align: left;
                        }
                    </style>
                   <form>
                   <label for="Well Barcode">Well Barcode</label><br>
                   <input type="text" id="wellBarcode" name="wellBarcode"><br>
                   <label for="Pool Barcode">Pool Barcode</label><br>
                   <input type="text" id="poolBarcode" name="poolBarcode"> <br>
                   <label for="result" id = "result">Result</label><br>

                   <select name = "dropdown">
                   <option value = "select" >select</option>
                   <option value = "positive">positive</option>
                   <option value = "negative">negative</option>
                   <option value = "in progress">in progress</option>
                </select>
                    <form action='/labhome' method= 'get'>
                    <button name = 'add' value =''> Add </button>
                   </form>
                  
                   </body>
                   </html>   `;
                 

                   
                   console.log(poolBarcode);
                   console.log(wellBarcode);
                   console.log(query.dropdown);
                   var check = 0;
                       let checkExist = `select poolBarcode from WellTesting`
                       db.query(checkExist, function(err, result){
                            if(err) throw err
                            for (let item of result){
                                
                                if (item.poolBarcode == poolBarcode){
                                    check += 1;
                                    console.log(check)
                                }
                                
                            }
                            if (check == 0 && poolBarcode != 0){
                                let addNewCode = `insert into WellTesting(poolBarcode, wellBarcode, result) values("`+poolBarcode+`", "`+wellBarcode+`", "`+query.dropdown+`");`;
                                console.log(addNewCode);

                                db.query(addNewCode, function(err, result){
                                if(err) throw err

                                });
                            }
                            let sqlPrint = `select * from WellTesting`;
                            db.query(sqlPrint, function(err, result) {
                                if(err) throw err;
                                for (let item of result){
                                    // print all information from sql
                                    html += `<br><br>
                                            <table>
                                                <tr>
                                                    <th> Well Barcode </th>
                                                    <th> Pool Barcode </th>
                                                    <th> Result </th>
                                                </tr>
                                                <tr>
                                                    <th> `+item.wellBarcode+`</th>
                                                    <th> `+item.poolBarcode+`</th>
                                                    <th> `+item.result+`</th>
                                                </tr>
                                            </table>
                                            <button onclick=" "> Delete </button>`;
                            }
                                res.write(html+ '\n\n</body>\n</html>');
                                res.end();
                            });
                        });
};

function employeefunc(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html'});
    let query = url.parse( req.url, true).query;
    let email = query.email ? query.email : '';
    let employeeID = query.employeeID ? query.employeeID : '';
    let passcode = query.passcode ? query.passcode : '';

    let html = `
     <!DOCTYPE html>
    <html>
    <body>

    <h1>Employee Login In Page</h1>
    <style type = text/css>
                table, tr, th, td {
                    border: 1px solid black;
                    height: 50px;
                    vertical-align: bottom;
                    padding: 15px;
                    text-align: left;
                }
    </style>
    <form>
    <label for="EmployeeEmail">Employee Email:</label><br>
    <input type="text" id="email" name="email"><br>
    <label for="lname">Employee ID:</label><br>
    <input type="text" id="employeeID" name="employeeID"><br>
    <label for="lname">Password:</label><br>
    <input type="text" id="passcode" name="passcode"> 
    <input type="submit" value="Login">
    </form>

    </body>
    </html>    `;
    console.log(email);
    console.log(employeeID)
    console.log(passcode);
    let sql = ` select distinct collectionTime, result 
                from EmployeeTest ET, WellTesting W, Employee E, PoolMap P
                where E.email = "`+email+`" AND E.employeeID = "`+employeeID+`" AND ET.employeeID = "`+employeeID+`" AND ET.testBarcode = P.testBarcode;`

    db.query(sql, function(err, result){
        
        if(err) throw err
        for (let item of result){
            html += `
            <br><br>
            <table>
                <tr>
                    <th> Collection Date </th>
                    <th> Result </th>
        
                </tr>
                <tr>
                    <th> `+item.collectionTime+`</th>
                    <th> `+item.result+`</th>
        
                </tr>
                </table>`;
        }
        res.write(html+ '\n\n</body>\n</html>');
        res.end();
    });

};

function poolmapfunc(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html'});
    let query = url.parse( req.url, true).query;
    let poolBarcode = query.poolBarcode ? query.poolBarcode : '';
    let testBarcode = query.testBarcode ? query.testBarcode : '';
    //let testBarcode = query.passcode ? query.passcode : '';
                    
    let html = `
    <!DOCTYPE html>
    <html>
    <body>
    <h1>Pool Mapping</h1>
    <style type = text/css>
                table, tr, th, td {
                    border: 1px solid black;
                    height: 50px;
                    vertical-align: bottom;
                    padding: 15px;
                    text-align: left;
                }
    </style>
    <form>
        <label for="fname">Pool Barcode:</label><br>
        <input type="text" id="employeeID" name="poolBarcode"><br>
        <label for="lname">Test Barcode:</label><br>
        <input type="text" id="testBarcode" name="testBarcode"> 
        <input type="submit" value="Add">
    </form>
    </body>
    </html>   `;
    console.log(poolBarcode);
    console.log(testBarcode);
    var check = 0;
        let checkExist = `select testBarcode from PoolMap`
        db.query(checkExist, function(err, result){
            if(err) throw err
            for (let item of result){
                
                if (item.testBarcode == testBarcode){
                    check += 1;
                    console.log(check)
                }
                
            }
            if (check == 0 && (testBarcode > 0 || testBarcode > " ")){
                let addNewBarcode = `insert into PoolMap(testBarcode, poolBarcode) values("`+ testBarcode+`", "`+ poolBarcode+`") ON DUPLICATE KEY UPDATE testBarcode=testBarcode AND poolBarcode = poolBarcode;`
                db.query(addNewBarcode, function(err, result){
                    if(err) throw err
                    console.log("Adding new Barcode........")   
                });
            }
            let sqlPrint = `select * from PoolMap`;
            db.query(sqlPrint, function(err, result) {
                if(err) throw err;
                for (let item of result){
                    // print all information from sql
                    html += `
                    <br><br>
                    <table>
                    <tr>
                        <th> Test Barcode </th>
                        <th> Pool Barcode </th>
            
                    </tr>
                    <tr>
                        <th> `+item.testBarcode+`</th>
                        <th> `+item.poolBarcode+` </th>
            
                    </tr>
                    </table>
                    <button onclick="deletepoolmapfunc("`+poolBarcode+`")> Delete </button>
                    `;
                }
                res.write(html+ '\n\n</body>\n</html>');
                res.end();
            });
        });
};
