var showcaseUrl = "showcase.txt";

$(function(){
    $.get(showcaseUrl, function(response){
        var showcaseItems = ($.parseJSON(response)).items;        
        var itemIndex = 0; 
        var rowHtml, colsHtml = "";
        var colsPerRow = 3;
        var rowTemplateScript = $("#showcase-row-template").html();
        var rowTemplate = Handlebars.compile(rowTemplateScript);
        var colTemplateScript = $("#showcase-item-template").html();
        var colTemplate = Handlebars.compile(colTemplateScript);
        var padding = colsPerRow - (showcaseItems.length % colsPerRow);
        
        
        showcaseItems.forEach(function(item){                                    
            
            if(item != undefined && item != null){
                
                item.handler = "handle(" + itemIndex + ")";
                
                //get the html for this showcase item from template
                var thisColHtml = colTemplate(item);
                colsHtml += thisColHtml;
                itemIndex++;
                
                //if three items have been counted, create a row html
                if(itemIndex % colsPerRow == 0){
                    var rowHtml = rowTemplate();
                    rowHtml = rowHtml.replace("%", colsHtml);
                    colsHtml = "";
                    $("#content").append(rowHtml);
                }
                                
                //when all the items have been added in rows, 
                //check if some empty items (padding) need to be
                //added to ensure uniformity in the grid
                if(itemIndex >= showcaseItems.length){
                    for(var i = 0; i < padding; i++){
                        item.visibility = "hidden";
                        thisColHtml = colTemplate(item);
                        colsHtml += thisColHtml;
                    }
                    
                    var rowHtml = rowTemplate();
                    rowHtml = rowHtml.replace("%", colsHtml);
                    colsHtml = "";
                    $("#content").append(rowHtml);
                }
                
            }
            
        });
    });
    
});

function handle(index){
    window.location.href = "game.html?index=" + index;
}