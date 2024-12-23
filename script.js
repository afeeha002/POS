let product=[];
let customor=[];
let productname ,productprice , customorname;
let productobj ;
count=1;
let index;
let orderedlist=[];
let secondbody;
let result = 0;
let values = 1;
let billname;



document.getElementById("form-1").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("table-responsive1").style.display = "block"
    let row = document.getElementById("bodytable1");
    row.innerHTML = ''
    productname = document.getElementById("productname").value;
    productprice = document.getElementById("productprice").value;
    productobj = {
        id: `id${count}`,
        name: productname,
        price: productprice
    }
    product.push(productobj)
    console.log(product)
    event.target.reset();
    for (let i = 0; i < product.length; i++) {
        let newrow = document.createElement("tr")
        newrow.id = "tablerow1"
        newrow.className = "table-secondary"
        newrow.innerHTML = `
            <td scope="row">${product[i].name}</td>
            <td>${product[i].price}</td>
            <td><button id="${product[i].id}" class="btn btn-warning" onclick="order('${product[i].id}')">Order</button></td>
        `
        row.appendChild(newrow)
    }
    count++
})

function validateProductPrice() {
    let priceInput = document.getElementById("productprice");
    let price = parseFloat(priceInput.value);

    // Check if price is less than 1
    if (price < 1) {
        alert("Product price must be at least 1.");
        priceInput.value = 1; // Set to minimum allowed value
    }
}

document.getElementById("form-2").addEventListener("submit", function (event) {
    event.preventDefault();
    customorname = document.getElementById("customorname").value;
    let container = document.getElementById("options-select");
    container.innerHTML = ''
    customor.push(customorname)
    console.log(customor);
    event.target.reset();

    for (let i = 0; i < customor.length; i++) {
        let newoption = document.createElement("option")
        newoption.id = `options`
        newoption.innerHTML = customor[i]
        container.appendChild(newoption)
    }
});


function order(id) {
    let selectrow = document.getElementById(id);
    document.getElementById("table-responsive2").style.display = "block"
    document.getElementById("amountshow").style.display = "block"
    secondbody = document.getElementById("tablebody2");
    let index;
    secondbody.innerHTML = ''
    console.log(selectrow);
    let latestproduct = product.filter(function (value) {
        return value.id == id
    })
    console.log("orderd list is :", orderedlist);

    let neworderedlist = orderedlist.filter(function (value, position) {
        if (value.id == id) {
            index = position
            return true
        }
    })

    if (neworderedlist.length == 0) {
        let entry = {
            id: latestproduct[0].id,
            name: latestproduct[0].name,
            price: latestproduct[0].price,
            quantity: 1,
            amount: latestproduct[0].price * 1
        }
        orderedlist.push(entry)



    } else {
        orderedlist[index].quantity += 1
        orderedlist[index].amount = orderedlist[index].quantity * latestproduct[0].price
    }

    for (let i = 0; i < orderedlist.length; i++) {
        let secondrow = document.createElement("tr")
        secondrow.className = "table-secondaery"
        secondrow.id = id
        secondrow.innerHTML = `
        <td scope="row">${orderedlist[i].name}</td>
        <td>${orderedlist[i].price}</td>
        <td><input type="number" id='input${orderedlist[i].id}' class="quantityinput" value="${orderedlist[i].quantity}" onchange="quantitychange('${orderedlist[i].id}')"></td>
        <td>${orderedlist[i].amount}</td>
        <td><button type="button" class="btn btn-danger" onclick="orderlistdelete('${orderedlist[i].id}')">Delete</button></td>
`

        secondbody.appendChild(secondrow)

    }
    result = 0

    for (let m = 0; m < orderedlist.length; m++) {
        result = orderedlist[m].amount + result
    }
    document.getElementById("amountshow").innerHTML = `
    TOTAL AMOUNT OF PURCHASE : ${result}
    `
}

