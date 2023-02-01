




var table = document.getElementById('main-table')

var row = table.insertRow(1)
row.insertCell(0).innerHTML = 'Hello'
row.insertCell(1).innerHTML = 'World'
row.insertCell(2).innerHTML = '!'

fetch('http://127.0.0.1:8000/all')
    .then((response) => {
        if (!response.ok) console.log("not ok");
        else console.log("ok");
        // console.log(response)
        return response.json(); })
    .then((data) => {
        console.log(data)
        var rows = data.rows
        for (var i = 0; i < rows.length; i++) {
            var row = table.insertRow(i + 1)
            row.insertCell(0).innerHTML = rows[i].roll
            row.insertCell(1).innerHTML = rows[i].name
            row.insertCell(2).innerHTML = rows[i].cgpa
        }

    });

