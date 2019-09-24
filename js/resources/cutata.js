
//attribute2Cutata population, needs for the attribute1Cutata to change to take action so we add event listener for the first select
document.querySelector('#attribute1Cutata').addEventListener('change', ()=>{
  // so here we create a new method to determine the values of the second selector depending on the first selector value 
  Cutata.getSecondSelector = ()=>{
  // updating the article property with the value selected in the first selector 
  Cutata.article = document.getElementById(Cutata.firstAttribute).value;
  con.query(`SELECT DISTINCT(attribute_1) FROM products_form WHERE category = '${Cutata.category}' AND article = '${Cutata.article}'`, (err, result, fields)=>{
  const attribute2Cutata = document.getElementById('attribute2Cutata');
  // looping and adding results to second selector 
  result.forEach((element) => {
    let option = document.createElement("option");
    option.text =  element.attribute_1;
    option.value=  element.attribute_1;
    attribute2Cutata.add(option);
          });
       });
     }
  // running the function on the first selector change 
     Cutata.getSecondSelector();
  });
  
  // attribute3Cutata same story as above
  document.querySelector('#attribute2Cutata').addEventListener('change', ()=>{
    Cutata.getThirdSelector = () => {
      Cutata.attribute2 = document.getElementById('attribute2Cutata').value;
      con.query(`SELECT DISTINCT(attribute_2) FROM products_form WHERE category = '${Cutata.category}' AND article='${Cutata.article}' AND attribute_1 = '${Cutata.attribute2}'`, (err, result, fields)=>{
        const attribute3Cutata = document.getElementById('attribute3Cutata');
        //looping and adding results to second selector
        result.forEach((element)=>{
          var option = document.createElement("option");
          option.text =  element.attribute_2;
          option.value=  element.attribute_2;
          attribute3Cutata.add(option);
         
        });
      });
    }
  
    //running the function on the second selector change
    Cutata.getThirdSelector();
  });
  
  // culoareCutata same story as above also it also fires the tables for dimensions
  document.querySelector('#attribute3Cutata').addEventListener('change', ()=>{
    Cutata.getForthSelector = () => {
      Cutata.attribute3 = document.getElementById('attribute3Cutata').value;
      const culoareCutata = document.getElementById('culoareCutata');
      generateProductColor('Cutata', document.getElementById('attribute2Cutata').value, document.getElementById('attribute3Cutata').value, (err, result)=>{
        if(err) throw err;
        
        result.forEach((element)=>{
          let option = document.createElement("option");
              option.text = element.color;
              option.value= element.color;
              culoareCutata.add(option);
        });
      });
    }
  
    Cutata.getForthSelector();
  });
  
  document.querySelector('#culoareCutata').addEventListener('change', ()=>{
    Cutata.culoare = document.getElementById('culoareCutata').value;
   
  });


///////////////////////afisare dimensiuni Cutata
if(document.querySelector('#culoareCutata')){
document.querySelector('#culoareCutata').addEventListener('change', function(){
  // localStorage.setItem('color', document.getElementById('group1Color').value);
// var sub_category = document.querySelector('#group1Category').value;

category = document.getElementById('attribute1Cutata').value;

  let dimensiuniCutataAtipic = document.querySelector('#dimensiuniCutataAtipic');
  con.query(`SELECT * FROM sub_category WHERE name = '${Cutata.article}' `, (err, result, fields)=>{ 
    
    let cutataWidth = result[0].width;
 
for (var i = 0; i <= 24; i++) {
  var row = dimensiuniCutataAtipic.insertRow(-1);
  var cell1 = row.insertCell(-1);
  var cell2 = row.insertCell(-1);
  var cell3 = row.insertCell(-1);

cell1.innerHTML = "<input type='text' onchange='recordInputs(this.id, this.value);' id='CutataLength_"+i+"' />";
cell2.innerHTML = "<input  readonly='' type='number' id='CutataWidth_"+i+"' value='"+ cutataWidth +"'/>";
cell3.innerHTML = "<input type='number' onchange='checkAndDefinePropertiesCutata(this.id, this.value); recordInputs(this.id, this.value);' id='CutataUnits_"+i+"' min='0' placeholder= '0'/>";
}

});

//toggle collapse for panel to show dimensions - Cutata

$("#collapse8").collapse('show');

});
}





function checkAndDefinePropertiesCutata(id, value){

  Cutata.addDimensions = (ID,Value)=>{
    ID = id; 
    Value = value;
   //this takes out the number from the input , input name is units_1 so it returns 1 so we can find length and width
   inputId = ID.replace( /\D+/g, '');
  
   name   = 'Tabla cutata';
   units  = Value;
   length = parseInt(document.getElementById(`CutataLength_${inputId}`).value);
   width  = document.getElementById(`CutataWidth_${inputId}`).value;
   mp     = (units * (length/1000) * (width/1000)).toFixed(2); 
   price  = 0;
   total  = 0;
   Cutata.drip = document.getElementById('dripstopCutata').value;

          // checking if the item already exists
           Cutata.dimensions.forEach((element, index, arr)=>{
             
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
          // then push in array if value doesnt exists
     Cutata.dimensions.push({
      name  : name, 
      units : units,
      length : length,
      width : width,
      mp : mp,
      price: price,
      total: total
     });

     
       
 };
  
 try{Cutata.addDimensions();} catch(e){console.log('Value modified succesfully.');}
 checkProductPrice();
}
