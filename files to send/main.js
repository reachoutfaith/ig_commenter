$(window).load(function() {
    // -------------------- Landing -------------------- //
    $('.menu__icon').on('click', function(){
        $(this).addClass('menu__icon--clicked');
        setTimeout(function(){
            $('.menu__icon--clicked').removeClass('menu__icon--clicked')
        }, 200);
        $('.menu__list').toggleClass('menu__list--opened');
        $('.nav-bg').toggleClass('nav-bg--checked');
    });


    // Landing Page

    // choose language
    $('.lang').click(function(){
        $('.lang').removeClass('lang--chosen');
        $(this).addClass('lang--chosen');
    })
    // anchor smooth slide down on menu

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    // change main__button's position depending on mediaqueries
    function changeBtnPosition(){
        $('.main__button').remove();
        if ($('.main').width() > 767 ) {
            $('.block__text').append('<a href="#" class="main__button"><span class="main__button--center">View Our Offers</span></a>');
        } else { 
            $('.main').append('<a href="#" class="main__button"><span class="main__button--center">View Our Offers</span></a>');
        };
    };

    //on or scroll, detect elements in view
        $(window).on('resize', function () {
            changeBtnPosition();
        });

        //trigger our scroll event on initial load
        $(window).trigger('resize');

    var counter = 200;
    
    $('.imgMobile__Text').each(function(){
        let element = $(this);

        setTimeout(function(elem){
            elem.fadeIn();
            elem.addClass('imgMobile__Text--shown');
        }, counter, element)
        counter += 600;
    })

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
                    if (animation_box === '.benefit') {
                        element.children().addClass('benefit--animated');
                    } 
                    else if (animation_box === '.stats__card'){
                        element.addClass('stats__card--animated');
                    } else {
                        element.find('.packageAside--left').addClass('packageAside--leftAnimated');
                        element.find('.packageAside--right').addClass('packageAside--rightAnimated');
                    }
                    
                };

            });
        };


        //on or scroll, detect elements in view
        $(window).on('scroll resize', function () {
            check_if_in_view('.benefit');
            check_if_in_view('.offers--best__box');
            check_if_in_view('.stats__card');
        });
        //trigger our scroll event on initial load
        $(window).trigger('scroll');


    // -------------------- Flickity slider -------------------- //

    // make Flickity a jQuery plugin
    jQueryBridget('flickity', Flickity, $);

    //slider on landing page
    $('.comments__slider').flickity({
        cellAlign: 'left',
        cellSelector: '.slide',
        prevNextButtons: true,
        draggable: true,
        freeScroll: false,
        wrapAround: true,
        pageDots: true
    });

    //slider on posts with comments
    $('.slider').flickity({
        cellAlign: 'left',
        cellSelector: '.slider__cell',
        prevNextButtons: true,
        draggable: true,
        freeScroll: false,
        wrapAround: false,
        pageDots: false
    });


// -------------------- Referral Page -------------------- //

    $('.referral__cardLink').click(function(){
        $(this).select()
        document.execCommand("copy");
        console.log($(this).text());
        $(this).addClass('referral__cardLink--clicked');
        setTimeout(function(){$('.referral__cardLink').removeClass('referral__cardLink--clicked')}, 800);
    })
// -------------------- BuyProcess -------------------- //
// -------------------- Step Two -------------------- //

//choose preferred image
$('.post__image').on('click', function(){
    $(this).toggleClass('post__image--chosen');
});
let chosenPhotos = 0,
    maxPhotos = 3;
