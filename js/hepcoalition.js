jQuery(document).ready(function($) {
    $(".menu-lang--langue").click(function(){
        $("#menu_lang").toggleClass("active");
    });

    // flexslider
    $('.flexslider').flexslider({
         animation: "slide",
         slideshow: false,
         smoothHeight: true,
         start: function(slider){
           slider.viewport.css({"overflow":"visible"});
           slider.newSlides.css({'opacity':0.3});
           slider.slides.eq(slider.currentSlide).fadeTo('slow',1);
         },
         before: function(slider) {
            slider.slides.fadeTo('slow',0.3);
         },
         after: function(slider) {
            slider.slides.eq(slider.currentSlide).fadeTo('slow',1);
         }
    });
});