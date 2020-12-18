const EVENTS_API = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
const CATEGORY_API = 'https://www.pgm.gent/data/gentsefeesten/categories.json';

const FALLBACK_IMAGE = 'https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/26e0734c1a56705115083cb555ba57da/300';


(() => {
    const app = {
        initialize: function () {
            this.cacheElements();
            this.getDataFromEventsAPIEndpoint();
            this.getDataFromCategoriesAPI();
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
            this.$dayFilterCategories = document.querySelector('.day_filter_categories');
            this.$eventsPerCategory = document.querySelector('.events_per_category');
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

        getDataFromCategoriesAPI() {
            fetch(CATEGORY_API)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    this.categories = json;
                    this.fetchEvents();
                })
                .catch((error) => console.log(error));
        },

        fetchEvents() {
            fetch(EVENTS_API)
                .then((response) => response.json())
                .then((json) => {
                    this.events = json;
                    console.log(json);
                    this.populateHTMLForCategoryList();
                    this.populateHTMLForFullOverview();
                })
                .catch((error) => console.log(error));
        },

        populateHTMLForCategoryList() {
            const htmlForCategories = this.categories.map((category) => {
                return `
                    <section>
                        <a href="#${category}">
                        <h2>${category}</h2>
                        </a>
                    </section>
                `;
            }).join('');
            this.$dayFilterCategories.innerHTML = htmlForCategories;
        },

        populateHTMLForFullOverview() {
            const htmlForFullOverview = this.categories.map((category) => {
                const filteredEvents = this.events.filter((event) => {
                    return event.category.indexOf(category) > -1;
                });

                const listItems = filteredEvents.map((event) => {
                    return `
                    <li class="highlight__item">
                    <a class="highlight-item__link" href="#">
                        <div class="link__top">
                            <div class="highlight__img">
                                <img class="highlight__img__img" src="${event.image == null ? FALLBACK_IMAGE : event.image.thumb}" alt="${event.title}">
                            </div>
                        </div>
                        <div class="highlight-bottom__content">
                            <span class="bottom__date"><span class="date__day">${event.day_of_week.slice(0,2)} ${event.day} Jul</span> <span class="date__time">${event.start} u.</span></span>
                            <h2 class="bottom__title">${event.title}</h2>
                            <span class="bottom__loc">${event.location}</span>
                        </div>
                    </a>
                </li>`;
                }).join('');

                return `
                    <section>
                        <h2>${category}</h2>
                        <ul>
                            ${listItems}
                        </ul>
                    </section>
                `;
            }).join('');

            this.$eventsPerCategory.innerHTML = htmlForFullOverview;
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
                            <img class="highlight__img__img" src="${randomNummer.image == null ? FALLBACK_IMAGE : randomNummer.image.thumb}" alt="${randomNummer.title}">
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