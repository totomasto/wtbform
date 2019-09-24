const mysql = require('mysql');
const fs = require('fs');

var con = mysql.createConnection({
  multipleStatements: true,
  host :       process.env.DB_host,
  user :      process.env.DB_user,
  password :  process.env.DB_password,
  database : process.env.DB_database,


});

async function setInitParameters(){

fs.readFile(`${__dirname}/js/resources/init.txt`, (err, data)=>{
if(err) throw err;
// getInitCode(data);
localStorage.setItem('initCode', data);
localStorage.setItem('offerMode', 'off');
});
}

 setInitParameters();


// blueprint for all the parameters that we need to extract from db , such as first column of the article , the category and the id of the first selector 
function InitialCategorySelector(article , category , firstAttribute, dimensions){
  this.article = article;
  this.category = category;
  this.firstAttribute = firstAttribute;
  this.dimensions = [];
}

function InputRecorder(id, value){
  this.id = id;
  this.value = value; 
}

function InputImporter(id, value){
  this.id = id;
  this.value = value;
}



// declaration of all the objects 
const Tigla     = new InitialCategorySelector('article', 'Tigla', 'attribute1Tigla','');
const Accesorii = new InitialCategorySelector('attribute_1', 'Accesorii', 'attribute1Acc','');
const Drenaj    = new InitialCategorySelector('attribute_1', 'Drenaj', 'attribute1Drenaj','');
const Click     = new InitialCategorySelector('attribute_2', 'Click', 'attribute1Click','');
const Cutata    = new InitialCategorySelector('article', 'Cutata', 'attribute1Cutata','');
const Minirulou = new InitialCategorySelector('attribute_1', 'Minirulou', 'attribute1Minirulou','');
const Sipca     = new InitialCategorySelector('attribute_2', 'Sipca', 'attribute1Sipca','');

// declaration for the categories that dont contain attributes, so the query is in resources with all the other categories 
// for these categories the object is constructed here with almost no values and is updated with what is needed in checkProperties function that exists in every category file also in resources
const Membrane = new InitialCategorySelector('', 'Membrane si accesorii', '', '');
const Suruburi = new InitialCategorySelector('', 'Suruburi', '', '');
const Ferestre = new InitialCategorySelector('', 'Ferestre', '','');
const Scule    = new InitialCategorySelector('', 'Scule', '', '');

//                                                     ^
// so we dont have to use them in the categories array |

const categories = [Tigla, Accesorii, Drenaj, Click, Cutata, Minirulou, Sipca];
const categoriesTable = [Tigla, Accesorii, Drenaj, Membrane, Suruburi, Ferestre, Scule, Click, Cutata, Minirulou, Sipca];





document.addEventListener('DOMContentLoaded', () => {

  categories.forEach((item)=>{
     
     con.query(`SELECT DISTINCT(${item.article}) FROM products_form WHERE category = '${item.category}' AND ${item.article} <> '' ORDER BY ${item.article} ASC `, (err, result, fields) => {
      let attribute1Category = document.getElementById(item.firstAttribute);
      result.forEach((result) =>{
       
        let option = document.createElement('option');
        option.text  = result[Object.keys(result)[0]];
        option.value = result[Object.keys(result)[0]];
        attribute1Category.add(option);     
      });
    
    });
    
    
    });


// membrane si accesorii does not have any attributes , you can find the code inside membrane.js
// suruburi does not have any attributes, you can find the code inside suruburi.js
// ferestre si rame - comming soon :D


});


