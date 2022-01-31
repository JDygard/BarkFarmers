/* Thanks to https://dev.to/leonardoschmittk/how-to-make-a-star-rating-with-js-36d3 for stars code */
const ratingStars = [...document.getElementsByClassName("rating__star")];
var idStars = document.getElementById("id_stars");
idStars.setAttribute("hidden", true)

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
                for (i; i < starsLength; ++i) {
                    stars[i].className = starClassInactive;
                    console.log(stars[starsLength]);
                    stars[starsLength].className = starClassActive;
                }
            }
        };
    });
}
executeRating(ratingStars);

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
        showMore.innerHTML = "Show Less  <i class='fas fa-angle-right'>";
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