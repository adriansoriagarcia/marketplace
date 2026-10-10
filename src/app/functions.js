/*=============================================
OwlCarouselConfig
=============================================*/

export let OwlCarouselConfig = {

	fnc: function(){

		var target = $('.owl-slider');
        if (target.length > 0) {
            target.each(function() {
                var el = $(this),
                    dataAuto = el.data('owl-auto'),
                    dataLoop = el.data('owl-loop'),
                    dataSpeed = el.data('owl-speed'),
                    dataGap = el.data('owl-gap'),
                    dataNav = el.data('owl-nav'),
                    dataDots = el.data('owl-dots'),
                    dataAnimateIn = (el.data('owl-animate-in')) ? el.data('owl-animate-in') : '',
                    dataAnimateOut = (el.data('owl-animate-out')) ? el.data('owl-animate-out') : '',
                    dataDefaultItem = el.data('owl-item'),
                    dataItemXS = el.data('owl-item-xs'),
                    dataItemSM = el.data('owl-item-sm'),
                    dataItemMD = el.data('owl-item-md'),
                    dataItemLG = el.data('owl-item-lg'),
                    dataItemXL = el.data('owl-item-xl'),
                    dataNavLeft = (el.data('owl-nav-left')) ? el.data('owl-nav-left') : "<i class='icon-chevron-left'></i>",
                    dataNavRight = (el.data('owl-nav-right')) ? el.data('owl-nav-right') : "<i class='icon-chevron-right'></i>",
                    duration = el.data('owl-duration'),
                    datamouseDrag = (el.data('owl-mousedrag') == 'on') ? true : false;
                if (target.children('div, span, a, img, h1, h2, h3, h4, h5, h5').length >= 2) {
                    el.addClass('owl-carousel');
                    el.owlCarousel({
                        animateIn: dataAnimateIn,
                        animateOut: dataAnimateOut,
                        margin: dataGap,
                        autoplay: dataAuto,
                        autoplayTimeout: dataSpeed,
                        autoplayHoverPause: true,
                        loop: dataLoop,
                        nav: dataNav,
                        mouseDrag: datamouseDrag,
                        touchDrag: true,
                        autoplaySpeed: duration,
                        navSpeed: duration,
                        dotsSpeed: duration,
                        dragEndSpeed: duration,
                        navText: [dataNavLeft, dataNavRight],
                        dots: dataDots,
                        items: dataDefaultItem,
                        responsive: {
                            0: {
                                items: dataItemXS
                            },
                            480: {
                                items: dataItemSM
                            },
                            768: {
                                items: dataItemMD
                            },
                            992: {
                                items: dataItemLG
                            },
                            1200: {
                                items: dataItemXL
                            },
                            1680: {
                                items: dataDefaultItem
                            }
                        }
                    });
                }

            });
        }

	}

}

/*=============================================
CarouselNavigation
=============================================*/

export let CarouselNavigation = {

    fnc: function(){

        var prevBtn = $('.ps-carousel__prev'),
            nextBtn = $('.ps-carousel__next');
        prevBtn.on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(target).trigger('prev.owl.carousel', [1000]);
        });
        nextBtn.on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(target).trigger('next.owl.carousel', [1000]);
        });


    }

}

/*=============================================
SlickConfig
=============================================*/

export let SlickConfig = {

    fnc:function(){
        var product = $('.ps-product--detail');
        if (product.length > 0) {
            var primary = product.find('.ps-product__gallery'),
                second = product.find('.ps-product__variants'),
                vertical = product.find('.ps-product__thumbnail').data('vertical');
            primary.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.ps-product__variants',
                fade: true,
                dots: false,
                infinite: false,
                arrows: primary.data('arrow'),
                prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>",
            });
            second.slick({
                slidesToShow: second.data('item'),
                slidesToScroll: 1,
                infinite: false,
                arrows: second.data('arrow'),
                focusOnSelect: true,
                prevArrow: "<a href='#'><i class='fa fa-angle-up'></i></a>",
                nextArrow: "<a href='#'><i class='fa fa-angle-down'></i></a>",
                asNavFor: '.ps-product__gallery',
                vertical: vertical,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            arrows: second.data('arrow'),
                            slidesToShow: 4,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            arrows: second.data('arrow'),
                            slidesToShow: 4,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                ]
            });
        }
    }

}

