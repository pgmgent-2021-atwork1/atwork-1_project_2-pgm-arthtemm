const EVENTS_API = 'https://www.pgm.gent/data/gentsefeesten/events.json';

const EVENT_PICTURE_ARRAY = ['https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/26e0734c1a56705115083cb555ba57da/300',
    "https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/86ea9e7de4645e39a34399d8e6ae1f31/300",
    "https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/85456f6e6c9913789b740d9c21eca3d1/300"
];


(() => {
    const app = {
        initialize: function () {
            this.cacheElements();
            this.getDataFromEventsAPIEndpoint();
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
        },
        getDataFromEventsAPIEndpoint() {
            fetch(EVENTS_API, {})
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    throw new Error('Something went wrong!');
                })
                .then(json => this.updateEventsUI(json))
                .catch(error => console.warn(error));

            fetch(EVENTS_API, {})
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    throw new Error('Something went wrong!');
                })
                .then(json => this.updateDayEvents(json))
                .catch(error => console.warn(error));
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
        },
        updateEventsUI(data) {
            let tempStr = '';
            for (let i = 0; i < 3; i++) {
                let randomNummer = data[Math.floor(Math.random() * data.length)];
                tempStr += `
                <div class="highlight__item">
                <a class="highlight-item__link" href="#">
                    <div class="link__top">
                        <div class="highlight__img">
                            <img class="highlight__img__img" src="${randomNummer.image == null ? EVENT_PICTURE_ARRAY[Math.floor(Math.random() * EVENT_PICTURE_ARRAY.length)] : randomNummer.image.thumb}" alt="${randomNummer.title}">
                        </div>
                    </div>
                    <div class="highlight-bottom__content">
                        <span class="bottom__date"><span class="date__day">${randomNummer.day_of_week.slice(0,2)} ${randomNummer.day} Jul</span> <span class="date__time">${randomNummer.start} u.</span></span>
                        <h2 class="bottom__title">${randomNummer.title}</h2>
                        <span class="bottom__loc">${randomNummer.location}</span>
                    </div>
                </a>
            </div>`;
            };
            this.$eventList.innerHTML = tempStr;
        },
        updateDayEvents(data) {
            let tempStr = '';
            for (let i = 0; i < 3; i++) {
                if (data.day_of_week === 'Vrijdag'); {
                    let randomNummer = data[Math.floor(Math.random() * data.length)];
                    tempStr += `
                <div class="highlight__item">
                <a class="highlight-item__link" href="#">
                    <div class="link__top">
                        <div class="highlight__img">
                            <img class="highlight__img__img" src="${randomNummer.image == null ? EVENT_PICTURE_ARRAY[Math.floor(Math.random() * EVENT_PICTURE_ARRAY.length)] : randomNummer.image.thumb}" alt="${randomNummer.title}">
                        </div>
                    </div>
                    <div class="highlight-bottom__content">
                        <span class="bottom__date"><span class="date__day">${randomNummer.day_of_week.slice(0,2)} ${randomNummer.day} Jul</span> <span class="date__time">${randomNummer.start} u.</span></span>
                        <h2 class="bottom__title">${randomNummer.title}</h2>
                        <span class="bottom__loc">${randomNummer.location}</span>
                    </div>
                </a>
            </div>`;
                };
                this.$dayEventList.innerHTML = tempStr;
            }
        }
    };
    app.initialize();
})();