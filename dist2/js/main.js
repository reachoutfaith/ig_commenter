$(window).load(function() {
    // -------------------- Mobile menu -------------------- //
    $('.menu__icon').on('click', function(){
        $('.menu__list').toggleClass('menu__list--opened');
    });

    // anchor smooth slide down

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    // -------------------- Animations -------------------- //
    // Animation on scroll when the elements are in the view 

        //window and animation items
        // var animation_element = $.find('.step');
        var web_window = $(window);
        
       

        //check to see if animation container is currently in view
        function check_if_in_view(animation_box) {
            //get current window information

            var animation_element = $.find(animation_box);
           
            var window_height = web_window.height();
            var window_top_position = web_window.scrollTop();
            var window_bottom_position = (window_top_position + window_height);
           

            //iterate through elements to see if its in view
            $.each(animation_element, function () {
               
                //get the element's information
                var element = $(this);
                var element_height = $(element).outerHeight();
                var element_top_position = $(element).offset().top;
                var element_bottom_position = (element_top_position + element_height);


                //check to see if this current container is visible
                if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
                    if (animation_box === '.step') {
                        element.find('.step__subtitle').addClass('step__subtitle--animated');
                        element.find('.step__svg').addClass('step__svg--animated');
                    } else {
                        element.find('.packageAside--left').addClass('packageAside--leftAnimated');
                        element.find('.packageAside--right').addClass('packageAside--rightAnimated');
                    }
                    
                };

            });
        };


        //on or scroll, detect elements in view
        $(window).on('scroll resize', function () {
            check_if_in_view('.offers--best__box');
            check_if_in_view('.step');
        });
        //trigger our scroll event on initial load
        $(window).trigger('scroll');


    // -------------------- Flickity slider -------------------- //

    // make Flickity a jQuery plugin
    jQueryBridget('flickity', Flickity, $);


    $('.comments__slider').flickity({
        cellAlign: 'left',
        cellSelector: '.slide',
        prevNextButtons: true,
        draggable: false,
        freeScroll: false,
        wrapAround: true,
        pageDots: true
    });

});