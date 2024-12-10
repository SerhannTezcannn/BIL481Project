
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
                case 'sports-reminder-form':
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
                case 'calorie-form':
                    handleCalorieForm(formData);
                    break;
                case 'study-session-form':
                    handleStudySessionForm(formData);
                    break;
                case 'assignment-form':
                    handleAssignmentForm(formData);
                    break;
                default:
                    console.error(`Unknown form ID: ${formId}`);
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

function addGeneralReminder(date, time, note) {
    // Hatırlatma işlemleri burada yapılır
    console.log(`General reminder added: Date=${date}, Time=${time}, Note=${note}`);
    
    // Örneğin, bir listeye ekleme:
    const list = document.querySelector('.general-container');
    const listItem = document.createElement('li');
    listItem.textContent = `Tarih: ${date} | Saat: ${time} | Not: ${note}`;
    list.appendChild(listItem);

    // Takvime ekleme
    addEventToCalendar(note, `${date}T${time}`);
}



// Spor formunu işle
function handleSportsForm(formData) {
    const list = document.getElementById('sports-reminders-list');
    const date = formData.get('date');
    const time = formData.get('time');
    const note = formData.get('note');
    appendToList(list, `Date: ${date} | Time: ${time} | Note: ${note}`);
    const start = `${date}T${time}`; // ISO 8601 formatında tarih ve saat
    addEventToCalendar(note, start); // Takvim için veri gönder
}

// Akademik formu işle
function handleAcademicForm(formData) {
    const list = document.getElementById('academic-list');
    const date = formData.get('date');
    const time = formData.get('time');
    const note = formData.get('note');
    appendToList(list, `Date: ${date} | Time: ${time} | Note: ${note}`);
    const start = `${date}T${time}`; // ISO 8601 formatında tarih ve saat
    addEventToCalendar(note, start); // Takvim için veri gönder
}

function handleGeneralForm(formData) {
    const generalContainer = document.querySelector('.general-container');

    // Yeni liste öğesi oluştur
    const listItem = document.createElement('li');
    const date = formData.get('date');
    const time = formData.get('time');
    const note = formData.get('note');
    

    // Takvime ekle
    const start = `${date}T${time}`; // ISO 8601 formatında tarih ve saat
    addEventToCalendar(note, start); // Takvim için veri gönder
}

// Quiz/Exam formunu işle
function handleQuizExamForm(formData) {
    const list = document.getElementById('quiz-exam-list');
    const date = formData.get('date');
    const time = formData.get('time');
    const subject = formData.get('subject');
    const type = formData.get('type');
    
    // Listeye ekleme
    appendToList(list, `Date: ${date} | Time: ${time} | Subject: ${subject} (${type})`);
    
    // Takvim için uygun açıklama oluşturma
    const note = `${type.toUpperCase()}: ${subject}`; // Örnek: "QUIZ: Mathematics"
    const start = `${date}T${time}`; // ISO 8601 formatında tarih ve saat
    
    // Takvim için veri gönder
    addEventToCalendar(note, start);
}


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
function handleFitnessGoalForm(formData) {
    const goal = formData.get('goal'); // Hedef değerini al
    const goalDisplay = document.getElementById('goal-display'); 
    const progressBar = document.getElementById('progress-bar');
    
    goalDisplay.textContent = `Goal: ${goal} reps`;
    progressBar.style.width = "0%";
    progressBar.textContent = "0%";
}
function handleCalorieForm(formData) {
    const list = document.getElementById('calorie-list');
    const totalCalories = document.getElementById('total-calories');
    const food = formData.get('food');
    const calories = parseInt(formData.get('calories'), 10);
    
    appendToList(list, `${food}: ${calories} kcal`);
    
    // Toplam kaloriyi güncelle
    const currentTotal = parseInt(totalCalories.textContent.replace(/\D/g, ''), 10) || 0;
    totalCalories.textContent = `Total Calories: ${currentTotal + calories}`;
}
function handleStudySessionForm(formData) {
    const list = document.getElementById('study-session-form');
    const date = formData.get('date');
    const time = formData.get('time');
    const subject = formData.get('subject');
    
    appendToList(list, `Date: ${date} | Time: ${time} | Subject: ${subject}`);
    
    const start = `${date}T${time}`;
    addEventToCalendar(`Study: ${subject}`, start);
}
function handleAssignmentForm(formData) {
    const list = document.getElementById('assignment-form');
    const dueDate = formData.get('due-date');
    const title = formData.get('title');
    const details = formData.get('details');
    
    appendToList(list, `Due: ${dueDate} | Title: ${title} | Details: ${details}`);
    
    const start = `${dueDate}T00:00`; // Ödevler için yalnızca tarih bilgisi
    addEventToCalendar(`Assignment: ${title}`, start);
}



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
    if (calendarInstance) {
        calendarInstance.addEvent({
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
            console.log('Rendering Calendar for All-in-One Tab');
            if (!calendarInstance) {
                renderCalendar();
            }
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

