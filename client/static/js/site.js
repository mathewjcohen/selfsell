$(document).ready(function () {
    // navigation click move-to functionality
    $('a[href*="#"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 500);
                }
            }
        });

    $(".menu_toggle").on('click', function () {
        $(this).toggleClass("on");
        $("nav ul").toggleClass('hidden');
    });
    $("nav ul li").click( function(){
        $(this).toggleClass("animated swing");
    })
})