// check if user choose more photos that it is allowed
$('.btn__posts--submit').on('click', function(){
    event.preventDefault();
    //check the id of chosen post and create hidden input
    $('.post__image').each(function(){
        if ($(this).hasClass('post__image--chosen')) {
            chosenPhotos++;
            let id = $(this).attr('id');
            $('<input>').attr({
            type: 'hidden',
            name: 'item__' + i++,
            class: 'post__id'
            }).appendTo('.order__form').val(id);
        };
    });
    if (chosenPhotos > maxPhotos) {
        $('.error__message').toggleClass('error__message--active');
    };
    $('.post__id').each(function(){
        console.log($(this).val());
    });
})

    // -------------------- Step Four -------------------- //

    //counter for number of posts - stepFour
    let i = 1; // get the number from a server
    $('.flickity-button').on('click', function(){
        
        if ($(this).hasClass('previous')){
            i--;
             $('.numberOfSlide').text(i);

        };

        if ($(this).hasClass('next')){
            i++;
            $('.numberOfSlide').text(i);
        };

    });

    // -------------------- Step Five -------------------- //

    //StepFive -- checkOutPage
    //Give unique id to images and commentsBoxes
    $('.post__imageItem').each(function(i){
        i++;
        $(this).attr('id', i);
    });

    // give unique id to listElements
    $('.postItem__commentsList').each(function(i){
        i++;
        $(this).attr('id', 'post_' + i);
        // an array of comments
        let numberOfComments = $(this).children();


        //Display Show More Button if there are more than 5 listElements
        if ($(numberOfComments).length > 5) {
            numberOfComments.hide();
            numberOfComments.slice(0, 5).show(); // show only 5 comments
            $(this).append('<button class="postItem__btn--upload">Show more</button>');
            // Add extra height to the parent block
            $('.postItem__commentsList').css('height', $(this).height() + 65 + 'px');
            $('.order__postsCommentsBox').css('margin-bottom', '8rem');
        };

        // Show all listElements if the button Show more is clicked
        $('.postItem__btn--upload').click(function(){
            var listSize = numberOfComments.length;
            var x = 5, // the max of visible comments
                start = 0;
            // show the rest of the comments
            if (start + x < listSize) {
                start += x;
                numberOfComments.slice(start, start + x).fadeIn();
                // Remove the button after showing all the comments and the extra height from the parent element
                $('.postItem__btn--upload').remove();
                $('.postItem__commentsList').css('height', 200 + 'px');
                $('.order__postsCommentsBox').css('margin-bottom', '2rem');
            }
        })
    });

    // Show CommentsList in accordance with the chosen image
    $('.post__imageItem').click(function(){
        $('.post__imageItem--chosen').removeClass('post__imageItem--chosen');
        // Define a new picture
        $(this).addClass('post__imageItem--chosen');
        let idImage = $(this).attr('id');
        $('.postItem__commentsList--visible').removeClass('postItem__commentsList--visible');
        // show needed CommentsList
        $('#post_' + idImage).addClass('postItem__commentsList--visible');
    });


});


// -------------------- Step three -------------------- //
// event on back button
$(document).on('click','.category__btn--back', function(){
        //remove back button
        $(this).remove();
        // create buttons with categories again and prepend them
        let categoriesBox = '<button class="category__btn  ctgL">Emotions</button>' +
        '<button class="category__btn ctgC">Thematic</button>' +
        '<button class="category__btn ctgR">For Influencers</button>';
        $('.categories__box').prepend(categoriesBox);
})

//animation on categories buttons
$(document).on('click','.category__btn',function(){
    $('.ctgL').addClass('ctgL--clicked');
    $('.ctgR').addClass('ctgR--clicked');
    
    // removing buttons and create back button
    setTimeout(function(){$('.category__btn').remove()}, 500);
    setTimeout(function(){
        $('.categories').prepend('<button class="category__btn--back">&#8592; Back</button> ');
    }, 500);

    //something like ajax
    // $('.subcategories__box', '.subcategory__list').css('display', 'block');
    //             $.ajax({
    //                 type: 'GET',
    //                 url: 'comments.json',
    //                 success: function (data) {
    //                     console.log(data);
    //                     console.log('111');
    //                     $('.categories').append('<div class="subcategories__box">'+
    //                         '<ul class="subcategory__list">'+
    //                         '</ul></div>')

    //                     //li class="subcategory__listItem"><i class="subcategory__arrow"></i><span class="subcategory__name">Love</span></li>

    //                     let comments = data;
    //                     console.log(comments);
    //                     for (var i = 0; i < data.length; ++i) {
    //                         $('.categories').append('<li class="subcategory__listItem"><i class="subcategory__arrow"></i><span class="subcategory__name">' + data.comments[i] + '</span></li>');
    //                     };
    //                 },
    //                 error: function (error) {
    //                     console.log('Error', error);
    //                 },
    //                 dataType:'json'
    //             });
    
});

