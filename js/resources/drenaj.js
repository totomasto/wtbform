document.querySelector('#attribute1Drenaj').addEventListener('change', ()=>{
  Drenaj.getSecondSelector = () =>{
    Drenaj.article = document.getElementById(Drenaj.firstAttribute).value;
    con.query(`SELECT DISTINCT(attribute_2) from products_form WHERE category = 
    '${Drenaj.category}' AND attribute_1 = '${Drenaj.article}'`,(err,result,fields)=>{
      const attribute2Drenaj = document.getElementById('attribute2Drenaj');
      result.forEach((element)=>{
        var option = document.createElement("option");
        option.text =  element.attribute_2;
        option.value=  element.attribute_2;
        attribute2Drenaj.add(option);
      });
    });
  }
  Drenaj.getSecondSelector();
  });
  // culoareDrenaj same story as above also it also fires the tables for dimensions
  document.querySelector('#attribute2Drenaj').addEventListener('change', ()=>{
    Drenaj.getThirdSelector = () =>{
      Drenaj.attribute2 = document.getElementById('attribute2Drenaj').value;
      const culoareDrenaj = document.getElementById('culoareDrenaj');
      generateProductColor('Drenaj', document.getElementById('attribute1Drenaj').value, document.getElementById('attribute2Drenaj').value, (err, result)=>{
        if(err) throw err;
        result.forEach((element)=>{
          let option = document.createElement("option");
              option.text = element.color;
              option.value= element.color;
              culoareDrenaj.add(option);
        });
      });
    }
  
    Drenaj.getThirdSelector();
  });

  document.querySelector('#culoareDrenaj').addEventListener('change', ()=>{
    Drenaj.culoare = document.getElementById('culoareDrenaj').value;
  });



  
////////////////////// NOT UPDATED TO ES6 YET  ///////////////////////

///////////////////////afisare dimensiuni Drenaj
if(document.querySelector('#culoareDrenaj')){
document.querySelector('#culoareDrenaj').addEventListener('change', function(){

  var attribute1Drenaj = document.getElementById('attribute1Drenaj').value;
  var attribute2Drenaj = document.getElementById('attribute2Drenaj').value;

con.query("SELECT article FROM products_form WHERE category = 'Drenaj' AND attribute_1 = '"+ attribute1Drenaj +"' AND attribute_2 = '"+ attribute2Drenaj +"'", function (err,result,fields){
  var tableDrenaj = document.querySelector('#tableDrenaj');

for (var i = 0; i < result.length; i++) {
  var row = tableDrenaj.insertRow(-1);
  var cell1 = row.insertCell(-1);
  var cell2 = row.insertCell(-1);


cell1.innerHTML = "<input style='width:240px;' readonly='' type='text' id='drenajName_"+i+"' value='"+result[i].article+"' placeholder= '"+result[i].length+"'/>";
cell2.innerHTML = "<input style='width:60px;' type='number' onchange='checkAndDefinePropertiesDrenaj(this.id, this.value); recordInputs(this.id, this.value);' min='0' tabindex='"+ i+1 +"' id='drenajUnits_"+i+"' placeholder= ''/>";


}

  });

  //toggle collapse for panel to show dimensions - accesorii

  $("#collapse3").collapse('show');


});
}



 function checkAndDefinePropertiesDrenaj(id, value){


  Drenaj.addDimensions = (ID, Value) => {
    ID = id; 
    Value = value;

    inputId = id.replace( /\D+/g, '');

  name   = document.getElementById(`drenajName_${inputId}`).value;
  units  = Value;
  length = 0;
  width  = 0;
  mp     = 0; 
  price  = 0;
  total  = 0;

     // checking if the item already exists
     Drenaj.dimensions.forEach((element, index, arr)=>{
            
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

   
   // then push in array if value doesnt exists
   Drenaj.dimensions.push({
    name  : name, 
    units : units,
    length : length,
    width : width,
    mp : mp,
    price: price,
    total: total
  });

  }


  try{Drenaj.addDimensions();} catch(e){console.log('Value modified succesfully.');}
  checkProductPrice();


}
