var IMAGES = ["assets/1.png", "assets/2.png", "assets/3.png", "assets/4.png", "assets/5.png", "assets/6.png"];

function makePromise() {
    return Promise.resolve($.ajax({
        type: "GET",
        url: "data.csv",
        dataType: "text"
    }));
}

function getQueryVar(query) {
    var queryString = window.location.search;
    var regex = new RegExp('[?&]' + query + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getQueryVars() {
    var queryString = window.location.search;
    var regex = new RegExp('[?&](\w+)=([^&#]*)');
    var results = regex.exec(location.search);

}

function genURL(data, i, post) {
    var shareURL = data[i]["Share URL"];
    var id = data[i].ID;
    var url = shareURL + "&ref=eventVWR" + "&id=" + id;
    return url;
}

function makeEvents(data, page) {
    var posts = 6;
    var b = 0;
    var start = (posts * page);
    for (var i = start; i < start + posts; i++) {
        var len = 350;
        var con = data[i]["Event Notes"];
        var s = con.substr(0, len);



        var event = `
            <div class="clearfix event" id="event-` + data[i].ID + `">
            <div class="event-img-box">
                <a href="` + genURL(data, i, false) + `"><img src="` + IMAGES[b] + `" class="event-img" /></a>
                <div class="event-share-url">
                    <a class="btn btn-primary" id="e` + data[i].ID + `" href="` + genURL(data, i, false) + `">View on Map</a>
                </div>
            </div>
            <a href="post.html?id=` + data[i].ID + `"><h3 class="event-title">` + data[i].Title + `</h3></a>
            <span class="event-date">` + data[i].Date + `-</span>
            <p class="event-text">
            ` + s + `...
            </p>
            <div class="read-more">
                [<a href="post.html?id=` + data[i].ID + `">Read More</a>]
            </div>

            <small class="event-author">` + data[i].Author + `</span>
        </div>
        `
        $("#post-list").append(event);
        if(b == 5){
            $()
        }
        b++;
    }
}

function getBrowseData() {
    var page = parseInt(getQueryVar("page"));
    if (isNaN(page)) {
        page = 0;
    }
    var promise = makePromise();
    promise.then(data => makeEvents($.csv.toObjects(data), page));
}

function makePageNav(page) {
    var pageNav = `
    <div id="pageNav">
        <span id="p0">[<a href="index.html?page=0">1</a>]</span>
    </div>
    `;
    $("#event-body").append(pageNav);
    $("#p" + page).css("font-weight", "bold");
    $("#p" + page + ">a").css("color", "black");
}


function getPostData() {
    var promise = makePromise();
    promise.then(data => setPostData($.csv.toObjects(data)));
}

function setPostData(data) {
    var post = getQueryVar("id");
    var title;
    var date;
    var textBlock;
    var author;
    var shareUrl;

    for (i = 0; i < data.length; i++) {
        if (data[i].ID == post) {
            title = data[i].Title;
            date = data[i].Date;
            textBlock = data[i]["Event Notes"];
            author = data[i].Author;
            shareUrl = genURL(data, i, true);
            $('img').attr({
                'src': IMAGES[i]
            });
        }
    }

    var split = textBlock.split("\n");
    for (i = 0; i < split.length; i++) {
        var para = `
        <p>` + split[i] + `</p>
        `;
        $(".post-text").append(para);
    }

    $(".post-title").html(title);
    $(".post-date").html(date);
    $(".post-author").html(author);
    $(".post-share-url").attr("href", shareUrl);
}
