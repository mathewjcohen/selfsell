// document.querySelector('a[href*="#"]').onclick(function(event) {
//   if (
//     location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
//     location.hostname == this.hostname
//   ) {
//     var target = $(this.hash);
//     target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
//     if (target.length) {
//       event.preventDefault();
//       $("html, body").animate({ scrollTop: target.offset().top }, 500);
//     }
//   }
// });

// window.scroll(function() {
//   var wScroll = $(window).scrollTop();
//   if (wScroll > 150) {
//     $("nav").addClass("nav_bg");
//   } else {
//     $("nav").removeClass("nav_bg");
//   }
// });
// $("nav ul li").click(function() {
//   $(this).toggleClass("animated swing");
// });
// $("nav .logo_border").on("mouseenter", function() {
//   $("nav .logo_border").toggleClass("logo_rotate");
//   $("nav .logo").toggleClass("logo_antirotate");
// });
// $("nav .logo_border").on("mouseleave", function() {
//   $("nav .logo_border").toggleClass("logo_rotate");
//   $("nav .logo").toggleClass("logo_antirotate");
// });
