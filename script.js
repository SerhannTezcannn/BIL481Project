// İlk sekmeyi göster
showTab('aio');

// Takvim ve etkinlik verileri
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    // FullCalendar başlatma
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Sports Tab'dan gelen etkinlikler
            { title: 'Morning Yoga', start: '2024-11-25T07:30:00', category: 'Sports' },
            { title: 'Evening Run', start: '2024-11-26T18:00:00', category: 'Sports' },
        
            // Academic Tab'dan gelen etkinlikler
            { title: 'Math Quiz', start: '2024-11-27T11:00:00', category: 'Academic' },
            { title: 'Physics Exam', start: '2024-11-29T15:30:00', category: 'Academic' },
        
            // General Tab'dan gelen etkinlikler
            { title: 'Buy Groceries', start: '2024-11-25T09:00:00', category: 'General' },
            { title: 'Dentist Appointment', start: '2024-11-30T14:45:00', category: 'General' }
        ],
        eventColor: '#378006'
    });

    calendar.render();
});



// Sekme geçişini kontrol et
function showTab(tabName) {
    // Tüm sekme içeriklerini gizle
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none'; // Hepsini gizle
    });

    // İlgili sekmeyi göster
    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.style.display = 'block'; // Seçili sekmeyi göster
    }
}


// Sekme butonlarına tıklama olayları ekleyin
document.querySelector('#tabs').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const tabName = event.target.textContent.toLowerCase();
        showTab(tabName);
    }
});



// Spor hatırlatıcıları formuna veri ekleme
document.querySelector('#sports-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const time = e.target.time.value;
    const note = e.target.note.value;
    addSportReminder(date, time, note);
    e.target.reset(); // Formu sıfırlama
});

// Akademik hatırlatıcıları formuna veri ekleme
document.querySelector('#academic-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const time = e.target.time.value;
    const note = e.target.note.value;
    addAcademicReminder(date, time, note);
    e.target.reset(); // Formu sıfırlama
});

// Genel hatırlatıcıları formuna veri ekleme
document.querySelector('#general-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const time = e.target.time.value;
    const note = e.target.note.value;
    addGeneralReminder(date, time, note);
    e.target.reset(); // Formu sıfırlama
});



// Spor hatırlatıcılarını ekle
function addSportReminder(date, time, note) {
    const sportsContainer = document.querySelector('.sports-container');
    const listItem = document.createElement('li');
    listItem.textContent = `Tarih: ${date} | Saat: ${time} | Not: ${note}`;
    sportsContainer.appendChild(listItem);

    // AIO'ya ekle
    addAllReminder(date, time, note);
}

// Akademik hatırlatıcıları ekle
function addAcademicReminder(date, time, note) {
    const academicContainer = document.querySelector('.academic-container');
    const listItem = document.createElement('li');
    listItem.textContent = `Tarih: ${date} | Saat: ${time} | Not: ${note}`;
    academicContainer.appendChild(listItem);

    // AIO'ya ekle
    addAllReminder(date, time, note);
}

// Genel hatırlatıcıları ekle
function addGeneralReminder(date, time, note) {
    const generalContainer = document.querySelector('.general-container');
    const listItem = document.createElement('li');
    listItem.textContent = `Tarih: ${date} | Saat: ${time} | Not: ${note}`;
    generalContainer.appendChild(listItem);

    // AIO'ya ekle
    addAllReminder(date, time, note);
}
