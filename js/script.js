'use strict';
///////////////TABS///////////////////
document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function showTabContent(i = 0) {   
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    function hideTabContent() {
        tabsContent.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade');
        });
        tabs.forEach(element => {
            element.classList.remove('tabheader__item_active');
        });

    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        tabs.forEach((item, i) => {
            if(target == item) {
                hideTabContent();
                showTabContent(i);  
            }
        });
        
    });
  ////////////////////TIMER////////////////////////
  
    const deadline = new Date('2022-05-20');

    function getTimerTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t/(1000 * 60 * 60 * 24)),
                hours = Math.floor((t/(1000 * 60 * 60)) % 24),
                minutes = Math.floor((t/(1000 * 60)) % 60),
                seconds = Math.floor((t/(1000)) % 60);
        return  {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function setTimerTime(selector, endtime) {
        
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes= timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            updateTime = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimerTime(endtime);
            days.innerHTML = addZero(t.days);
            hours.innerText = addZero(t.hours);
            minutes.innerText = addZero(t.minutes);
            seconds.innerText = addZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(updateTime);
            }
        }
            
    }
    
    function addZero(num) {
        if (num >= 0 && num < 10) {
            num = `0${num}`;
        } else {
            num = `${num}`;
        }
        return num;
    }

    setTimerTime('.timer', deadline);

    /////////////////////MODAL///////////////////////////

    const btnsModal = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    // const closeModal = document.querySelector('[data-close]');
    const setTimerId = setTimeout(openModalWindow, 15000000);


    function openModalWindow() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(setTimerId);
    }
    function closeModalWindow() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight == document.documentElement.scrollHeight) {
            openModalWindow();
            window.removeEventListener('scroll', openModalByScroll);
        }
    }

    btnsModal.forEach(element => {
        element.addEventListener('click', openModalWindow);
    });
    // closeModal.addEventListener('click', closeModalWindow);
    modal.addEventListener('click', (e) => {
        if(e.target == modal || e.target.getAttribute('data-close') == "") {
            closeModalWindow();
        }
    });
    
    document.addEventListener('keydown',  (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow();
        }
    });
    
    window.addEventListener('scroll', openModalByScroll);

    //////////////////classes in JS/////

    class MenuCard {
        constructor(src, alt, title, descr, price, parent, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes,
            this.parent = document.querySelector(parent);
            this.exchangeRate = 27;
            this.calcexchangeRate();
            this.rendering();
            // this.recieveDataFromServer();
        }

        calcexchangeRate() {
            this.price = this.price * this.exchangeRate;
        }

        
        rendering() {
            const element = document.createElement('div');
             if(!this.classes.length) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
             } else {
                this.classes.forEach(unit => element.classList.add(unit));
             }
            
            element.innerHTML = `
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}<br>
                    </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
        
    }
    /// получаем данные из базы и используем классы
    recieveDataFromServer('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container');
            });
        });

    // // получаем данные из базы db.json не используем классы
    
    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         const exchangeRate = 27;
    //         price = price * exchangeRate;

    //         element.innerHTML = `
    //             <img src="${img}" alt="${altimg}">
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}<br>
    //             </div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //     `;
    //     document.querySelector('.menu .container').append(element);
    //     });  
    // }
    // recieveDataFromServer('http://localhost:3000/menu')
    //     .then(data => createCard(data));
    

    

    // new MenuCard (
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     'div.menu .container',
        


    // );

    // new MenuCard (
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     20,
    //     'div.menu .container'

    // );

    // new MenuCard (
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     15,
    //     'div.menu .container'

    // );

    //////////////////Forms//////////////////////////////////

    const form = document.querySelectorAll('form');
    const message = {
        loading: 'img/spinner.svg',
        sucsess: 'Данные загружены.',
        krush: 'Произошла ошибка'
    };
    form.forEach(element => {sendForm(element);});

    async function sendDataToServer(server, data) {
        let req = await fetch(server, {
            body: data,
            headers: {
                'Content-type' : 'application/json'
             },
            method: "POST"
        });
        return await req.json();
    }
    async function recieveDataFromServer(server) {
         let res = await fetch(server);
         if(!res.ok) {
             throw new Error(`Could't recieve data from ${server} , states: ${res.status}`);
         }
        return res.json();
    }
    
    function sendForm(form) {

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 20px auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
        
            // const req = new XMLHttpRequest();

            // req.open('POST', 'server.php');

            const formData = new FormData(form);
            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            console.log(JSON.stringify(obj));
            let json = JSON.stringify(obj);
            // req.send(JSON.stringify(obj));
            
            // fetch('server.php', {
            //    body: JSON.stringify(obj),
            //    headers: {
            //        'Content-type' : 'application/json'
            //     },
            //    method: "POST"
            // })
            sendDataToServer('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.sucsess);
                statusMessage.remove();
            })
            .catch(() =>
                showThanksModal(message.krush)
                
            )
            .finally(() => {form.reset();});
            

            // req.addEventListener('load', () => {
            //     if (req.status === 200) {
            //         showThanksModal(message.sucsess);
            //         statusMessage.remove();
            //         form.reset();
            //     } else {
            //         showThanksModal(message.krush);
            //         statusMessage.remove();
            //         form.reset();
            //     }
            // });
        });

    }

    function showThanksModal(message) {
        const previousModal = document.querySelector('.modal__dialog');
        
        previousModal.classList.add('hide');
        openModalWindow();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModal.classList.add('show');
            previousModal.classList.remove('hide');
            closeModalWindow();
        }, 4000);
    }


    ///////Slieder/////////

    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    function numbersOnly(str) {
        return str.replace(/\D/g, '');
    }

    function opacityStyler(arr, num) {
        arr.forEach(elem => elem.style.opacity = ".5");
        arr[num-1].style.opacity = 1;
    }

    function lengthCheck(length, data) {
        if (length < 10) {
            data.textContent =  `0${slideIndex}`;
        } else {
            data.textContent =  slideIndex;
        }
    }

    next.addEventListener('click', () => {
        if (offset == numbersOnly(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +numbersOnly(width); 
        }
       
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        lengthCheck(slides.length, current);
        opacityStyler(dots, slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = numbersOnly(width) * (slides.length - 1);
        } else {
            offset -= +numbersOnly(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        lengthCheck(slides.length, current);
        opacityStyler(dots, slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            lengthCheck(slides.length, current);
            opacityStyler(dots, slideIndex);
        });
    });
    // dots.forEach(dot => {
    //     dot.addEventListener('click', (e) => {
    //         const slideTo = e.target.getAttribute('data-slide-to');

    //         slideIndex = slideTo;
    //         offset = +width.slice(0, width.length - 2) * (slideTo - 1);

    //         slidesField.style.transform = `translateX(-${offset}px)`;

    //         if (slides.length < 10) {
    //             current.textContent =  `0${slideIndex}`;
    //         } else {
    //             current.textContent =  slideIndex;
    //         }

    //         dots.forEach(dot => dot.style.opacity = ".5");
    //         dots[slideIndex-1].style.opacity = 1;
    //     });
    // });
       
    
       
  
    // current.innerText = addZero(slideIndex);

    // showSlides(slideIndex);

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item  => item.classList.add('hide'));
    //     slides[slideIndex - 1].classList.add('show');
    //     slides[slideIndex - 1].classList.remove('hide');
    //     current.innerText =  addZero(slideIndex);
        
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prevArrow.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // nextArrow.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // nextArrow.addEventListener('click', () => {
    //     i++;
    //     if (i > (slides.length - 1)) {
    //         i = 0;
    //         slides.forEach(item  => item.classList.add('hide'));
    //         slides[i].classList.remove('hide');
    //         slides[i].classList.add('show');
    //         current.innerText =  addZero(i + 1);
    //     } else {
    //         slides.forEach(item  => item.classList.add('hide'));
    //         slides[i].classList.remove('hide');
    //         slides[i].classList.add('show');
    //         current.innerText =  addZero(i + 1);
    //     }  
        
    // });

    // prevArrow.addEventListener('click', () => {
    //     i--;
    //     if (i < 0) {
    //         i =  slides.length - 1;
    //         slides.forEach(item  => item.classList.add('hide'));
    //         slides[i].classList.remove('hide');
    //         slides[i].classList.add('show');
    //         current.innerText =  addZero(i+1);
    //     } else {
    //         slides.forEach(item  => item.classList.add('hide'));
    //         slides[i].classList.remove('hide');
    //         slides[i].classList.add('show');
    //         current.innerText =  addZero(i+1);
    //     }  
        
    // });

    ////Calculator////

    const res = document.querySelector('.calculating__result span');
    let sex ,height, weight, age, ratio;

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex= 'female';
        localStorage.setItem('sex', 'female');
    }

    

    function caloriesCalc() {
        if(!sex || !height || !weight || !age || !ratio) {
            res.textContent = '___';
            return;
        } 
        if(sex === 'male') {
        res.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } else {
        res.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }

    caloriesCalc();

    function showActiwity(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            } 
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            } 
        });
    }

    showActiwity('#gender div', 'calculating__choose-item_active');
    showActiwity('.calculating__choose_big div', 'calculating__choose-item_active');
    
    

    function infoFromSite(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
       
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                    console.log(ratio);
                   
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                    console.log(sex);
                    
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                caloriesCalc();
            });
        });
    }
    infoFromSite('#gender div', 'calculating__choose-item_active');
    infoFromSite('.calculating__choose_big div', 'calculating__choose-item_active');
    


    function infoFromUser(data) {
        const info = document.querySelector(data);
        info.addEventListener('input', () => {
            if(info.value.match(/\D/g)) {
                info.style.border = '2px solid red';
            } else {
                info.style.border = 'none';
            }
            switch(info.getAttribute('id')) {
                case 'height':
                    height = +info.value;
                    console.log(height);
                break;
                case 'weight':
                    weight = +info.value;
                    console.log(weight);
                break;
                case 'age':
                    age = +info.value;
                    console.log(age);
                break;
            }
            caloriesCalc();
        });

    }
    infoFromUser('#height') ;  
    infoFromUser('#weight') ; 
    infoFromUser('#age') ;  

   
});




