import $ from 'jquery';
import 'lazysizes';
import 'bootstrap/dist/js/bootstrap.bundle';
import page from 'page';
import feather from 'feather-icons/dist/feather';


let app = {

    // параметры, изменяемые в appConfig
    breakpoints: {
        sm: 320,
        md: 768,
        lg: 1280
    },

    media: 320,
    resizeEventName: 'app_resize',
    submitEventName: 'app_submit',
    popupLoadedEventName: 'app_popup_loaded',
    popupClosedEventName: 'app_popup_closed',
    tabChangedEventName: 'app_tab_changed',
    scrollToOffset: 200, // оффсет при скролле до элемента
    scrollToSpeed: 500, // скорость скролла

    init: function () {

        // read config

        if (typeof appConfig === 'object') {
            Object.keys(appConfig).forEach(key => {
                if (Object.prototype.hasOwnProperty.call(app, key)) {
                    app[key] = appConfig[key];
                }
            });
        }

        app.currentID = 0;

        // Init page
        this.page = page;
        this.page.init.call(this);


        //Init map
        // this.map = map;
        // this.map.init.call(this);

        app.checkMedia();

        app.window.on('resize', app.checkMedia);

        window.jQuery = $;
        window.app = app;

        app.document.ready(() => {
            this.initScrollTo(); // for example
            feather.replace();
        });

        app.window.on('load', () => {
            console.log($(this));
        });

        this.document.on(app.resizeEventName, () => {

        });

    },

    initScrollTo() {
        app.document.on('click', '.js-scrollto', function () {
            let target = $(this).data('href');
            if (target) {
                let $target = $(target);
                if ($target.length) {
                    $('html, body').animate({
                        scrollTop: $target.offset().top - app.scrollToOffset
                    }, app.scrollToSpeed);
                }
            }
        });


    },



    /**
     * Проверяет размер окна и пишет его в app.media
     * @returns void
     */
    checkMedia() {
        let current = app.media;
        for (let key in app.breakpoints) {
            if (app.window.outerWidth() >= app.breakpoints[key]) {
                app.media = app.breakpoints[key];
            }
//            console.log(app.media);
        }
        if (app.media != current) {
            app.document.trigger(app.resizeEventName, {media: app.media});
        }
    },

    uniqID() {
        return `app_id_${app.currentID++}`;
    },

    /**
     * Функция возвращает окончание для множественного числа слова на основании числа и массива окончаний
     * param  iNumber Integer Число на основе которого нужно сформировать окончание
     * param  aEndings Array Массив слов или окончаний для чисел (1, 4, 5),
     *         например ['яблоко', 'яблока', 'яблок']
     * return String
     *
     * https://habrahabr.ru/post/105428/
     */
    getNumEnding(iNumber, aEndings) {
        let sEnding, i;
        iNumber = iNumber % 100;
        if (iNumber >= 11 && iNumber <= 19) {
            sEnding = aEndings[2];
        } else {
            i = iNumber % 10;
            switch (i)
            {
                case (1):
                    sEnding = aEndings[0];
                    break;
                case (2):
                case (3):
                case (4):
                    sEnding = aEndings[1];
                    break;
                default:
                    sEnding = aEndings[2];
            }
        }
        return sEnding;
    },

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

};
app.init();
