// Header desaparece al bajar //

(function(document, window, index) {
    'use strict';

    var elSelector = '.site-navbar',
        element = document.querySelector(elSelector);

    if (!element) return true;

    var elHeight = 0,
        elTop = 0,
        dHeight = 0,
        wHeight = 0,
        wScrollCurrent = window.pageYOffset,
        wScrollBefore = 0,
        wScrollDiff = 0,
        topbarHeigh = 0,
        headerHigh = document.getElementById('hero').clientHeight,
        navbarHigh = document.getElementById('navbar').clientHeight;

    window.addEventListener('scroll', function() {


        elHeight = element.offsetHeight + 10;
        dHeight = document.body.offsetHeight;
        wHeight = window.innerHeight;
        wScrollCurrent = window.pageYOffset;
        wScrollDiff = wScrollBefore - wScrollCurrent;
        elTop = parseInt(window.getComputedStyle(element).getPropertyValue('top')) + wScrollDiff;
        if (wScrollCurrent <= topbarHeigh) {
            element.style.top = (topbarHeigh - wScrollCurrent) + 'px';
            $('#navbar').removeClass('stuck');
            $('#navbar').removeClass('shadow');

        } else if (wScrollCurrent > headerHigh - navbarHigh) {

            if (wScrollCurrent <= 0)
                element.style.top = '0px';

            else if (wScrollDiff > 0) {
                //console.log("subiendo");
                element.style.top = (elTop > 0 ? 0 : elTop) + 'px';
                $('#navbar').addClass('stuck');
                $('#navbar').addClass('shadow');

            } else if (wScrollDiff < 0) {
                //console.log("bajando");
                if (wScrollCurrent + wHeight >= dHeight - elHeight) {
                    element.style.top = ((elTop = wScrollCurrent + wHeight - dHeight) < 0 ? elTop : 0) + 'px';
                    $('#navbar').addClass('stuck');
                    $('#navbar').addClass('shadow');
                } else
                    element.style.top = (Math.abs(elTop) > elHeight ? -elHeight : elTop) + 'px';
            }
        } else {
            $('#navbar').removeClass('stuck');
            $('#navbar').removeClass('shadow');
        }

        wScrollBefore = wScrollCurrent;

    });

}(document, window, 0));

// Fin header desaparece al bajar //


// $('a').click(function(e) {
//     e.preventDefault();
//     $('body, html').animate({
//         scrollTop: $($(this).attr('href')).offset().top - 120
//     }, 1000);
// });



$(function() {
    // var siteSticky = function() {
    //     $(".js-sticky-header").sticky({ topSpacing: 0 });
    // };
    // siteSticky();

    var siteMenuClone = function() {

        $('.js-clone-nav').each(function() {
            var $this = $(this);
            $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
        });


        setTimeout(function() {

            var counter = 0;
            $('.site-mobile-menu .has-children').each(function() {
                var $this = $(this);

                $this.prepend('<span class="arrow-collapse collapsed">');

                $this.find('.arrow-collapse').attr({
                    'data-toggle': 'collapse',
                    'data-target': '#collapseItem' + counter,
                });

                $this.find('> ul').attr({
                    'class': 'collapse',
                    'id': 'collapseItem' + counter,
                });

                counter++;

            });

        }, 1000);

        $('body').on('click', '.arrow-collapse', function(e) {
            var $this = $(this);
            if ($this.closest('li').find('.collapse').hasClass('show')) {
                $this.removeClass('active');
            } else {
                $this.addClass('active');
            }
            e.preventDefault();

        });

        $(window).resize(function() {
            var $this = $(this),
                w = $this.width();

            if (w > 768) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        })

        $('body').on('click', '.js-menu-toggle', function(e) {
            var $this = $(this);
            e.preventDefault();

            if ($('body').hasClass('offcanvas-menu')) {
                $('body').removeClass('offcanvas-menu');
                $this.removeClass('active');
            } else {
                $('body').addClass('offcanvas-menu');
                $this.addClass('active');
            }
        })

        // click outisde offcanvas
        $(document).mouseup(function(e) {
            var container = $(".site-mobile-menu");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        });
    };
    siteMenuClone();

});