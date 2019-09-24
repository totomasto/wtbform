function showProductsFerestre(){


    const tableFerestre1 = document.getElementById('fereastra1');
    const tableFerestre2 = document.getElementById('fereastra2');
    
   for(let i = 0 ; i<=4; i++){
    if(document.getElementById(`ferestreUnits${i}Row1`) || document.getElementById(`ferestreAttr${i}Row1`)){
         
        //do nothing because table already contains rows :D
        // not the best way , I ll learn,  I promise !!!!!!
      } else {

    let row = tableFerestre1.insertRow(-1);
    let row2 = tableFerestre2.insertRow(-1);
    
    let cell1 = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row2.insertCell(-1);
    let cell4 = row2.insertCell(-1);

    if(i === 4){
        cell1.innerHTML = `<input type='number' placeholder='Cantitate' onchange='checkAndDefinePropertiesFerestre(this.id,this.value); recordInputs(this.id, this.value);' class='form-control' min='0' id='ferestreUnits${i}Row1'>`;
        cell2.innerHTML = `<input type='number' placeholder='Cantitate' onchange='checkAndDefinePropertiesFerestre(this.id,this.value); recordInputs(this.id, this.value);' class='form-control' min='0' id='ferestreUnits${i}Row2'>`;
        cell3.innerHTML = `<input type='number' placeholder='Cantitate' onchange='checkAndDefinePropertiesFerestre(this.id,this.value); recordInputs(this.id, this.value);' class='form-control' min='0' id='ferestreUnits${i}Row3'>`;
        cell4.innerHTML = `<input type='number' placeholder='Cantitate' onchange='checkAndDefinePropertiesFerestre(this.id,this.value); recordInputs(this.id, this.value);' class='form-control' min='0' id='ferestreUnits${i}Row4'>`;
         
    } else {
        
    cell1.innerHTML = `<select class='form-control' onchange='recordInputs(this.id, this.value);' id='ferestreAttr${i}Row1'><option selected="">Selecteaza valoare</option></select>`;
    cell2.innerHTML = `<select class='form-control' onchange='recordInputs(this.id, this.value);' id='ferestreAttr${i}Row2'><option selected="">Selecteaza valoare</option></select>`;   
    cell3.innerHTML = `<select class='form-control' onchange='recordInputs(this.id, this.value);' id='ferestreAttr${i}Row3'><option selected="">Selecteaza valoare</option></select>`;
    cell4.innerHTML = `<select class='form-control' onchange='recordInputs(this.id, this.value);' id='ferestreAttr${i}Row4'><option selected="">Selecteaza valoare</option></select>`; 
    }
  }
}





displayFirstAtttribute();
cleanUpArticlesAndSelectors();

}

// populating first module 




function displayFirstAtttribute(){

    con.query("SELECT distinct(article) from products_form WHERE category = 'Ferestre' ", (err, result, fields)=>{

      for(let i = 1 ; i<=4; i++){
        if(document.getElementById(`ferestreAttr0Row${i}`).options[1]){
         
            //do nothing because table already contains rows :D
            // not the best way , I ll learn,  I promise !!!!!!
          } else {

         result.forEach((element)=>{
             
            let option = document.createElement("option");
            option.text =  element.article;
            option.value=  element.article;
            document.getElementById(`ferestreAttr0Row${i}`).add(option);

         });
        }
      }

    });
    
    displaySecondAttribute();
    displayThirdAttribute();
    displayFourthAttribute();

}

function displaySecondAttribute(){
for(let i = 1; i<=4; i++){

   
    document.getElementById(`ferestreAttr0Row${i}`).addEventListener('change', ()=>{
        let article = document.getElementById(`ferestreAttr0Row${i}`).value;
       con.query(`SELECT DISTINCT(attribute_1) FROM products_form WHERE category='Ferestre' AND article = '${article}' `, (err, result, fields)=>{

        result.forEach((element)=>{
          
            let option = document.createElement("option");
            option.text =  element.attribute_1;
            option.value=  element.attribute_1;
            document.getElementById(`ferestreAttr1Row${i}`).add(option);

         });

       });
     
    });

}
}

