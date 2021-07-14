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
            element.classList.remove('tabheader__item_active')
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
  
    const deadline = new Date('2021-07-22');

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

});




