// culoareAccesorii same story as above also it also fires the tables for dimensions
document.querySelector('#attribute1Sipca').addEventListener('change', ()=>{
  Sipca.getSecondSelector = () =>{
    Sipca.article = document.getElementById('attribute1Sipca').value;
    const culoareSipca  = document.getElementById('culoareSipca');
    generateProductColor('Sipca', null, document.getElementById('attribute1Sipca').value, (err, result)=>{
      if(err) throw err;
      result.forEach((element)=>{
        let option = document.createElement("option");
            option.text = element.color;
            option.value= element.color;
            culoareSipca.add(option);
      });
    });
  }

  Sipca.getSecondSelector();
});


document.querySelector('#culoareSipca').addEventListener('change', ()=>{
  Sipca.culoare = document.getElementById('culoareSipca').value;
 
});


document.querySelector('#culoareSipca').addEventListener('change', function(){

    var tableSipca = document.querySelector('#tableSipca');


  for (var i = 0; i < 25; i++) {
    var row = tableSipca.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
    var cell4 = row.insertCell(-1);
  cell1.innerHTML = 'Sipca'+i
  cell2.innerHTML = "<input type='text' style='width:80px;' onchange='recordInputs(this.id, this.value);' value='105' id='sipcaLength_"+i+"' />";
  cell3.innerHTML = "<input type='number' style='width:80px;' id='sipcaWidth_"+i+"'/>";
  cell4.innerHTML = "<input type='number' style='width:80px;' onchange='checkAndDefinePropertiesSipca(this.id, this.value); recordInputs(this.id, this.value);' min='0' id='sipcaUnits_"+i+"' placeholder= ''/>";
  }


    //toggle collapse for panel to show dimensions - TABLA - ACC Sipca

    $("#collapse10").collapse('show');

});


function checkAndDefinePropertiesSipca(id, value){

  Sipca.addDimensions = (ID, Value) => {
    ID = id; 
    Value = value;

    inputId = id.replace( /\D+/g, '');

    name   = 'Sipca';
    units  = Value;
    length = parseInt(document.getElementById(`sipcaLength_${inputId}`).value);
    width  = document.getElementById(`sipcaWidth_${inputId}`).value;
    mp     = units * (width/1000);
    price  = 0;
    total  = 0; 

     console.log(mp);
       // checking if the item already exists
       Sipca.dimensions.forEach((element, index, arr)=>{
            
        if(element.length === length && element.width === width){
          if(units === 0 || units === '0' || units === null){
           arr.splice(index,1);
           proccessFunction();
           throw 'exit';
          } else {
          element.units = units; 
          element.mp = (units * (element.length/1000)).toFixed(2);
          proccessFunction();
          throw 'exit';
          }
        } 

     });

       // then push in array if value doesnt exists
   Sipca.dimensions.push({
    name  : name, 
    units : units,
    length : length,
    width : width,
    mp : mp,
    price: price,
    total: total
  });


  }

 
  try{Sipca.addDimensions();} catch(e){console.log('Value modified succesfully.');}
  
  checkProductPrice();
}
