const importData = document.querySelector("#import-data"); // Input type file.
const table = document.querySelector("#imported-table");
const tableHead = document.querySelector("#imported-table-head");
const tableBody = document.querySelector("#imported-table-body");
const exportButton = document.querySelector("#export-button");

table.style.display = "none";

// Show data table after adding file.
importData.addEventListener("input", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let counter = 0;

    // Change from importData to table for showing.
    importData.style.display = "none";
    table.style.display = "block";

    reader.onload = function (event) {
        const csv = event.target.result;
        const csvRow = csv.trim().split("\r\n");

        // For check -->
        // If rows is 1st line, will append it to tableHead.
        // Else, will append it to tableBody.
        csvRow.forEach((rows) => {
            if (counter === 0) {
                const row = tableHead.insertRow();
                for (const cell of rows.split(",")) {
                    row.insertCell().outerHTML = `<th>${cell}</th>`;
                }
            } else {
                const row = tableBody.insertRow();
                for (const cell of rows.split(",")) {
                    row.insertCell().outerHTML = `<td>${cell}</td>`;
                }
            }
            counter++;
        });
    };
    reader.readAsText(file);

    // Using exportData function when exportButton have been clicked.
    exportButton.addEventListener("click", exportData);
});

function exportData() {
    const rows = table.querySelectorAll("tr"); // Accessing data in table.
    let data = "";

    // Setting data for export.
    for (const index of Object.keys(rows)) {
        const cells = rows[index].querySelectorAll("td, th");

        for (const index of Object.keys(cells)) {
            const cell = cells[index].innerHTML;
            data += cell + ",";
        }
        data = data.substring(0, data.length - 1) + "\r\n";
    }

    const blob = new Blob([data], { type: "text/plain" }); // File for export.
    const url = URL.createObjectURL(blob); // Link for download file.
    const link = document.createElement("a"); // Create tag for click.

    // Setting link attribute and active it.
    link.href = url;
    link.download = "export_data.csv";
    link.click();

    // Clear for increase memory resources in the browser.
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
