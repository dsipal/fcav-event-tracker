
$(document).ready(function() {
    var f = new File([""], "data.csv");
    var data = Papa.parse(f);
    console.log(data);
});

]
