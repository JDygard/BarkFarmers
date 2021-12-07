// From the bootstrap documentation
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

// Now we need the continue-btn to open the checkout form
// I'm thinking we can actually tie this into the code for opening the little windows. We can parse through the form that gets opened to set up the triggers.

// Affect grand-total readout

var element_IDs = ["_soft", "_hard"]
for (i = 0; i < element_IDs.length; i++) {
    let delivery_select = document.getElementById('id_delivery_method' + element_IDs[i]);
    let type_select = document.getElementById('id_product_type' + element_IDs[i]);
    let quantity_select = document.getElementById('quantity_select' + element_IDs[i]);
    let stacked_option = document.getElementById("stacked_option" + element_IDs[i]);
    let continue_btn = document.getElementById("continue_btn" + element_IDs[i])
    let checkout_section = document.getElementById("checkout_section" + element_IDs[i])

    delivery_select.addEventListener('change', function () {

        // Reveal the next step when an option is selected
        if (delivery_select.value !== "" && type_select.value !== "") {
            quantity_select.style.display = "block";
        }
    
        // Remove "hand-stacked" from type when pickup is selected
        if (delivery_select.value == "pickup") {
            stacked_option.setAttribute("disabled", false)
        } else {
            stacked_option.removeAttribute("disabled")
        }
    });


    type_select.addEventListener('change', function() {
        if (delivery_select.value !== "" && type_select.value !== "") {
            quantity_select.style.display = "block";
        }
        // Alter readout on quantity
    });

    continue_btn.addEventListener("click", function() {
        // Minimize other options
        delivery_select.previousElementSibling.style.display = "none"
        type_select.previousElementSibling.style.display = "none"
        quantity_select.firstElementChild.style.display = "none"
        continue_btn.style.display = "none"
        // Reveal checkout
        checkout_section.style.display = "block"
    })
};



// Controlling the number field in the order form
function handleEnableDisable(itemId) {
    var currentValue = parseInt($(`#id_qty_${itemId}`).val())
    var minusDisabled = currentValue < 2;
    var plusDisabled = currentValue > 98;
    $(`#decrement-qty_${itemId}`).prop("disabled", minusDisabled);
    $(`#increment-qty_${itemId}`).prop("disabled", plusDisabled);
}
$('.increment-qty').click(function(e) {
    e.preventDefault();
    var closestInput = $(this).closest('.input-group').find('.qty_input')[0];
    var currentValue = parseInt($(closestInput).val());
    $(closestInput).val(currentValue + 1);
    var itemId = $(this).data("item_id");
    handleEnableDisable(itemId);
});

$('.decrement-qty').click(function(e){
    e.preventDefault();
    var closestInput = $(this).closest('.input-group').find(".qty_input")[0];
    var currentValue = parseInt($(closestInput).val());
    $(closestInput).val(currentValue - 1);
    var itemId = $(this).data("item_id");
    handleEnableDisable(itemId);
})

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
            let storeItem = storeItems[i].parentNode.parentNode
            let classes = storeItem.classList
            let headerText = storeItems[i].firstElementChild.nextElementSibling
            storeItems[i].firstElementChild.nextElementSibling.setAttribute("class", "store-text-portrait");
            if (classes.contains("active-store-item-portrait") || classes.contains("col-md-10")) {
                storeItem.setAttribute("class", "col-md-12 active-store-item-portrait");
                headerText.classList.add("active-text")

            } else if (classes.contains("minimized-store-item-portrait") || classes.contains("col-md-1")) {
                storeItem.setAttribute("class", "col-md-12 store-item minimized-store-item-portrait")

                headerText.classList.remove("minimized-text", "store-text-portrait")
                headerText.classList.add("store-text-minimized-portrait")
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
                storeItems[i].firstElementChild.nextElementSibling.classList.add("minimized-text")
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
            
            console.log(event.target)
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
                paragraphHide.classList.add("hidden-items")

                let imageHide = hideElements.firstElementChild
                imageHide.classList.add("hidden-items")

                let formHide = hideElements.parentNode.lastElementChild
                    formHide.classList.add("hidden-items");
                }
            // Section being revealed/adjusted
            collapse.setAttribute("class", "col-md-10 active-store-item");

            let paragraph = event.target.lastElementChild;
            paragraph.classList.remove("hidden-items");

            let header = event.target.firstElementChild.nextElementSibling;
            header.classList.add("active-text");
            header.classList.remove("minimized-text")

            let image = event.target.firstElementChild;
            image.classList.remove("hidden-items")

            let form = event.target.parentNode.lastElementChild
            form.classList.remove("hidden-items");
        }
    });
};
