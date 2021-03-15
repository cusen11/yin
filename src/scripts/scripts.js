$(function() {
    const headerElement = document.querySelector('header');
    const logo = document.querySelector('.ontop');
    const logo1 = document.querySelector('.onscroll');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100){
            headerElement.classList.add('sticky');
            logo.style.display = 'none';
            logo1.style.display = 'block';
		   }
        else {
            headerElement.classList.remove('sticky');
            logo.style.display = 'block';
            logo1.style.display = 'none';
		    }
    });
});

const toggle = document.querySelector('#toggle-menu');
const nav = document.querySelector('.nav');
toggle.onclick = toggleMenu;

function toggleMenu() {
    toggle.classList.toggle('active');
    nav.classList.toggle('show');
    console.log(nav);
};
$('.owl-pill').owlCarousel({
    loop: true,
    dots: false,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 2
        },
        1900: {
            items: 3
        }
    }
});

//collapse
const coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.maxHeight)
            content.style.maxHeight = null;
        else
            content.style.maxHeight = content.scrollHeight + "px";
    });
};
