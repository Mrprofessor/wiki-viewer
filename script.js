
 var query = document.querySelector("#query"),
     btn   = document.querySelector("#searchBtn");
        
 //HandleKeyPressEvent
 document.querySelector("#query").addEventListener("keyup", event => {
     if(event.key !== "Enter") return; // Use `.key` instead.
     btn.click(); // Things you want to do.
     event.preventDefault(); // No need to `return false;`.
 });
 //HandleButtonPressEvent
 btn.addEventListener("click", function(){
     console.log(query.value);
     //Destroy old articles
     var cards = document.querySelectorAll(".card");
     if(cards[1] != null) {
        removeElements(cards);
     }
     getArticles(query.value);
 });

 //Fetch data
 function getArticles(query){
     var url ="https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=";
     url  += query ;
     fetch(url) 
         .then(function(response){
             return response.json();
         })
         .then(function(data){
             iterateData(data);                  //showData() called
         })
         .catch(function() {
             console.log("Something really bad has happened.");
         });
 }

 //Show data
 function iterateData(data) {
     var articles = data.query.search;
     for(var article of articles) {
         showData(article.title, article.snippet, article.pageid);
         console.log(article.title);
     }
     // console.log(data.query.search);
 }

 function showData(title, text, id) {
     var str = 
     '<div class="card text-center">\
             <div class="card-body">\
                 <h4 class="card-title">'+title+'</h4>\
                 <p class="card-text text-muted">'+text+'</p>\
             </div>\
             <div class="card-footer">\
                 <a href="https://en.wikipedia.org/?curid='+id+'"\
                 class="btn btn-info btn-sm" target="blank">see for yourself\
                 </a>\
             </div>\
         </div>\
     </div>';

     append(str, '.container');
 }



 // Append function
 function append(elString, parent) {
     var div = document.createElement("div");
     div.innerHTML = elString;
     document.querySelector(parent || "body").appendChild(div.firstChild);
}

// remove an element from DOM
function removeElements(elements) {
    // var elem = document.getElementById(id);
    for(let element of elements) {
        // console.log(element.parentNode);
        element.parentNode.removeChild(element);
    }
    return 0;
}