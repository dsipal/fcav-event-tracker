
$(document).ready(function() {

    var data = readData();
    console.log(data);
});

function readData(){
    var client = new XMLHttpRequest();
    client.open('GET', 'data.csv');
    client.onreadystatechange = function() {
    console.log(client.responseText);
    return client.responseText;
}
client.send();
}
