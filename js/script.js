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

function makeEvents(data, page, callback) {

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
                <a href="` + genURL(data, i, false) + `" class="track-click" data-ga-category="Navigation" data-ga-action="Map" data-ga-label="`+data[i].Title+`">
                    <img src="` + IMAGES[b] + `" class="event-img" />
                </a>
                <div class="event-share-url">
                    <a class="btn btn-primary track-click" href="` + genURL(data, i, false) + `" data-ga-category="Navigation" data-ga-action="Map" data-ga-label="`+data[i].Title+`">View on Map</a>
                </div>
            </div>
            <a href="post.html?id=` + data[i].ID + `" id="title-tracker" class="track-click" data-ga-category="Navigation" data-ga-action="Post" data-ga-label="`+data[i].Title+`" >
                <h3 class="event-title">` + data[i].Title + `</h3>
            </a>
            <small class="event-date">` + data[i].Date + `-</small>
            <p class="event-text">
            ` + s + `...
            </p>
            <div class="read-more">
                [<a href="post.html?id=` + data[i].ID + `" id="read-tracker" class="track-click" data-ga-category="Navigation" data-ga-action="Post" data-ga-label="`+data[i].Title+`">Read More</a>]
            </div>

            <small class="event-author">` + data[i].Author + `</span>
        </div>
        `;

        $("#post-list").append(event);

        b++;
        if(b == (posts)){
            console.log(data[i].ID);
            $('#event-'+data[i].ID).css({'border-bottom':'none'});
        }
    }
    callback ();
}

function getBrowseData(callback) {
    var page = parseInt(getQueryVar("page"));
    if (isNaN(page)) {
        page = 0;
    }
    var promise = makePromise();
    promise.then(data => makeEvents($.csv.toObjects(data), page, callback));
}

function makePageNav(pages) {
    var pageNav = `<div id="pageNav"></div>`;
    $("#post-list").append(pageNav);

    for(i=0;i<pages;i++){
        var pageNum = i+1
        var page = `<span id="p`+(i)+`" class="page">[<a href="index.html?page=`+pageNum+`">`+pageNum+`</a>]</span>`;
        $("#pageNav").append(page);
    }

}


function getPostData(callback) {
    var promise = makePromise();
    promise.then(data => setPostData($.csv.toObjects(data), callback));
}

function setPostData(data, callback) {
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
    $(".post-share-url").attr("data-ga-label", title);

    callback();

}
