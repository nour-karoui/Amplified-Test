let top3 = [];
let previousTop3 = [];
const action = function() {
    // implement me : add js to fit the requirements
    console.log("implement me");

    ws && ws.send("task");
    manualGetTop3();
}

const ws = new WebSocket('ws://localhost:8081');
ws.onopen = (evt) => {
    console.log("ws open", evt);
};
ws.onmessage = (msg) => {
    // implement me
    console.log(msg);
}

const manualGetTop3 = async () => {
    // implement me
    previousTop3 = top3;
    const response = await fetch('http://localhost:8080/task')
    top3 = (await response.json()).top3Reviews;
    displayTop3(top3, 'top3');
    displayTop3(previousTop3, 'previous-top3');
}

const displayTop3 = (top3, tagId) => {
    let tableBody = document.getElementById(tagId);
    tableBody.innerHTML = '';
    let row = 1;
    for (let r of top3) {
        let tr = document.createElement('tr');
        tableBody.appendChild(tr); // Append to <table> node
        tr.innerHTML = "<td>" + r.name + "</td><td>" + r.body + "</td>";
        row++
    }
}
