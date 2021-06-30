$(window).load(function() {
    // -------------------- Landing -------------------- //
        // change main__button's position depending on mediaqueries
    function changeBtnPosition(){
        let btnText = $('.main__button--center').text();
        $('.main__button').remove();
        if ($('.main').width() > 767 ) {
            $('.block__text').append('<a href="#packages" class="main__button"><span class="main__button--center">'+ 'View our offers' +'</span></a>');
        } else { 
            $('.main').append('<a href="#packages" class="main__button"><span class="main__button--center">'+ 'View our offers' +'</span></a>');
        };
    };

    //on or scroll, detect elements in view
        $(window).on('resize', function () {
            changeBtnPosition();
        });

        //trigger our scroll event on initial load
        $(window).trigger('resize');
        
    
    function closeAd(){
        $(this).parent().remove();
        document.cookie = "ad=hidden";
    }

    
    let cookies = document.cookie.split(';');

    if (cookies.includes(' ad=hidden')){
        $('.header__ad').remove();
    } else {
        $('.header__ad').css('display', 'flex');
    }

    $('.ad__close').click(closeAd);

    //document.cookie = "username=John Doe;";

    $('.menu__icon').on('click', function(){
        $(this).addClass('menu__icon--clicked');
        setTimeout(function(){
            $('.menu__icon--clicked').removeClass('menu__icon--clicked')
        }, 200);
        $('.menu__list').toggleClass('menu__list--opened');
        $('.nav-bg').toggleClass('nav-bg--checked');
    });

    //set height to slider so it won't overlap other elements
    function setCellsHeight(){
        let arrCellsHeight = [];
         $('.slider__cell').each(function(){
            arrCellsHeight.push($(this).height());
         })


         let cellMaxHeight = Math.max.apply(Math,arrCellsHeight);
         $('.slider').css('height', cellMaxHeight);
    }
    
    setCellsHeight();
     $('.slider__cell--upload').css('opacity', '1').removeClass('slider__cell--upload');

    //CommentsCounter
        
    let commentsLength = $('.card__listItem').length;
    let commentsCounter = commentsLength;
    let commentsToAdd = 0;
    
    

    // Landing Page

    // choose language
    // $('.lang').click(function(){
    //     $('.lang').removeClass('lang--chosen');
    //     $(this).addClass('lang--chosen');
    // })



    // anchor smooth slide down on menu

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 600);
    });


    //animation on main imageBlock
    var counter = 200;
    
    $('.imgMobile__Text').each(function(){
        let element = $(this);

        setTimeout(function(elem){
            elem.fadeIn();
            elem.addClass('imgMobile__Text--shown');
        }, counter, element)
        counter += 600;
    })

    // counter on elements on imgMobile

    $('.rect').each(function () {
        let counter = 0;
        let element = $(this);

        for (let i = 0; i <= 20; i++) {
            setTimeout(function (elem) {
                let text = elem.text();

                elem.text(parseInt(text) + 1)

            }, counter, element)

            counter += 100;
        }
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
                    } else if (animation_box === '.order__packagePrice--followers'){
                        element.find('.oldCurrency').addClass('priceCurrency--low');
                        element.find('.price__wrapperNumber').addClass('price--small');
                        element.find('.price__wrapperNumber').addClass('price--animation');
                        //element.find('.price__wrapperNumber').removeClass('price--noAnimation');
                        element.find('.discount').addClass('discount--visible');
                        $('.order__packagePrice--hidden').show('slow')
                        //.removeClass('order__packagePrice--hidden');
                    }
                    else {
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
            check_if_in_view('.order__packagePrice--followers');
        });
        //trigger our scroll event on initial load
        $(window).trigger('scroll');

// -------------------- Landing Offers Menu -------------------- //

    $('.services__accordionItem--closed').slideUp();

    $('.services__accordionItem').on('click', function () {
        $(this).find('.services__accordionItem--closed').slideToggle();
        $(this).find('.accordion__icon').toggleClass('accordion__icon--opened')

    })
    $('.service__button').each(function () {
        $(this).on('click', function () {
            let prevBtnName = $('.service--chosen').attr('data-name');

            $('.accordion--shown').removeClass('accordion--shown');
            $('.offers__wrapper--shown').removeClass('offers__wrapper--shown');
            $('.service__question--shown').removeClass('service__question--shown');
            $('.service--chosen').removeClass('service__' + prevBtnName + '--chosen');
            $('.service--chosen').removeClass('service--chosen');

            let nowBtnName = $(this).attr('data-name');
            if (nowBtnName === 'comments') {
                $('.offers--best__link').css('display', 'block')
                $('.offers--best__link').attr("href", "packages/")
            } else if (nowBtnName === 'followers') {
                $('.offers--best__link').css('display', 'block')
                $('.offers--best__link').attr("href", "buy-instagram-followers/")
            } else {
                $('.offers--best__link').css('display', 'none')    
            }
            $(this).addClass('service--chosen service__' + nowBtnName + '--chosen');
            $(this).next('.service__question').addClass('service__question--shown');

            // $('.accordion__${nowBtnName}').addClass('accordion--shown');
            $('.' + nowBtnName + 'Package').addClass('offers__wrapper--shown');

            
            $([document.documentElement, document.body]).animate({
                scrollTop: $(this).offset().top
            }, 500);


        })
    })

    $('.service__question').each(function () {
        $(this).on('click', function () {
            let btnName = $(this).prev('.service--chosen').attr('data-name');

            $('.accordion__' + btnName).addClass('accordion--shown');

            $([document.documentElement, document.body]).animate({
                scrollTop: $('.accordion--shown').offset().top
            }, 800);
        })
    })


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


// -------------------- Referral Page -------------------- //

    function copyLink(){
        var $temp = $("<input>");
          $("body").append($temp);
          $temp.val($('#codeToCopy').val()).select();
          document.execCommand("copy");
          $temp.remove();

        }

    $(".referral__cardButton").click(function(){
        copyLink();
        $('.referral__cardLink').addClass('referral__cardLink--clicked');
        setTimeout(function(){$('.referral__cardLink').removeClass('referral__cardLink--clicked')}, 800);
    })

    $(".order__btn--copy").on('click', function(){
        copyLink();
        $(".payment__trackingLink").addClass('link__popup');
        $(".button--copy").addClass('btn--scaled ');
        setTimeout(function(){
            $(".payment__trackingLink").removeClass('link__popup');
            $(".button--copy").removeClass('btn--scaled ');

        }, 800);
    })
