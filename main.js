document.addEventListener('DOMContentLoaded', () => {
    let cursorElement = document.querySelector('.cursor');

    // Show cursor on mouse enter
    document.addEventListener('mouseenter', () => {
        cursorElement.style.display = 'block';
    });

    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => {
        cursorElement.style.display = 'none';
    });

    // Add active class on mousedown and remove on mouseup
    document.addEventListener('mousedown', () => cursorElement.classList.add('active'));
    document.addEventListener('mouseup', () => cursorElement.classList.remove('active'));

    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        cursorElement.style.top = e.pageY + 'px';
        cursorElement.style.left = e.pageX + 'px';
    });
});

let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

document.addEventListener("DOMContentLoaded", () => {
    const autoShowElements = document.querySelectorAll(".autoShow");

    // Intersection Observer to detect when elements are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate"); // Trigger the animation
            }
        });
    });

    // Observe all elements with the class 'autoShow'
    autoShowElements.forEach((element) => observer.observe(element));
});

let listBg = document.querySelectorAll('.bg');
let banner = document.querySelector('.banner');
let tabs = document.querySelectorAll('.tab');
let container = document.querySelector('.container-about');
let heightDefault = container.offsetHeight;
let topBefore = 0;
let body = document.querySelector('body.about-body');

window.addEventListener('wheel', function(event){
    event.preventDefault();
    const scrollSpeed = 0.2;
    const scrollValue = window.scrollY + (event.deltaY/3) * scrollSpeed;
    window.scrollTo(0, scrollValue);



    let top = scrollValue;
    listBg.forEach((bg, index) => {
        if(index != 0){
            bg.animate({
                transform: `translateY(${(-top*index)}px)`
            }, { duration: 1000, fill: "forwards" });
        }
        if(index == listBg.length - 1){
            tabs.forEach(tab => {
                tab.animate({
                    transform: `translateY(${(-top*index)}px)`
                }, { duration: 500, fill: "forwards" });
            })

            if(topBefore < top){
                setHeight = heightDefault-window.scrollY*index;
                container.animate({
                    height: `${(setHeight + 100)}px`
                }, { duration: 50, fill: "forwards" });
                topBefore = window.scrollY;
            }
        }
        tabs.forEach((tab, index) => {
            // console.log(tab.offsetTop - top, window.innerHeight);
            if((tab.offsetTop - top) <= window.innerHeight*(index+1)){
                let content = tab.getElementsByClassName('content')[0];
                let transformContent = window.innerHeight*(index+1) - (tab.offsetTop - top);
                console.log(tab);
                content.animate({
                    transform: `translateY(${(-transformContent + (100*index))}px)`
                }, { duration: 500, fill: "forwards" });
            }
        })
    })
}, { passive: false }); 