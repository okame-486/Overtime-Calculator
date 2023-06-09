document.getElementById("fileInput").addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;
    var names = contents.split(",");
    for (var i = 0; i < names.length; i++) {
      addRow(names[i].trim());
    }
  };
  reader.readAsText(file);
});

document.getElementById("addRow").addEventListener("click", function () {
  addRow("");
});

function addRow(name) {
  var table = document.getElementById("inputTable");
  var row = table.insertRow(-1);
  row.insertCell(0).innerHTML =
    '<input type="text" class="name" value="' + name + '">';
  row.insertCell(1).innerHTML = '<input type="number" class="totalHours">';
  row.insertCell(2).innerHTML = '<input type="number" class="minutes">';
}

document.getElementById("calculate").addEventListener("click", function () {
  var names = document.getElementsByClassName("name");
  var totalHours = document.getElementsByClassName("totalHours");
  var minutes = document.getElementsByClassName("minutes");
  var output = "名前,所定内時間+時間外時間(h),所定内/時間外時間(m),手当\n";
  for (var i = 0; i < names.length; i++) {
    var hours = parseFloat(totalHours[i].value);
    var mins = parseFloat(minutes[i].value);
    var result = Math.round(hours * 50 + mins * 0.8333);
    output +=
      names[i].value +
      "," +
      totalHours[i].value +
      "," +
      minutes[i].value +
      "," +
      result +
      "\n";
  }
  document.getElementById("output").value = output;
});

document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("output").value = "";

  var table = document.getElementById("inputTable");

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  document.getElementById("fileInput").value = "";
});
document.getElementById("downloadCSV").addEventListener("click", function () {
  var names = document.getElementsByClassName("name");
  var totalHours = document.getElementsByClassName("totalHours");
  var minutes = document.getElementsByClassName("minutes");
  var output = "名前,所定内時間+時間外時間(h),所定内/時間外時間(m),手当\n";
  for (var i = 0; i < names.length; i++) {
    var hours = parseFloat(totalHours[i].value);
    var mins = parseFloat(minutes[i].value);
    var result = Math.round(hours * 50 + mins * 0.8333);
    output +=
      names[i].value +
      "," +
      totalHours[i].value +
      "," +
      minutes[i].value +
      "," +
      result +
      "\n";
  }
  downloadCSV(output);
});

function downloadCSV(csv) {
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var link = document.createElement("a");
  var url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "output.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function addRow(name) {
  var table = document.getElementById("inputTable");
  var row = table.insertRow(-1);
  row.insertCell(0).innerHTML =
    '<input type="text" class="name" value="' + name + '">';
  row.insertCell(1).innerHTML = '<input type="number" class="totalHours">';
  row.insertCell(2).innerHTML = '<input type="number" class="minutes">';
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", function () {
    table.deleteRow(row.rowIndex);
  });
  row.insertCell(3).appendChild(deleteButton);
}
