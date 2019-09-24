var mysql = require('mysql');
var fs    = require('fs');
const con = mysql.createConnection({
  multipleStatements: true,
  host : 'remotemysql.com',
  user : 'hb6roaQZdt',
  password : 's1LsLkot9L',
  database : 'hb6roaQZdt'



});


function proccessDiscountValue(callback){
if(document.querySelector('#discountCodeBtn')){
  document.querySelector('#discountCodeBtn').addEventListener('click', () => {
    let dbCode;
    let code = document.querySelector("#discountCode").value;
    con.query("SELECT * FROM clients WHERE code = '"+ code +"' LIMIT 1", function (err, result, fields){
  
          
          (result.length !== 0) ? dbCode = result[0].code : dbCode = 0;
         
          callback(null, dbCode);

    });
  });
 }
}


proccessDiscountValue((err, result)=>{

  if(result !== 0){
   console.log(result);
    let code = result;
    // Change the content of the file as you want
    // or either set fileContent to null to create an empty file
    var fileContent = code;
    
    // The absolute path of the new file with its name
    var filepath = `${__dirname}/js/resources/init.txt`;
    
    fs.writeFile(filepath, fileContent, (err) => {
       if (err) throw err;
    
       console.log("The file was succesfully saved!");
       setTimeout(()=>{
       const remote = require('electron').remote;
        remote.app.relaunch();
        remote.app.exit(0);
    },1000);
        
    });
    
    
    
    } else {
    
      alert('Codul introdus nu este acceptat de aplicatie. Pentru contact : +0735353535');
    
    }

});

  
    