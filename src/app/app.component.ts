import { Component, OnInit } from '@angular/core';
//import * as $ from 'jquery';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'marketplace';

  ngOnInit() {
    (function ($) {
      'use strict';
      //var iOS =/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      var isMobile = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
          );
        },
      };

      const parallax = (): void => {
        $('.bg--parallax').each(function (this: HTMLElement): void {
          const el = $(this); // 'this' está correctamente tipado como HTMLElement
          const xpos = '50%';
          const windowHeight = $(window).height() ?? 0; // Manejo de posibles valores nulos o indefinidos

          if (isMobile.any()) {
            el.css('background-attachment', 'scroll');
          } else {
            $(window).on('scroll', (): void => {
              const current = $(window).scrollTop() ?? 0; // Manejo de posibles valores nulos o indefinidos
              const top = el.offset()?.top ?? 0; // Uso seguro con optional chaining
              const height = el.outerHeight() ?? 0;

              if (top + height < current || top > current + windowHeight) {
                return;
              }

              el.css(
                'backgroundPosition',
                `${xpos} ${Math.round((top - current) * 0.2)}px`
              );
            });
          }
        });
      };

      function backgroundImage(): void {
        const databackground = $('[data-background]'); // jQuery selector para elementos con 'data-background'

        databackground.each(function (this: HTMLElement): void {
          // Usamos 'this: HTMLElement' para que TypeScript reconozca correctamente el tipo
          const $this = $(this); // Referencia jQuery al elemento
          const imagePath = $this.attr('data-background'); // Obtenemos el valor del atributo 'data-background'

          if (imagePath) {
            // Si 'data-background' existe
            $this.css({
              background: `url(${imagePath})`, // Asignamos la imagen de fondo
            });
          }
        });
      }

      function siteToggleAction(): void {
        const navSidebar = $('.navigation--sidebar');
        const filterSidebar = $('.ps-filter--sidebar');

        // Toggle para abrir/ocultar el menú
        $('.menu-toggle-open').on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            const $this = $(this);
            $this.toggleClass('active');
            navSidebar.toggleClass('active');
            $('.ps-site-overlay').toggleClass('active');
          }
        );

        // Toggle para cambiar las clases en el sidebar
        $('.ps-toggle--sidebar').on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            const url = $(this).attr('href');
            const $this = $(this);
            $this.toggleClass('active');
            $this.siblings('a').removeClass('active');
            if (url) {
              $(url).toggleClass('active');
              $(url).siblings('.ps-panel--sidebar').removeClass('active');
            }
            $('.ps-site-overlay').toggleClass('active');
          }
        );

        // Abrir el filtro en el sidebar
        $('#filter-sidebar').on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            filterSidebar.addClass('active');
            $('.ps-site-overlay').addClass('active');
          }
        );

        // Cerrar el filtro en el sidebar
        $('.ps-filter--sidebar .ps-filter__header .ps-btn--close').on(
          'click',
          function (e: any): void {
            e.preventDefault();
            filterSidebar.removeClass('active');
            $('.ps-site-overlay').removeClass('active');
          }
        );

        // Cerrar sidebar si se hace clic fuera del panel
        $('body').on('click', function (e: any): void {
          if ($(e).siblings('.ps-panel--sidebar').hasClass('active')) {
            $('.ps-panel--sidebar').removeClass('active');
            $('.ps-site-overlay').removeClass('active');
          }
        });
      }

      function subMenuToggle(): void {
        // Para los elementos con '.menu-item-has-children > .sub-toggle'
        $('.menu--mobile .menu-item-has-children > .sub-toggle').on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            const $this = $(this); // Usamos jQuery para manipular 'this'
            const current = $this.parent('.menu-item-has-children'); // Obtiene el elemento padre

            $this.toggleClass('active'); // Alterna la clase 'active' en el sub-toggle
            current.siblings().find('.sub-toggle').removeClass('active'); // Elimina la clase 'active' de otros sub-toggle
            current.children('.sub-menu').slideToggle(350); // Alterna la visibilidad de la sub-menu
            current.siblings().find('.sub-menu').slideUp(350); // Cierra otras sub-menu

            if (current.hasClass('has-mega-menu')) {
              current.children('.mega-menu').slideToggle(350); // Alterna la visibilidad de mega-menu
              current
                .siblings('.has-mega-menu')
                .find('.mega-menu')
                .slideUp(350); // Cierra otros mega-menu
            }
          }
        );

        // Para los elementos dentro de '.has-mega-menu .mega-menu__column > .sub-toggle'
        $('.menu--mobile .has-mega-menu .mega-menu__column .sub-toggle').on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            const $this = $(this); // Usamos jQuery para manipular 'this'
            const current = $this.closest('.mega-menu__column'); // Encuentra el contenedor más cercano

            $this.toggleClass('active'); // Alterna la clase 'active'
            current.siblings().find('.sub-toggle').removeClass('active'); // Elimina la clase 'active' de otros sub-toggle
            current.children('.mega-menu__list').slideToggle(350); // Alterna la visibilidad de mega-menu list
            current.siblings().find('.mega-menu__list').slideUp(350); // Cierra otros mega-menu list
          }
        );

        // Verifica si hay categorías en '.ps-list--categories'
        const listCategories = $('.ps-list--categories');
        if (listCategories.length > 0) {
          $('.ps-list--categories .menu-item-has-children > .sub-toggle').on(
            'click',
            function (this: HTMLElement, e: any): void {
              e.preventDefault();
              const $this = $(this); // Usamos jQuery para manipular 'this'
              const current = $this.parent('.menu-item-has-children'); // Obtiene el elemento padre

              $this.toggleClass('active'); // Alterna la clase 'active' en el sub-toggle
              current.siblings().find('.sub-toggle').removeClass('active'); // Elimina la clase 'active' de otros sub-toggle
              current.children('.sub-menu').slideToggle(350); // Alterna la visibilidad de la sub-menu
              current.siblings().find('.sub-menu').slideUp(350); // Cierra otras sub-menu

              if (current.hasClass('has-mega-menu')) {
                current.children('.mega-menu').slideToggle(350); // Alterna la visibilidad de mega-menu
                current
                  .siblings('.has-mega-menu')
                  .find('.mega-menu')
                  .slideUp(350); // Cierra otros mega-menu
              }
            }
          );
        }
      }

      function stickyHeader(): void {
        const header = $('.header');
        const scrollPosition = 0;
        const checkpoint = 50;

        header.each(function (this: HTMLElement): void {
          // Definimos 'this' como HTMLElement
          const $this = $(this); // Referencia jQuery al elemento

          if ($this.data('sticky') === true) {
            const el = $this;

            $(window).on('scroll', (): void => {
              const currentPosition = $(this).scrollTop() ?? 0; // Obtenemos la posición del scroll
              if (currentPosition > checkpoint) {
                el.addClass('header--sticky');
              } else {
                el.removeClass('header--sticky');
              }
            });
          }
        });

        const stickyCart = $('#cart-sticky');
        if (stickyCart.length > 0) {
          $(window).on('scroll', () => {
            const currentPosition = $(window).scrollTop() ?? 0;  // Usamos $(window) para obtener la posición del scroll
            if (currentPosition > checkpoint) {
              stickyCart.addClass('active');
            } else {
              stickyCart.removeClass('active');
            }
          });
        }
        
      }

      function owlCarouselConfig() {
        const target = $('.owl-slider'); // Seleccionar el carrusel con jQuery
    
        if (target.length > 0) {
          target.each((index: number, element: HTMLElement) => {
            const el = $(element); // Selección del elemento actual
            const dataAuto = el.data('owl-auto');
            const dataLoop = el.data('owl-loop');
            const dataSpeed = el.data('owl-speed');
            const dataGap = el.data('owl-gap');
            const dataNav = el.data('owl-nav');
            const dataDots = el.data('owl-dots');
            const dataAnimateIn = el.data('owl-animate-in') || ''; // Animación de entrada
            const dataAnimateOut = el.data('owl-animate-out') || ''; // Animación de salida
            const dataDefaultItem = el.data('owl-item');
            const dataItemXS = el.data('owl-item-xs');
            const dataItemSM = el.data('owl-item-sm');
            const dataItemMD = el.data('owl-item-md');
            const dataItemLG = el.data('owl-item-lg');
            const dataItemXL = el.data('owl-item-xl');
            const dataNavLeft = el.data('owl-nav-left') || "<i class='icon-chevron-left'></i>";
            const dataNavRight = el.data('owl-nav-right') || "<i class='icon-chevron-right'></i>";
            const duration = el.data('owl-duration');
            const datamouseDrag = el.data('owl-mousedrag') === 'on' ? true : false;
    
            // Verifica si hay suficientes elementos hijos para inicializar el carrusel
            if (el.children('div, span, a, img, h1, h2, h3, h4, h5').length >= 2) {
              // Inicializar Owl Carousel
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
                    items: dataItemXS,
                  },
                  480: {
                    items: dataItemSM,
                  },
                  768: {
                    items: dataItemMD,
                  },
                  992: {
                    items: dataItemLG,
                  },
                  1200: {
                    items: dataItemXL,
                  },
                  1680: {
                    items: dataDefaultItem,
                  },
                },
              });
            }
          });
        }
      }

      function masonry($selector: string): void {
        const masonry = $($selector);

        if (masonry.length > 0) {
          if (masonry.hasClass('filter')) {
            masonry.imagesLoaded(function (): void {
              masonry.isotope({
                columnWidth: '.grid-sizer',
                itemSelector: '.grid-item',
                isotope: {
                  columnWidth: '.grid-sizer',
                },
                filter: '*',
              });
            });

            const filters = masonry
              .closest('.masonry-root')
              .find('.ps-masonry-filter > li > a');
            filters.on(
              'click',
              function (this: HTMLElement, e: any): void {
                e.preventDefault();
                const selector = $(this).attr('href');
                filters.find('a').removeClass('current');
                $(this).parent('li').addClass('current');
                $(this).parent('li').siblings('li').removeClass('current');
                $(this)
                  .closest('.masonry-root')
                  .find('.ps-masonry')
                  .isotope({
                    itemSelector: '.grid-item',
                    isotope: {
                      columnWidth: '.grid-sizer',
                    },
                    filter: selector,
                  });
                return ;
              }
            );
          } else {
            masonry.imagesLoaded(function (): void {
              masonry.masonry({
                columnWidth: '.grid-sizer',
                itemSelector: '.grid-item',
              });
            });
          }
        }
      }

      function mapConfig() {
        // var map = $('#contact-map');
        // if (map.length > 0) {
        //   map
        //     .gmap3({
        //       address: map.data('address'),
        //       zoom: map.data('zoom'),
        //       mapTypeId: "cxzzc", //google.maps.MapTypeId.ROADMAP
        //       scrollwheel: false,
        //     })
        //     .marker(function (map: { getCenter: () => any }) {
        //       return {
        //         position: map.getCenter(),
        //         icon: 'img/marker.png',
        //       };
        //     })
        //     .infowindow({
        //       content: map.data('address'),
        //     })
        //     .then(function (infowindow: {
        //       open: (arg0: any, arg1: any) => void;
        //     }) {
        //       /*var map = this.get(0);
        //       var marker = this.get(1);
        //       marker.addListener('click', function () {
        //         infowindow.open(map, marker);
        //       });*/
        //     });
        // } else {
        //   return false;
        // }
      }

      function slickConfig() {
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
                  nextArrow:
                    "<a href='#'><i class='fa fa-angle-right'></i></a>",
                },
              },
              {
                breakpoint: 992,
                settings: {
                  arrows: second.data('arrow'),
                  slidesToShow: 4,
                  vertical: false,
                  prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                  nextArrow:
                    "<a href='#'><i class='fa fa-angle-right'></i></a>",
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 3,
                  vertical: false,
                  prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                  nextArrow:
                    "<a href='#'><i class='fa fa-angle-right'></i></a>",
                },
              },
            ],
          });
        }
      }

      function tabs(): void {
        $('.ps-tab-list li > a').on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            const target = $(this).attr('href');

            $(this).closest('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');

            if (target) {
              $(target).addClass('active');
              $(target).siblings('.ps-tab').removeClass('active');
            }
          }
        );

        $('.ps-tab-list.owl-slider .owl-item a').on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            const target = $(this).attr('href');

            $(this)
              .closest('.owl-item')
              .siblings('.owl-item')
              .removeClass('active');
            $(this).closest('.owl-item').addClass('active');

            if (target) {
              $(target).addClass('active');
              $(target).siblings('.ps-tab').removeClass('active');
            }
          }
        );
      }

      function rating(): void {
        $('select.ps-rating').each(function (this: HTMLElement): void {
          let readOnly: boolean;

          // Verificar si el atributo 'data-read-only' es 'true'
          if ($(this).attr('data-read-only') === 'true') {
            readOnly = true;
          } else {
            readOnly = false;
          }

          // Inicializar barrating
          $(this).barrating({
            theme: 'fontawesome-stars',
            readonly: readOnly,
            emptyValue: '0',
          });
        });
      }

      function productLightbox() {
        var product = $('.ps-product--detail');
        if (product.length > 0) {
          $('.ps-product__gallery').lightGallery({
            selector: '.item a',
            thumbnail: true,
            share: false,
            fullScreen: false,
            autoplay: false,
            autoplayControls: false,
            actualSize: false,
          });
          if (product.hasClass('ps-product--sticky')) {
            $('.ps-product__thumbnail').lightGallery({
              selector: '.item a',
              thumbnail: true,
              share: false,
              fullScreen: false,
              autoplay: false,
              autoplayControls: false,
              actualSize: false,
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
          actualSize: false,
        });
        $('.ps-video').lightGallery({
          thumbnail: false,
          share: false,
          fullScreen: false,
          autoplay: false,
          autoplayControls: false,
          actualSize: false,
        });
      }

      function backToTop() {
        var scrollPos = 0;
        var element = $('#back2top');
        $(window).scroll(function () {
          var scrollCur = $(window).scrollTop();
          if (scrollCur > scrollPos) {
            // scroll down
            if (scrollCur > 500) {
              element.addClass('active');
            } else {
              element.removeClass('active');
            }
          } else {
            // scroll up
            element.removeClass('active');
          }

          scrollPos = scrollCur;
        });

        element.on('click', function () {
          $('html, body').animate(
            {
              scrollTop: '0px',
            },
            800
          );
        });
      }

      function filterSlider(): void {
        const el = $('.ps-slider');
        const min = el.siblings().find('.ps-slider__min');
        const max = el.siblings().find('.ps-slider__max');
        
        // Obtenemos los valores de los datos
        const defaultMinValue = el.data('default-min') as number;
        const defaultMaxValue = el.data('default-max') as number;
        const maxValue = el.data('max') as number;
        const step = el.data('step') as number;
    
        if (el.length > 0) {
            el.slider({
                min: 0,
                max: maxValue,
                step: step,
                range: true,
                values: [defaultMinValue, defaultMaxValue],
                slide: function (event: any, ui: { values: number[] }): void {
                    const values = ui.values;
                    min.text('$' + values[0]);
                    max.text('$' + values[1]);
                },
            });
    
            // Establecemos los valores iniciales
            const values = el.slider('option', 'values');
            min.text('$' + values[0]);
            max.text('$' + values[1]);
        } else {
            // Si no se encuentra el elemento, podemos retornar o hacer alguna acción
            // return false;
        }
    }
    

      function modalInit(): void {
        const modal = $('.ps-modal');

        // Verifica si existe al menos un modal
        if (modal.length) {
          if (modal.hasClass('active')) {
            $('body').css('overflow-y', 'hidden');
          }
        }

        // Evento para cerrar el modal
        modal
          .find('.ps-modal__close, .ps-btn--close')
          .on(
            'click',
            function (this: HTMLElement, e: any): void {
              e.preventDefault();
              $(this).closest('.ps-modal').removeClass('active');
            }
          );

        // Evento para abrir el modal desde un enlace
        $('.ps-modal-link').on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            const target = $(this).attr('href');

            if (target) {
              $(target).addClass('active');
              $('body').css('overflow-y', 'hidden');
            }
          }
        );

        // Cerrar el modal si se hace clic fuera del contenedor
        $('.ps-modal').on('click', function (e: any): void {
          if (!$(e).closest('.ps-modal__container').length) {
            modal.removeClass('active');
            $('body').css('overflow-y', 'auto');
          }
        });
      }

      function searchInit(): void {
        const searchbox = $('.ps-search');

        // Evento para abrir el cuadro de búsqueda
        $('.ps-search-btn').on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            searchbox.addClass('active');
          }
        );

        // Evento para cerrar el cuadro de búsqueda
        searchbox
          .find('.ps-btn--close')
          .on(
            'click',
            function (this: HTMLElement, e: any): void {
              e.preventDefault();
              searchbox.removeClass('active');
            }
          );
      }

      function countDown(): void {
        const time = $('.ps-countdown');

        time.each(function (this: HTMLElement): void {
          const el = $(this);
          const value = $(this).data('time') as string; // Asumimos que el valor de 'data-time' es una cadena
          const countDownDate = new Date(value).getTime();

          const timeout = setInterval(function (): void {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            el.find('.days').html(days.toString());
            el.find('.hours').html(hours.toString());
            el.find('.minutes').html(minutes.toString());
            el.find('.seconds').html(seconds.toString());

            if (distance < 0) {
              clearInterval(timeout);
              el.closest('.ps-section').hide();
            }
          }, 1000);
        });
      }

      function productFilterToggle(): void {
        // Evento de clic en el trigger de filtro
        $('.ps-filter__trigger').on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            const el = $(this); // Referencia al elemento clicado
            el.find('.ps-filter__icon').toggleClass('active');
            el.closest('.ps-filter').find('.ps-filter__content').slideToggle();
          }
        );

        // Verifica si existe el sidebar
        if ($('.ps-sidebar--home').length > 0) {
          $('.ps-sidebar--home > .ps-sidebar__header > a').on(
            'click',
            function (this: HTMLElement, e: any): void {
              e.preventDefault();
              $(this)
                .closest('.ps-sidebar--home')
                .children('.ps-sidebar__content')
                .slideToggle();
            }
          );
        }
      }

      function mainSlider() {
        var homeBanner = $('.ps-carousel--animate');
        homeBanner.slick({
          autoplay: true,
          speed: 1000,
          lazyLoad: 'progressive',
          arrows: false,
          fade: true,
          dots: true,
          prevArrow: "<i class='slider-prev ba-back'></i>",
          nextArrow: "<i class='slider-next ba-next'></i>",
        });
      }

      function subscribePopup(): void {
        const subscribe = $('#subscribe');
        const time = subscribe.data('time') as number; // Aseguramos que 'data-time' sea un número
    
        setTimeout(function (): void {
            if (subscribe.length > 0) {
                subscribe.addClass('active');
                $('body').css('overflow', 'hidden');
            }
        }, time);
    
        $('.ps-popup__close').on('click', function (this: HTMLElement, e: any): void {
            e.preventDefault();
            $(this).closest('.ps-popup').removeClass('active');
            $('body').css('overflow', 'auto');
        });
    
        $('#subscribe').on('click', function (e: any): void {
            if (!$(e).closest('.ps-popup__content').length) {
                subscribe.removeClass('active');
                $('body').css('overflow-y', 'auto');
            }
        });
    }
    

      function stickySidebar(): void {
        // const sticky = $('.ps-product--sticky');
        // let stickySidebar: StickySidebar | undefined;
        // let stickySidebar2: StickySidebar | undefined;
        // const checkPoint = 992;
        // const windowWidth = $(window).innerWidth();

        // if (sticky.length > 0) {
        //   stickySidebar = new StickySidebar(
        //     '.ps-product__sticky .ps-product__info',
        //     {
        //       topSpacing: 20,
        //       bottomSpacing: 20,
        //       containerSelector: '.ps-product__sticky',
        //     }
        //   );

        //   if ($('.sticky-2').length > 0) {
        //     stickySidebar2 = new StickySidebar(
        //       '.ps-product__sticky .sticky-2',
        //       {
        //         topSpacing: 20,
        //         bottomSpacing: 20,
        //         containerSelector: '.ps-product__sticky',
        //       }
        //     );
        //   }

        //   // Si la ventana es más pequeña que el checkpoint, destruimos los sidebars pegajosos
        //   if (checkPoint > windowWidth) {
        //     stickySidebar?.destroy(); // Usamos el operador de encadenamiento opcional para evitar errores si stickySidebar no está definido
        //     stickySidebar2?.destroy(); // Lo mismo para stickySidebar2
        //   }
        // } else {
        //   return;
        // }
      }

      function accordion(): void {
        const accordion = $('.ps-accordion');

        // Ocultar todos los contenidos de los acordeones
        accordion.find('.ps-accordion__content').hide();

        // Mostrar el contenido del acordeón activo
        $('.ps-accordion.active').find('.ps-accordion__content').show();

        // Evento para el encabezado del acordeón
        accordion
          .find('.ps-accordion__header')
          .on(
            'click',
            function (this: HTMLElement, e: any): void {
              e.preventDefault();

              const currentAccordion = $(this).closest('.ps-accordion');
              const isActive = currentAccordion.hasClass('active');

              if (isActive) {
                currentAccordion.removeClass('active');
                currentAccordion.find('.ps-accordion__content').slideUp(350);
              } else {
                currentAccordion.addClass('active');
                currentAccordion.find('.ps-accordion__content').slideDown(350);

                // Cerrar otros acordeones
                currentAccordion
                  .siblings('.ps-accordion')
                  .find('.ps-accordion__content')
                  .slideUp();
              }

              // Cerrar otros acordeones y eliminarles la clase 'active'
              currentAccordion.siblings('.ps-accordion').removeClass('active');
              currentAccordion
                .siblings('.ps-accordion')
                .find('.ps-accordion__content')
                .slideUp();
            }
          );
      }

      function progressBar(): void {
        const progress = $('.ps-progress');

        progress.each(function (this: HTMLElement, e: any): void {
          const value = $(this).data('value') as number; // Aseguramos que el valor de 'data-value' sea un número

          // Establecemos el ancho de la barra de progreso
          $(this)
            .find('span')
            .css({
              width: `${value}%`, // Usamos template strings para concatenar el valor con '%'
            });
        });
      }

      function customScrollbar(): void {
        $('.ps-custom-scrollbar').each(function (this: HTMLElement): void {
          const height = $(this).data('height') as number; // Aseguramos que el valor de 'data-height' sea un número

          $(this).slimScroll({
            height: `${height}px`, // Usamos template strings para concatenar el valor con 'px'
            alwaysVisible: true,
            color: '#000000',
            size: '6px',
            railVisible: true,
          });
        });
      }

      function select2Cofig(): void {
        $('select.ps-select').select2({
          placeholder: function (this: HTMLSelectElement): string {
            return $(this).data('placeholder') as string; // Aseguramos que el placeholder es una cadena
          },
          minimumResultsForSearch: -1,
        });
      }

      function carouselNavigation(): void {
        const prevBtn = $('.ps-carousel__prev');
        const nextBtn = $('.ps-carousel__next');

        prevBtn.on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            const target = $(this).attr('href');
            if (target) {
              $(target).trigger('prev.owl.carousel', [1000]);
            }
          }
        );

        nextBtn.on(
          'click',
          function (this: HTMLElement, e: any): void {
            e.preventDefault();
            const target = $(this).attr('href');
            if (target) {
              $(target).trigger('next.owl.carousel', [1000]);
            }
          }
        );
      }

      function dateTimePicker() {
        $('.ps-datepicker').datepicker();
      }

      $(function () {
        backgroundImage();
        owlCarouselConfig();
        siteToggleAction();
        subMenuToggle();
        masonry('.ps-masonry');
        productFilterToggle();
        tabs();
        slickConfig();
        productLightbox();
        rating();
        backToTop();
        stickyHeader();
        filterSlider();
        mapConfig();
        modalInit();
        searchInit();
        countDown();
        mainSlider();
        parallax();
        stickySidebar();
        accordion();
        progressBar();
        customScrollbar();
        select2Cofig();
        carouselNavigation();
        dateTimePicker();
        $('[data-toggle="tooltip"]').tooltip();
      });

      $(window).on('load', function () {
        $('body').addClass('loaded');
        subscribePopup();
      });

      /*$.scrollUp({
        scrollText: '',
        scrollSpeed: 1000,
      });*/
    })(jQuery);
  }
}
