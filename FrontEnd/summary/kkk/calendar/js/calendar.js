
let date;
let today = new Date();

function push_prev() {
    let month = date.getMonth() - 1;
    let year = date.getFullYear();
    if (month == 0) {
        month = 12;
        year--;
    }
    date = new Date(year, month, 1);
    drawCalendar();
}

function push_next() {
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month == 13) {
        month = 1;
        year++;
    }
    date = new Date(year, month, 1);
    drawCalendar();
}

function getDate(date) {
    return date.toLocaleDateString().replace(/\./g, "").split(" ");
}

let months = ['JANURARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

function drawCalendar() {
    const nowMonth = date.getMonth();
    const [y, m] = getDate(new Date(date.setMonth(nowMonth)));
    const lastDay = getDate(new Date(y, m, 0)).pop() * 1;
    const day = new Date([y, m, 1].join("-")).getDay() * 1;
    const maxDay = Math.ceil((day + lastDay) / 7) * 7;

    let html = '';

    for (let i = 1; i <= maxDay; i++) {
        const diff = i - day;
        const d = diff <= lastDay && i > day ? diff : '';
        const tmpClass = !d ? 'background' : 'selectDate';

        if (date.getFullYear() == today.getFullYear() && d == today.getDate() && date.getMonth() == today.getMonth()) {
            html += `<div class="dateSel ${tmpClass}" id="today">${d}</div>`;
        } else {
            html += `<div class="dateSel ${tmpClass} id=d${i}">${d}</div>`;
        }
    }
    document.querySelector('.dateSel').innerHTML = html;
    document.querySelector('.year_text').innerText = `${y}`;
    document.querySelector('.month_text').innerHTML = `${months[m - 1]}`;

    let dates = document.getElementsByClassName('selectDate');
    for (let i = 0; i < dates.length; i++) {
        dates[i].addEventListener('click', clickSel, false);
    }
}

function clickSel() {
    if (date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && this.innerText == today.getDate()) {
        location.href = "./today.html";
    } else if (date.getFullYear() <= today.getFullYear() && date.getMonth() <= today.getMonth() && this.innerText < today.getDate()) {
        location.href = "./total.html";
    }
}

const pad = (str) => str >= 10 ? str : '0' + str;

window.onload = function () {
    date = new Date();
    drawCalendar();
}