function displayThirdAttribute(){
    for(let i = 1; i<=4; i++){

        document.getElementById(`ferestreAttr1Row${i}`).addEventListener('change', ()=>{
            let article = document.getElementById(`ferestreAttr0Row${i}`).value;
            let attribute_1 = document.getElementById(`ferestreAttr1Row${i}`).value;
           con.query(`SELECT DISTINCT(attribute_2) FROM products_form WHERE category='Ferestre' AND article = '${article}' AND attribute_1 = '${attribute_1}' `, (err, result, fields)=>{
    
            result.forEach((element)=>{
              
                let option = document.createElement("option");
                option.text =  element.attribute_2;
                option.value=  element.attribute_2;
                document.getElementById(`ferestreAttr2Row${i}`).add(option);
    
             });
    
           });
        });

 

    }
}


function displayFourthAttribute(){
    for(let i = 1; i<=4; i++){

        document.getElementById(`ferestreAttr2Row${i}`).addEventListener('change', ()=>{
            let article = document.getElementById(`ferestreAttr0Row${i}`).value;
            let attribute_1 = document.getElementById(`ferestreAttr1Row${i}`).value;
            let attribute_2 = document.getElementById(`ferestreAttr2Row${i}`).value;
           con.query(`SELECT DISTINCT(attribute_3) FROM products_form WHERE category='Ferestre' AND article = '${article}' AND attribute_1 = '${attribute_1}'
           AND attribute_2 = '${attribute_2}' `, (err, result, fields)=>{
    
            result.forEach((element)=>{
              
                let option = document.createElement("option");
                option.text =  element.attribute_3;
                option.value=  element.attribute_3;
                document.getElementById(`ferestreAttr3Row${i}`).add(option);
    
             });
    
           });
        });

 

    }
}



function checkAndDefinePropertiesFerestre(id, value){
  
    Ferestre.addDimensions = (ID, Value) => {
        ID = id; 
        Value = value;
    
        inputId = id.replace( /\D+/g, '');
        inputId = inputId.substring(1);
        
        attr0 = document.getElementById(`ferestreAttr0Row${inputId}`).value;
        attr1 = document.getElementById(`ferestreAttr1Row${inputId}`).value;
        attr2 = document.getElementById(`ferestreAttr2Row${inputId}`).value;
        attr3 = document.getElementById(`ferestreAttr3Row${inputId}`).value;

        name   = `${attr0} ${attr1} ${attr2} ${attr3}`;
        units  = Value;
        length = 0;
        width  = 0;
        mp     = 0; 
        price  = 0;
        total  = 0;

             // checking if the item already exists
       Ferestre.dimensions.forEach((element, index, arr)=>{
              
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
   Ferestre.dimensions.push({
    name  : name, 
    attr0 : attr0,
    attr1 : attr1,
    attr2 : attr2,
    attr3 : attr3,
    units : units,
    length : length,
    width : width,
    mp : mp,
    price: price,
    total: total
   
       });
    }

    try{Ferestre.addDimensions();} catch(e){console.log(e);}

    checkProductPrice();
    
  


}




function cleanUpArticlesAndSelectors(){
  for(let i = 0; i<4; i++){
    for(let j = 1; j<=4; j++){
       
      document.getElementById(`ferestreAttr${i}Row${j}`).addEventListener('change', ()=>{
        $(`#ferestreUnits4Row${j}`).val("0");
        if(Ferestre.dimensions[j-1]) Ferestre.dimensions.splice(j-1,1); proccessFunction();
        for(let k = 3; k > i; k--){
            $(`#ferestreUnits4Row${j}`).val("0");
            $(`#ferestreAttr${k}Row${j} option:not(:first)`).remove();
            if(Ferestre.dimensions[j-1]) Ferestre.dimensions.splice(j-1,1); proccessFunction();
            
            
        }
      
      });
    }
  }
}




