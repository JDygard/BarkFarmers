var learnMore = document.getElementsByClassName("learn-more-text")[0];
var learnMoreActiveClass = "learn-more-text back-to-top"
var learnMoreInactiveClass = "learn-more-text"
let atTop = true;
window.onscroll = transformText;

function transformText(e){
    if (screen.width < 993) {    
        // If on mobile, smaller icons
        if (atTop) {
            if (window.scrollY > 0) {
                atTop = false;
                learnMore.innerHTML = "<a href='#hero-image'><i class='fas fa-chevron-up'></i></a>"
                learnMore.className = learnMoreActiveClass
            }
        } else {
            if (window.scrollY == 0) {
                atTop = true;
                learnMore.innerHTML = "<a href='#learn-more'><h4>Learn More</h4><i class='fas fa-chevron-down'></i></a>"
                learnMore.className = learnMoreInactiveClass
            }
    }           
    } else {
        if (atTop) {
            if (window.scrollY > 0) {
                atTop = false;
                learnMore.innerHTML = "<a href='#hero-image'><h4>Back to Top</h4><i class='fas fa-chevron-up'></i></a>"
                learnMore.className = learnMoreActiveClass
            }
        } else {
            if (window.scrollY == 0) {
                atTop = true;
                learnMore.innerHTML = "<a href='#learn-more'><h4>Learn More</h4><i class='fas fa-chevron-down'></i></a>"
                learnMore.className = learnMoreInactiveClass
            }
    }
}

function btnToggle() {
        orderHistory.style.display = "block";
        profileInfo.style.display = "block";
        for (let i = 0;i < btns.length;i++) {
            btns[i].style.display = "none"
        }                
    }
}