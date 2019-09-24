  var Excel = require('exceljs');
  const pathToDesktop = require('path').join(require('os').homedir(), 'Desktop');
  var FileSaver = require('file-saver');

function exportExcelOrder(){

  if(document.getElementById('numeComanda').value && document.getElementById('adresaComanda').value && document.getElementById('dataLivrare').value){
   
  

  const Excel = require('exceljs');
  let filename1 = `${__dirname}/order_template.xlsx`;
  let filename2 = `${document.getElementById('numeComanda').value}.xlsx`;
  let workbook = new Excel.Workbook();
  workbook.xlsx.readFile(filename1)
      .then(() => {
        var worksheet = workbook.getWorksheet('sheet1');

 

// completing xlsx file 

let client = '';
let oras   = document.getElementById('orasComanda').value;
let judet  = document.getElementById('judetComanda').value;
let strada = document.getElementById('adresaComanda').value;
let data   = document.getElementById('dataLivrare').value;
let observatii = document.getElementById('obs').value;
let docplata   = document.getElementById('docPlata').value;
let zile       = document.getElementById('zilePlata').value;
let livrare    = document.getElementById('livrare').value;
let sofer      = document.getElementById('sofer').value;
let agent = '';

let mpTigla     = document.getElementById('mpTigla').innerHTML;
let mpCutata    = document.getElementById('mpCutata').innerHTML;
let mpMinirulou = document.getElementById('mpMinirulou').innerHTML;
let mpClick     = document.getElementById('mpClick').innerHTML;


let numeComanda = document.getElementById('numeComanda').value;

worksheet.getCell('G7').value = client;
worksheet.getCell('G8').value = oras;
worksheet.getCell('G9').value = judet;
worksheet.getCell('G10').value = strada;
worksheet.getCell('E11').value = data;
worksheet.getCell('E12').value = observatii;
worksheet.getCell('E13').value = '';
worksheet.getCell('E14').value = '';
worksheet.getCell('E15').value = '';
worksheet.getCell('E16').value = sofer;
worksheet.getCell('K7').value = docplata; 
worksheet.getCell('K8').value = zile;
worksheet.getCell('K9').value = livrare;
worksheet.getCell('K10').value = agent;
worksheet.getCell('K13').value = mpTigla;
worksheet.getCell('K14').value = mpCutata;
worksheet.getCell('K15').value = mpMinirulou;
worksheet.getCell('K16').value = mpClick;
console.log(mpTigla);
worksheet.getCell('D19').value = `FORMULAR DE COMANDA - ${numeComanda}`;
let table = document.getElementById("checkoutTable");
let count = 1;
let font = {size: 9 };

let columns = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K'];
for(let rowNumber = 24; rowNumber < 23+table.rows.length; rowNumber++){

    let nrCrt     = worksheet.getCell(`C${rowNumber}`);
    let denumire  = worksheet.getCell(`D${rowNumber}`);
    let lungime   = worksheet.getCell(`E${rowNumber}`);
    let latime    = worksheet.getCell(`F${rowNumber}`);
    let bucati    = worksheet.getCell(`G${rowNumber}`);
    let culoare   = worksheet.getCell(`H${rowNumber}`);
    let mp        = worksheet.getCell(`I${rowNumber}`);
    let price     = worksheet.getCell(`J${rowNumber}`);
    let total     = worksheet.getCell(`K${rowNumber}`);


    nrCrt.border      = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
    denumire.border   = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
    lungime.border    = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
    latime.border     = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
    bucati.border     = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
    culoare.border    = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
    mp.border         = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
    price.border      = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
    total.border      = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};


    nrCrt   .font = font;
    denumire.font = font;
    lungime .font = font;
    latime  .font = font;
    bucati  .font = font;
    culoare .font = font;
    mp      .font = font;
    price   .font = font;
    total   .font = font;


    nrCrt.value    = count;
    denumire.value = table.rows[count].cells[0].innerHTML;
    lungime.value  = table.rows[count].cells[1].innerHTML;
    latime.value   = table.rows[count].cells[2].innerHTML;
    bucati.value   = table.rows[count].cells[3].innerHTML;
    culoare.value  = table.rows[count].cells[4].innerHTML;
    mp.value       = table.rows[count].cells[5].innerHTML;
    price.value    = table.rows[count].cells[6].innerHTML;
    total.value    = table.rows[count].cells[7].innerHTML;
    
   count++;

 }





printTotal((24+table.rows.length));

// print total 
function printTotal(afterProducts){

    let total = document.getElementById('subTotal').innerHTML;
    let tva   = document.getElementById('tva').innerHTML;
    let fulltotal = document.getElementById('total').innerHTML;
    totalRow = afterProducts + 2;
    tvaRow   = afterProducts + 3;
    fulltotalRow = afterProducts + 4;

    worksheet.getCell(`D${totalRow}`).value = `Subtotal : ${total} EUR `; 
    worksheet.getCell(`D${tvaRow}`).value = `TVA : ${tva} EUR `;
    worksheet.getCell(`D${fulltotalRow}`).value = `Total : ${fulltotal} EUR `;

    worksheet.getCell(`D${totalRow}`).border={top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
    worksheet.getCell(`D${tvaRow}`).border={top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
    worksheet.getCell(`D${fulltotalRow}`).border={top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};

}




for(let i = 1; i<insertedInputs.length; i++){
   
   idCell = worksheet.getCell('BA'+i);
  valueCell = worksheet.getCell('BB'+i);
   
  idCell.value = insertedInputs[i-1].id;
  valueCell.value = insertedInputs[i-1].value;
  
  
}


workbook.xlsx.writeFile(`${pathToDesktop}/${filename2}`);


      }).then(() => {
          alert(`Fisierul cu numele ${filename2} a fost exportat pe Desktop `);
         
       


      }).catch(err => console.error(err));

    } else {
      alert('Campurile obligatorii nu au fost completate');

    }

}





document.querySelector('#importExcel').addEventListener('change', (event)=>{ 

  let input = event.target;
  let file = input.files[0];
  
  if(file){
      let reader = new FileReader();
      
      reader.onload = (event) => {
          new Excel.Workbook().xlsx
              .load(event.target.result)
              .then((workbook) => {

                  let worksheet = workbook.getWorksheet('sheet1');
                   // doin dem stuff
            // Iterate over all rows (including empty rows) in a worksheet
            let idColumn = worksheet.getColumn('BA');
            let valueColumn = worksheet.getColumn('BB');
            let importedInputs = [];
            idColumn.eachCell({ includeEmpty: false }, function(cell, rowNumber) {    
              if(cell.value !== null) importedInputs.push(new InputRecorder(cell.value, worksheet.getCell(`BB${rowNumber}`).value));     
              
                 });
            
                
                completeImportedOrder(importedInputs);

             });
      };
      
      reader.readAsArrayBuffer(file);
      
  }

  });



  async function exportOffer(){

if(document.getElementById('numeComanda').value){

    const Excel = require('exceljs');
    let filename1 = `${__dirname}/offer_template.xlsx`;
    let filename2 = `${document.getElementById('numeComanda').value}.xlsx`;
    let workbook = new Excel.Workbook();
    workbook.xlsx.readFile(filename1)
        .then(() => {
          var worksheet = workbook.getWorksheet('oferta');

          categoriesTable.forEach((element) => {

          if(element.article === 'article' || element.attribute2 === undefined){

          } else {
            
              if(element.category === 'Tigla'){

                 let tip = element.article;
                 let grosime = element.attribute3;
                 let culoare = element.culoare;
                 let structura = element.attribute2;
                 let suprafata = document.getElementById('mpTigla').innerHTML;


                 worksheet.getCell('E15').value = tip;
                 worksheet.getCell('E16').value = grosime;
                 worksheet.getCell('E17').value = culoare;
                 worksheet.getCell('E18').value = structura;
                 worksheet.getCell('E19').value = suprafata;
                 

              } else if(element.category === 'Cutata'){

                 let tip = element.article;
                 let grosime = element.attribute3;
                 let culoare = element.culoare;
                 let structura = element.attribute2;
                 let suprafata = document.getElementById('mpCutata').innerHTML;


                 worksheet.getCell('E21').value = tip;
                 worksheet.getCell('E22').value = grosime;
                 worksheet.getCell('E23').value = culoare;
                 worksheet.getCell('E24').value = structura;
                 worksheet.getCell('E25').value = suprafata;

              }  else if(element.category === 'Accesorii'){
                     
                let culoare = element.culoare;
                let structura = `${element.article} - ${element.attribute2}`;
                let accBody = '';
                element.dimensions.forEach((dimension) =>{
                  if(dimension.name !== 'Bordura speciala')  accBody += `${dimension.name}, `;  
              });

              worksheet.getCell('E34').value = structura;
                
              worksheet.getCell('E33').value = culoare;
            
              worksheet.getCell('C35').value = accBody;  


              } else if(element.category === 'Drenaj'){

                let culoare = element.culoare ;
                let structura = `${element.article} - ${element.attribute2}`;
                let drenajBody = '';
                element.dimensions.forEach((dimension) =>{
                drenajBody += `${dimension.name}, `;  
              });

              worksheet.getCell('E40').value = structura;
                
              worksheet.getCell('E41').value = culoare;
            
              worksheet.getCell('C42').value = drenajBody;



              } else if(element.category === 'Ferestre'){

                let ferestreBody = '';
                element.dimensions.forEach((dimension) =>{
                  ferestreBody += `${dimension.name}, `;  
                });

                worksheet.getCell('C47').value = ferestreBody;


              }


            }

            if(element.category === 'Click'){

              let tip = (element.article === 'attribute_2') ? '' : element.article;
              
              let culoare = element.culoare || '';
              
              let suprafata = document.getElementById('mpClick').innerHTML;

              worksheet.getCell('E27').value = tip;
              
              worksheet.getCell('E29').value = culoare;
            
              worksheet.getCell('E31').value = suprafata;



            }

           
          });
  







          workbook.xlsx.writeFile(`${pathToDesktop}/${filename2}`);

        }).then(() => {
          alert(`Fisierul cu numele ${filename2} a fost exportat pe Desktop `);
         
       


      }).catch(err => console.error(err));
    
    } else {
      alert('Completeaza campul : Nume comanda !');
    }
  }