async function proccessFunction(){
      clearTable();
      

const checkoutTable = document.querySelector('#checkoutTable');
checkoutTable.rows[0].cells[0].innerHTML = "";

categoriesTable.forEach((element) => {

element.dimensions.forEach((dimension) =>{
  if(dimension.name === undefined){
    // skip line
  } else {
// console.log(dimension.price);
  let name = `${dimension.name} ${element.article || ''} ${element.attribute2 || ''} ${element.attribute3 || ''}`;
  name = name.toUpperCase();
  
  length  = dimension.length;
  width   = dimension.width;
  units   = dimension.units;
  measure = dimension.mp;
  color   = element.culoare || ' ';
  price   = dimension.price || ' ';
  total   = dimension.total || ' ';
  
let row = checkoutTable.insertRow(-1);
let cell1 = row.insertCell(-1);
let cell2 = row.insertCell(-1);
let cell3 = row.insertCell(-1);
let cell4 = row.insertCell(-1);
let cell5 = row.insertCell(-1);
let cell6 = row.insertCell(-1);
let cell7 = row.insertCell(-1);
let cell8 = row.insertCell(-1);

cell1.innerHTML = name ;
cell2.innerHTML = length ;
cell3.innerHTML = width;
cell4.innerHTML = units;
cell5.innerHTML = color;
cell6.innerHTML = measure;
cell7.innerHTML = price;
cell8.innerHTML = total;
     }
   });
});

// localStorage.clear();


checkForProductColor();
applyFullOrderTotal();
}


async function generateProductColor(category, attribute1 , attribute2, callback){

  let queryWithoutFirstAttribute = `SELECT color FROM color_form WHERE category = '${category}' and attribute_2 = '${attribute2}' `;
  let queryFull = `SELECT color FROM color_form WHERE category = '${category}' and attribute_1 = '${attribute1}' and attribute_2 = '${attribute2}' `;
  let theChosenOne = (attribute1 === null) ? queryWithoutFirstAttribute : queryFull;
 
 
  con.query(theChosenOne, (err, result, fields)=>{
    if(err) throw err;
    return callback(null, result);
  });
  


}




function checkForProductColor(){

  // looping through table to match color for each product
    var table = document.getElementById("checkoutTable");

    for (var i = 1 ; i < table.rows.length; i++) {

                var tableColor;

                for (var j = 0; j < table.rows[i].cells.length; j++) {

                  var cell = table.rows[i].cells[4]


                  if(table.rows[i].cells[4].innerHTML === 'RAL3011')  cell.style.backgroundColor = '#792423';
                  if(table.rows[i].cells[4].innerHTML === 'RAL8017')  cell.style.backgroundColor = '#442f29';
                  if(table.rows[i].cells[4].innerHTML === 'RAL6005')   cell.style.backgroundColor = '#2A4231'  ;
                  if(table.rows[i].cells[4].innerHTML === 'RAL6020')   cell.style.backgroundColor = '#33392A'  ;
                  if(table.rows[i].cells[4].innerHTML === 'RAL7006')   cell.style.backgroundColor = '#726B62'  ;
                  if(table.rows[i].cells[4].innerHTML === 'RAL7024')   cell.style.backgroundColor = '#1E2122'  ;
                  if(table.rows[i].cells[4].innerHTML === 'RAL3000')   cell.style.backgroundColor = '#A41005'  ;
                  if(table.rows[i].cells[4].innerHTML === 'RAL3005')   cell.style.backgroundColor = '#5C2D3B'  ;
                  if(table.rows[i].cells[4].innerHTML === 'RAL3009')   cell.style.backgroundColor = '#490F0D'  ;
                  if(table.rows[i].cells[4].innerHTML === 'RAL5010')   cell.style.backgroundColor = '#1C476D'  ;
                  if(table.rows[i].cells[4].innerHTML === 'RAL8004')   cell.style.backgroundColor = '#713D2C'  ;
                  if(table.rows[i].cells[4].innerHTML === 'RAL8014')   cell.style.backgroundColor = '#271B12'  ;
                  if(table.rows[i].cells[4].innerHTML === 'RAL8019')   cell.style.backgroundColor = '#221E18';
                  if(table.rows[i].cells[4].innerHTML === 'RAL9002')   cell.style.backgroundColor = '#C1BEAF';
                  if(table.rows[i].cells[4].innerHTML === 'RAL9005')   cell.style.backgroundColor = '#1B1B1D';
                  if(table.rows[i].cells[4].innerHTML === 'RAL9010')   cell.style.backgroundColor = '#E8E9E0';
                  if(table.rows[i].cells[4].innerHTML === 'RAL9006')   cell.style.backgroundColor = '#8A8B8B';
                  if(table.rows[i].cells[4].innerHTML === 'RAL9019')   cell.style.backgroundColor =  '';
                  if(table.rows[i].cells[4].innerHTML === 'ALZN')      cell.style.backgroundColor =  '#585858';
                  if(table.rows[i].cells[4].innerHTML === 'RAL7016')   cell.style.backgroundColor =  '#383e42';
                  if(table.rows[i].cells[4].innerHTML === 'Zincat')    cell.style.backgroundColor =  '#585858';
                  if(table.rows[i].cells[4].innerHTML === 'Imitatie lemn')   cell.style.backgroundColor =  '#D7DF01';
                  if(table.rows[i].cells[4].innerHTML === 'Alb-RAL9010')     cell.style.backgroundColor =  '#f1ece1';
                  if(table.rows[i].cells[4].innerHTML === 'Maro-RAL8016')    cell.style.backgroundColor =  '#4c2b20';
                  if(table.rows[i].cells[4].innerHTML === 'Rosu-RAL3009')    cell.style.backgroundColor =  '#490F0D';
                         cell.style.color = 'white';
    }
  }

}

