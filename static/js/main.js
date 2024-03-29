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
            this.$dayHighlight = document.querySelector('.day_item-list');
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
                .then(json => this.updateDailyEvents(json))
                .catch(error => console.warn(error));
        },

        getDataFromCategoriesAPI() {
            fetch(CATEGORY_API)
                .then((response) => response.json())
                .then((json) => {
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
                    </section>`;
            }).join('');
            this.$dayFilterCategories.innerHTML = htmlForCategories;
        },

        populateHTMLForFullOverview() {
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const urlType = params.get('day');
            console.log(urlType);

            if (urlType !== null) {

                const dayType = this.events.filter((dayOfWeek) => {
                    return dayOfWeek.day === urlType;
                });

                const fullOverView = this.categories.map((category) => {
                    const filteredEvents = dayType.filter((event) => {
                        return event.category.indexOf(category) > -1;
                    });
                    filteredEvents.sort((event1, event2) => {
                        return event1.sort_key.localeCompare(event2.sort_key);
                    });

                    const listItems = filteredEvents.map((event) => {
                        return `
                    <li class="highlight__item">
                    <a class="highlight-item__link" href="detail.html?day=${event.day}&slug=${event.slug}">
                        <div class="link__top">
                            <div class="highlight__img">
                                <img class="highlight__img__img" src="${event.image == null ? FALLBACK_IMAGE : event.image.thumb}" alt="${event.title}">
                            </div>
                        </div>
                        <div class="highlight-bottom__content">
                            <span class="bottom__date"><span class="date__time">${event.start} u.</span></span>
                            <h2 class="bottom__title">${event.title}</h2>
                            <span class="bottom__loc">${event.location}</span>
                        </div>
                    </a>
                    </li>`;
                    }).join('');

                    return `
                    <section class="titles">
                        <h1 id="${category}">${category} <a href="#main"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path d="M13.682 11.791l-6.617 6.296-3.065-2.916 11.74-11.171 12.26 11.665-2.935 2.793-7.113-6.768v16.311h-4.269z"></path>
                        </svg></span></a></h1>
                        <ul class="fullListOfEvents">
                            ${listItems}
                        </ul>
                    </section>
                `;
                }).join('');
                this.$eventsPerCategory.innerHTML = fullOverView;

                let item;
                for (let i = 0; i < events.length; i++) {
                    if (events[i].day === urlType) {
                        item = events[i];
                        console.log(item);
                    };
                };

                const $detailTitle = document.querySelector('.detail_title');
                const $detailDate = document.querySelector('.detail_date');
                const $detailDescription = document.querySelector('.detail_desc');

                if (item) {
                    $detailTitle.innerHTML = item.title;
                };
            };
        },
        updateEventsUI(data) {
            let tempStr = '';
            for (let i = 0; i < 3; i++) {
                let randomNummer = data[Math.floor(Math.random() * data.length)];
                tempStr += `
                <div class="highlight__item">
                <a class="highlight-item__link" href="detail.html?day=${randomNummer.day}&slug=${randomNummer.slug}">
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
        updateDailyEvents(data) {
            let tempStr = '';
            for (let i = 0; i < 3; i++) {
                let randomNummer = data[Math.floor(Math.random() * data.length)];
                tempStr += `
                <div class="highlight__item">
                <a class="highlight-item__link" href="detail.html?day=${randomNummer.day}&slug=${randomNummer.slug}">
                    <div class="link__top">
                        <div class="highlight__img">
                            <img class="highlight__img__img" src="${randomNummer.image == null ? FALLBACK_IMAGE : randomNummer.image.thumb}" alt="${randomNummer.title}">
                        </div>
                    </div>
                    <div class="highlight-bottom__content">
                        <span class="bottom__date"><span class="date__time">${randomNummer.start} u.</span></span>
                        <h2 class="bottom__title">${randomNummer.title}</h2>
                        <span class="bottom__loc">${randomNummer.location}</span>
                    </div>
                </a>
            </div>`;
            };
            this.$dayHighlight.innerHTML = tempStr;
        },
    };
    app.initialize();
})();