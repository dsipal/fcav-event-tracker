$(document).ready(function() {

    $.get('data.csv', function(data){
        dataJSON = Papa.parse(data);
        console.log(data);
        console.log(dataJSON);
    }, 'text');


});
