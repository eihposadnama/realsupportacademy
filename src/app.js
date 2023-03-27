const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('navlist')

function toggleButton() {
    navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click', toggleButton)

let images = Array.from(document.getElementsByClassName("imgCarousel"))

let mainPhoto = document.getElementById("mainPhoto")

function updateImage(event){
    let image = event.target

    mainPhoto.src = image.src
}

images.forEach(function (image){
    image.addEventListener("click", updateImage)});