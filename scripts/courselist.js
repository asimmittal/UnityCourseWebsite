var courseUrl = "course.txt";

$(function(){
    $.get(courseUrl, function(response){
        var courseItems = ($.parseJSON(response)).items;
        console.log(courseItems);        
        var index = 0, hwIndex = 0;
        
        courseItems.forEach(function(item){
            index++;
            if(item.homework_url != null) hwIndex++;
            
            var dataForItem = {
                index: index,
                topic: item.topic.trim().replace("<b>","").replace("</b>",""),
                hwLink: (item.homework_url == null) ? "#" : item.homework_url,
                hwIndex: (item.homework_url == null) ? "" : hwIndex,
                lectureLink: item.topic_url,
                visible: (item.homework_url == null) ? "hidden" : "visible" 
            };
            
            var courseRowTemplateScript = $("#course-row-template").html();
            var courseRowTemplate = Handlebars.compile(courseRowTemplateScript);
            var compiledHtml = courseRowTemplate(dataForItem);
            $("#content").append(compiledHtml);
        });
    });
});