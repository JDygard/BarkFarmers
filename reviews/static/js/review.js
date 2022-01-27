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
            idStars.value = i + 1;
            if (star.className===starClassInactive) {
                for (i; i >= 0; --i) stars[i].className = starClassActive;
            } else {
                for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
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