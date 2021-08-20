import $ from 'jquery';

let siteMenu = {

    init: function () {
        siteMenu.app = this;
        this.document.ready(() => {
            siteMenu.menuToggle('#menu-toggle');
        });
    },


    menuToggle: function (elem) {
        $(elem).on('click', function () {
            $(this).toggleClass('active');
        });
    }

};


export default siteMenu;
