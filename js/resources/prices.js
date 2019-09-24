

async function checkProductPrice(){
         categoriesTable.forEach((element) => {

            element.dimensions.forEach((item)=>{

               if(item.name === undefined){
                  //skip line 
               } else {

                
                let article    = element.article.toUpperCase();
                element.attribute2 ? attribute2 = element.attribute2.toUpperCase() : attribute2 = undefined;
                element.attribute3 ? attribute3 = element.attribute3.toUpperCase() : attribute3 = undefined;
                element.drip ?  drip = element.drip.toUpperCase() : drip = undefined;
                let category   = element.category.toUpperCase();
                
                if(drip){
                  
                con.query(`SELECT price FROM products_form where upper(category) = '${category}' and upper(article) = '${article}' and upper(attribute_1) = '${attribute2}' 
                and upper(attribute_2) = '${attribute3}' and upper(attribute_3) = '${drip}'  `, (err, result, fields) => {
                    if(err) throw err;
                    
                    result.forEach((prices)=>{

                     checkForDiscounts(prices.price, category, (err, result)=>{ 
                        if(err) throw err;
                        item.price = result;
                        checkForExccesess(item.price, category, (err, result ) => {
                           if(err) throw err;
                           item.price = result;
                          
                              item.total = (item.price * item.mp).toFixed(2);
                               proccessFunction();
                              
                             });
                        }); 
                     });
                     
                    
                });

               } else if(attribute2){

                 

                  con.query(`SELECT price FROM products_form where upper(category) = '${category}' and upper(article) = '${item.name.toUpperCase()}' and upper(attribute_1) = '${article.toUpperCase()}' 
                  and upper(attribute_2) = '${attribute2.toUpperCase()}'`, (err, result, fields) => {
                      if(err) throw err;
                      
                      result.forEach((prices)=>{

                       if(item.name === 'Bordura speciala'){

                        let length = item.length;
                        let width  = item.width;
                        let units  = item.units;
                        let startPrice = prices.price;

                        let latimeTabla = Math.floor(1250/width);
                        let pretBucata   = startPrice/latimeTabla + 0.1;
                        let pretMP       = ((pretBucata/2) / (width/1000)).toFixed(2);
                        
                        checkForDiscounts(pretMP, category, (err, result)=>{ 
                           if(err) throw err;
                           item.price = result;
                           checkForExccesess(item.price, category, (err, result ) => {
                              if(err) throw err;
                              item.price = result;
                             
                                 if(item.mp > 0){
                                    item.total = (item.price * item.mp).toFixed(2);
                                 } else { 
                                 item.total = (item.price * item.units).toFixed(2);
                                 }
                                 proccessFunction();
                             
                           }); 
                        });

                       } else {
                       
                        checkForDiscounts(prices.price, category, (err, result)=>{ 
                           if(err) throw err;
                           item.price = result;
                           checkForExccesess(item.price, category, (err, result ) => {
                              if(err) throw err;
                              item.price = result;
                           
                                 if(item.mp > 0){
                                    item.total = (item.price * item.mp).toFixed(2);
                                 } else { 
                                 item.total = (item.price * item.units).toFixed(2);
                                 }
                                 proccessFunction();
                               
                           }); 
                        });
                     }
                        
                      });
                  });

              

               } else if(article){
                  con.query(`SELECT price, article FROM products_form where upper(category) = '${category}' and upper(article) = '${item.name.toUpperCase()}' and 
                  upper(attribute_2) = '${article.toUpperCase()}' `, (err, result, fields) => {
                      if(err) throw err;
                      
                      result.forEach((prices)=>{
                     
                        checkForDiscounts(prices.price, category, (err, result)=>{ 
                           if(err) throw err;
                           item.price = result;
                           checkForExccesess(item.price, category, (err, result ) => {
                              if(err) throw err;
                              item.price = result;
                            
                                 if(item.mp > 0){
                                item.total = (item.price * item.mp).toFixed(2);
                                } else { 
                                item.total = (item.price * item.units).toFixed(2);
                                } 
                                   proccessFunction();
                             
                           }); 
                        });
                     
                      });
                  });

               } else if(category === 'FERESTRE'){

                  
                   con.query(`SELECT price FROM products_form WHERE upper(category) = '${category}' AND upper(article) = '${item.attr0}' and upper(attribute_1) = '${item.attr1}' and
                   upper(attribute_2) = '${item.attr2}' and upper(attribute_3) = '${item.attr3}'`,(err, result, fields)=>{
                      result.forEach((prices)=>{
                        checkForDiscounts(prices.price, category, (err, result)=>{ 
                           if(err) throw err;
                           item.price = result;
                           checkForExccesess(item.price, category, (err, result ) => {
                              if(err) throw err;
                              item.price = result;
                             
                                 item.total = (item.price * item.units).toFixed(2);
                                 proccessFunction();
                                
                              });
                           }); 
                        });
                      
                   });


               } else { 

                  con.query(`SELECT price FROM products_form where upper(category) = '${category}' and upper(article) = '${item.name.toUpperCase()}'`, (err, result, fields) => {
                     if(err) throw err;
                     
                     result.forEach((prices)=>{
 

                        checkForDiscounts(prices.price, category, (err, result)=>{ 
                           if(err) throw err;
                           item.price = result;
                           checkForExccesess(item.price, category, (err, result ) => {
                              if(err) throw err;
                              item.price = result;

                        
                                 item.total = (item.price * item.units).toFixed(2);
                              
                                 proccessFunction();
                                
                                 });
                           }); 
                        });
                      
                 });

                     
               }  
            }     
            });

         });
         
      }



function checkForDiscounts(listPrice, category, callback){
let subDiscountCategory; 
 let code = fs.readFileSync(`${__dirname}/js/resources/init.txt`, 'utf8');
(category === 'TIGLA') ? subDiscountCategory = Tigla.article : subDiscountCategory = 'Products'.toUpperCase();   
   con.query(`SELECT percentage FROM discount_form WHERE client_code = '${code}' and upper(category) = '${subDiscountCategory}' `,(err, result, fields)=>{
      let discountedPrice = listPrice - (listPrice * (result[0].percentage/100));
        callback(null, discountedPrice.toFixed(2));
     }); 

 
}


function checkForExccesess(discountedPrice, category, callback){
   if(localStorage.getItem('offerMode') === 'on'){
    
   if(category === 'TIGLA') category = Tigla.article;
   let code = fs.readFileSync(`${__dirname}/js/resources/init.txt`, 'utf8');
   con.query(`SELECT percentage FROM excess_form WHERE client_code = '${code}' and upper(category) = '${category.toUpperCase()}'`, (err, result, fields)=>{
      if(err) throw err;
      let excessPrice = parseFloat(discountedPrice) + parseFloat((discountedPrice * (result[0].percentage/100)));
      if(excessPrice === '') {console.log(`Oferta nu a putut fi realizata pentru produsul : ${category} cu pretul de ${discountedPrice}`);}
      callback(null ,excessPrice.toFixed(2));
   });
   
} else { 
  
   callback(null, discountedPrice);
}
   
}