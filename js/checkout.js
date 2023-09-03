$(document).ready(function () {
  checkDuplicates();
  loadOrders();
});

//Check for Duplicate order, an duplicate order will increment the QUANTITY ------
function checkDuplicates() {
  const storedOrders = JSON.parse(localStorage.getItem("orderedTrips")) || [];

  let newOrders = [];

  for (let i = 0; i < storedOrders.length; i++) {
    const storedOrder = storedOrders[i];
    let isDuplicate = false;

    for (let j = 0; j < newOrders.length; j++) {
      const newOrder = newOrders[j];
      if (newOrder.name === storedOrder.name) {
        newOrder.quantity++;
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      storedOrder.quantity = 1;
      newOrders.push(storedOrder);
    }
  }

  localStorage.setItem("orderedTrips", JSON.stringify(newOrders));
}

//add trip elements to table --- ON PAGE LOAD ------------------------------------
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orderedTrips"));
  let subtotal = 0;
  let vat = 0;
  let grandTotal = 0;
  for (let i = 0; i < orders.length; i++) {
    const savedOrder = orders[i];
    let orderTotal = savedOrder.quantity * savedOrder.price;
    $("#row-body").append($("#row-template").html());

    let cChild = $("#row-body").children().eq(i);

    $(cChild)
      .find("#item-no")
      .text(i + 1);
    $(cChild).find("#table-trip-name").text(savedOrder.name);
    $(cChild).find("#table-trip-code").text(generateCode(savedOrder.name, orderTotal.toString()));
    $(cChild).find("#table-trip-quantity").text(savedOrder.quantity);
    $(cChild).find("#table-trip-price-total").text(orderTotal.toFixed(2));

    subtotal = subtotal + orderTotal;
  }

  $("#checkout-subtotal").text("Sub total: R" + subtotal.toFixed(2));
  vat = subtotal * 0.15;
  $("#checkout-vat").text("Vat 15%: R" + vat.toFixed(2));
  grandTotal = vat + subtotal;
  $("#checkout-total").text("Grand total: R" + grandTotal.toFixed(2));
}

// Remove trip/order from the table --- REMOVE BUTTON ON CLICK EVENT -------------
$("#row-body").on("click", ".btn-primary", function () {
  let rowID = $(this).closest("tr").find("#item-no").text();
  const orders = JSON.parse(localStorage.getItem("orderedTrips")) || [];
  let newOrders = [];
  rowID = parseInt(rowID, 10) - 1;

  for (let i = 0; i < orders.length; i++) {
    if (i !== rowID) {
      newOrders.push(orders[i]);
    }
  }

  localStorage.setItem("orderedTrips", JSON.stringify(newOrders));

  //refresh the table
  refreshTable();
});

$("#remove-all").click(function () {
  localStorage.clear();
  refreshTable();
});


// Refresh the trips table from the localStorge ----------------------------------
function refreshTable() {
  $("#row-body").empty();

  const orders = JSON.parse(localStorage.getItem("orderedTrips")) || [];
  let subtotal = 0;
  let vat = 0;
  let grandTotal = 0;

  for (let i = 0; i < orders.length; i++) {
    const savedOrder = orders[i];
    let orderTotal = savedOrder.quantity * savedOrder.price;

    $("#row-body").append($("#row-template").html());
    let cChild = $("#row-body").children().eq(i);

    $(cChild)
      .find("#item-no")
      .text(i + 1);
    $(cChild).find("#table-trip-name").text(savedOrder.name);
    $(cChild).find("#table-trip-code").text(generateCode(savedOrder.name, orderTotal.toString()));
    $(cChild).find("#table-trip-quantity").text(savedOrder.quantity);
    $(cChild).find("#table-trip-price-total").text(orderTotal.toFixed(2));

    subtotal = subtotal + orderTotal;
  }

  $("#checkout-subtotal").text("Sub total: R" + subtotal.toFixed(2));
  vat = subtotal * 0.15;
  $("#checkout-vat").text("Vat 15%: R" + vat.toFixed(2));
  grandTotal = vat + subtotal;
  $("#checkout-total").text("Grand total: R" + grandTotal.toFixed(2));
}


function generateCode(name, price) {
  const words = name.split(" ");
  let codePart1 = "";
  for (let i = 0; i < words.length && i < 2; i++) {
    codePart1 += words[i].charAt(0);
  }
  let codePart2 = price.slice(0, 2);
  const randomDigits = Math.floor(Math.random() * 90) + 10;
  const generatedCode = codePart1.toUpperCase() + codePart2 + randomDigits;

  return generatedCode;
}
