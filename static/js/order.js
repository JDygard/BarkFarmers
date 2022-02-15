// From the bootstrap documentation
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

// JS for cooking wood
let delivery_select_cooking = document.getElementById("id_delivery_method_cooking")
let quantity_select_cooking = document.getElementById("quantity_select_cooking")
let cooking_order = function() {
    if (delivery_select_cooking !== "") {
        quantity_select_cooking.style.height = "auto";
        quantity_select_cooking.style.opacity = 1;
    }
}

delivery_select_cooking.addEventListener("click", cooking_order);

// This function is called every time the user changes an option to recalculate the price of the order
var updateTotal = function(woodSelect, deliverySelect, typeSelect, quantityTotal, quantitySelect, lineItems, totalField) {
    // establish variables

    let total = 0;
    let string = "";
    let delivery = 0;
    let deposit = 0;
    let stacking = 0;
    let x = "<tr><td>";
    let y = "</td></tr>";
    let yx = "</td><td> </td><td>";
    // calculate fees and total

    if (deliverySelect.value == "delivery") {
        if (woodSelect.value !== "softwood" && woodSelect.value !== "hardwood") {
            delivery = 3.99;
            total += delivery;
        } else {
            delivery = deliveryCharge;
            total += deliveryCharge;
        }
    }

    if (typeSelect.value == "bag") {
        deposit = bagDeposit;
        total += bagDeposit;
    } else {
        deposit = 0;
    }
    
    if (typeSelect.value == "stacked") {
        stacking = stackingCharge;
        total += stackingCharge;
    } else {
        stacking = 0;
    }

    if (quantitySelect.style.opacity != 0) {
        if (woodSelect.value == "hardwood") {
            let woodTotal = hardwood.price * quantityTotal.value;
            total += woodTotal;
            if (quantityTotal.value > 1) {
                string += x + quantityTotal.value + " ricks of hardwood: " + yx + woodTotal.toFixed(2) + y;
            } else {
                string += x + quantityTotal.value + " rick of hardwood: " + yx + woodTotal.toFixed(2) + y;
            }
        } else if (woodSelect.value == "softwood") {
            let woodTotal = softwood.price * quantityTotal.value;
            total += woodTotal;
            if (quantityTotal.value > 1) {
                string += x + quantityTotal.value + " ricks of softwood: " + yx + woodTotal.toFixed(2) + y;
            } else {
                string += x + quantityTotal.value + " rick of softwood: " + yx + woodTotal.toFixed(2) + y;
            }
        } else {
            let woodTotal = apple.price * quantityTotal.value;
            total += woodTotal;
            string += x + quantityTotal.value + " bags of cooking wood: " + yx + woodTotal.toFixed(2) + y;
        }
    }

    // Adjust fields in the "grand total" section

    if (delivery == 0) {
        delivery.innerHTML = "";
    } else {
        string += x + "Delivery fee (standard) " + yx + delivery.toFixed(2) + y;
    }

    if (deposit == 0) {
        deposit.innerHTML = "";
    } else {
        string += x + "Bag deposit " + yx + deposit.toFixed(2) + y;
    }

    if (stacking == 0) {
        stacking.innerHTML = "";
    } else {
        string += x + "Hand stacking fee " + yx + stacking.toFixed(2) + y;
    }

    lineItems.innerHTML = string;
    totalField.innerHTML = total.toFixed(2);
}

// For loop that builds the JS for the forms

var checkout = document.getElementById("checkout");
var element_IDs = ["_soft", "_hard", "_cooking"];
for (i = 0; i < element_IDs.length; i++) {
    // Defining the select elements
    let deliverySelect = document.getElementById('id_delivery_method' + element_IDs[i]);
    let typeSelect = document.getElementById('id_product_type' + element_IDs[i]);
    let woodType = document.getElementById('wood_type' + element_IDs[i]);

    // Defining the stacked option
    let stacked_option = document.getElementById("stacked_option" + element_IDs[i]);

    // Defining various functional elements
    let continue_btn = document.getElementById("continue_btn" + element_IDs[i]);
    let checkoutSection = document.getElementById("checkout_section" + element_IDs[i]);
    let quantitySelect = document.getElementById('quantity_select' + element_IDs[i]);
    let quantityTotal = quantitySelect.firstElementChild.nextElementSibling.firstElementChild;
    
    // Defining the bag breakdown
    let grandTotal = document.getElementById("grand_total" + element_IDs[i]);
    let lineItems = document.getElementById("line_items" + element_IDs[i]);

    var updateOnChange = function() {
        // Adjust total
        updateTotal(woodType, deliverySelect, typeSelect, quantityTotal, quantitySelect, lineItems, grandTotal)
        
        // Reveal the next step when an option is selected
        if (deliverySelect.value !== "" && typeSelect.value !== "") {
            quantitySelect.style.height = "auto";
            quantitySelect.style.opacity = 1;
            updateTotal(woodType, deliverySelect, typeSelect, quantityTotal, quantitySelect, lineItems, grandTotal);
        }
    
        // Remove "hand-stacked" from type when pickup is selected
        if (stacked_option !== null) {
            if (deliverySelect.value == "pickup" && typeSelect == "stacked"){
                stacked_option.setAttribute("disabled", false);
                typeSelect.value = "";
            } else if (deliverySelect.value == "pickup") {
                stacked_option.setAttribute("disabled", false);
            } else {
                stacked_option.removeAttribute("disabled");
            }
        }
    }

    var optionReset = function() {
        deliverySelect.value = "";
        typeSelect.value = "";
        quantityTotal = 1;
    }

    $(document).on("load", optionReset());
    deliverySelect.addEventListener('change', updateOnChange);
    typeSelect.addEventListener('change', updateOnChange);
    quantityTotal.addEventListener('input', updateOnChange);
};



