
$(document).ready(function() {
    getData();
});


function getData(){
    $.ajax({
        type:"GET",
        url:"data.csv",
        dataType:"text",
    }).success(function(response){
        var data = $.csv.toObjects(response);
        for(var i = 0; i < 6; i++){
            var len = 500;
            var con = data[i]["Event Notes"];
            var s = con.substr(0,len);


            var event = `
            <div class="clearfix event" id="event-`+data[i].ID+`">
                <img src="#" class="event-img" />
                <h3 class="">`+data[i].Title+`</h3>
                <span class="event-date">`+data[i].Date+`-</span>
                <p class="event-text">
                `+s+`
                </p>
                <a href="post.html?id=`+data[i].ID+`" class="read-more">Read More</a>
                <span class="event-author">`+data[i].Author+`</span>
            </div>
            `;

            $('#event-body').append(event);
        }
    });
}