/*=============================================
ProductLightbox
=============================================*/

export let ProductLightbox = {

    fnc: function() {
        var product = $('.ps-product--detail');
        if (product.length > 0) {
            $('.ps-product__gallery').lightGallery({
                selector: '.item a',
                thumbnail: true,
                share: false,
                fullScreen: false,
                autoplay: false,
                autoplayControls: false,
                actualSize: false
            });
            if (product.hasClass('ps-product--sticky')) {
                $('.ps-product__thumbnail').lightGallery({
                    selector: '.item a',
                    thumbnail: true,
                    share: false,
                    fullScreen: false,
                    autoplay: false,
                    autoplayControls: false,
                    actualSize: false
                });
            }
        }
        $('.ps-gallery--image').lightGallery({
            selector: '.ps-gallery__item',
            thumbnail: true,
            share: false,
            fullScreen: false,
            autoplay: false,
            autoplayControls: false,
            actualSize: false
        });
        $('.ps-video').lightGallery({
            thumbnail: false,
            share: false,
            fullScreen: false,
            autoplay: false,
            autoplayControls: false,
            actualSize: false
        });
    }
}

/*=============================================
CountDown
=============================================*/

export let CountDown = {

    fnc: function() {
        var time = $(".ps-countdown");
        time.each(function() {
            var el = $(this),
                value = $(this).data('time');
            var countDownDate = new Date(value).getTime();
            var timeout = setInterval(function() {
                var now = new Date().getTime(),
                    distance = countDownDate - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds = Math.floor((distance % (1000 * 60)) / 1000);
                el.find('.days').html(days);
                el.find('.hours').html(hours);
                el.find('.minutes').html(minutes);
                el.find('.seconds').html(seconds);
                if (distance < 0) {
                    clearInterval(timeout);
                    el.closest('.ps-section').hide();
                }
            }, 1000);
        });
    }

}

/*=============================================
Rating
=============================================*/

export let Rating = {

    fnc: function() {
        $('select.ps-rating').each(function() {
            var readOnly;
            if ($(this).attr('data-read-only') == 'true') {
                readOnly = true
            } else {
                readOnly = false;
            }
            $(this).barrating({
                theme: 'fontawesome-stars',
                readonly: readOnly,
                emptyValue: '0'
            });
        });
    }

}

export let DinamicRating = {

    fnc: function(product) {
        try {
            var reviews = typeof product.reviews === 'string'
                ? JSON.parse(product.reviews)
                : product.reviews;
            if (!Array.isArray(reviews) || reviews.length === 0) {
                return 0;
            }
            var total = reviews.reduce(function(sum, review) {
                return sum + Number(review.review || 0);
            }, 0);
            return Math.round(total / reviews.length);
        } catch (error) {
            return 0;
        }
    }

}

export let DinamicReviews = {

    fnc: function(rating) {
        var reviews = [2, 2, 2, 2, 2];
        if (Number.isInteger(Number(rating)) && Number(rating) >= 1 && Number(rating) <= 5) {
            reviews[Number(rating) - 1] = 1;
        }
        return reviews;
    }

}

export let DinamicPrice = {

    fnc: function(product) {
        var price = Number(product.price) || 0;
        var displayPrice = '<p class="ps-product__price">$' + price + '</p>';
        var badge = '';

        try {
            var offer = typeof product.offer === 'string'
                ? JSON.parse(product.offer)
                : product.offer;
            if (Array.isArray(offer) && offer[0] === 'Disccount') {
                var discountedPrice = price - (price * Number(offer[1]) / 100);
                displayPrice = '<p class="ps-product__price sale">$' + discountedPrice.toFixed(2) + ' <del>$' + price + '</del></p>';
                badge = '<div class="ps-product__badge">-' + offer[1] + '%</div>';
            } else if (Array.isArray(offer) && offer[0] === 'Fixed') {
                displayPrice = '<p class="ps-product__price sale">$' + offer[1] + ' <del>$' + price + '</del></p>';
            }
        } catch (error) {
            displayPrice = '<p class="ps-product__price">$' + price + '</p>';
        }

        if (Number(product.stock) === 0) {
            badge = '<div class="ps-product__badge out-stock">Out Of Stock</div>';
        }

        return [displayPrice, badge];
    }

}

