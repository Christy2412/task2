// Function to handle reading and parsing the uploaded file
function readFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                // Check the file type selected (JSON or CSV) and call respective parsing functions
                const fileType = document.getElementById('filetype').value;
                if (fileType === 'json') {
                    const jsonData = JSON.parse(e.target.result);
                    displayTable(jsonData.products);
                } else if (fileType === 'csv') {
                    // Call CSV parsing function if needed
                    // parseCSV(e.target.result);
                    alert('CSV parsing is not implemented yet.');
                }
            } catch (error) {
                alert('Error parsing the file. Please provide a valid file.');
            }
        };

        reader.readAsText(file);
    } else {
        alert('Please select a file.');
    }
}

// Function to display data in a table
function displayTable(products) {
    // Convert the object to an array of products
    const data = Object.keys(products).map(key => ({
        ...products[key],
        id: key
    }));

    // Sort the data based on descending popularity
    data.sort((a, b) => b.popularity - a.popularity);

    const tableContainer = document.getElementById('dataTable');
    tableContainer.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');

    // Create table header
    const headerRow = table.insertRow();
    const headers = ['Subcategory', 'Title', 'Price', 'Popularity'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(th);
    });

    // Create table rows
    data.forEach(product => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.appendChild(document.createTextNode(product.Subcategory));
        cell2.appendChild(document.createTextNode(product.Title));
        cell3.appendChild(document.createTextNode(product.Price));
        cell4.appendChild(document.createTextNode(product.Popularity));
    });

    tableContainer.appendChild(table);
}

// Other functions for CSV parsing or additional functionality can be added here if needed
