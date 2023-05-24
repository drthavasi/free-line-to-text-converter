var conversionHistory = [];

function convertToParagraph() {
  var inputTextArea = document.getElementById("inputText");

  if (inputTextArea.value.trim() !== "") {
    var input = inputTextArea.value;
    var paragraph = input.replace(/\n/g, " ").replace(/\s+/g, " ");

    inputTextArea.value = paragraph;

    // Store the converted paragraph in history
    var entry = {
      text: paragraph,
      timestamp: new Date().toLocaleString(),
    };
    conversionHistory.push(entry);
    // Save history as a cookie
    document.cookie =
      "conversionHistory=" +
      encodeURIComponent(JSON.stringify(conversionHistory)) +
      "; expires=" +
      getCookieExpiration(24) +
      "; path=/";
    // inputTextArea.innerHTML = paragraph; // Clear the input text
  } else {
    alert('Please provide a text before converting to paragraphs.');
  }
}

function getCookieExpiration(hours) {
    var now = new Date();
    var expiration = new Date(now.getTime() + hours * 60 * 60 * 1000);
    return expiration.toUTCString();
  }

  function retrieveConversionHistory() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf('conversionHistory=') === 0) {
        var encodedHistory = cookie.substring('conversionHistory='.length);
        conversionHistory = JSON.parse(decodeURIComponent(encodedHistory));
        return;
      }
    }
  }
  
  retrieveConversionHistory();

function copyText() {
  var inputTextArea = document.getElementById("inputText");
  var copyButton = document.getElementById("copyButton");

  if (inputTextArea.value.trim() !== "") {
    inputTextArea.select();
    inputTextArea.setSelectionRange(0, inputTextArea.value.length);
    document.execCommand("copy");

    copyButton.innerText = "Copied";

    setTimeout(function () {
      copyButton.innerText = "Copy";
    }, 2000); // Change back to 'Copy' after 2 seconds
  }
}

function clearText() {
  var inputTextArea = document.getElementById("inputText");
  var output = document.getElementById("output");

  inputTextArea.value = "";
  output.innerHTML = "";
}

function showHistory() {
  var output = document.getElementById("output");
  output.innerHTML = ""; // Clear the output div

  if (conversionHistory.length === 0) {
    output.textContent = "No conversion history available.";
    return;
  }

  var table = document.createElement("table");
  table.classList.add("history-table"); // Add CSS class to the table

  var tableHeader = document.createElement("tr");
  tableHeader.classList.add("table-header"); // Add CSS class to the table header

  var headerTexts = ["Date & Time", "Text"];

  // Create table header
  for (var i = 0; i < headerTexts.length; i++) {
    var th = document.createElement("th");
    th.textContent = headerTexts[i];
    tableHeader.appendChild(th);
  }

  table.appendChild(tableHeader);

  // Create table rows
  for (var j = 0; j < conversionHistory.length; j++) {
    var entry = conversionHistory[j];
    var row = document.createElement("tr");
    row.classList.add("table-row"); // Add CSS class to the table row

    var dateCell = document.createElement("td");
    dateCell.textContent = entry.timestamp;
    row.appendChild(dateCell);

    var textCell = document.createElement("td");
    textCell.textContent = entry.text;
    row.appendChild(textCell);

    table.appendChild(row);
  }

  output.appendChild(table);
}