function applyFullOrderTotal(){

  let total = 0 ,tva = 0 ,subtotal = 0, mpTigla = 0, mpCutata =0, mpMinirulou = 0, mpClick = 0;

  categoriesTable.forEach((element)=>{
    element.dimensions.forEach((item)=>{
        total = parseFloat(item.total) + total;
        if(element.category === 'Tigla') mpTigla = parseFloat(item.mp) + mpTigla;
        if(element.category === 'Cutata') mpCutata = parseFloat(item.mp) + mpCutata;
        if(element.category === 'Minirulou') mpMinirulou = parseFloat(item.mp) + mpMinirulou;
        if(element.category === 'Click') mpClick = parseFloat(item.mp) + mpClick;

    });
  });

tva = 19/100 * total ;
subtotal = total - tva;

document.getElementById('subTotal').innerHTML = subtotal.toFixed(2);
document.getElementById('tva').innerHTML = tva.toFixed(2);
document.getElementById('total').innerHTML = total.toFixed(2);
document.getElementById('mpTigla').innerHTML = mpTigla.toFixed(2);
document.getElementById('mpCutata').innerHTML = mpCutata.toFixed(2);
document.getElementById('mpMinirulou').innerHTML = mpMinirulou.toFixed(2);
document.getElementById('mpClick').innerHTML = mpClick.toFixed(2);

findRonTotal(document.getElementById('cursEuro').value);

}



function clearTable(){
  $("#checkoutTable").find("tr:not(:first)").remove();
 }





 function CategoryAttributes(object, attribute1, attribute2, attribute3, drip, color, table1, table2, table3){
  this.object     = object;
  this.attribute1 = attribute1;
  this.attribute2 = attribute2;
  this.attribute3 = attribute3;
  this.drip       = drip;
  this.color      = color;
  this.table1     = table1;
  this.table2     = table2;
  this.table3     = table3;
}

