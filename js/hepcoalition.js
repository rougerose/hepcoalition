jQuery(document).ready(function($) {
    $(".nav-lang--langue").click(function(){
        $("#menu_lang").toggleClass("active");
    });

    // navigation principale
    $("#nav-main").each(function(){
        var $btn = $(this).find("> a"),
        $np = $(this).find("> .nav-principale");
        $btn.click(function(){
            $(this).toggleClass("active");
            $np.toggleClass("open");
        });
    });

    // flexslider
    $('.flexslider').flexslider({
         animation: "slide",
         slideshow: false,
         // smoothHeight: true,
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

    // formulaire recherche, ouverture via un click/touch pour tablettes et smartphone
    // code repris de alistapart.com
    $("form.search__form:not:(.open-search)").bind("touchstart",function(e){
        e.preventDefault();
        $(this).addClass("open-search").unbind("touchstart");
        $("input[type=search]").css("font-size","16px");
    });
    $(".touch input[type=search]").blur(function(){
        $("input[type=search]").css("font-size","10px");
        $("form.main-search").removeClass("open-search");
    });
    $("form.search__form").submit(function(e){
        if($("input[name=recherche]").val()===""){
            $("input[name=recherche]").attr("placeholder","Please, type something").focus();
            return false;
        }
        else {
            return true;
        }
    });
});