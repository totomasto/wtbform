document.querySelector('#attribute1Acc').addEventListener('change', ()=>{
Accesorii.getSecondSelector = () =>{
  Accesorii.article = document.getElementById(Accesorii.firstAttribute).value;
  con.query(`SELECT DISTINCT(attribute_2) from products_form WHERE category = 
  '${Accesorii.category}' AND attribute_1 = '${Accesorii.article}'`,(err,result,fields)=>{
    const attribute2Acc = document.getElementById('attribute2Acc');
    result.forEach((element)=>{
      var option = document.createElement("option");
      option.text =  element.attribute_2;
      option.value=  element.attribute_2;
      attribute2Acc.add(option);
    });
  });
}
Accesorii.getSecondSelector();
}); 
// culoareAccesorii same story as above also it also fires the tables for dimensions
document.querySelector('#attribute2Acc').addEventListener('change', ()=>{
  Accesorii.getThirdSelector = () =>{
    Accesorii.attribute2 = document.getElementById('attribute2Acc').value;
    const culoareAcc = document.getElementById('culoareAcc');
    generateProductColor('Accesorii', document.getElementById('attribute1Acc').value, document.getElementById('attribute2Acc').value, (err, result)=>{
      if(err) throw err;
      result.forEach((element)=>{
        let option = document.createElement("option");
            option.text = element.color;
            option.value= element.color;
            culoareAcc.add(option);
      });
    });
  }

  Accesorii.getThirdSelector();
});


document.querySelector('#culoareAcc').addEventListener('change', ()=>{
  Accesorii.culoare = document.getElementById('culoareAcc').value;
 
});


////////////////////// NOT UPDATED TO ES6 YET  ///////////////////////




///////////////////////afisare dimensiuni accesorii
if(document.querySelector('#culoareAcc')){
document.querySelector('#culoareAcc').addEventListener('change', function(){
  // localStorage.setItem('color', document.getElementById('group1Color').value);
// var sub_category = document.querySelector('#group1Category').value;
con.query("SELECT article FROM products_form WHERE category = 'Accesorii' AND attribute_1 = '"+ document.getElementById('attribute1Acc').value +"' AND attribute_2 = '"+ document.getElementById('attribute2Acc').value +"' AND article != 'Bordura speciala' ", function (err,result,fields){
  var tableAccesorii = document.querySelector('#tableAccesorii');
  var dimensiuniBorduri = document.querySelector('#dimensiuniBorduri');
for (var i = 0; i < result.length; i++) {
  var row = tableAccesorii.insertRow(-1);
  var cell1 = row.insertCell(-1);
  var cell2 = row.insertCell(-1);


cell1.innerHTML = "<input style='width:240px;' readonly='' type='text' id='accName_"+i+"' value='"+result[i].article+"' placeholder= '"+result[i].length+"'/>";
cell2.innerHTML = "<input style='width:60px;' type='number' onchange='checkAndDefinePropertiesAcc(this.id, this.value); recordInputs(this.id, this.value);' min='0' tabindex='"+ i+1 +"' id='accUnits_"+i+"' placeholder= ''/>";


}
var count = 1;
for (var i = result.length; i <= 42; i++) {
  var row = dimensiuniBorduri.insertRow(-1);
  var cell1 = row.insertCell(-1);
  var cell2 = row.insertCell(-1);
  var cell3 = row.insertCell(-1);
  var cell4 = row.insertCell(-1);

cell1.innerHTML = "Bord"+count;
count++;
cell2.innerHTML = "<input type='text' id='bordLength_"+i+"' onchange='recordInputs(this.id, this.value);' value='2000' min='0' readonly='' />";
cell3.innerHTML = "<input type='number' id='bordWidth_"+i+"' onchange='recordInputs(this.id, this.value);' min='0'  />";
cell4.innerHTML = "<input type='number' onchange='checkAndDefinePropertiesAcc(this.id, this.value); recordInputs(this.id, this.value); ' min='0' id='bordUnits_"+i+"' placeholder= ''/>";
}


  });

  //toggle collapse for panel to show dimensions - accesorii

  $("#collapse2").collapse('show');


});
}


function checkAndDefinePropertiesAcc(id, value){

  Accesorii.addDimensions = (ID, Value) => {
    ID = id; 
    Value = value;
     
    inputId = id.replace( /\D+/g, '');
    // accesorii + borduri - this checks which one of them it was completed by the user by checking if width exists .
    if(document.getElementById('bordWidth_'+inputId)){

      name   = 'Bordura speciala';
      units  = Value;
      length = parseInt(document.getElementById(`bordLength_${inputId}`).value);
      width  = document.getElementById(`bordWidth_${inputId}`).value;
      mp     = (units * (length/1000) * (width/1000)).toFixed(2); 
      price  = 0;
      total  = 0;


         // checking if the item already exists
         Accesorii.dimensions.forEach((element, index, arr)=>{
              
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

    name   = document.getElementById(`accName_${inputId}`).value;
    units  = Value;
    length = 0;
    width  = 0;
    mp     = 0; 
    price  = 0;
    total  = 0;

       // checking if the item already exists
       Accesorii.dimensions.forEach((element, index, arr)=>{
              
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
   Accesorii.dimensions.push({
    name  : name, 
        units : units,
        length : length,
        width : width,
        mp : mp,
        price: price,
        total: total
  });


  }

 
  try{Accesorii.addDimensions();} catch(e){console.log(e);}
  checkProductPrice();


}
