// culoareAccesorii same story as above also it also fires the tables for dimensions
document.querySelector('#attribute1Click').addEventListener('change', ()=>{
  Click.getSecondSelector = () =>{
    Click.article = document.getElementById('attribute1Click').value;
    const culoareClick = document.getElementById('culoareClick');
    generateProductColor('Click', null, document.getElementById('attribute1Click').value, (err, result)=>{
      if(err) throw err;
      result.forEach((element)=>{
        let option = document.createElement("option");
            option.text = element.color;
            option.value= element.color;
            culoareClick.add(option);
      });
    });
  }

  Click.getSecondSelector();
});


document.querySelector('#culoareClick').addEventListener('change', ()=>{
  Click.culoare = document.getElementById('culoareClick').value;
 
});



////////////////////// NOT UPDATED TO ES6 YET  ///////////////////////


document.querySelector('#culoareClick').addEventListener('change', function(){

  con.query("SELECT article FROM products_form WHERE category = 'Click' and attribute_2 = '"+ document.getElementById('attribute1Click').value +"'", function (err,result,fields){
    var tableClickAcc = document.querySelector('#tableClickAcc');
    var tableClickTabla1 = document.querySelector('#tableClickTabla1');
    var tableClickTabla2 = document.querySelector('#tableClickTabla2');
  for (var i = 0; i < result.length; i++) {
    var row = tableClickAcc.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);


  cell1.innerHTML = "<input style='width:240px;' readonly='' type='text' id='clickAccName_"+i+"' value='"+result[i].article+"' placeholder= '"+result[i].length+"'/>";
  cell2.innerHTML = "<input style='width:60px;' type='number' onchange='checkAndDefinePropertiesClick(this.id, this.value); recordInputs(this.id, this.value);' tabindex='"+ i+1 +"'  id='clickAccUnits_"+i+"' placeholder= ''/>";


  }

  for (var i = result.length; i < 30; i++) {
    var row = tableClickTabla1.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);
  cell1.innerHTML = 'Click'+i
  cell2.innerHTML = "<input type='text' style='width:80px;' onchange='recordInputs(this.id, this.value);' id='clickLength_"+i+"' min='0' />";
  cell3.innerHTML = "<input type='number' style='width:80px;' id='clickWidth_"+i+"' readonly='' min='0' value = '540'/>";
  cell4.innerHTML = "<input type='number' style='width:80px;' min='0' onchange='checkAndDefinePropertiesClick(this.id, this.value); recordInputs(this.id, this.value);' id='clickUnits_"+i+"' placeholder= ''/>";
  }


  for (var i = 35; i <= 49; i++) {
    var row = tableClickTabla2.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);
  cell1.innerHTML = 'Click'+i
  cell2.innerHTML = "<input type='text' style='width:80px;' onchange='recordInputs(this.id, this.value);' min='0' id='clickLength_"+i+"' />";
  cell3.innerHTML = "<input type='number' style='width:80px;' id='clickWidth_"+i+"' readonly='' min='0' value='540'/>";
  cell4.innerHTML = "<input type='number' style='width:80px;' min='0' onchange='checkAndDefinePropertiesClick(this.id, this.value); recordInputs(this.id, this.value);' id='clickUnits_"+i+"' placeholder= ''/>";
  }


    });

    //toggle collapse for panel to show dimensions - TABLA - ACC CLICK
    
    $("#collapse7").collapse('show');

});


function checkAndDefinePropertiesClick(id, value){

  Click.addDimensions = (ID, Value) => {
    ID = id; 
    Value = value;

    inputId = id.replace( /\D+/g, '');
    // accesorii + borduri - this checks which one of them it was completed by the user by checking if width exists .
    if(document.getElementById('clickWidth_'+inputId)){

      name   = 'Tabla click';
      units  = Value;
      length = parseInt(document.getElementById(`clickLength_${inputId}`).value);
      width  = document.getElementById(`clickWidth_${inputId}`).value;
      mp     = (units * (length/1000) * (width/1000)).toFixed(2); 
      price  = 0;
      total  = 0;


         // checking if the item already exists
         Click.dimensions.forEach((element, index, arr)=>{
              
          if(element.length === length && element.width === width){
            if(units === 0 || units === '0' || units === null){
             arr.splice(index,1);
             proccessFunction();
             throw 'exit';
            } else {
            element.units = units; 
            element.mp = (units * (element.length/1000) * (element.width/1000)).toFixed(2);
            proccessFunction();
            throw 'exit';
            }
          } 

       });
   
  } else {

    name   = document.getElementById(`clickAccName_${inputId}`).value;
    units  = Value;
    length = 0;
    width  = 0;
    mp     = 0; 
    price  = 0;
    total  = 0;

       // checking if the item already exists
       Click.dimensions.forEach((element, index, arr)=>{
              
        if(element.name === name){
          if(units === 0 || units === '0' || units === null){
           arr.splice(index,1);
           proccessFunction();
           throw 'exit';
          } else {
          element.units = units; 
          proccessFunction();
          throw 'exit';
          }
        } 

     });


    
  }

   // then push in array if value doesnt exists
   Click.dimensions.push({
    name  : name, 
    units : units,
    length : length,
    width : width,
    mp : mp,
    price: price,
    total: total
  });


  }

 
  try{Click.addDimensions();} catch(e){console.log(e);}
 checkProductPrice();


 
}
