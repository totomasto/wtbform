function showProductsScule(){


    // no attribute for membrane si accesorii , needs mysql conn.
    con.query("SELECT article from products_form where category = 'Scule'", function(err, result, fields){
    
    var tableScule = document.getElementById('tableScule');
    
    
      for (var i = 0; i < result.length; i++) {
    
        if(document.getElementById('sculeUnits_'+i)){
    
          //do nothing because table already contains rows :D
          // not the best way , I ll learn,  I promise !!!!!!
        } else {
        var row = tableScule.insertRow(-1);
        var cell1 = row.insertCell(-1);
        var cell2 = row.insertCell(-1);
    
    
      cell1.innerHTML = "<input style='width:400px;' readonly='' type='text' id='sculeName_"+i+"' value='"+result[i].article+"' placeholder= '"+result[i].length+"'/>";
      cell2.innerHTML = "<input style='width:60px;' type='number' onchange='checkAndDefinePropertiesScule(this.id, this.value); recordInputs(this.id, this.value);' min='0' tabindex='"+ i+1 +"' id='sculeUnits_"+i+"' placeholder= ''/>";
         }
    
      }
    
    
    
    });
    }
    
    function checkAndDefinePropertiesScule(id, value){
    
      
      Scule.addDimensions = (ID, Value) => {
        ID = id; 
        Value = value;
    
        inputId = id.replace( /\D+/g, '');
    
        name   = document.getElementById(`sculeName_${inputId}`).value;
        units  = Value;
        length = 0;
        width  = 0;
        mp     = 0; 
        price  = 0;
        total  = 0; 
    
           // checking if the item already exists
           Scule.dimensions.forEach((element, index, arr)=>{
                  
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
       Scule.dimensions.push({
        name  : name, 
        units : units,
        length : length,
        width : width,
        mp : mp,
        price: price,
        total: total
      });
    
    
        
      }
    
     
    
    
      try{Scule.addDimensions();} catch(e){console.log('Value modified succesfully.');}
      checkProductPrice();
    
    
    
    }
    