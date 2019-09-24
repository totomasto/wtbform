document.querySelector('#attribute1Minirulou').addEventListener('change', ()=>{
  Minirulou.getSecondSelector = () =>{
    Minirulou.article = document.getElementById(Minirulou.firstAttribute).value;
    con.query(`SELECT DISTINCT(attribute_2) from products_form WHERE category = 
    '${Minirulou.category}' AND attribute_1 = '${Minirulou.article}'`,(err,result,fields)=>{
      const attribute2Minirulou = document.getElementById('attribute2Minirulou');
      result.forEach((element)=>{
        var option = document.createElement("option");
        option.text =  element.attribute_2;
        option.value=  element.attribute_2;
        attribute2Minirulou.add(option);
      });
    });
  }
  Minirulou.getSecondSelector();
  });
  // culoareMinirulou same story as above also it also fires the tables for dimensions
  document.querySelector('#attribute2Minirulou').addEventListener('change', ()=>{
    Minirulou.getThirdSelector = () =>{
      Minirulou.attribute2 = document.getElementById('attribute2Minirulou').value;
      const culoareMinirulou = document.getElementById('culoareMinirulou');
      generateProductColor('Minirulou', document.getElementById('attribute1Minirulou').value, document.getElementById('attribute2Minirulou').value, (err, result)=>{
        if(err) throw err;
        result.forEach((element)=>{
          let option = document.createElement("option");
              option.text = element.color;
              option.value= element.color;
              culoareMinirulou.add(option);
        });
      });
    }
  
    Minirulou.getThirdSelector();
  });


  document.querySelector('#culoareMinirulou').addEventListener('change', ()=>{
    Minirulou.culoare = document.getElementById('culoareMinirulou').value;
   
  });


///////////////////////afisare dimensiuni Minirulou
if(document.querySelector('#culoareMinirulou')){
document.querySelector('#culoareMinirulou').addEventListener('change', function(){
  // localStorage.setItem('color', document.getElementById('group1Color').value);
// var sub_category = document.querySelector('#group1Category').value;

category = document.getElementById('attribute1Minirulou').value;

  var dimensiuniMinirulou = document.querySelector('#dimensiuniMinirulou');

for (var i = 0; i <= 10; i++) {
  var row = dimensiuniMinirulou.insertRow(-1);
  var cell1 = row.insertCell(-1);
  var cell2 = row.insertCell(-1);
  var cell3 = row.insertCell(-1);

cell1.innerHTML = "<input type='number' onchange='recordInputs(this.id, this.value);' id='minirulouLength_"+i+"' />";
cell2.innerHTML = "<input type='number' onchange='recordInputs(this.id, this.value);' id='minirulouWidth_"+i+"' value='' placeholder= ''/>";
cell3.innerHTML = "<input type='number' onchange='checkAndDefinePropertiesMinirulou(this.id, this.value); recordInputs(this.id, this.value);' min='0' id='minirulouUnits_"+i+"' placeholder= '0'/>";
}



//toggle collapse for panel to show dimensions - Cutata

$("#collapse9").collapse('show');

});
}



function checkAndDefinePropertiesMinirulou(id, value){

  Minirulou.addDimensions = (ID, Value) => {
  ID = id; 
  Value = value;

  inputId = id.replace( /\D+/g, '');

  name   = 'Minirulou';
  units  = Value;
  length = parseInt(document.getElementById(`minirulouLength_${inputId}`).value);
  width  = document.getElementById(`minirulouWidth_${inputId}`).value;
  mp     = (units * (length/1000) * (width/1000)).toFixed(2); 
  price  = 0;
  total  = 0;


     // checking if the item already exists
     Minirulou.dimensions.forEach((element, index, arr)=>{
          
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
     Minirulou.dimensions.push({
      name  : name, 
        units : units,
        length : length,
        width : width,
        mp : mp,
        price: price,
        total: total
    });
  
  
    }
  
   
    try{Minirulou.addDimensions();} catch(e){console.log('Value modified succesfully.');}
    checkProductPrice();


}
