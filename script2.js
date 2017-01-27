
$(document).ready(function() {
    getData();
});


function getData(){
    $.ajax({
        type:"GET",
        url:"data.csv",
        dataType:"text",
    }).success(function(response){
        var q = window.location.search.substring(1);
        var vars = q.split("=");
        console.log(vars)
        var data = $.csv.toObjects(response);
        for(i = 0; i < data.length; i++){
            if(data[i].ID == vars[1]){
                console.log(data[i]);
                $('.event-title').html(data[i].Title);
                $('.event-date').html(data[i].Date);
                $('.event-text').html(data[i]["Event Notes"])
            }
        }
    });
}
