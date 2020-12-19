(() => {
    const app = {
        initialize: function () {
            this.cacheElements();
            this.RegisterListeners();
        },
        cacheElements: function () {
            this.$eventList = document.querySelector('.event-list');
            this.$hamburgerMenu = document.querySelector('.hamburger-menu');
            this.$closeButton = document.querySelector('.close-btn');
            this.$navigation = document.querySelector('.navigation');
            this.$menuButton = document.querySelector('.menu');
            this.$programDropdown = document.querySelector('.icon_dropdown_program');
            this.$programDropdownList = document.querySelector('.program_dropdown');
            this.$program = document.querySelector('.program');
            this.$dayEventList = document.querySelector('.day-event-list');
            this.$gridToggle = document.querySelector('.grid_layout');
            this.$listLayout = document.querySelector('.list_layout');
        },

        RegisterListeners: function () {
            this.$menuButton.addEventListener('click', () => {
                this.$hamburgerMenu.classList.add('open');
                this.$closeButton.classList.add('open');
                this.$menuButton.classList.add('open');
                this.$navigation.classList.add('open');
            });
            this.$closeButton.addEventListener('click', () => {
                this.$hamburgerMenu.classList.remove('open');
                this.$closeButton.classList.remove('open');
                this.$menuButton.classList.remove('open');
                this.$navigation.classList.remove('open');
            });
            let dropDownOpen = false;
            this.$programDropdown && this.$program.addEventListener('click', () => {
                if (!dropDownOpen) {
                    this.$programDropdownList.classList.add('open');
                    this.$programDropdown.classList.add('open');
                    dropDownOpen = true;
                } else {
                    this.$programDropdownList.classList.remove('open');
                    this.$programDropdown.classList.remove('open');
                    dropDownOpen = false;
                }
            });
            this.$gridToggle.addEventListener('click', () => {
                this.$listLayout.classList.remove('selected');
                this.$gridToggle.classList.add('selected');
            });
            this.$listLayout.addEventListener('click', () => {
                this.$gridToggle.classList.remove('selected');
                this.$listLayout.classList.add('selected');
            });
        },
    };
    app.initialize();
})();