const attributesTigla     = new CategoryAttributes('Tigla','attribute1Tigla', 'attribute2Tigla', 'attribute3Tigla', 'dripstopTigla', 'culoareTigla', 'dimensiuniTiglaPredef', 'dimensiuniTiglaAtipic','');
const attributesAccesorii = new CategoryAttributes('Accesorii', 'attribute1Acc', 'attribute2Acc', '', '', 'culoareAcc', 'tableAccesorii', 'dimensiuniBorduri',''); 
const attributesDrenaj    = new CategoryAttributes('Drenaj', 'attribute1Drenaj', 'attribute2Drenaj', '', '', 'culoareDrenaj', 'tableDrenaj', '',''); 
const attributesClick     = new CategoryAttributes('Click', 'attribute1Click', '','','','culoareClick','tableClickAcc', 'tableClickTabla1', 'tableClickTabla2' );
const attributesCutata    = new CategoryAttributes('Tabla Cutata', 'attribute1Cutata', 'attribute2Cutata', 'attribute3Cutata', 'dripstopCutata', 'culoareCutata', 'dimensiuniCutataAtipic', '','');
const attributesMinirulou = new CategoryAttributes('Minirulou', 'attribute1Minirulou', 'attribute2Minirulou', '','', 'culoareMinirulou','dimensiuniMinirulou','','');
const attributesSipca     = new CategoryAttributes('Sipca', 'attribute1Sipca', '', '','','culoareSipca','tableSipca', '',''  );
const attributesArray     = [attributesTigla, attributesAccesorii, attributesDrenaj, attributesClick, attributesCutata, attributesMinirulou, attributesSipca];
// Ferestre category is found inside ferestre.js

attributesArray.forEach((item)=>{
 
  document.querySelector(`#${item.attribute1}`).addEventListener('change', ()=>{

    if(item.attribute2 !== '') $(`#${item.attribute2} option:not(:first)`).remove();
    if(item.attribute3 !== '') $(`#${item.attribute3} option:not(:first)`).remove();
    if(item.drip !== '')       $(`#${item.drip} option:not(:first)`).remove();
    $(`#${item.color} option:not(:first)`).remove();

    $("#collapse1").collapse('hide');
    $(`#${item.table1}`).find("tr:not(:first)").remove();
    if(item.table2 !== '') $(`#${item.table2}`).find("tr:not(:first)").remove();
    if(item.table3 !== '') $(`#${item.table3}`).find("tr:not(:first)").remove();
    categoriesTable.forEach((element)=>{
    
     if(item.object === element.category){
        
      if(element.dimensions.length != 0 ){       
      element.dimensions = [];
      proccessFunction();  
    }
      }
    });

    
  });
  if(item.attribute2 !== ''){
  if(document.querySelector(`#${item.attribute2}`)){
    document.querySelector(`#${item.attribute2}`).addEventListener('change', ()=>{

      if(item.attribute3 !== '') $(`#${item.attribute3} option:not(:first)`).remove();
      if(item.drip !== '')       $(`#${item.drip} option:not(:first)`).remove();
      $(`#${item.color} option:not(:first)`).remove();
  
      $("#collapse1").collapse('hide');
      $(`#${item.table1}`).find("tr:not(:first)").remove();
      if(item.table2 !== '') $(`#${item.table2}`).find("tr:not(:first)").remove();
      if(item.table3 !== '') $(`#${item.table3}`).find("tr:not(:first)").remove();
      categoriesTable.forEach((element)=>{
    
        if(item.object === element.category){
           
         if(element.dimensions.length !== 0 ){       
         element.dimensions = [];
         proccessFunction();  
       }
         }
       });
    });
  } 
}
    if(item.attribute3 !== ''){
  if(document.querySelector(`#${item.attribute3}`)){
    document.querySelector(`#${item.attribute3}`).addEventListener('change', ()=>{

      if(item.drip !== '')       $(`#${item.drip} option:not(:first)`).remove();
      $(`#${item.color} option:not(:first)`).remove();
  
      $("#collapse1").collapse('hide');
      $(`#${item.table1}`).find("tr:not(:first)").remove();
      if(item.table2 !== '') $(`#${item.table2}`).find("tr:not(:first)").remove();
      if(item.table3 !== '') $(`#${item.table3}`).find("tr:not(:first)").remove();
      categoriesTable.forEach((element)=>{
    
        if(item.object === element.category){
           
         if(element.dimensions.length !== 0 ){       
         element.dimensions = [];
         proccessFunction();  
       }
         }
       });
    });
  } 
}
  if(item.drip !== ''){
  if(document.querySelector(`#${item.drip}`)){
    document.querySelector(`#${item.drip}`).addEventListener('change', ()=>{

         
       $(`#${item.color} option:not(:first)`).remove();
  
      $("#collapse1").collapse('hide');
      $(`#${item.table1}`).find("tr:not(:first)").remove();
      if(item.table2 !== '') $(`#${item.table2}`).find("tr:not(:first)").remove();
      if(item.table3 !== '') $(`#${item.table3}`).find("tr:not(:first)").remove();
      categoriesTable.forEach((element)=>{
    
        if(item.object === element.category){
           
         if(element.dimensions.length !== 0 ){       
         element.dimensions = [];
         proccessFunction();  
       }
         }
       });
    });
  } 
}

  if(document.querySelector(`#${item.color}`)){
    document.querySelector(`#${item.color}`).addEventListener('change', ()=>{

      $("#collapse1").collapse('hide');
      $(`#${item.table1}`).find("tr:not(:first)").remove();
      if(item.table2 !== '') $(`#${item.table2}`).find("tr:not(:first)").remove();
      if(item.table3 !== '') $(`#${item.table3}`).find("tr:not(:first)").remove();
      categoriesTable.forEach((element)=>{
    
        if(item.object === element.category){
           
         if(element.dimensions.length !== 0 ){       
         element.dimensions = [];
         proccessFunction();  
       }
         }
       });
    });
  }


});

