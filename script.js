renderCalendar();

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('#tabs button');

  
    tabs.forEach(tab => {
        tab.style.visibility = 'hidden'; 
        tab.style.height = '0'; 
        tab.style.opacity = '0'; 
        tab.style.transform = 'translateY(10px)'; 
    });

    
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const activeTab = document.getElementById(tabName.toLowerCase());
    if (activeTab) {
        activeTab.style.visibility = 'visible'; 
        activeTab.style.height = 'auto'; 
        activeTab.style.opacity = '1';
        activeTab.style.transform = 'translateY(0)'; 

        const activeButton = Array.from(buttons).find(button => button.textContent.toLowerCase() === tabName.toLowerCase());
        if (activeButton) {
            activeButton.classList.add('active');
        }

        if (tabName.toLowerCase() === 'aio') {
            renderCalendar(); 
        }
    }
}


function showNestedTab(nestedTabName) {
    const nestedTabs = document.querySelectorAll('.nested-tab-content');
    nestedTabs.forEach(tab => {
        if (tab.id === nestedTabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });


    const buttons = document.querySelectorAll('#sports-tabs button, #academic-tabs button');
    buttons.forEach(button => {
        if (button.innerText.toLowerCase().replace(/\s+/g, '-') === nestedTabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    showTab('sports');
    showNestedTab('daily-reminders'); 
});



function renderCalendar() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            { title: 'Morning Yoga', start: '2024-12-25T07:30:00', category: 'Sports' },
            { title: 'Math Quiz', start: '2024-12-27T11:00:00', category: 'Academic' },
            { title: 'Buy Groceries', start: '2024-12-25T09:00:00', category: 'General' }
        ],
        eventColor: '#378006'
    });

    calendar.render();
}




document.querySelector('#tabs').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const tabName = event.target.textContent.toLowerCase();
        showTab(tabName);
    }
});



document.querySelector('#sports-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const time = e.target.time.value;
    const note = e.target.note.value;
    addSportReminder(date, time, note);
    e.target.reset();
});

document.querySelector('#academic-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const time = e.target.time.value;
    const note = e.target.note.value;
    addAcademicReminder(date, time, note);
    e.target.reset();
});

document.querySelector('#general-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const time = e.target.time.value;
    const note = e.target.note.value;
    addGeneralReminder(date, time, note);
    e.target.reset();
});


function addEventToCalendar(title, start) {
    const calendarEl = document.getElementById('calendar');
    const calendar = FullCalendar.getCalendar(calendarEl);
    calendar.addEvent({ title, start, color: '#378006' });
}

function addSportReminder(date, time, note) {
    const sportsContainer = document.querySelector('.sports-container');
    const listItem = document.createElement('li');
    listItem.textContent = `Tarih: ${date} | Saat: ${time} | Not: ${note}`;
    sportsContainer.appendChild(listItem);

    addEventToCalendar(note, `${date}T${time}`);
}


function addAcademicReminder(date, time, note) {
    const academicContainer = document.querySelector('.academic-container');
    const listItem = document.createElement('li');
    listItem.textContent = `Tarih: ${date} | Saat: ${time} | Not: ${note}`;
    academicContainer.appendChild(listItem);

    addEventToCalendar(note, `${date}T${time}`);
}


function addGeneralReminder(date, time, note) {
    const generalContainer = document.querySelector('.general-container');
    const listItem = document.createElement('li');
    listItem.textContent = `Tarih: ${date} | Saat: ${time} | Not: ${note}`;
    generalContainer.appendChild(listItem);

    addEventToCalendar(note, `${date}T${time}`);
}
