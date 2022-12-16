function classExist(e, t) {
    return e.classList.contains(t)
}

var e = document.getElementById("body");
var menuBarParent = document.getElementById("menu");
var menuBar = document.getElementById("navbar_main");
var menuButton = document.getElementById("menu_button");
var menuHolder = document.getElementById("menu_holder");
var homepage = document.getElementById("home");

const landing_slider = new Swiper('.slider1', {
    speed: 3000,
    direction: 'horizontal',
    grabCursor: true,
    loop: true,
    parallax: true
});

window.onload = function() {
    if (e) {
        e.classList.add("body--ready");
        console.log("body ready");
        loading_animation();
        loco();
    }
}

function loco() {
    var scrollDirection = "down";
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        getDirection: true,
        offset: ["25%", 0]
    })

    function scrollToTop() {
        scroller.scrollTo("top");
    }
    scrollToTopBtn.addEventListener("click", scrollToTop);

    scroller.on('call', (fun, dir, obj) => {
        if (fun == "headerSection") {
            console.log("header visible");
            menuBar.classList.toggle("headerVisible");
            document.getElementById("menu").classList.toggle("mainMenuVisibility");
        }
    });

    scroller.on("scroll", ({ direction }) => {
        scrollDirection = direction;
        console.log(scrollDirection);
        if (scrollDirection == "up") {
            menuBarParent.classList.add("scrolling_up");
        } else {
            menuBarParent.classList.remove("scrolling_up");
        }
    });

}

function loading_animation() {
    anime.timeline({ loop: false })
        .add({
            targets: '.loading-icon',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
        }).add({
            targets: '.loading-letter',
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 1500,
            delay: (el, i) => 50 * (i + 1),
            complete: function(anim) {
                e.classList.add("body--intro");
                console.log("loading animation completed");
                if (homepage) {
                    landing_slider.autoplay.start();
                }
            }
        });
}

function openMenu() {
    menuHolder.classList.add("active");
    menuButton.classList.add("active");
    var m1 = anime.timeline({
        complete: function(anim) {
            console.log("menu comlpetely openened");
            menuButton.disabled = false;
        }
    }).add({
        targets: '.menu_holder',
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 900
    }).add({
        targets: '.menu_holder li',
        translateY: ["3rem", 0],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 900,
        delay: anime.stagger(200)
    }, '-=700');
}

function closeMenu() {
    menuButton.classList.remove("active");
    var p1 = anime.timeline({
        complete: function(anim) {
            menuHolder.classList.remove("active");
            console.log("menu comlpetely closed");
            menuButton.disabled = false;
        }
    }).add({
        targets: '.menu_holder li',
        translateY: [0, "3rem"],
        opacity: [1, 0],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 900,
        delay: anime.stagger(200)
    }).add({
        targets: '.menu_holder',
        opacity: [1, 0],
        easing: "easeOutExpo",
        duration: 900
    }, '-=700');
}


function menu() {
    if (classExist(menuHolder, "active")) {
        console.log("menu should close");
        closeMenu();
        menuButton.disabled = true;
    } else {
        openMenu();
        console.log("menu should open");
        menuButton.disabled = true;
    }
}

menuButton.addEventListener("click", menu);

jQuery(document).ready(function(e) {

    $(".anmltr").lettering('words').children('span').lettering();
    $(".anmltr-text").lettering('words');


    function select_landing_slider(slide) {
        switch (slide) {
            case 0:
                $('#home').attr('data-theme', "green");
                break;
            case 1:
                $('#home').attr('data-theme', "yellow");
                break;
            case 2:
                $('#home').attr('data-theme', "red");
                break;
        }
    }

    landing_slider.on('slideChange', function() {
        select_landing_slider(this.realIndex);
    });

    $(document.querySelectorAll(".vegetable-thumb")).click(function() {
        select_landing_slider($(this).data("thumb-index"));
        landing_slider.slideTo($(this).data("thumb-index") + 1);
    });


    var slider2 = new Swiper('.slider2', {
        direction: 'horizontal',
        centeredSlides: true,
        grabCursor: true,
        loop: true,
        breakpoints: {
            350: {
                slidesPerView: 1
            },
            1200: {
                slidesPerView: 2
            },
            1400: {
                slidesPerView: 3
            }
        }
    });

    var slider3 = new Swiper('.slider3', {
        direction: 'horizontal',
        centeredSlides: true,
        grabCursor: true,
        loop: true,
        breakpoints: {
            350: {
                slidesPerView: 1
            },
            1200: {
                slidesPerView: 2
            },
            1400: {
                slidesPerView: 3
            }
        }
    });

    slider2.on('slideChange', function() {
        $(".swipe_indicator-1").css("opacity", "0.5");
    });
    slider3.on('slideChange', function() {
        $(".swipe_indicator-2").css("opacity", "0.5");
    });

    function select_menu_bg(menu) {
        switch (menu) {
            case 0:
                $('#menu_holder').attr('data-theme', "green");
                break;
            case 1:
                $('#menu_holder').attr('data-theme', "dark");
                break;
            case 2:
                $('#menu_holder').attr('data-theme', "red");
                break;
            case 3:
                $('#menu_holder').attr('data-theme', "yellow");
                break;
        }
    }

    $(".menu li a").hover(function() {
        console.log($(this).data("menu-index"));
        select_menu_bg($(this).data("menu-index"));
    });

    $(".menu li a").click(function() {
        closeMenu();
        menuButton.disabled = true;
    });


    var delay = 20;
    var heading = $('.anmltr');
    for (var i = 0; i < heading.length; i++) {
        $(heading[i]).find("span span").each(function(index) {
            $(this).css({
                'transition-delay': delay * (1 + index) + 'ms'
            });
        });
    }

    var animated_para = $('.anmltr-text');
    for (var i = 0; i < animated_para.length; i++) {
        $(animated_para[i]).find("span").each(function(index) {
            $(this).css({
                'transition-delay': delay * (1 + index) + 'ms'
            });
        });
    }

    var mouseX = 0,
        mouseY = 0;
    var xp = 0,
        yp = 0;

    $(document).mousemove(function(e) {
        mouseX = e.pageX - 30;
        mouseY = e.pageY - 30;
    });

    setInterval(function() {
        xp += ((mouseX - xp) / 6);
        yp += ((mouseY - yp) / 6);
        $("#circle").css({ left: xp + 'px', top: yp + 'px' });
    }, 20);

});