function getData(){
    return Promise.resolve($.ajax({
        type: "GET",
        url: "data.csv",
        dataType: "text"
    }));
}
function getQueryVar(query){
    var queryString = window.location.search;
    var regex = new RegExp('[\\?&]' + query + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function getBrowseData() {
    var page = parseInt(getQueryVar("page"));
    if(isNaN(page)){
        page = 0;
    }
    var promise = getData();
    promise.then(data => makeEvents($.csv.toObjects(data), page));
}
function genURL(data, i, post){
    var shareURL = data[i]["Share URL"];
    var id = data[i].ID;
    var url = shareURL + "&ref=eventVWR" + "&id=" + id;
    return url;
}

function makeEvents(data, page){
    var posts = 6;
    var start = (posts * page);
    for(var i = start; i < start + posts; i++) {
        var len = 300;
        var con = data[i]["Event Notes"];
        var s = con.substr(0, len);

        var event = `
        <div class="clearfix event" id="event-` + data[i].ID + `">
            <div class="event-img-box">
                <a href="post.html?id=` + data[i].ID + `"><img src="#" class="event-img" /></a>
                <div id="event-share-url">
                    <a class ="event-share-url" id="e`+data[i].ID+`" href="` + genURL(data, i, false) + `">View on Map</a>
                </div>
            </div>
            <a href="post.html?id=` + data[i].ID + `"><h3 class="">` + data[i].Title + `</h3></a>
            <span class="event-date">` + data[i].Date + `-</span>
            <p class="event-text">
            ` + s + `...
            </p>
            [<a href="post.html?id=` + data[i].ID + `" class="read-more">Read More</a>]
            <span class="event-author">` + data[i].Author + `</span>
        </div>
        `;
        $("#event-body").append(event);
    }
    makePageNav(page);
}
function makePageNav(page){
    console.log("#p" + (page + 1));
    var pageNav = `
    <div id="pageNav">
        <span id="p0">[<a href="index.html?page=0">1</a>]</span>
        <span id="p1">[<a href="index.html?page=1">2</a>]</span>
        <span id="p2">[<a href="index.html?page=2">3</a>]</span>
        <span id="p3">[<a href="index.html?page=3">4</a>]</span>
    </div>
    `
    $("#event-body").append(pageNav);
    $("#p" + page).css("font-weight", "bold");
    $("#p" + page + ">a").css("color", "black");
}


function getPostData() {
    var promise = getData();
    promise.then(data => setPostData($.csv.toObjects(data)));
}
function setPostData(data){
    var post = getQueryVar("id");
    console.log(post);
    for (i = 0; i < data.length; i++) {
        if (data[i].ID == post) {
            $(".post-title").html(data[i].Title);
            $(".post-date").html(data[i].Date);
            $(".post-text").html(data[i]["Event Notes"]);
            $(".post-author").html(data[i].Author);
            $(".post-share-url").attr("href", genURL(data, i, true));
        }
    }
}
