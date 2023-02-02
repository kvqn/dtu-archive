
console.log("main.js loaded");

var table = document.getElementById('main-table')

fetch('http://127.0.0.1:8000/sem1')
    .then((response) => {
        if (!response.ok) console.log("not ok");
        else console.log("ok");
        // console.log(response)
        return response.json(); })
    .then((data) => {
        console.log(data)

        var table_heads = table.createTHead()
        var row = table_heads.insertRow()
        row.insertCell(0).innerHTML = 'Rank'
        row.insertCell(1).innerHTML = 'Roll No'
        row.insertCell(2).innerHTML = 'Name'
        row.insertCell(3).innerHTML = 'CGPA'

        var table_body = table.createTBody()

        var rows = data.students
        for (var i = 0; i < rows.length; i++) {
            var row = table_body.insertRow()
            row.insertCell(0).innerHTML = rows[i].rank
            row.insertCell(1).innerHTML = rows[i].roll
            row.insertCell(2).innerHTML = rows[i].name
            row.insertCell(3).innerHTML = rows[i].cgpa
        }

    });