// -------------------- BuyProcess -------------------- //
// -------------------- Tracking -------------------- //
let progressBars = $('.progressBar--frontInfo');
progressBars.each(function(index){
    let progressBarArr = $(this).text().split(' of ');
    
    let done = parseInt(progressBarArr[0]);
    let quantity = parseInt(progressBarArr[1]);

    if (done >= quantity) {
        $(this).text(done + " / " + quantity + " (Completed)")
    }
    else {
        $(this).text(done + " / " + quantity + " (In Progress)")
    }

    let completedPercantage = (parseFloat(done) / parseFloat(quantity)) * 100;
    if (completedPercantage > 100)
        completedPercantage = 100
    $(this).siblings('.progressBar.progressBar--front').css('width', completedPercantage.toString() + '%');
})



// -------------------- Followers -------------------- //



// -------------------- End -------------------- //
// -------------------- Step One -------------------- //
$('form').on('submit',function(){
        setTimeout(() => $('<p class="text text--username">Please wait a little bit, it may take a few seconds to load a page</p>').insertAfter($('.form__username')) , 3500);
        $('.set_usernameBtn').text('');
        $('.set_usernameBtn').addClass('pending--on');

    });


// $('.form__username').on('keypress paste', function(){
//     $( "button:disabled" ).prop("disabled", false);
// })
// -------------------- Step Two -------------------- //
let maxPosts = parseInt($('#max_posts').val()), // get the number from server
    chosenPosts = 0;
$('.gallery__cell').each(function(){
    $(this).click(choosePost)
});


$( ".form__posts--submit" ).on('click', function(){
   if (chosenPosts === 0) {
        event.preventDefault();
        $('.error__message').addClass('error__message--active').text('You haven\'t chosen anything. Please, choose a post');
        $("html, body").animate( { scrollTop: 0 }, 600);
    }
})


function choosePost(){

    // add border to  a chosen post
    if ($(this).hasClass('post__image--chosen')) {

        $(this).removeClass('post__image--chosen');
        
        let srcToDelete = $(this).find('.post__image').attr('src');

        if ($(this).children().hasClass('commenting_disabled')){
            $('.warning').removeClass('warning--visible');
        }

        //delete hidden input with the src of a post
        $('.itemStorage').each(function(){
            if ($(this).val() === srcToDelete) {
                $(this).remove();
            }
        });

        let inputCounter = 0;
        $('.itemStorage').each(function(){
            $(this).attr('name', 'item__' + inputCounter++);
        })

         chosenPosts--;

    } else {
        $(this).addClass('post__image--chosen');

        // create input with a src of a chosen img
        let src = $(this).find('.post__image').attr('src');

        $('<input>').attr({
            type: 'hidden',
            name: 'item__' + chosenPosts,
            class: 'itemStorage'
            }).appendTo('.order__form').val(src);

        chosenPosts++;
    }

    //check if number of chosen posts is bigger than maxPosts
    if (chosenPosts > maxPosts) {
        $('.error__message').addClass('error__message--active');
        $("html, body").animate( { scrollTop: 0 }, 600);

    } else {
        $('.error__message').removeClass('error__message--active');
        //enable submit button
        //$( ".form__button--submit" ).prop( "disabled", false );
    }

    

    // check if none of the posts were chosen
    $( ".form__posts--submit" ).on('click', function(){
        if (chosenPosts === 0) {
            event.preventDefault();
            $('.error__message').addClass('error__message--active').text('You haven\'t chosen anything. Please, choose a post');
            $("html, body").animate( { scrollTop: 0 }, 600);
        }

        if (chosenPosts > maxPosts) {
            event.preventDefault();
            $('.error__message').addClass('error__message--active');
            $("html, body").animate( { scrollTop: 0 }, 600);
        } 
    })

    let postImageChosen = $('.post__image--chosen').children();


    if (postImageChosen.hasClass('commenting_disabled')){
        $('.warning').addClass('warning--visible');  
    } else {
        $('.warning').removeClass('warning--visible');  
    }

}

$('.getMorePosts').click(function(e){
    event.preventDefault();

    let dataInfo = $(this).attr('data-info');

    $.ajax({
       url: '/more-posts/',
       type: 'post',
       data: { next_max_id: dataInfo },
       beforeSend: function(){
            setTimeout(() => $('<p class="text text--posts">Please wait a little bit, it may take a few seconds to load posts</p>').insertBefore($('.getMorePosts')) , 3500);
            $('.gallery__button--text').text('');
            $('.gallery__button--text').addClass('pending--on');
       },
       success: function(data){
            let arr = JSON.parse(data);
            let links = arr.data;
            let newDataInfo = arr.next_max_id;

            if (newDataInfo == "None")
                $('.getMorePosts').hide();
            else
                $('.getMorePosts').attr('data-info', newDataInfo);

            for (let i = 0; i < links.length; i++){

                let link = links[i];
                let url = links[i].link;
                let commentEnabled = links[i].commenting_enabled;
                
                let galleryCell = $('<div></div>');
                galleryCell.addClass('gallery__cell');

                if (link['is_video'] === true){
                    galleryCell.addClass('post__video');
                }

                if (link['is_igtv'] === true) {
                    galleryCell.addClass('post__igtv');
                }
                
                let postImage = $('<img/>');
                postImage.addClass('post__image');
                postImage.attr('src', url);
                if (!commentEnabled){
                    postImage.addClass('commenting_disabled')
                }
                
                galleryCell.click(choosePost)
                galleryCell.append(postImage);
                $('.gallery').append(galleryCell);
                
            };

            
        },
       complete: function(){
            $('.text').remove();
            $('.gallery__button--text').removeClass('pending--on');
            $('.gallery__button--text').text('Load More');
       }
      });
})

// -------------------- Step three -------------------- //

$(".category__btn").click(showSubCategories);

// onclick on back buton to show main categories
function showCategories(){
    //remove back button
        $(this).remove();
        $('.subcategories__box').fadeOut('slow');
        // create buttons with categories again and prepend them
        let categoriesBox = '<button class="category__btn  ctgL">Emotions</button>' +
        '<button class="category__btn ctgC">Thematic</button>' +
        '<button class="category__btn ctgR">For Influencers</button>';
        $('.categories__box').prepend(categoriesBox);
        $(".category__btn").prop("disabled", false);
        $(".category__btn").click(showSubCategories);
}

