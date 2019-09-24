async function displayCategoriesInExcessPage(callback){


  
    let code = await fs.readFileSync(`${__dirname}/js/resources/init.txt`, 'utf8');
    console.log(code);
    excessTable.rows[0].cells[0].innerHTML = ""; 


    con.query(`SELECT * FROM excess_form WHERE client_code = '${code}' `, (err, result, fields) => {
     if(err) throw err;
     callback(null, result);
         
    }); 

    

}


async function applyDiscount(category, discount){
  let code = await fs.readFileSync(`${__dirname}/js/resources/init.txt`, 'utf8');
     con.query(`UPDATE excess_form SET percentage = '${discount}' WHERE category = '${category}' AND client_code = '${code}' `, (err, result, fields)=>{

      if(err) throw err;
      console.log('Updated succesfully');

     });
}


displayCategoriesInExcessPage((err, result)=>{

  const excessTable = document.getElementById('excessTable');
  excessTable.rows[0].cells[0].innerHTML = ""; 
  result.forEach(element => {
              
          
    let row = excessTable.insertRow(-1);
    let cell1 = row.insertCell(-1);
    let cell2 = row.insertCell(-1);


    cell1.innerHTML = element.category ; 
    cell2.innerHTML = `<input type="number" name='${element.category}' onchange='applyDiscount(this.id, this.value)' id='${element.category}' class='form-control' placeholder='${element.percentage}' value='${element.percentage} %' /> ` ;
  

   });
});