orderHistory = document.getElementById("order-history")
profileInfo = document.getElementById("profile-info")
profileBtn = document.getElementsByClassName("profile-btn")[0]
orderBtn = document.getElementsByClassName("profile-btn")[1]
btns = document.getElementsByClassName("profile-btn")

function btnToggle() {
    if (screen.width < 993) {
        orderHistory.style.display = "none";
        for (let i = 0;i < btns.length;i++) {
            btns[i].style.display = "block"
        }                
    } else {
        orderHistory.style.display = "block";
        profileInfo.style.display = "block";
        for (let i = 0;i < btns.length;i++) {
            btns[i].style.display = "none"
        }                
    }
}

function btnFlip() {
    for (let i = 0;i < btns.length;i++) {
        if (btns[i].classList.contains("disabled")) {
            btns[i].classList.remove("disabled");
        } else {
            btns[i].classList.add("disabled");
        }
    }
}

function showInfo() {
    orderHistory.style.display = "block";
    profileInfo.style.display = "none";
    btnFlip()
}

function showOrder() {
    console.log("what the fuck is happening right now")
    orderHistory.style.display = "none";
    profileInfo.style.display = "block";
    btnFlip()
}

$(document).on("load", btnToggle)
window.addEventListener("resize", btnToggle)
profileBtn.addEventListener('click', showOrder)
orderBtn.addEventListener('click', showInfo)