var showcaseUrl = "showcase.txt";

$(function(){    
    $.get(showcaseUrl, function(response){
        var showcaseItems = ($.parseJSON(response)).items;        
        var param = window.location.search;
        var index = parseInt(param.substring(param.indexOf("=") + 1));        
        var gameItem = showcaseItems[index];
        
        console.log("--> " + gameItem.title);
        
        $.ajax({
            type: "GET",
            url: gameItem.help,
            async: false,
            jsonpCallback: 'info',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json){
                $("#help").html(json[0]);
            },
            error: function(){
                $("#help").html("No instructions found");
            }
        });
        
        $("#gameTitle").html(gameItem.title);
        $("#credits").html(gameItem.credits);
        $("#iframe").attr("src", gameItem.url);
    });    
});