function showSubCategories(){
    $( "button:disabled" ).prop("disabled", false);
    $('.category__btn').prop("disabled", true);
    $('.ctgL').addClass('ctgL--clicked');
        $('.ctgR').addClass('ctgR--clicked');
        
        // removing buttons and create back button
        setTimeout(function(){$('.category__btn').remove()}, 500);
        setTimeout(function(){
            $('.categories').prepend('<button class="category__btn--back">&#8592; Back</button> ');
            $(".category__btn--back").click(showCategories);
        }, 500);

        //get the name of Button
        let categoryName = $(this).text();

        //ajax on a button for subcategories
        $.post( "/get-categories/", { category: categoryName }, function( data ) {

               $('.categories').append('<div class="subcategories__box">'+
                                '<ul class="subcategory__list">'+
                                '</ul></div>');
                var data = JSON.parse(data);

                for (var i = 0; i < data.length; i++){
                    if (data[i].is_hot){
                        $('.subcategory__list').hide().append('<li class="subcategory__listItem"><i class="subcategory__arrow"></i><span class="subcategory__name item__isHot">' + data[i].category + '</span></li>').fadeIn('slow');
                    } else {
                        $('.subcategory__list').hide().append('<li class="subcategory__listItem"><i class="subcategory__arrow"></i><span class="subcategory__name">' + data[i].category + '</span></li>').fadeIn('slow');
                    }

                }

                $('.subcategory__listItem').click(chooseSubCategory);
        });

        //$('.subcategory__listItem').first().find('.subcategory__name').addClass('item__isHot');
        //$('.subcategory__listItem').click(chooseSubCategory);
       
}

function chooseSubCategory(){
    
    $('.subcategory__listItem--active').removeClass('subcategory__listItem--active');
    $(this).addClass('subcategory__listItem--active');

        
    //delete class hover when it's mobile adaptive
    if ($('.order').width() <= 450){
        $('.subcategory__listItem').removeClass('subcategory__listItem--hover');
    };

    let subCategoryName = $(this).find('.subcategory__name').text();

        $('input[name="category"]').val(subCategoryName);

        //smooth transition to a submit button
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 800);
}