//toggle active class for subcategory__listItem and put an anchor on subcategories
$('.subcategory__listItem').each(function(){
    $(this).on('click', function(){
        $('.subcategory__listItem--active').removeClass('subcategory__listItem--active');
        $(this).addClass('subcategory__listItem--active');

        //smooth transition to a sibmit button
        // $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 500);
        
        //delete class hover when it's mobile adaptive
        if ($('.order').width() <= 450){
            $('.subcategory__listItem').removeClass('subcategory__listItem--hover');
        };
        

    });
});

// -------------------- Step Four -------------------- //

let newListItemText = 'bitch'; // new comment text
let totalNum = 15; // total number of Comments on all cards from the server
let amountOfComments = $('.listItem__number').length; // number of ListItems on all cards
let buttonExist = false;
// list all the comments on each card
// $('.card__list').each(function(){
//     $('.listItem__number').each(function(i){
//         i++;
//         $(this).text(i);
        
//     })
// });


// Events on listItem__buttons 
$('.listItem__button').on('click', function(){
    //Check if it is a refresh button
    if ($(this).hasClass('card__btn--refresh')){
        $(this).addClass('btn__refresh--active');
        // smooth removing of a class
        setTimeout(function(){
            $('.btn__refresh--active').removeClass('btn__refresh--active')
        }, 500);

        // find text that should be deleted
        let elementToHide = $(this).parent().parent().find('.listItem__text');
        elementToHide.hide('slow'); // delete the text
        //add span with new comment text
        newListItem = '<span class="listItem__text">' + newListItemText + '</span>'
        elementToHide.replaceWith(newListItem);
    };

    //Check if it is a delete button
    if ($(this).hasClass('card__btn--delete')){
        $(this).addClass('btn__delete--active');
        // smooth removing of a class
        setTimeout(function(){
            $('.btn__delete--active').removeClass('btn__delete--active')
        }, 200);

        // find parent of span and delete it
        $(this).parent().parent().hide('slow');

        // get a new number of total number of comments 
        amountOfComments -= 1;
        $('.order__details').css('display', 'block');// show order details block
        $('.numberOfComments').text(totalNum - amountOfComments); // get how many comments are left
        //find needed card__list and add an upload button
        if (buttonExist == false) {
            $(this).closest('.card__comment').append('<button class="card__comment--upload">Add a comment</button>');
            buttonExist = true;
        }
    };

    //Check if it is a edit button
    if ($(this).hasClass('card__btn--edit')){
        $(this).addClass('btn__edit--active');
         // smooth removing of a class
        setTimeout(function(){
            $('.btn__edit--active').removeClass('btn__edit--active')
        }, 300);

        // find text that should be edited    
        let elementToEdit = $(this).parent().parent().find('.listItem__text');
        let listItemText = elementToEdit.text(); // get a text from span that will be edited
        //create input instead of the span with the text
        let inputToEdit = '<input class="listItem__input" value="' + listItemText + '">' + 
        '<button class="listItem__button--submit">Submit</button>';
        elementToEdit.replaceWith(inputToEdit);
        // get a new number of total nimber of comments 
        totalNum++;
        // delete listItem__buttons
        $(this).parent().hide("slow");
    };
});

//event on listItem__button--submit
$(document).on('click','.listItem__button--submit',function() {
    //find the input
    let input = $(this).parent().find('.listItem__input');
    let inputText = input.val(); // get input's value
    // create a new span and replace the input with it
    let newSpan = '<span class="listItem__text">' + inputText + '</span>';
    input.replaceWith(newSpan);
    //hide submit button and show listItem__buttons
    $(this).hide("fast");
    $('.listItem__buttons').show('fast');
});