export let Pagination = {

    fnc: function() {
        $('.ps-pagination .pagination').each(function() {
            var pagination = $(this);
            var totalPages = Number(pagination.attr('data-total-pages')) || 0;
            var actualPage = Number(pagination.attr('data-actual-page')) || 1;
            var currentRoute = pagination.attr('data-current-route') || '';
            var separator = currentRoute.indexOf('&') === -1 ? '&' : '&';
            var pages = '';

            if (totalPages < 1) {
                return;
            }

            if (actualPage > 1) {
                pages += '<li><a href="' + currentRoute + separator + (actualPage - 1) + '"><i class="icon-chevron-left"></i></a></li>';
            }

            for (var page = 1; page <= totalPages; page++) {
                pages += '<li' + (page === actualPage ? ' class="active"' : '') + '><a href="' + currentRoute + separator + page + '">' + page + '</a></li>';
            }

            if (actualPage < totalPages) {
                pages += '<li><a href="' + currentRoute + separator + (actualPage + 1) + '"><i class="icon-chevron-right"></i></a></li>';
            }

            pagination.html(pages);
        });
    }

}

export let Select2Cofig = {

    fnc: function() {
        $('select.ps-select').select2({
            placeholder: function() {
                return $(this).data('placeholder');
            },
            minimumResultsForSearch: -1
        });
    }

}

export let Tabs = {

    fnc: function() {
        $('.ps-tab-list li > a, .ps-tab-list.owl-slider .owl-item a').on('click', function(e) {
            e.preventDefault();
            var link = $(this);
            var target = link.attr('href');

            if (link.closest('.owl-item').length > 0) {
                link.closest('.owl-item').siblings('.owl-item').removeClass('active');
                link.closest('.owl-item').addClass('active');
            } else {
                link.closest('li').siblings('li').removeClass('active');
                link.closest('li').addClass('active');
            }

            if (target) {
                $(target).addClass('active').siblings('.ps-tab').removeClass('active');
            }
        });
    }

}

export let Search = {

    fnc: function(value) {
        var search = String(value).trim().toLowerCase();
        return search.length > 0 ? search : undefined;
    }

}

export let Quantity = {

    fnc: function() {
        $('.quantity').each(function() {
            var wrapper = $(this);
            var input = wrapper.find('input');
            var min = Number(input.attr('min')) || 1;
            var max = Number(input.attr('max')) || 99;

            wrapper.find('.up').off('click.quantity').on('click.quantity', function(e) {
                e.preventDefault();
                var current = Number(input.val()) || min;
                input.val(Math.min(current + 1, max));
            });

            wrapper.find('.down').off('click.quantity').on('click.quantity', function(e) {
                e.preventDefault();
                var current = Number(input.val()) || min;
                input.val(Math.max(current - 1, min));
            });
        });
    }

}

/*=============================================
ProgressBar
=============================================*/

export let ProgressBar = {
   
    fnc: function() {
        var progress = $('.ps-progress');
        progress.each(function(e) {
            var value = $(this).data('value');
            $(this).find('span').css({
                width: value + "%"
            })
        });
    }

}

export let Capitalize = {
    fnc: function(value) {
        return String(value).toLowerCase().replace(/(^|\s)(\S)/g, function(match, space, character) {
            return space + character.toUpperCase();
        });
    }
}

export let Tooltip = {
    fnc: function() {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

export let Sweetalert = {
    fnc: function(type, text, url) {
        if (typeof window === 'undefined') {
            return;
        }

        if (typeof window['swal'] === 'function') {
            const swal = window['swal'];

            if (type === 'loading') {
                swal({
                    title: text,
                    allowOutsideClick: false,
                    didOpen: () => swal.showLoading()
                });
                return;
            }

            if (type === 'close') {
                swal.close();
                return;
            }

            swal({
                icon: type === 'success' ? 'success' : type === 'error' ? 'error' : 'info',
                text: text || ''
            }).then(() => {
                if (url) {
                    window.location.href = url;
                }
            });

            return;
        }

        if (type === 'close') {
            return;
        }

        if (type === 'loading') {
            return;
        }

        if (url) {
            window.location.href = url;
        }

        if (typeof text === 'string' && text.length > 0) {
            window.alert(text);
        }
    }
};

 