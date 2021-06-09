$(window).load(function () {
    // -------------------- Landing -------------------- //

    $('.menu__icon').on('click', function () {
        $(this).addClass('menu__icon--clicked');
        setTimeout(function () {
            $('.menu__icon--clicked').removeClass('menu__icon--clicked')
        }, 200);
        $('.menu__list').toggleClass('menu__list--opened');
        $('.nav-bg').toggleClass('nav-bg--checked');
    });

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

    // change main__button's position depending on mediaqueries
    function changeBtnPosition() {
        $('.main__button').remove();
        if ($('.main').width() > 767) {
            $('.block__text').append('<a href="#packages" class="main__button"><span class="main__button--center">View Our Offers</span></a>');
        } else {
            $('.main').append('<a href="#packages" class="main__button"><span class="main__button--center">View Our Offers</span></a>');
        };
    };

    //on or scroll, detect elements in view
    $(window).on('resize', function () {
        changeBtnPosition();
    });

    //trigger our scroll event on initial load
    $(window).trigger('resize');

    // anchor smooth slide down on menu

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });


    //animation on main imageBlock
    var counter = 200;

    $('.imgMobile__Text').each(function () {
        let element = $(this);

        setTimeout(function (elem) {
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

    console.log($('#rect__likes').text())


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
                else if (animation_box === '.stats__card') {
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
            $(this).addClass('service--chosen service__' + nowBtnName + '--chosen');
            $(this).next('.service__question').addClass('service__question--shown');

            // $('.accordion__${nowBtnName}').addClass('accordion--shown');
            $('.' + nowBtnName + 'Package').addClass('offers__wrapper--shown');

            $([document.documentElement, document.body]).animate({
                scrollTop: $('.offers__wrapper--shown').offset().top
            }, 800);


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

    $(".referral__cardButton").click(function () {
        copyLink();
        $('.referral__cardLink').addClass('referral__cardLink--clicked');
        setTimeout(function () { $('.referral__cardLink').removeClass('referral__cardLink--clicked') }, 800);
    })

    function copyLink() {
        var $temp = $("<input>");
        $("body").append($temp);
        console.log($('#codeToCopy').val())
        $temp.val($('#codeToCopy').val()).select();
        document.execCommand("copy");
        $temp.remove();

    }



    $(".order__btn--copy").on('click', function () {
        copyLink();
        $(".payment__trackingLink").addClass('link__popup');
        $(".button--copy").addClass('btn--scaled ');
        setTimeout(function () {
            $(".payment__trackingLink").removeClass('link__popup');
            $(".button--copy").removeClass('btn--scaled ');

        }, 800);
    })
    //$(".automaticOrder__btn--copy").click(copyLink(".automatic__trackingLink"));


    // $(".referral__cardButton").click(function(){
    //     var $temp = $("<input>");
    //       $("body").append($temp);
    //       $temp.val($('#codeToCopy').text()).select();
    //       document.execCommand("copy");
    //       $temp.remove();
    //       $('.referral__cardLink').addClass('referral__cardLink--clicked');
    //     setTimeout(function(){$('.referral__cardLink').removeClass('referral__cardLink--clicked')}, 800);
    // })
    // -------------------- BuyProcess -------------------- //
    // -------------------- Tracking -------------------- //
    let progressBars = $('.progressBar--frontInfo');
    progressBars.each(function (index) {
        let progressBarArr = $(this).text().split(' of ');
        done = progressBarArr[0];
        quantity = progressBarArr[1];

        if (done === quantity)
            $(this).text(done + " / " + quantity + " (Completed)")
        else
            $(this).text(done + " / " + quantity + " (In Progress)")

        let completedPercantage = (parseFloat(done) / parseFloat(quantity)) * 100;
        $(this).siblings('.progressBar.progressBar--front').css('width', completedPercantage.toString() + '%');
    })
    // -------------------- Step One -------------------- //
    $('form').on('submit', function () {
        $('.set_usernameBtn').text('');
        $('.set_usernameBtn').addClass('pending--on');

    });

    $('.form__username').on('keyup', function () {
        $("button:disabled").prop("disabled", false);
    })
    // -------------------- Step Two -------------------- //

    $('.getMorePosts').click(function (e) {
        event.preventDefault();

        let dataInfo = $(this).attr('data-info');

        $.ajax({
            url: 'https://igcomment.com/more-posts/',
            type: 'post',
            data: { next_max_id: dataInfo },
            beforeSend: function () {
                $('.gallery__button--text').text('');
                $('.gallery__button--text').addClass('pending--on');
            },
            success: function (data) {
                let arr = data;
                let newArr = arr.split(';');
                let newDataInfo = newArr[1];
                let links = newArr[0].split(',');

                for (let i = 0; i < links.length; i++) {
                    let url = links[i];
                    $('.gallery').append('<div class="gallery__cell"><img src="' + url + 'media?size=t' + '" class="post__image"></div>');
                };

                $('.getMorePosts').attr('data-info', newDataInfo);
            },
            complete: function () {
                $('.gallery__button--text').removeClass('pending--on');
                $('.gallery__button--text').text('Load More');
            }
        });
    })

    // -------------------- Step Four -------------------- //
    //Give unique id to slider__cells

    $('.slider__cell').each(function (i) {
        i++;
        $(this).attr('id', 'sliderCell_' + i);

    });

    let arrCellsHeight = [];
    $('.slider__cell').each(function () {
        arrCellsHeight.push($(this).height());
    })

    let cellMaxHeight = Math.max.apply(Math, arrCellsHeight);
    $('.slider').css('height', cellMaxHeight)

    function orderComments(arr) {

        //count all the comments of every slider Cell
        let i = 1;

        arr.each(function () {
            //add a number to a comment
            $(this).find('.listItem__number').text(i);
            i++;
        })
    };

    function commentButtonsClick() {
        // Events on listItem__buttons 
        $('.listItem__button').on('click', function () {
            event.preventDefault();

            //Check if it is a refresh button
            if ($(this).hasClass('card__btn--refresh')) {
                $(this).addClass('btn__refresh--active');
                // smooth removing of a class
                setTimeout(function () {
                    $('.btn__refresh--active').removeClass('btn__refresh--active')
                }, 500);

                // find text that should be deleted
                let elementToHide = $(this).parent().parent().find('.listItem__text'),
                    inputHiddenToHide = $(this).parent().parent().find('input');
                arrNameElement = elementToHide.attr('name').split('_'),
                    order_id = arrNameElement[1],
                    comment_id = arrNameElement[2],
                    status = 'Substitute';

                elementToHide.hide('slow', function () {
                    elementToHide.remove(); // delete the text
                    inputHiddenToHide.remove();
                });

                //ajax on a button to add span with new comment text
                $.post("https://igcomment.com/alter-comment/", { order_id: order_id, comment_id: comment_id, status: status }, function (data) {
                    let refreshedComment = data;
                    let arrRefreshedComment = refreshedComment.split('__');

                    elementToHide.replaceWith('<span class="listItem__text" name="comment_' + order_id + '_' + arrRefreshedComment[1] + '">' + arrRefreshedComment[0] + '</span><input type="hidden" name="comment_' + order_id + '_' + comment_id + '" value="' + refreshedComment + '">');

                });

            };

            //Check if it is a delete button
            if ($(this).hasClass('card__btn--delete')) {
                $(this).addClass('btn__delete--active');
                //smooth removing of a class
                setTimeout(function () {
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
                $.post("https://igcomment.com/alter-comment/", { order_id: order_id, comment_id: comment_id, status: status }, function (data) {

                    listItemComment.hide('slow', function () {
                        listItemComment.remove(); // remove the comment
                        let arrListItems = $('.slider__cell--visible').find('.card__listItem');

                        orderComments(arrListItems); //reorder Comments
                        if ($('.order').find('.card__comment--upload').length === 0) {
                            $('<button class="card__comment--upload">Add a comment</button>').insertAfter($('.slider'));
                            $('.card__comment--upload').click(addNewComments)
                        }
                        //addCommentButton(); // show available comments number and add button

                        commentsCounter--;
                        commentsToAdd++;

                        if (commentsToAdd > 0) {
                            $('.comments__btnSubmit').prop('disabled', true);
                        }

                        if ($('.order__details').length === 0) {
                            $('.order__info').append('<span class="order__details">Available to add: <span class="order__detailsComments"><b class="numberOfComments">' + commentsToAdd + '</b> comment(s)</span></span>')
                        } else {
                            $('.numberOfComments').text(commentsToAdd);
                        }

                    });
                });


            };

            //Check if it is a edit button
            if ($(this).hasClass('card__btn--edit')) {

                $(this).addClass('btn__edit--active');
                // smooth removing of a class
                setTimeout(function () {
                    $('.btn__edit--active').removeClass('btn__edit--active')
                }, 300);

                // find text that should be edited    
                let elementToEdit = $(this).parent().parent().find('.listItem__text');
                let textToEdit = elementToEdit.text(); // get a text from span that will be edited
                let elementToEditName = elementToEdit.attr('name');

                //create input instead of the span with the text
                let inputToEdit = '<input class="listItem__input" name="' + elementToEditName + '" value="' + textToEdit + '">' +
                    '<button class="listItem__button--submit">Submit</button>';
                elementToEdit.replaceWith(inputToEdit);
                // delete listItem__buttons
                $(this).parent().hide("slow");
            };
        });
    }

    commentButtonsClick();

    function addNewComments() {
        event.preventDefault();
        //find the input
        let slideListItemText = $('.slider__cell--visible').find('.listItem__text');
        let slideListItemTextName = slideListItemText.attr('name').split('_')
        let order_id = slideListItemTextName[1];


        //ajax on a button to delete text
        $.post("https://igcomment.com/add-comment/", { order_id: order_id }, function (data) {
            if (data != "Error") {
                let comment = data.split('|'),
                    comment_text = comment[0],
                    comment_id = comment[1];

                $('.slider__cell--visible').find('.card__list').append('<li class="card__listItem">' +
                    '<span class="listItem__number"></span>' +
                    '<span name="comment_' + order_id + '_' + comment_id + '" class="listItem__text">' + comment_text + '</span>' +
                    '<input name="comment_' + order_id + '_' + comment_id + '" type="hidden" value="' + comment_text + '">' +
                    '<div class="listItem__buttons">' +
                    '<button class="listItem__button card__btn--edit"></button>' +
                    '<button class="listItem__button card__btn--refresh"></button>' +
                    '<button class="listItem__button card__btn--delete"></button>' +
                    '</div>' +
                    '</li>');

                commentButtonsClick();

                i = 1;
                //reorder comments
                $('.slider__cell--visible').find('.card__listItem').each(function () {
                    //add a number to a comment
                    $(this).find('.listItem__number').text(i);
                    i++;
                })


                //$('.numberOfComments').text(commentsPackage - $('.card__listItem').length); // get how many comments are left

                commentsToAdd--;
                commentsCounter++;

                if (commentsToAdd === 0) {
                    $('.card__comment--upload').fadeOut('fast', function () {
                        $('.card__comment--upload').remove();
                    })
                    $(".order__details").remove();
                    $('.comments__btnSubmit').prop('disabled', false);
                } else {
                    $('.numberOfComments').text(commentsToAdd);
                }
            }

        })
    }


    // -------------------- Extra Step Likes -------------------- //

    // let totalLikes = 0;
    // $('.likes__button').click(function(){

    //     if (!$(this).hasClass('likes__button--chosen')){
    //         totalLikes += parseInt($(this).text().slice(0, - 5));
    //     }

    //     if ($(this).siblings('.likes__button').hasClass('likes__button--chosen')) {
    //         totalLikes -= parseInt($(this).siblings('.likes__button--chosen').text().slice(0, - 5));
    //     }

    //     $(this).siblings('.likes__button--chosen').removeClass('likes__button--chosen');
    //     $(this).addClass('likes__button--chosen');

    //     $('.likes__number').text('+ ' + totalLikes + ' likes for only $YY (-Z%)' );
    // })

    $('.checkbox').click(function () {
        $(this).toggleClass('checkbox--clicked');
    })
    // -------------------- Step Five -------------------- //

    //StepFive -- checkOutPage
    //Give unique id to images and commentsBoxes
    $('.post__imageItem').each(function (i) {
        i++;
        $(this).attr('id', i);
    });


    let arrSumHeight = [];
    // give unique id to listElements
    $('.postItem__commentsList').each(function (i) {
        i++;
        $(this).attr('id', 'post_' + i);
        // an array of comments
        let sumHeight = 0;
        let numberOfComments = $(this).children();
        let slicedCommentsList = numberOfComments.slice(0, 5);
        slicedCommentsList.css('display', 'flex');

        slicedCommentsList.each(function () {
            sumHeight += $(this).height() + 20;
        });

        arrSumHeight.push(sumHeight);
        //Display Show More Button if there are more than 5 listElements
        if ($(numberOfComments).length > 5) {
            let restOfComments = parseInt($(numberOfComments).length) - 5;
            $(this).append('<span class="postItem__textNumber">and ' + restOfComments + ' comment(s) more</span>');
        };

    });

    let maxArrSumHeight = Math.max.apply(Math, arrSumHeight);
    if ($('.postItem__textNumber')) {
        $('.order__postsCommentsBox').css('height', maxArrSumHeight + 30 + 'px');
    } else {
        $('.order__postsCommentsBox').css('height', maxArrSumHeight + 'px');
    }

    // Show CommentsList in accordance with the chosen image
    $('.post__imageItemWrapper').click(function () {
        $('.post__imageItem--chosen').removeClass('post__imageItem--chosen');
        // Define a new picture
        $(this).children().addClass('post__imageItem--chosen');
        let idImage = $(this).children().attr('id');
        $('.postItem__commentsList--visible').removeClass('postItem__commentsList--visible');
        $('.slider__cell--visible').removeClass('slider__cell--visible');
        // show needed CommentsList
        $('#post_' + idImage).addClass('postItem__commentsList--visible');
        $('#sliderCell_' + idImage).addClass('slider__cell--visible');
    });

    paymentMethod();

    $('.payment__listItem').click(function () {
        $(".payment__listItem--active").removeClass('payment__listItem--active').children().removeClass('payment__listItem--chosen');
        $(this).addClass('payment__listItem--active').children().addClass('payment__listItem--chosen');
        paymentMethod();
    });

    function paymentMethod() {
        let paymentMethod = $('.payment__listItem--active').attr('data-payment');
        $('.payment__form').remove();

        switch (paymentMethod) {
            case 'paypal':
                paypalCard();
                break;
            case 'crypto':
                cryptoCard();
                break;
            default:
                break;
        };
    }

    function paypalCard() {
        console.log('paypal')
        $('.likes__checkBox').css('display', 'flex');
        let inputCsrf = $('[name="csrfmiddlewaretoken"]').val();
        let paypalForm = '<form method="GET" action="/payment/paypal/" class="order__form payment__form">' +
            '<button class="form__button--submit btn__posts--submit"><span class="button__text">submit</span></button>' +
            '</form>';
        $('.order').append(paypalForm);
    };

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


    function cryptoCard() {
        console.log('crypto')
        $('.likes__checkBox').css('display', 'none');
        let inputCsrf = $('[name="csrfmiddlewaretoken"]').val();
        let cryptoForm = '<form method="GET" action="/payment/crypto/" class="order__form payment__form">' +
            '<button class="form__button--submit btn__posts--submit"><span class="button__text">submit</span></button>' +
            '</form>';
        $('.order').append(cryptoForm);
    };

    if ($('.post__imageItem').length > 4 && $('.order').width() < 450) {
        $('.order__postsImages').css('justify-content', 'flex-start');
    }

    $('.applyCoupon').click(function () {
        //ajax on coupon code input
        event.preventDefault();
        let promoCode = $('.order__checkOutInput').val();
        $('.promo__error').remove();

        $.post("/apply-promo/", { promo_code: promoCode }, function (data) {
            if (data === 'Not Found') {
                $('<span class="error__message error__message--active promo__error" >Wrong promocode</span>').insertBefore('.order__checkOutInput');
            }
            else if (data === 'Code was used') {
                $('<span class="error__message error__message--active promo__error" >Promocode was used</span>').insertBefore('.order__checkOutInput');
            }
            else {

                let price = (parseFloat(data)).toFixed(2);
                $('.order__package--price').text(price).attr('id', 'total__price').css('color', '#FF5722');
                $('.order__package--price').prepend('<span class="order__package--priceCurrency">&#36;</span>');
                //smooth transition to the price
                $("html, body").animate({ scrollTop: 0 }, 800);
            }
        });
    })

});



// -------------------- Step two -------------------- //
let maxPosts = parseInt($('#max_posts').val()), // get the number from server
    chosenPosts = 0;

//choose preferred image
$(document).on('click', '.gallery__cell', function () {

    // add border to  a chosen post
    if ($(this).hasClass('post__image--chosen')) {
        $("button:disabled").prop("disabled", false);
        $(this).removeClass('post__image--chosen');

        let srcToDelete = $(this).find('.post__image').attr('src');
        srcToDelete = srcToDelete.substring(0, srcToDelete.length - 12) // cut the ending of the link

        //delete hidden input with the src of a post
        $('.itemStorage').each(function () {
            if ($(this).val() === srcToDelete) {
                $(this).remove();
            }
        });

        let inputCounter = 0;
        $('.itemStorage').each(function () {
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
        }).appendTo('.order__form').val(src.substring(0, src.length - 12));

        chosenPosts++;
    }

    // check if number of chosen posts is bigger than maxPosts
    if (chosenPosts > maxPosts) {
        $('.error__message').addClass('error__message--active');
        //disable submit button
        $(".form__button--submit").prop("disabled", true);
    } else {
        $('.error__message').removeClass('error__message--active');
        //enable submit button
        $(".form__button--submit").prop("disabled", false);
    }

    // check if none of the posts were chosen
    $(".form__button--submit").on('click', function () {
        if (chosenPosts === 0) {
            event.preventDefault();
            $('.error__message').addClass('error__message--active').text('You haven\'t chosen anything. Please, choose a post');
            $(".form__button--submit").prop("disabled", true);
        }
    })
});



// -------------------- Step three -------------------- //
// event on back button
$(document).on('click', '.category__btn--back', function () {
    //remove back button
    $(this).remove();
    $('.subcategories__box').fadeOut('slow');
    // create buttons with categories again and prepend them
    let categoriesBox = '<button class="category__btn  ctgL">Emotions</button>' +
        '<button class="category__btn ctgC">Thematic</button>' +
        '<button class="category__btn ctgR">For Influencers</button>';
    $('.categories__box').prepend(categoriesBox);

    //remove subcategories

})

//animation on categories buttons
$(document).on('click', '.category__btn', function () {
    $('.ctgL').addClass('ctgL--clicked');
    $('.ctgR').addClass('ctgR--clicked');

    // removing buttons and create back button
    setTimeout(function () { $('.category__btn').remove() }, 500);
    setTimeout(function () {
        $('.categories').prepend('<button class="category__btn--back">&#8592; Back</button> ');
    }, 500);


});

$(document).on('click', '.category__btn', function () {

    //get the name of Button
    let categoryName = $(this).text();

    //ajax on a button for subcategories
    $.post("https://igcomment.com/get-categories/", { category: categoryName }, function (data) {

        $('.categories').append('<div class="subcategories__box">' +
            '<ul class="subcategory__list">' +
            '</ul></div>');
        var data = JSON.parse(data);

        for (var i = 0; i < data.length; i++) {
            if (data[i].is_hot) {
                $('.subcategory__list').hide().append('<li class="subcategory__listItem"><i class="subcategory__arrow"></i><span class="subcategory__name item__isHot">' + data[i].category + '</span></li>').fadeIn('slow');
            } else {
                $('.subcategory__list').hide().append('<li class="subcategory__listItem"><i class="subcategory__arrow"></i><span class="subcategory__name">' + data[i].category + '</span></li>').fadeIn('slow');
            }
        }
    });

    $('.subcategory__listItem').first().find('.subcategory__name').addClass('item__isHot');
});

//toggle active class for subcategory__listItem and put an anchor on subcategories
$(document).on('click', '.subcategory__listItem', function () {
    $('.subcategory__listItem--active').removeClass('subcategory__listItem--active');
    $(this).addClass('subcategory__listItem--active');

    $("button:disabled").prop("disabled", false);


    //delete class hover when it's mobile adaptive
    if ($('.order').width() <= 450) {
        $('.subcategory__listItem').removeClass('subcategory__listItem--hover');
    };

    let subCategoryName = $(this).find('.subcategory__name').text();

    $('<input>').attr({
        type: 'hidden',
        name: 'category'
    }).appendTo('.setCategoryForm').val(subCategoryName);

    //smooth transition to a submit button
    $("html, body").animate({ scrollTop: $(document).height() - $(window).height() }, 800);

});

// -------------------- Step Four -------------------- //

//event on listItem__button--submit
$(document).on('click', '.listItem__button--submit', function () {
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

    $.post("https://igcomment.com/alter-comment/", { order_id: order_id, comment_id: comment_id, status: status, comment_text: comment_text }, function (data) {

        if (data === 'OK') {

            //hide submit button and show listItem__buttons
            inputHiddenToDelete.remove();
            buttonSubmitHide.hide("fast", function () {
                buttonSubmitHide.remove();
            });
            input.replaceWith('<span class="listItem__text" name="comment_' + order_id + '_' + comment_id + '">' + comment_text + '</span><input type="hidden" name="comment_' + order_id + '_' + comment_id + '" value="' + comment_text + '">');
            listItem.find('.listItem__buttons').show('fast');

        };
    })
});


//ajax on Add a comment button
// $(document).on('click','.card__comment--upload',function() {

// });