function orderlistdelete(id) {
    let deleteid = id
    console.log(id);
    orderedlist = orderedlist.filter(function (value) {
        return value.id !== deleteid
    })
    secondbody.innerHTML = ''
    console.log("orderedlist : ", orderedlist);
    for (let i = 0; i < orderedlist.length; i++) {
        let secondrow = document.createElement("tr")
        secondrow.className = "table-primary"
        secondrow.id = id
        secondrow.innerHTML = `
        <td scope="row">${orderedlist[i].name}</td>
        <td>${orderedlist[i].price}</td>
        <td>${orderedlist[i].quantity}</td>
        <td>${orderedlist[i].amount}</td>
        <td><button type="button" class="btn btn-danger" onclick="orderlistelete('${orderedlist[i].id}')">Delete</button></td>
`

        secondbody.appendChild(secondrow)

    }
    result = 0

    for (let m = 0; m < orderedlist.length; m++) {
        result = orderedlist[m].amount + result
    }
    document.getElementById("amountshow").innerHTML = `
    TOTAL AMOUNT OF PURCHASE : ${result}
    `
}
function quantitychange(qid) {
    let inputvalue = document.getElementById(`input${qid}`)
    if (inputvalue.value <= 0) {
        inputvalue.value = 1


        let currentrow = orderedlist.filter(function (value, index1) {
            if (value.id === qid) {
                index = index1
            }
        })
        orderedlist[index].quantity = parseInt(inputvalue.value)
        orderedlist[index].amount = orderedlist[index].quantity * orderedlist[index].price
        secondbody.innerHTML = ''
        for (let i = 0; i < orderedlist.length; i++) {
            let secondrow = document.createElement("tr")
            secondrow.className = "table-primary"
            secondrow.id = `${product[i].id}`
            secondrow.innerHTML = `
        <td scope="row">${orderedlist[i].name}</td>
        <td>${orderedlist[i].price}</td>
        <td><input type="number" id='input${orderedlist[i].id}' class="quantityinput" value="${orderedlist[i].quantity}" onchange="quantitychange('${orderedlist[i].id}')"></td>
        <td>${orderedlist[i].amount}</td>
        <td><button type="button" class="btn btn-danger" onclick="orderlistdelete('${orderedlist[i].id}')">Delete</button></td>
`

            secondbody.appendChild(secondrow)

        }
        result = 0

        for (let m = 0; m < orderedlist.length; m++) {
            result = orderedlist[m].amount + result
        }
        document.getElementById("amountshow").innerHTML = `
    TOTAL AMOUNT OF PURCHASE : ${result}
    `
        
    } else {
        let currentrow = orderedlist.filter(function (value, index1) {
            if (value.id === qid) {
                index = index1
            }
        })
        orderedlist[index].quantity = parseInt(inputvalue.value)
        orderedlist[index].amount = orderedlist[index].quantity * orderedlist[index].price
        secondbody.innerHTML = ''
        for (let i = 0; i < orderedlist.length; i++) {
            let secondrow = document.createElement("tr")
            secondrow.className = "table-primary"
            secondrow.id = `${product[i].id}`
            secondrow.innerHTML = `
        <td scope="row">${orderedlist[i].name}</td>
        <td>${orderedlist[i].price}</td>
        <td><input type="number" id='input${orderedlist[i].id}' class="quantityinput" value="${orderedlist[i].quantity}" onchange="quantitychange('${orderedlist[i].id}')"></td>
        <td>${orderedlist[i].amount}</td>
        <td><button type="button" class="btn btn-danger" onclick="orderlistdelete('${orderedlist[i].id}')">Delete</button></td>
`

            secondbody.appendChild(secondrow)

        }
        result = 0

        for (let m = 0; m < orderedlist.length; m++) {
            result = orderedlist[m].amount + result
        }
        document.getElementById("amountshow").innerHTML = `
    TOTAL AMOUNT OF PURCHASE : ${result}
    `
    }

}

function showbill() {
    // Retrieve selected customer name from the options-select dropdown
    const optionsSelect = document.getElementById("options-select");
    billname = optionsSelect.value;

    if (billname === '') {
        document.getElementById("modal-body").style.display = 'none';
        document.getElementById("modal-header").innerHTML = `
            <h4>Please Choose a Customer...!!</h4>
        `;
        
    } else {
        document.getElementById("modal-body").style.display = 'block';
        document.getElementById("modal-header").innerHTML = '';
        let billtbody = document.getElementById("billbody");
        billtbody.innerHTML = '';
        

        // Populate bill rows based on the ordered list
        orderedlist.forEach((item, index) => {
            let billrow = document.createElement("tr");
            billrow.id = "newbillrow";
            billrow.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.amount}</td>
            `;
            billtbody.appendChild(billrow);
        });

        document.getElementById("totalamount").innerHTML = `${result}`;
        document.getElementById("name").innerHTML = `Name: ${billname}`;
        document.getElementById("modal-footer").innerHTML=`<button type="button" class="btn btn-secondary" onclick="downloadBill()">Download</button>
`
    }
}

function downloadBill() {
    if (!billname) {
        alert("Please select a customer.");
        return;
    }

    if (orderedlist.length === 0) {
        alert("No products in the order.");
        return;
    }

    const invoiceHTML = generateInvoiceHTML();
    const invoiceWindow = window.open('', '_blank');
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
}

function generateInvoiceHTML() {
    const currentDate = new Date().toLocaleDateString('en-IN');
    let totalAmount = 0;

    const productsHTML = orderedlist.map(product => {
        const totalPrice = parseFloat(product.price) * parseInt(product.quantity);
        totalAmount += totalPrice;
        return `
            <tr>
                <td>${product.name}</td>
                <td>₹${parseFloat(product.price).toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>₹${totalPrice.toFixed(2)}</td>
            </tr>
        `;
    }).join('');

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    color: #333;
                }
                .invoice-container {
                    max-width: 800px;
                    margin: auto;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                table, th, td {
                    border: 1px solid #ddd;
                }
                th, td {
                    padding: 10px;
                    text-align: left;
                }
                th {
                    background-color: #f4f4f4;
                }
                .total {
                    text-align: right;
                    font-weight: bold;
                    margin-top: 10px;
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                @media print {
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <div class="header">
                    <h1>Customer Invoice</h1>
                </div>
                <p><strong>Customer:</strong> ${billname}</p>
                <p><strong>Date:</strong> ${currentDate}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productsHTML}
                    </tbody>
                </table>
                <div class="total">
                    <p>TOTAL AMOUNT: ₹${totalAmount.toFixed(2)}</p>
                </div>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
    `;
}