// Controlling the number field in the order form

var storeItems = document.getElementsByClassName("info-section"); 
var vertical;

// Reorient is used by the event listeners to re-orient the bootstrap layout to a vertical one if the screen is taller than wide (i.e. tablets)
let reOrient = function() {

    // Transition to portrait mode
    if (window.innerHeight > window.innerWidth) {
        if (vertical === false) {
            vertical = true;
        }
        for (let i = 0; i < storeItems.length; i++){
            let storeItem = storeItems[i].parentNode.parentNode;
            let classes = storeItem.classList;
            let headerText = storeItems[i].firstElementChild.nextElementSibling;
            storeItems[i].firstElementChild.nextElementSibling.setAttribute("class", "store-text-portrait");
            if (classes.contains("active-store-item-portrait") || classes.contains("col-md-10")) {
                storeItem.setAttribute("class", "col-md-12 active-store-item-portrait");
                headerText.classList.add("active-text");
            } else if (classes.contains("minimized-store-item-portrait") || classes.contains("col-md-1")) {
                storeItem.setAttribute("class", "col-md-12 store-item minimized-store-item-portrait");

                headerText.classList.remove("minimized-text", "store-text-portrait");
                headerText.classList.add("store-text-minimized-portrait");
            } else {
                storeItem.setAttribute("class", "col-md-12 store-item-portrait");
            }
        }

    // Transition to landscape mode
    } else {
        if (vertical === true) {
            vertical = false;
        }
        for (let i = 0; i < storeItems.length; i++){
            let storeItem = storeItems[i].parentNode.parentNode
            let classes = storeItem.classList
            if (classes.contains("active-store-item-portrait") || classes.contains("col-md-10")) {
                storeItems[i].parentNode.parentNode.setAttribute("class", "col-md-10 active-store-item");
            } else if (classes.contains("minimized-store-item-portrait") || classes.contains("col-md-1")) {
                storeItems[i].parentNode.parentNode.setAttribute("class", "col-md-1 store-item");
                storeItems[i].firstElementChild.nextElementSibling.classList.add("minimized-text");
            } else {
                storeItems[i].parentNode.parentNode.setAttribute("class", "col-md-4 store-item");
            }
            storeItems[i].firstElementChild.nextElementSibling.classList.remove("store-text-portrait");
            storeItems[i].firstElementChild.nextElementSibling.classList.add("store-text");
        }
    }
}

window.addEventListener("load", function() {
    if (window.innerHeight > window.innerWidth){
        vertical = true;
    } else {
        vertical = false;
    }
})
window.addEventListener("resize", reOrient);
window.addEventListener("load", reOrient);

// Thanks to https://www.javascripttutorial.net/javascript-dom/javascript-siblings/ for this
// Get siblings function
let getSiblings = function (e) {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if(!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling  = e.parentNode.firstChild;
    
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};


// Minimizing and displaying store items
for (let t = 0; t < storeItems.length; t++) {
    storeItems[t].addEventListener("click", function(event) {
        // Portait
        if (vertical === true) {
            let collapse = event.target.parentNode.parentNode;
            let siblings = getSiblings(collapse);

            // Other sections being hidden
            for (let x = 0; x < siblings.length; x++) {
                siblings[x].setAttribute("class", "col-md-12 store-item minimized-store-item-portrait")

                let hideElements = siblings[x].firstElementChild.firstElementChild;

                let headerHide = hideElements.firstElementChild.nextElementSibling;
                headerHide.classList.remove("active-text", "store-text-portrait");
                headerHide.classList.add("store-text-portrait-minimized");

                let paragraphHide = hideElements.lastElementChild;
                paragraphHide.classList.add("hidden-items");

                let imageHide = hideElements.firstElementChild;
                imageHide.classList.add("hidden-items");

                let formHide = hideElements.parentNode.lastElementChild;
                formHide.classList.add("hidden-items");
                }
            
            // Sections being revealed
            collapse.setAttribute("class", "col-md-12 active-store-item-portrait");

            let paragraph = event.target.lastElementChild;
            paragraph.classList.remove("hidden-items");

            let header = event.target.firstElementChild.nextElementSibling;
            header.classList.add("active-text");

            let image = event.target.firstElementChild;
            image.classList.remove("hidden-items");
            image.classList.add("active-hidden-img-portrait");

            let form = event.target.parentNode.lastElementChild;
            form.classList.remove("hidden-items");


        // Landscape
        } else {
            // Other sections being hidden
            let collapse = event.target.parentNode.parentNode;
            let siblings = getSiblings(collapse);
            for (let x = 0; x < siblings.length; x++) {
                siblings[x].setAttribute("class", "col-md-1 store-item")

                let hideElements = siblings[x].firstElementChild.firstElementChild;

                let headerHide = hideElements.firstElementChild.nextElementSibling;
                headerHide.classList.remove("active-text");
                headerHide.classList.add("minimized-text");

                let paragraphHide = hideElements.lastElementChild;
                paragraphHide.classList.add("hidden-items");

                let imageHide = hideElements.firstElementChild;
                imageHide.classList.add("hidden-items");

                let formHide = hideElements.parentNode.lastElementChild;
                formHide.classList.add("hidden-items");
            }
            // Section being revealed/adjusted
            collapse.setAttribute("class", "col-md-10 active-store-item");

            let paragraph = event.target.lastElementChild;
            paragraph.classList.remove("hidden-items");

            let header = event.target.firstElementChild.nextElementSibling;
            header.classList.add("active-text");
            header.classList.remove("minimized-text");

            let image = event.target.firstElementChild;
            image.classList.remove("hidden-items");

            let form = event.target.parentNode.lastElementChild;
            form.classList.remove("hidden-items");
        }
    });
};