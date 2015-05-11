var showcaseUrl = "showcase.txt";

$(function(){
    $.get(showcaseUrl, function(response){
        var showcaseItems = ($.parseJSON(response)).items;        
        var param = window.location.search;
        var index = parseInt(param.substring(param.indexOf("=") + 1));        
        var gameItem = showcaseItems[index];
        
        $("#gameTitle").html(gameItem.title);
        $("#credits").html(gameItem.credits);
        $("#help").html(gameItem.help);
        $("#iframe").attr("src", gameItem.url);
    });    
});
