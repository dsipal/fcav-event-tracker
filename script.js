
$(document).ready(function() {
    var data = readData();
    var dataJSON = Papa.parse(data);

    console.log(dataJSON);

});

function readData(){
    var client = new XMLHttpRequest();
    client.open('GET', 'data.csv');
    client.onreadystatechange = function() {
    return client.responseText;
}
client.send();
}