$('.form__buttonCategory').on('click', function(){
    
    let subcategoryValue = $('input[name="category"]').val();

    if (subcategoryValue === '') {
        event.preventDefault();
        
        if ($('.error__message').length === 0){

            $('<p class="error__message error__message--active slider__errorMessage">Choose subcategory</p>').insertBefore('.categories__box');
        }
        
        $("html, body").animate( { scrollTop: 0 }, 600);
    }
})
    // -------------------- Step Four -------------------- //
    //Give unique id to slider__cells
    let sliderBottom, difference; // variables to count slider__cell position and card__button--upload

    // show info when question icon is clicked
    $('.info__icon').click(function(){
        $('.info__text').toggleClass('info__text--shown');
    })


    // give id to every slider cell when the page is loading
    $('.slider__cell').each(function(i){
        i++;
        $(this).attr('id', 'sliderCell_' + i);
        
    });


        function orderComments(arr){
            
            //count all the comments of every slider Cell
            let i = 1;

            arr.each(function(){
                //add a number to a comment
                $(this).find('.listItem__number').text(i);
                i++;
            })
        };

        function commentButtonsClick(){
            // Events on listItem__buttons 
            $('.listItem__button').on('click', function(){
                event.preventDefault();

                //Check if it is a refresh button
                if ($(this).hasClass('card__btn--refresh')){
                    $(this).addClass('btn__refresh--active');
                    // smooth removing of a class
                    setTimeout(function(){
                        $('.btn__refresh--active').removeClass('btn__refresh--active')
                    }, 500);

                    // find text that should be deleted
                    let elementToHide = $(this).parent().parent().find('.listItem__text'),
                        inputHiddenToHide = $(this).parent().parent().find('input');
                        arrNameElement = elementToHide.attr('name').split('_'),
                        order_id = arrNameElement[1],
                        comment_id = arrNameElement[2],
                        status = 'Substitute';

                    elementToHide.hide('slow',function(){
                        elementToHide.remove(); // delete the text
                        inputHiddenToHide.remove();
                    }); 


                    //ajax on a button to add span with new comment text
                    $.post( "/alter-comment/", { order_id: order_id, comment_id: comment_id, status: status }, function( data ) {
                            let refreshedComment = data;

                            if (refreshedComment === 'No slug for order') {
                                $('.error__message--active').remove();
                                $('<p class="error__message error__message--active" >Please try again or contact us</p>').insertBefore('.slider');
                                $('html, body').animate({
                                    scrollTop: $(".error__message--active").offset().top
                                }, 500);
                            } else {
                                let arrRefreshedComment = refreshedComment.split('__');
                                elementToHide.replaceWith('<span class="listItem__text" name="comment_' + order_id + '_' + arrRefreshedComment[1] + '">' + arrRefreshedComment[0] + '</span><input type="hidden" name="comment_' + order_id + '_' + arrRefreshedComment[1] + '" value="' + refreshedComment + '">');
                            }
                            
                    });
                    
                };

                //Check if it is a delete button
                if ($(this).hasClass('card__btn--delete')){
                    $(this).addClass('btn__delete--active');
                    //smooth removing of a class
                    setTimeout(function(){
                        $('.btn__delete--active').removeClass('btn__delete--active')
                    }, 200);


                    // find parent of span and delete it
                    let listItemComment = $(this).closest('.card__listItem'),
                        elementToDelete = listItemComment.find('.listItem__text'),
                        arrNameElement = elementToDelete.attr('name').split('_'),
                        order_id = arrNameElement[1],
                        comment_id = arrNameElement[2],
                        status = 'Delete';                
                    

                    //ajax on a button to delete text
                    $.post( "/alter-comment/", { order_id: order_id, comment_id: comment_id, status: status }, function( data ) {               
                        
                        listItemComment.hide('slow', function(){
                            listItemComment.remove(); // remove the comment
                            let arrListItems = $('.slider__cell--visible').find('.card__listItem');
                            
                            orderComments(arrListItems); //reorder Comments
                             if ($('.order').find('.card__comment--upload').length === 0){
                                $('<button class="card__comment--upload">Add a comment</button>').insertAfter($('.slider'));
                                
                                // sliderBottom = $('.slider__cell--visible').offset().top +  $('.slider__cell--visible').height();
                                // difference = $('.card__comment--upload').offset().top - sliderBottom;
                                // console.log(difference);
                                setCellsHeight();
                                $('.card__comment--upload').click(addNewComments);
                            }
                            //addCommentButton(); // show available comments number and add button

                            commentsCounter--;
                            commentsToAdd++;

                            if (commentsToAdd > 0) {
                                $('.comments__btnSubmit').prop('disabled', true);
                            }

                            if ($('.order__details').length === 0){
                                $('.order__info').append('<span class="order__details">Available to add: <span class="order__detailsComments"><b class="numberOfComments">'+ commentsToAdd +'</b> comment(s)</span></span>')
                            } else {
                                $('.numberOfComments').text(commentsToAdd);
                            }
                            
                        });
                    });

                     
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
                    let textToEdit = elementToEdit.text(); // get a text from span that will be edited
                    let elementToEditName = elementToEdit.attr('name');            

                    //create input instead of the span with the text
                    let inputToEdit = '<input class="listItem__input input__changeText" name="' + elementToEditName + '" value="' + textToEdit + '">' + 
                    '<button class="listItem__button--submit button__changeText">Submit</button>';
                    elementToEdit.replaceWith(inputToEdit);
                    // delete listItem__buttons
                    $(this).parent().hide("slow");
                    $('.input__changeText').keyup(limitSymbols)
                    $('.button__changeText').click(editComment);
                };

            });
        }

        commentButtonsClick();

        function limitSymbols(){
            let textLength = $(this).val().length;

            if (textLength > 300) {
               $('.button__changeText').prop('disabled', true).css('background', '#9E9E9E');
               if ($('.slider__errorMessage').length === 0) {
                    $('<p class="error__message error__message--active slider__errorMessage">Your comment is too long. Only 300 symbols are allowed</p>').insertBefore('.slider');
                    $("html, body").animate( { scrollTop: 0 }, 600);
               }
               
            } else {
                $('.button__changeText').prop('disabled', false).css('background', '#D81B60');
                $('.slider__errorMessage').remove();
            }
        }


        //event on listItem__button--submit
        function editComment(){
            event.preventDefault();

                //find the input
                let input = $(this).parent().find('.listItem__input'),
                    inputHiddenToDelete = $(this).parent().find('input[type=hidden]'),
                    buttonSubmitHide = $(this),
                    listItem = $(this).parent();
                let arrNameElement = input.attr('name').split('_'),
                    order_id = arrNameElement[1],
                    comment_id = arrNameElement[2],
                    status = 'Edit',
                    comment_text = input.val(); // get input's value

                //console.log('comment_text length', comment_text.length);

                // if (comment_text.length > 300) {
                   
                //     comment_text = comment_text.substr(0, 300);
                    
                // }
             

                $.post( "/alter-comment/", { order_id: order_id, comment_id: comment_id, status: status, comment_text: comment_text }, function( data ) {
  
                    if (data === 'OK'){
                        //hide submit button and show listItem__buttons
                        
                        inputHiddenToDelete.remove();
                        buttonSubmitHide.hide("fast",function(){
                            buttonSubmitHide.remove();
                        });
                        input.replaceWith('<span class="listItem__text" name="comment_'+ order_id + '_'+ comment_id + '">' + comment_text + '</span><input type="hidden" name="comment_' + order_id + '_' + comment_id + '" value="' + comment_text + '">');
                        listItem.find('.listItem__buttons').show('fast');
                        setCellsHeight();

                    } else {
                         $('.error__message--active').remove();
                        $('<p class="error__message error__message--active" >Please try again or contact us</p>').insertBefore('.slider');
                                $('html, body').animate({
                                    scrollTop: $(".error__message--active").offset().top
                                }, 500);
                    }
                }) 
        }

        function addNewComments(){
            event.preventDefault();
            //let elBottom = $(".slider__cell--visible").offset().top + $(".slider__cell--visible").height();
            //find the input
            let slideListItemText = $('.slider__cell--visible').find('.listItem__text');
            let slideListItemTextName = slideListItemText.attr('name').split('_')
            let order_id = slideListItemTextName[1];


            //ajax on a button to delete text
            $.post( "/add-comment/", { order_id: order_id }, function( data ) {
                    if (data != "Error"){
                        let comment = data.split('|'),
                            comment_text = comment[0],
                            comment_id = comment[1];

                        $('.slider__cell--visible').find('.card__list').append('<li class="card__listItem">' +
                                                '<span class="listItem__number"></span>' +
                                                '<span name="comment_' + order_id + '_' + comment_id + '" class="listItem__text">' + comment_text + '</span>' +
                                                '<input name="comment_' + order_id + '_' + comment_id + '" type="hidden" value="'+ comment_text+ '">'+
                                                '<div class="listItem__buttons">' +
                                                    '<select class="listItem__button card__btn--changeSex btn__sexFemale"  data-order={{c.order.pk}} data-comment="{{comment.pk}}">' +
                                                    '<option class="btn__sexMale btn__sex"  value="male">M</option>' + 
                                                    '<option class="btn__sexFemale btn__sex" value="female"  selected="selected">W</option>' +
                                                    '</select>' +
                                                    '<button class="listItem__button card__btn--edit"></button>' +
                                                    '<button class="listItem__button card__btn--refresh"></button>' +
                                                    '<button class="listItem__button card__btn--delete"></button>' +
                                                '</div>' +
                                            '</li>');


                        $('.card__btn--changeSex').on('change', function(){
                                let sex = $(this).find('option:selected').val();
                                setAccountsSex($(this), sex);
                        })

                        $('.listItem__button').prop("onclick", null).off("click");
                        commentButtonsClick();
                            
                            i = 1;
                            //reorder comments
                            $('.slider__cell--visible').find('.card__listItem').each(function(){
                                //add a number to a comment
                                $(this).find('.listItem__number').text(i);
                                i++;
                            })


                            //$('.numberOfComments').text(commentsPackage - $('.card__listItem').length); // get how many comments are left

                            commentsToAdd--;
                            commentsCounter++;

                            //let diffElem = difference;

                            if ( commentsToAdd === 0){
                               $('.card__comment--upload').fadeOut('fast', function(){
                                    $('.card__comment--upload').remove();
                               })
                               $(".order__details").remove();
                               $('.comments__btnSubmit').prop('disabled', false);
                               setCellsHeight();
                            } else {
                                $('.numberOfComments').text(commentsToAdd);
                                // let calcElemsDiff = $(".card__comment--upload").offset().top - ($(".slider__cell--visible").offset().top + $(".slider__cell--visible").height());
                                // if (calcElemsDiff < diffElem) {
                                //     $(".card__comment--upload").css('margin-top', 30 + diffElem - calcElemsDiff + 'px');
                                // }
                                setCellsHeight();
                            }

                        }
                        
                })
        }

    
    //set gender color on load

    $('.card__btn--changeSex').each(function(){
        let gender = $(this).find('option:selected').val();

        if (gender == 'female'){
            $(this).css('color', '#D81B60');
        } else {
            $(this).css('color', '#21B4B7');
        }
        
    });


    function changeClasses(gender, elem){
         if ( gender == 'male'){
            elem.removeClass('btn__sexFemale').addClass('btn__sexMale').css('color', '#21B4B7');
        } else {
            elem.removeClass('btn__sexMale').addClass('btn__sexFemale').css('color', '#D81B60');
        }
    }


    function setAccountsSex(elem, gender){
        let chosenGender = gender;
        let orderId = $('.post__imageItem--chosen').attr('data-order');
        let el = elem;

        if (elem === 'mainSelect'){
            let selectedOption = 'option[value=' + chosenGender + ']';

            $('.card__btn--changeSex').each(function(){
                
                if ($(this).attr('data-order') == orderId){
                    
                    $(this).find('[selected="selected"]').prop('selected', false);
                    $(this).find(selectedOption).prop('selected', true);
                   
                   changeClasses(chosenGender, $(this));
                }

                
            });


            sendAccountsSex('mainSelect',orderId, chosenGender);

            $('html, body').animate({
                    scrollTop: $(".card__list").offset().top
                }, 500);

        } else {
            let commentId = elem.attr('data-comment');

            changeClasses(chosenGender, elem);

            sendAccountsSex('subSelect',orderId, chosenGender, commentId)
        }
        
    }



    function sendAccountsSex(select,order__id, sex, comment__id = ''){
        let order_id = order__id,
            gender = sex,
            comment_id = comment__id,
            selectElem = select,
            args;

        let elem;

        gender = gender.slice(0, 1);

        if (comment_id.length > 0){
            args = { order_id: order_id, gender: gender, comment_id: comment_id}
        } else {
            args = { order_id: order_id, gender: gender};
            let str = ''
        }


        $.post( "/set-gender/", args , function(data){

        })

    }


    // set attribute gender on chosen image on load
    $('.post__imageItem').attr('data-gender', 'female');

    $('.sex__dropdown').on('change', function(){
        let sex =  $(this).find('option:selected').val();
        $('.post__imageItem--chosen').attr('data-gender', sex);
        
        setAccountsSex('mainSelect', sex)
    })

    $('.card__btn--changeSex').on('change', function(){

        let sex = $(this).find('option:selected').val();
        console.log('i am clicked')
        setAccountsSex($(this), sex);
    })

    // -------------------- Extra Step Likes -------------------- //

    $('.btn__close').click(function(){
        $('.info__text').removeClass('info__text--shown');
        
    })

    // get extra number of likes/views and put in span  
    $('.extra__number').text($('.extra__value').val());

    function sendExtraService(elem, serviceStatus, serviceName, serviceType){

        if (serviceStatus === 'undefined') {
            $('.toggle__btn--yes').attr('data-isAdded', 'false');
            $('.toggle__btn--no').attr('data-isAdded', 'true');

            if (elem.hasClass('toggle__btn--yes')){
                serviceStatus = 'false';
            }

            if (elem.hasClass('toggle__btn--no')){
                $('.info__text').addClass('info__text--shown')
            }

            $('.likesBtn__submit--enable').prop('disabled', false);
        }


        if (serviceStatus === 'true'){

            $.post( "/remove-optional-service/", { service: serviceName, service_type: serviceType}, function(data){

                let str = data.split('_');

                if (serviceType === 'optional') {
                    $('.toggler').removeClass('toggler--yes toggler--no');
                    $('.toggler').addClass('toggler--no');
                    elem.prop('disabled', true)
                    $('.toggle__btn--yes').prop('disabled', false)
                    let optionalServiceText = $('.likes__number').text('Add extra ' + str[1] + ' ' + serviceName + ' with ' + str[2] + '% discount for just $' + str[0] );
                } else {
                    elem.attr('data-isAdded', false);
                }

                $('.info__text').addClass('info__text--shown')
                
            })
            
        } else if ( serviceStatus === 'false' ) {
          
            $.post( "/add-optional-service/", { service: serviceName, service_type: serviceType}, function(data){
                
                let str = data.split('_');

                if (serviceType === 'optional') {
                    $('.toggler').removeClass('toggler--yes toggler--no');
                    $('.toggler').addClass('toggler--yes');
                    elem.prop('disabled', true);
                    $('.toggle__btn--no').prop('disabled', false)
                    let optionalServiceText = $('.likes__number').text('Extra ' + str[1] + ' ' + serviceName + ' for just $' + str[0] + ' have been added (' + str[2] + ' ' + serviceName + ' per post)');
                } else {
                    elem.attr('data-isAdded', true);
                }

                $('.info__text').removeClass('info__text--shown')
                
                
            })
            
        } else {
            $('.toggler').addClass('toggler--no');
            elem.prop('disabled', true)
            $('.toggle__btn--yes').prop('disabled', false)
        }

        
        // $('.likesBtn__submit--enable').on('submit', function(){
        //     if (($('.toggle__btn--yes').attr('data-isAdded') === 'undefined')){
        //         event.preventDefault
        //     }
        // })
        

        // if (serviceStatus === 'true' ){

        //     $.post( "/remove-optional-service/", { service: serviceName, service_type: serviceType}, function(data){
                
                
        //         let str = data.split('_');

        //         if (serviceType === 'optional') {
        //             $('.serviceBtn__addMore').addClass('likesBtn__addMore--animated');
        //             $('.serviceBtn__addMore').children().text('Add More ' + serviceName);
        //             let optionalServiceText = $('.likes__number').text('Add extra ' + str[1] + ' ' + serviceName + ' with ' + str[2] + '% discount for just $' + str[0] );
        //         }
        //     })
        //     elem.attr('data-isAdded', false);
        // } else {
          
        //     $.post( "/add-optional-service/", { service: serviceName, service_type: serviceType}, function(data){
                
                
        //         let str = data.split('_');

        //         if (serviceType === 'optional') {
        //             $('.serviceBtn__addMore').removeClass('likesBtn__addMore--animated');
        //             $('.serviceBtn__addMore').children().text('Remove');
        //             let optionalServiceText = $('.likes__number').text('Extra ' + str[1] + ' ' + serviceName + ' for just $' + str[0] + ' have been added (' + str[2] + ' ' + serviceName + ' per post)');
        //         }
                
        //     })
        //     elem.attr('data-isAdded', true);
        // }

    }

    if ($('.toggle__btn--yes').attr('data-isAdded') != 'undefined'){
        $('.likesBtn__submit--enable').prop('disabled', false);
    } else {
        $('.likesBtn__submit--enable').prop('disabled', true);
    }

    //$('.likesBtn__submit--enable').prop('disabled', true);
        

    $('.checkbox').click(function(){
        $(this).toggleClass('checkbox--clicked');
        let serviceStatus = $(this).attr('data-isAdded'),
            serviceName = $(this).attr('data-service'),
            serviceType = $(this).attr('data-type'),
            element = $(this),
            attr = $(this).attr('data-business');
        if (typeof attr == typeof undefined || attr == false) {
            sendExtraService(element, serviceStatus, serviceName, serviceType);
        }
        
    })

    // $('.serviceBtn__addMore').click(function(){
    //     let serviceStatus = $(this).attr('data-isAdded'),
    //         serviceName = $(this).attr('data-service'),
    //         serviceType = $(this).attr('data-type'),
    //         element = $(this);
    //     sendExtraService(element, serviceStatus, serviceName, serviceType);
    // })

    $('.toggle__btn').click(function(){
        let serviceStatus = $(this).attr('data-isAdded'),
            serviceName = $(this).attr('data-service'),
            serviceType = $(this).attr('data-type'),
            element = $(this);
        sendExtraService(element, serviceStatus, serviceName, serviceType);
    })

    // -------------------- Step Five -------------------- //



    // event on PayPal checkbox
    $('input[data-business="true"]').click(function(){

        if($(this).hasClass('checkbox--clicked')){
            $('input[name="is_business"]').val(1);
        } else {
            $('input[name="is_business"]').val(0);
        }
    })


    // close Modal Window
    $('.close').on('click', function(){
         $('.modal').css('display', 'none');
    });
    //StepFive -- checkOutPage
    //Give unique id to images and commentsBoxes
    $('.post__imageItem').each(function(i){
        i++;
        $(this).attr('id', i);
    });

    
    let arrSumHeight = [];
    // give unique id to listElements
    $('.postItem__commentsList').each(function(i){
        i++;
        $(this).attr('id', 'post_' + i);
        // an array of comments
        let sumHeight = 0;
        let numberOfComments = $(this).children();
        let slicedCommentsList = numberOfComments.slice(0, 5);
        slicedCommentsList.css('display', 'flex');
        
        slicedCommentsList.each(function(){
            sumHeight += $(this).height() + 20;
        });

        arrSumHeight.push(sumHeight);
        //Display Show More Button if there are more than 5 listElements
        if ($(numberOfComments).length > 5) {
            let restOfComments = parseInt($(numberOfComments).length) - 5;
            $(this).append('<span class="postItem__textNumber">and ' + restOfComments +' comment(s) more</span>');
        };

    });

    let maxArrSumHeight = Math.max.apply(Math,arrSumHeight);
    if ($('.postItem__textNumber')) {
        $('.order__postsCommentsBox').css('height', maxArrSumHeight + 30 + 'px');
    } else {
        $('.order__postsCommentsBox').css('height', maxArrSumHeight + 'px');
    }


    function getPeriodTime(order_id, className){

        $.post( "/get-period/", { order_id: order_id }, function( data ) { 
            let period = data; 

            if (period === 'No slug for order') {
                 $('.error__message--active').remove();
                $('<p class="error__message error__message--active" >Please try again or contact us</p>').insertBefore('.slider');
                                $('html, body').animate({
                                    scrollTop: $(".error__message--active").offset().top
                                }, 500);
            } else {
                $(className).find('option:selected').prop( "selected", false );

                $(className).each(function(){
                    
                    if ($(this).val() === period) {

                        $(this).prop( "selected", true );
                    }
                })
            }          
            
        });
    }

    $('.post__timePeriod--chosen').each(function(){
        let orderNum = $(this).children('.post__imageItem').attr('data-order')
        getPeriodTime(orderNum, '.option__menuItem');
    });

    $('.automaticPost__timePeriod--chosen').each(function(){
        let automaticOrderNum = $(this).attr('data-order');
        getPeriodTime(automaticOrderNum, '.period__selectItem');
    });
    

    //set small Post image
    $('.post--small').attr('src', $('.post__imageItem--chosen').attr('src'));

    // give 1st elem of arr extra class
    let firstElem = $('.post__imageItemWrapper').first();


    if (firstElem.children().height() >= 70 ) {
        firstElem.addClass('border--extra')
    }

     // Show CommentsList in accordance with the chosen image
    $('.post__imageItemWrapper').click(function(){
        let prevElem = $('.post__imageItem--chosen');
        prevElem.parent().removeClass('border--extra')
        prevElem.removeClass('post__imageItem--chosen');
        // Define a new picture
        
        if ($(this).children().height() >= 70){
            $(this).addClass('border--extra');
        }
        $(this).children().addClass('post__imageItem--chosen');
        let idImage = $(this).children().attr('id');
        $('.postItem__commentsList--visible').removeClass('postItem__commentsList--visible');
        $('.slider__cell--visible').removeClass('slider__cell--visible');
        // show needed CommentsList
        $('#post_' + idImage).addClass('postItem__commentsList--visible');
        $('#sliderCell_' + idImage).addClass('slider__cell--visible');
        $('.slider').siblings('.categoryBtn__upload').remove();
        $('.slider').siblings('.categoryBtn__uploadText').remove();
        let postSmallSrc = $(this).children().attr('src')
        $('.post--small').attr('src', postSmallSrc);

        //change sex select
        let gender = $(this).children().attr('data-gender');
        let option = 'option[value=' + gender + ']';
        $('.sex__dropdown').find('[selected="selected"]').prop('selected', false);
        $('.sex__dropdown').find(option).prop('selected', true);


        //get order-id to get time period for options
        if($(this).hasClass('post__timePeriod')){
            let orderId = $(this).children('.post__imageItem').attr('data-order');

            if ($(this).hasClass('postBox')) {
                getPeriodTime(orderId, '.dropdown__selectItem');
            } else {
                getPeriodTime(orderId, '.option__menuItem');
            }
        }

        
    });


    // sending ajax when time period changed
    function sendPeriodTime(elem){

        let commentsTimePeriod = elem.find('option:selected').val(),
            orderId = $('.post__imageItem--chosen').attr('data-order');


        $.post( "/alter-period/", { order_id: orderId, period: commentsTimePeriod }, function( data ) {                
            let text = data;
            if (text === 'No slug for order') {
                 $('.error__message--active').remove();
                 $('<p class="error__message error__message--active" >Please try again or contact us</p>').insertBefore('.slider');
                                $('html, body').animate({
                                    scrollTop: $(".error__message--active").offset().top
                                }, 500);
            }

        });

    }


    // sending ajax when comments time period is set
    $('#time_period').on('change', function(){
        sendPeriodTime($(this))
    })



    //paymentMethod();

    $('.payment__listItem').click(function(){
        $(".payment__listItem--active").removeClass('payment__listItem--active').children().removeClass('payment__listItem--chosen');
        $(this).addClass('payment__listItem--active').children().addClass('payment__listItem--chosen');
        //paymentMethod();
    });


    $('.payment__button').click(paymentMethod);

    // function createForm(){
    //     let paymentMethod = $('.payment__listItem--active').attr('data-payment');
    //     let modal = $('#' + paymentMethod + 'Modal').find('.modal-content');
    //     let form = $("<form></form>"),
    //         inputIsBusiness = $("<input>"),
    //         inputEmail = $("<input>"),
    //         button = $("<button></button>"),
    //         buttonText = $("<span></span>");

    //     button.addClass('form__button--submit btn__posts--submit checkout__btnBuy');
    //     buttonText.addClass("button__text");
    //     buttonText.text('buy');
    //     button.append(buttonText);

    //     inputIsBusiness.attr('name', 'is_business');
    //     inputIsBusiness.attr('type', 'hidden');
    //     inputIsBusiness.val(0);

    //     inputEmail.attr('type', 'email');
    //     inputEmail.addClass('order__checkOutInput order__cryptoEmail');

    //     if (paymentMethod === 'paypal') {
    //         form.attr('method', 'GET');
    //         form.attr('action', '/payment/paypal/');
    //         form.addClass('order__form paypal__form');
    //         form.append(inputIsBusiness);
    //     } else {
    //         form.attr('method', 'POST');
    //         form.attr('action', '/payment/crypto/');
    //         form.addClass('order__form payment__form crypto__form');
    //         form.append(inputEmail);
    //     }

    //     $('option:selected').each(function(){
    //         let optionValue = $(this).val(),
    //             optionName = $(this).attr('name');
    //         let hiddenInput = $('<input>');
    //         hiddenInput.attr('type', 'hidden');
    //         hiddenInput.attr('name', optionName);
    //         hiddenInput.attr('value', optionValue);
    //         form.append(hiddenInput);
    //     })

    //     form.append(button);
    //     modal.append(form);

    //     $('#' + paymentMethod + 'Modal').css('display', 'block');
    // }

    function getOptionsValue(){
        //let paymentMethod = $('.payment__listItem--active').attr('data-payment');

        $('option:selected').each(function(){
            let optionValue = $(this).val(),
                optionName = $(this).attr('name');
            let hiddenInput = $('<input>');
            hiddenInput.attr('type', 'hidden');
            hiddenInput.attr('data-option', 'true');
            hiddenInput.attr('name', optionName);
            hiddenInput.attr('value', optionValue);
            $('.options__form').prepend(hiddenInput);
        });

    }

    function paymentMethod(){
        let button = $(this);

        let paymentMethod = $('.payment__listItem--active').attr('data-payment');
        $('.modal').css('display', 'none');

        if (button.hasClass('payment__automaticButton')) {
            $('[data-option="true"]').remove();
            getOptionsValue();
        }
        
        if (paymentMethod === 'paypal') {
            if (button.hasClass('ignore_paypal')){
                window.location.href = '/payment/paypal/?is_business=0';
            } else {
                 $('#' + paymentMethod + 'Modal').css('display', 'block');
            }
        }  else if (paymentMethod === 'debitCard') {
            $('#' + paymentMethod + 'Modal').css('display', 'block')
        }
        else {
            $('#' + paymentMethod + 'Modal').css('display', 'block')
        }

        // $('.payment__form').remove();

        // switch(paymentMethod){
        //     case 'paypal':
        //         paypalCard();
        //         break;
        //     case 'crypto':
        //         cryptoCard();
        //         break;
        //     default:
        //         break;
        // };
    }

    // function paypalCard() {
    //     // $('.likes__checkBox').slideDown();
    //     // let inputCsrf = $('[name="csrfmiddlewaretoken"]').val();
    //     // let paypalForm = '<form method="GET" action="/payment/paypal/" class="order__form payment__form">' +
    //     // '<input type="hidden" name="is_business" value=0>'  +
    //     // '<button class="form__button--submit btn__posts--submit"><span class="button__text">buy</span></button>' +
    //     // '</form>';
    //     // $('.order').append(paypalForm);

    //     let btnWrapper = $('<div></div>')
    //     btnWrapper.addClass('order__form  payment__form');
        
    //     let modalBtn = $('<button></button>');
    //     modalBtn.addClass('form__button--submit');
    //     modalBtn.click(showModalWindow);
        
    //     let btnText = $('<span></span>');
    //     btnText.addClass('button__text');
    //     btnText.text('Buy');
        
    //     modalBtn.append(btnText);
    //     btnWrapper.append(modalBtn);
    //     $('.order').append(btnWrapper);

    // };

    // function yandexCard() {
    //     let yandexForm = '<form class="order__form payment__form" method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">' +
    //         '<input type="hidden" name="receiver" value="410014854291294">' +
    //         '<input type="hidden" name="formcomment" value="SmmKingdom">' +
    //         '<input type="hidden" name="short-dest" value="SmmKingdom">' +
    //         '<input type="hidden" name="label" value="">' +
    //         '<input type="hidden" name="quickpay-form" value="donate">' +
    //         '<input type="hidden" name="targets" value="SmmKingdom">' +
    //         '<input type="hidden" name="sum" value="127" data-type="number">' +
    //         '<input type="hidden" name="need-fio" value="false">' +
    //         '<input type="hidden" name="need-email" value="false">' +
    //         '<input type="hidden" name="need-phone" value="false">' +
    //         '<input type="hidden" name="need-address" value="false">' +
    //         '<input type="hidden" name="paymentType" value="AC">' +
    //         '<button class="form__button--submit btn__posts--submit"><span class="button__text">submit</span></button>' +
    //         '</form>';
    //     $('.order').append(yandexForm);

    // };

    
    // function cryptoCard(){
    //     $('.likes__checkBox').slideUp();
    //     let inputCsrf = $('[name="csrfmiddlewaretoken"]').val();
    //     let cryptoForm = '<form method="GET" action="/payment/crypto/" class="order__form payment__form">' + 
    //     '<button class="form__button--submit btn__posts--submit"><span class="button__text">buy</span></button>' +
    //     '</form>';
    //     $('.order').append(cryptoForm);
    // };


    // align post imahes if there are too many of them in a row
    if ($('.post__imageItem').length > 4 && $('.order').width() < 450){
        $('.order__postsImages').css('justify-content', 'flex-start');
    }

    $('.applyCoupon').click(function(){
        //ajax on coupon code input
        event.preventDefault();
        let promoCode = $('.order__checkOutCoupon').val();
        $('.promo__error').remove();
        if(promoCode === ''){
            $('<span class="error__message error__message--active promo__error" >There is no promocode</span>').insertBefore('.order__checkOutCoupon');
        } else {
            $.post( "/apply-promo/", { promo_code: promoCode}, function( data ) {                
                if (data === 'Not Found') {
                    $('<span class="error__message error__message--active promo__error" >Wrong promocode</span>').insertBefore('.order__checkOutCoupon');
                } 
                else if (data === 'Code was used') {
                    $('<span class="error__message error__message--active promo__error" >Promocode was used</span>').insertBefore('.order__checkOutCoupon');
                } 
                else {
                    
                    let price = (parseFloat(data)).toFixed(2);
                    $('.order__package--price').text(price).attr('id','total__price').css('color', '#FF5722');
                    $('.order__package--price').prepend('<span class="order__package--priceCurrency">&#36;</span>');
                    //smooth transition to the price
                    $("html, body").animate( { scrollTop: 0 }, 600);
                }
            });
        }
        
    })


    //automatic Packages

    // // sending ajax when comments time period is set
    // function sendPeriodTime(elem){


    //     let commentsTimePeriod = elem.find('option:selected').val(),
    //         orderId = $('.post__imageItem--chosen').attr('data-order');
    //     console.log(commentsTimePeriod, orderId)

    //     $.post( "/alter-period/", { order_id: orderId, period: commentsTimePeriod }, function( data ) {                
    //         console.log(data)
    //     });

    // }

    $('#automaticPost__timePeriod').on('change', function(){
         sendPeriodTime($(this))
    })


     $(".automatic__option__menu").each(function(){
        $(this).on('change', function(){
            $(this).find('[selected="selected"]').removeAttr('selected');
            $(this).find('option:selected').attr('selected', 'selected');
            setPriceForElem($(this));
        })
     })

     function getTotalPrice(){
        let totalPrice = 0,
            sale = 0;

        $('option:selected').each(function(){

            if (!$(this).hasClass('option__post')){
               totalPrice += parseFloat($(this).attr('data-price'));   
            } else {
                sale = parseFloat($(this).attr('data-price'));
                numberOfPosts = parseInt($(this).attr('value'))
            }
        })

        totalPrice *= numberOfPosts;

        $('.priceBefore').text(totalPrice.toFixed(2));
        let priceAfter = totalPrice - totalPrice * sale;
        $('.priceAfter').text(priceAfter.toFixed(2));
        let discount = sale * 100;
        $('.discount').text(discount);

    }

    function setPriceForElem(elem){

        let selectedElem = elem.find('[selected="selected"]'),
            price = selectedElem.attr('data-price'),
            dataPriceNumber;

        if (price === 'false') {
            $('.option__addInfo').remove();
        } else {
            elem.siblings().find('.data__priceUnchaged').text(price);

            dataPriceNumber = parseFloat(price) / parseFloat((selectedElem.val()));

            if (dataPriceNumber < 0.1 && dataPriceNumber > 0.01) {
               elem.siblings().find('.data__price').text(dataPriceNumber.toFixed(2))
              } else if ( dataPriceNumber < 0.01){
                elem.siblings().find('.data__price').text(dataPriceNumber.toFixed(3))
              } else {
                elem.siblings().find('.data__price').text(dataPriceNumber.toFixed(1))
              }


            getTotalPrice();
        }   
        
    }



    $('.automatic__option__menu').each(function(){
        setPriceForElem($(this));
    });

    // tracking auto order
    $('.dropdown__selectCategory').on('change', function(){
        let optionLength = $('option:selected').text().length;

        if (optionLength >= 12  && optionLength < 16) {
            $('.dropdown__selectCategory').css('width', '14rem');
        } else if (optionLength >= 16 && optionLength < 19) {
            $('.dropdown__selectCategory').css('width', '18rem');
        } else if (optionLength >=19 && optionLength < 25) {
            $('.dropdown__selectCategory').css('width', '20rem');
        } else if (optionLength >= 25) {
            $('.dropdown__selectCategory').css('width', '24rem');
        } else if (optionLength <= 12 && optionLength > 5){
            $('.dropdown__selectCategory').css('width', '12rem');
        } else {
            $('.dropdown__selectCategory').css('width', '9rem');
        }

        $('.categoryBtn__uploadText').remove();
        $('.categoryBtn__upload').remove();


        if ($('.slider__cell--visible').attr('data-active') === 'true'){
            $( "<p class='order__text categoryBtn__uploadText'>You can't change a category on already uploaded post</p>" ).insertBefore($('.automaticPackages__dropdown'));
        } else {
            $( '<p class="order__text categoryBtn__uploadText">After clicking the button a new set of comments will be uploaded for this post</p><button class="categoryBtn__upload">Change comments</button>' ).insertBefore($('.automaticPackages__dropdown'));
        }

       
        $('.categoryBtn__upload').click(sendCategory);
    });


    function sendCategory(){

        let category = $('.dropdown__selectCategory').find('option:selected').text(),
            order_id = $('.slider__cell--visible').attr('data-order');


        $.post( "/renew-with-category/", { order_id: order_id, category: category}, function( data ) {


               var data = JSON.parse(data)

               
               $('.slider__cell--visible').find('.card__listItem').hide().remove();

              

               for (let i = 0; i < data.comments.length; i++){

                  $('.slider__cell--visible').find('.card__list').append('<li class="card__listItem">' +
                        '<span class="listItem__number"></span>' +
                        '<span name="comment_' + data.order + '_' + data.comments[i].id + '" class="listItem__text">' + data.comments[i].text + '</span>' +
                        '<input name="comment_' + data.order + '_' + data.comments[i].id + '" type="hidden" value="'+ data.comments[i].text + '">'+
                        '<div class="listItem__buttons">' +
                        // '<select class="listItem__button card__btn--changeSex btn__sexFemale"  data-order={{c.order.pk}} data-comment="{{comment.pk}}">' + 
                        //     '<option class="btn__sexMale btn__sex"  value="male">M</option>' + 
                        //     '<option class="btn__sexFemale btn__sex" value="female"  selected="selected">W</option>' +
                        //     '</select>' +
                            '<button class="listItem__button card__btn--edit"></button>' +
                            '<button class="listItem__button card__btn--refresh"></button>' +
                        '</div>' +
                    '</li>');

               }

                // $('.card__btn--changeSex').on('change', function(){
                //                 let sex = $(this).find('option:selected').val();
                //                 setAccountsSex($(this), sex);
                //         })

                $('.listItem__button').prop("onclick", null).off("click");
                    commentButtonsClick();
                        
                i = 1;
                //reorder comments
                $('.slider__cell--visible').find('.card__listItem').each(function(){
                    //add a number to a comment
                    $(this).find('.listItem__number').text(i);
                    i++;
                });

                setCellsHeight();

                $('.categoryBtn__uploadText').remove();
                $('.categoryBtn__upload').remove();

                $('html, body').animate({
                    scrollTop: $(".card__list").offset().top
                }, 500);

                

        });

    }

});

