document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript is loaded and working!");

    // Tüm formları seç
    const forms = document.querySelectorAll('form');


    

    // Her form için submit event listener ekle
    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Varsayılan davranışı engelle
            const formData = new FormData(form); // Form verilerini al
            const formId = form.id; // Formun id'sini al

            // Veriyi uygun listeye ve takvime ekle
            switch (formId) {
                case 'sports-form':
                    handleSportsForm(formData);
                    break;
                case 'academic-form':
                    handleAcademicForm(formData);
                    break;
                case 'general-form':
                    handleGeneralForm(formData);
                    break;
                case 'quiz-exam-form':
                    handleQuizExamForm(formData);
                    break;
                case 'fitness-goal-form':
                    handleFitnessGoalForm(formData);
                    break;
                case 'fitness-progress-form':
                    handleFitnessProgressForm(formData);
                    break;
                default:
                    console.error('Unknown form:', formId);
            }

            form.reset(); // Formu sıfırla
        });
    });

    // Varsayılan sekmeyi göster
    showTab('aio');
    renderCalendar();
});


document.querySelector('#general-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const time = e.target.time.value;
    const note = e.target.note.value;
    addGeneralReminder(date, time, note);
    e.target.reset(); // Formu sıfırlama
});




// Spor formunu işle
function handleSportsForm(formData) {
    const list = document.getElementById('sports-list');
    const date = formData.get('date');
    const time = formData.get('time');
    const note = formData.get('note');
    appendToList(list, `Date: ${date} | Time: ${time} | Note: ${note}`);
}

// Akademik formu işle
function handleAcademicForm(formData) {
    const list = document.getElementById('academic-list');
    const date = formData.get('date');
    const time = formData.get('time');
    const note = formData.get('note');
    appendToList(list, `Date: ${date} | Time: ${time} | Note: ${note}`);
}

// Genel formu işle
function handleGeneralForm(formData) {
    const generalContainer = document.querySelector('.general-container');
    
    // Yeni liste öğesi oluştur
    const listItem = document.createElement('li');
    const date = formData.get('date');
    const time = formData.get('time');
    const note = formData.get('note');
    listItem.textContent = `Tarih: ${date} | Saat: ${time} | Not: ${note}`;
    
    // Listeye ekle
    generalContainer.appendChild(listItem);

    // Takvime ekle
    //addEventToCalendar(note, `${date}T${time}`);
    addAllReminder(date, time, note);
}


// Quiz/Exam formunu işle
function handleQuizExamForm(formData) {
    const list = document.getElementById('quiz-exam-list');
    const date = formData.get('date');
    const time = formData.get('time');
    const subject = formData.get('subject');
    const type = formData.get('type');
    appendToList(list, `Date: ${date} | Time: ${time} | Subject: ${subject} (${type})`);
}

// Fitness hedefi belirleme



// Listeye veri ekle
function appendToList(list, content) {
    if (list) {
        const listItem = document.createElement('li');
        listItem.textContent = content;
        list.appendChild(listItem);
    } else {
        console.error('List not found for content:', content);
    }
}

function addEventToCalendar(title, start) {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl && calendarEl.fullCalendarInstance) {
        const calendar = calendarEl.fullCalendarInstance;
        calendar.addEvent({
            title,
            start,
            color: '#FF5733' // Kategoriye göre özelleştirilebilir
        });
    } else {
        console.error('Calendar instance not initialized.');
    }
}
 


// Takvimi başlatma
let calendarInstance = null;

function renderCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) {
        console.error('Calendar element not found!');
        return;
    }

    calendarInstance = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [], // Başlangıçta boş; dinamik olarak doldurulacak
        eventColor: '#378006'
    });

    calendarInstance.render();
}

// Sekmeleri yönet
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
    showTab('aio');
    showNestedTab('daily-reminders'); 
    renderCalendar();
});



let fitnessGoal = 0;
let currentProgress = 0;

document.querySelector('#fitness-goal-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const goalInput = document.getElementById('goal');
    fitnessGoal = parseInt(goalInput.value, 10);
    currentProgress = 0; // Reset progress when goal is updated
    updateProgressBar();
    document.getElementById('goal-display').textContent = `Goal: ${fitnessGoal} reps`;
    goalInput.value = '';
});


document.querySelector('#fitness-progress-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const reps = parseInt(e.target.reps.value, 10);
    const notes = e.target.notes.value;
    currentProgress += reps; 
    addFitnessProgress(date, reps, notes);
    updateProgressBar();
    e.target.reset();
});

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = Math.min((currentProgress / fitnessGoal) * 100, 100);
    progressBar.style.width = `${progressPercent}%`;
    progressBar.textContent = `${Math.round(progressPercent)}%`;

    if (currentProgress >= fitnessGoal) {
        progressBar.style.backgroundColor = '#0078D7';
        progressBar.textContent = 'Goal Achieved!';
    }
}

function addFitnessProgress(date, reps, notes) {
    const fitnessProgressList = document.getElementById('fitness-progress-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Date: ${date} | Reps: ${reps} | Notes: ${notes || 'N/A'}`;
    fitnessProgressList.appendChild(listItem);
}