// async function getInitCode(initCode){
// if(document.readyState === 'complete'){
// initDiv = document.getElementById('initCode');  
// initDiv.innerHTML = `<h2>Inregistrat cu codul :<hr> ${initCode}</h2> `;
// }
// };

async function offerMode(){

  let title = document.getElementById('offerTitle');
  let button = document.getElementById('offerButton');
  document.getElementById('loader').style.display = 'block';

  if(localStorage.getItem('offerMode') === 'off'){

    title.innerHTML = 'Apasa pentru comanda : ';
    button.className = 'btn btn-primary  btn-small';
    button.innerHTML = 'Mod comanda';
  
    document.body.style.backgroundColor = "#EA2E31";
    localStorage.setItem('offerMode', 'on');
   


  } else { 
    title.innerHTML = 'Apasa pentru oferta : ';
    button.className = 'btn btn-danger btn-small';
    button.innerHTML = 'Mod ofertare';

    document.body.style.backgroundColor = "#038343";
    localStorage.setItem('offerMode', 'off');
 
 
  }
  
  await checkProductPrice();
  setTimeout(()=>{document.getElementById('loader').style.display = 'none';},1000);
}


function zoomApp(dimension){
  let currentValue = document.body.style.zoom;
  if(dimension === 'in'){
  zoom = parseInt(currentValue) + 10 + '%';
  } else if(dimension === 'out'){
  zoom = parseInt(currentValue) - 10 + '%';  
  }
  document.body.style.zoom = zoom;
}

function collapseAll(){
  for(let i = 1; i<12; i++){
    $(`#collapse${i}`).collapse('hide');
  }
}

function findRonTotal(eurValue){
  let eurTotal = document.getElementById('subTotal').innerHTML;
  let ronTotal = eurValue * eurTotal;
  document.getElementById('totalRON').innerHTML = ronTotal.toFixed(2);
}




let insertedInputs = [];
async function recordInputs(id, value){
  try{
insertedInputs.forEach((element)=>{

  if(id === element.id){
    element.value = value;
    throw 'exit';
  } 

});
insertedInputs.push(new InputRecorder(id, value));

} catch(e){
  console.log('Recorder successfully modified');
  
}

}

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


async function completeImportedOrder(importedInputs){
  const start = async () => {
    await asyncForEach(importedInputs, async (element) => {
      await waitFor(600);
      
      if(element.id.includes('section')) { 
        document.getElementById(element.id).click();
      }
      while(document.getElementById(element.id) === null){
        await waitFor(3000);
      }
        document.getElementById(element.id).value = element.value;
      let event = new Event('change');
      document.getElementById(element.id).dispatchEvent(event);
      
    });
    console.log('Done');
  }
  start();
 
}


