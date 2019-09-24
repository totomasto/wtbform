
//attribute2Tigla population, needs for the attribute1Tigla to change to take action so we add event listener for the first select
document.querySelector('#attribute1Tigla').addEventListener('change', ()=>{
// so here we create a new method to determine the values of the second selector depending on the first selector value 
Tigla.getSecondSelector = ()=>{
// updating the article property with the value selected in the first selector 
Tigla.article = document.getElementById(Tigla.firstAttribute).value;
con.query(`SELECT DISTINCT(attribute_1) FROM products_form WHERE category = '${Tigla.category}' AND article = '${Tigla.article}'`, (err, result, fields)=>{
const attribute2Tigla = document.getElementById('attribute2Tigla');
// looping and adding results to second selector 
result.forEach((element) => {
  let option = document.createElement("option");
  option.text =  element.attribute_1;
  option.value=  element.attribute_1;
  attribute2Tigla.add(option);
        });
     });
   }
// running the function on the first selector change 
   Tigla.getSecondSelector();
});
 
// attribute3Tigla same story as above
document.querySelector('#attribute2Tigla').addEventListener('change', ()=>{
  Tigla.getThirdSelector = () => {
    Tigla.attribute2 = document.getElementById('attribute2Tigla').value;
    con.query(`SELECT DISTINCT(attribute_2) FROM products_form WHERE category = '${Tigla.category}' AND article='${Tigla.article}' AND attribute_1 = '${Tigla.attribute2}'`, (err, result, fields)=>{
      const attribute3Tigla = document.getElementById('attribute3Tigla');
      //looping and adding results to second selector
      result.forEach((element)=>{
        var option = document.createElement("option");
        option.text =  element.attribute_2;
        option.value=  element.attribute_2;
        attribute3Tigla.add(option);
       
      });
    });
  }

  //running the function on the second selector change
  Tigla.getThirdSelector();
});

// culoareTigla same story as above also it also fires the tables for dimensions
document.querySelector('#attribute3Tigla').addEventListener('change', ()=>{
  Tigla.getForthSelector = () => {
    Tigla.attribute3 = document.getElementById('attribute3Tigla').value;
    const culoareTigla = document.getElementById('culoareTigla');
   
    generateProductColor('Tigla', document.getElementById('attribute2Tigla').value, document.getElementById('attribute3Tigla').value, (err, result)=>{
      if(err) throw err;
      result.forEach((element)=>{
        let option = document.createElement("option");
            option.text = element.color;
            option.value= element.color;
            culoareTigla.add(option);
      });
    });
    
   
  }

  Tigla.getForthSelector();
});


document.querySelector('#culoareTigla').addEventListener('change', ()=>{
  Tigla.culoare = document.getElementById('culoareTigla').value;
 
});


////////////////////// NOT UPDATED TO ES6 YET  ///////////////////////

///////////////////////afisare dimensiuni tigla
if(document.querySelector('#culoareTigla')){
document.querySelector('#culoareTigla').addEventListener('change', function(){
  // localStorage.setItem('color', document.getElementById('group1Color').value);
// var sub_category = document.querySelector('#group1Category').value;




con.query(`SELECT * FROM sub_category WHERE name = '${Tigla.article}' `, function (err,result,fields){
  var dimensiuniTiglaPredef = document.querySelector('#dimensiuniTiglaPredef');
  var dimensiuniTiglaAtipic = document.querySelector('#dimensiuniTiglaAtipic');

for (var i = 0; i < result.length; i++) {

  var row = dimensiuniTiglaPredef.insertRow(-1);
  var cell1 = row.insertCell(-1);
  var cell2 = row.insertCell(-1);
  var cell3 = row.insertCell(-1);

cell1.innerHTML = "<input  readonly='' type='text' id='tiglaLength_"+i+"' min='0'  value='"+result[i].length+"' placeholder= '"+result[i].length+"'/>";
cell2.innerHTML = "<input  readonly='' type='number' id='tiglaWidth_"+i+"' value='"+result[i].width+"' placeholder= '"+result[i].width+"'/>";
cell3.innerHTML = "<input  type='number' id='tiglaUnits_"+i+"' min='0' tabindex='"+ i+1 +"' onchange='checkAndDefinePropertiesTigla(this.id, this.value); recordInputs(this.id, this.value); '  placeholder= '0'/>";

}
for (var i = result.length; i <= 23; i++) {
  var row = dimensiuniTiglaAtipic.insertRow(-1);
  var cell1 = row.insertCell(-1);
  var cell2 = row.insertCell(-1);
  var cell3 = row.insertCell(-1);

cell1.innerHTML = "<input type='text' min='0' onchange='recordInputs(this.id, this.value);' id='tiglaLength_"+i+"' />";
cell2.innerHTML = "<input type='number' readonly='' id='tiglaWidth_"+i+"' value='"+ result[0].width +"' />";
cell3.innerHTML = "<input type='number' min='0' onchange='checkAndDefinePropertiesTigla(this.id, this.value); recordInputs(this.id, this.value);' id='tiglaUnits_"+i+"' placeholder= '0'/>";
}


  });

//toggle collapse for panel to show dimensions - tigla

$("#collapse1").collapse('show');

});
}




function checkAndDefinePropertiesTigla(id, value){
 
  Tigla.addDimensions = (ID,Value)=>{
     ID = id; 
     Value = value;
    //this takes out the number from the input , input name is units_1 so it returns 1 so we can find length and width
    inputId = ID.replace( /\D+/g, '');
   
    name   = 'Tigla';
    units  = Value;
    length = parseInt(document.getElementById(`tiglaLength_${inputId}`).value);
    width  = document.getElementById(`tiglaWidth_${inputId}`).value;
    mp     = (units * (length/1000) * (width/1000)).toFixed(2); 
    price  = 0;
    total  = 0;
    Tigla.drip = document.getElementById('dripstopTigla').value;

           // checking if the item already exists
            Tigla.dimensions.forEach((element, index, arr)=>{
              
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
      Tigla.dimensions.push({
        name  : name, 
        units : units,
        length : length,
        width : width,
        mp : mp,
        price: price,
        total: total
      });

     

      
        
  };
   
  try{Tigla.addDimensions();} catch(e){console.log('Value modified succesfully.');}
  
  checkProductPrice();
}




