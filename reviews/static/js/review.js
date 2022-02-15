/* Thanks to https://dev.to/leonardoschmittk/how-to-make-a-star-rating-with-js-36d3 for stars code */
const ratingStars = [...document.getElementsByClassName("rating__star")];
var idStars = document.getElementById("id_stars");
var errorSpan = document.getElementById("error_span");
if (idStars) {
    idStars.value = 0;
    idStars.setAttribute("hidden", true);
}


function executeRating(stars) {
    const starClassActive = "rating__star fas fa-star";
    const starClassInactive = "rating__star far fa-star";
    const starsLength = stars.length;
    let i;
    stars.map((star) => {
        star.onclick = () => {
            i = stars.indexOf(star);
            idStars.value = i;
            if (star.className===starClassInactive) {
                for (i; i >= 0; --i) stars[i].className = starClassActive;
            } else {
                i += 1;
                for (i; i < starsLength; ++i) {
                    stars[i].className = starClassInactive;
                }
            }
        };
    });
}

if (idStars) {
    executeRating(ratingStars);
}

// Convert numerical star ratings to an icon for presentation
var starEntries = document.getElementsByClassName("starSpan");
for (let i = 0;i <= starEntries.length;i++) {
    if (starEntries[i] !== undefined) {
        let number = starEntries[i].innerHTML;
        let content = ''
        for (let i = 0;i <= number;i++){
            content += "<i class='rating__star fas fa-star'></i>"
        }
        starEntries[i].innerHTML = content
    }
}

// Show/hide more reviews
var reviewBoxes = document.getElementsByClassName("reviewBox");
let reviewForm = document.getElementById("reviewForm");
let showMore = document.getElementById("showMore");
var shown = false;
for (let i=3;i <= reviewBoxes.length;i++) {
    if (reviewBoxes[i] !== undefined){
        reviewBoxes[i].setAttribute("hidden", true);
    }
}
showMore.addEventListener("click", function() {
    if (shown == false) {
        shown = true;
        showMore.innerHTML = "Show Less  <i class='fas fa-angle-down'>";
        reviewForm.setAttribute("hidden", true);
        for (let i=3;i <= reviewBoxes.length;i++) {
            if (reviewBoxes[i] !== undefined){
                reviewBoxes[i].removeAttribute("hidden");
            }
        }
    }
    else {
        shown = false;
        showMore.innerHTML = "Show More <i class='fas fa-angle-right'>";
        reviewForm.removeAttribute("hidden");
        for (let i=3;i <= reviewBoxes.length;i++) {
            if (reviewBoxes[i] !== undefined){
                reviewBoxes[i].setAttribute("hidden", true);
            }
        }
    }
})

function validateForm() {
    let x = idStars.value
    
        if (x == 0) {
            errorSpan.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please select a rating.'
            
            console.log("ValidateForm")
            return false;
            
        }
    } 
// Thanks to https://stackoverflow.com/questions/30171099/is-it-possible-to-detect-form-submit-fail-in-javascript for the following:

// The user must give a rating to submit. If this happens, I gather the submit event and give a little warning
const myForm = document.getElementById('reviewForm');

// Add a listener to the submit event
$("#reviewForm").on('submit', validateForm);