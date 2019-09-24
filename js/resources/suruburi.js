function showProductsSuruburi(){


// no attribute for suruburi , needs mysql conn.
con.query("SELECT article from products_form where category = 'Suruburi'", function(err, result, fields){

var tableSuruburi1 = document.getElementById('suruburi1');
var tableSuruburi2 = document.getElementById('suruburi2');

  for (var i = 0; i < result.length/2; i++) {

    if(document.getElementById('suruburiUnits_'+i)){

      //do nothing because table already contains rows :D
      // not the best way , I ll learn I promise !!!!!!
    } else {
    var row = tableSuruburi1.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);


  cell1.innerHTML = "<input style='width:200px;' readonly='' type='text' id='suruburiName_"+i+"' value='"+result[i].article+"' placeholder= '"+result[i].length+"'/>";
  if(result[i].article === 'Surub 4,8*20RAL' || result[i].article === 'Surub 4,8*35 RAL' || result[i].article === 'Surub 4.8*19 CF3 RAL ' ) {
    cell1.innerHTML += "<select onchange='recordInputs(this.id, this.value);' id='suruburiCuloare_"+i+"' ><option>Selecteaza culoare</option><option>RAL3000</option><option>RAL3005</option><option>RAL3009</option><option>RAL3011</option><option>RAL5010</option><option>RAL6005</option><option>RAL6020</option><option>RAL7024</option><option>RAL8004</option><option>RAL8014</option><option>RAL8017</option><option>RAL8019</option><option>RAL9002</option><option>RAL9005</option><option>RAL9006</option></select>";
  }
  cell2.innerHTML = "<input style='width:60px;' type='number' onchange='checkAndDefinePropertiesSuruburi(this.id, this.value); recordInputs(this.id, this.value);' min='0' tabindex='"+ i+1 +"' id='suruburiUnits_"+i+"' placeholder= ''/>";
     }

  }

  for (var i = 0; i < result.length; i++) {

    if(document.getElementById('suruburiUnits_'+i)){

      //do nothing because table already contains rows :D
      // not the best way , I ll learn I promise !!!!!!
    } else {
    var row = tableSuruburi2.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);


  cell1.innerHTML = "<input style='width:300px;'  type='text' id='suruburiName_"+i+"' value='"+result[i].article+"' placeholder= '"+result[i].length+"'/>";
  if(result[i].article === 'Surub 4,8*20RAL' || result[i].article === 'Surub 4,8*35 RAL' || result[i].article === 'Surub 4.8*19 CF3 RAL ' ) {
    cell1.innerHTML += "<select onchange='recordInputs(this.id, this.value);' id='suruburiCuloare_"+i+"' ><option>Selecteaza culoare</option><option>RAL3000</option><option>RAL3005</option><option>RAL3009</option><option>RAL3011</option><option>RAL5010</option><option>RAL6005</option><option>RAL6020</option><option>RAL7024</option><option>RAL8004</option><option>RAL8014</option><option>RAL8017</option><option>RAL8019</option><option>RAL9002</option><option>RAL9005</option><option>RAL9006</option></select>";
  }
  cell2.innerHTML = "<input style='width:60px;' type='number' onchange='checkAndDefinePropertiesSuruburi(this.id, this.value); recordInputs(this.id, this.value);' min='0' id='suruburiUnits_"+i+"' placeholder= ''/>";
     }

  }


});
}

function checkAndDefinePropertiesSuruburi(id, value){

  Suruburi.addDimensions = (ID, Value) => {
    
    ID = id; 
    Value = value;

    inputId = id.replace( /\D+/g, '');
    name   = document.getElementById(`suruburiName_${inputId}`).value;
    // Suruburi.culoare = docuemnt.getElementById(`suruburiCuloare_${inputId}`).value || null;
    units  = Value;
    length = 0;
    width  = 0;
    mp     = 0; 
    price  = 0;
    total  = 0;

       // checking if the item already exists
       Suruburi.dimensions.forEach((element, index, arr)=>{
       
        if(element.name === name){
         
          if(units === 0 || units === '0' || units === null){
            console.log('test');
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
   Suruburi.dimensions.push({
    name  : name, 
    units : units,
    length : length,
    width : width,
    mp : mp,
    price: price,
    total: total
  });


    
  }

 


  try{Suruburi.addDimensions();} catch(e){console.log('Value modified succesfully.');}
  checkProductPrice();



}
