let fitnessGoal = 0;
let currentProgress = 0;
let calendarInstance = null;

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

            // Veriyi uygun API'ye ve listeye ekle
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
                default:
                    console.error(`Unknown form ID: ${formId}`);
            }

            form.reset(); // Formu sıfırla
        });
    });

    // Sayfa yüklendiğinde hatırlatıcıları getir
    fetchQuizExamReminders()
    fetchAcademicReminders();
    fetchGeneralReminders();
    fetchSportsReminders();
    renderCalendar();
    showTab('aio');
});

// Yeni bir akademik hatırlatıcı ekle
function addAcademicReminder(day, time, duration, desc) {
    const data = {
        day: day,
        time: time,
        duration: duration,
        desc: desc
    };

    fetch("http://127.0.0.1:8000/academic/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log("Academic reminder added successfully");
            fetchAcademicReminders(); // Listeyi güncelle
        } else {
            return response.json().then(err => {
                throw new Error(err.detail);
            });
        }
    })
    .catch(error => {
        console.error("Error adding academic reminder:", error);
    });
}

// Yeni bir genel hatırlatıcı ekle
function addGeneralReminder(day, time, duration, desc) {
    const data = {
        day: day,
        time: time,
        duration: duration,
        desc: desc
    };

    fetch("http://127.0.0.1:8000/general/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log("General reminder added successfully");
            fetchGeneralReminders(); // Listeyi güncelle
        } else {
            return response.json().then(err => {
                throw new Error(err.detail);
            });
        }
    })
    .catch(error => {
        console.error("Error adding general reminder:", error);
    });
}

function addQuizReminder(date, start_time, end_time, subject, type) {
    const data = {
        date: date,
        start_time: start_time,
        end_time: end_time,
        subject: subject,
        type: type
    };

    fetch("http://127.0.0.1:8000/academy/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log("Quiz reminder added successfully");
            fetchQuizReminders(); // Listeyi güncelle
        } else {
            return response.json().then(err => {
                throw new Error(err.detail);
            });
        }
    })
    .catch(error => {
        console.error("Error adding quiz reminder:", error);
    });
}

// Yeni bir spor hatırlatıcı ekle
function addSportsReminder(day, time, duration, desc) {
    const data = {
        day: day,
        time: time,
        duration: duration,
        desc: desc
    };

    fetch("http://127.0.0.1:8000/sports/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log("Sports reminder added successfully");
            fetchSportsReminders(); // Listeyi güncelle
        } else {
            return response.json().then(err => {
                throw new Error(err.detail);
            });
        }
    })
    .catch(error => {
        console.error("Error adding sports reminder:", error);
    });
}

// API'den tüm akademik hatırlatıcıları al
function fetchAcademicReminders() {
    fetch("http://127.0.0.1:8000/academic/")
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('academic-list');
            list.innerHTML = ""; // Önce listeyi temizle
            data.academic_reminders.forEach(reminder => {
                const listItem = document.createElement('li');
                listItem.textContent = `Date: ${reminder[1]} | Time: ${reminder[2]} | Note: ${reminder[4]}`;
                list.appendChild(listItem);

                // Takvime ekle
                const start = `${reminder[1]}T${reminder[2]}`;
                addEventToCalendar(reminder[4], start, 'general');
            });
        })
        .catch(error => {
            console.error("Error fetching academic reminders:", error);
        });
}

// API'den genel hatırlatıcıları al
function fetchGeneralReminders() {
    fetch("http://127.0.0.1:8000/general/")
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('general-container');
            list.innerHTML = ""; // Önce listeyi temizle
            data.general_reminders.forEach(reminder => {
                const listItem = document.createElement('li');
                listItem.textContent = `Date: ${reminder[1]} | Time: ${reminder[2]} | Note: ${reminder[4]}`;
                list.appendChild(listItem);

                // Takvime ekle
                const start = `${reminder[1]}T${reminder[2]}`;
                addEventToCalendar(reminder[4], start, 'general');
            });
        })
        .catch(error => {
            console.error("Error fetching general reminders:", error);
        });
}


// API'den spor hatırlatıcıları al
function fetchSportsReminders() {
    fetch("http://127.0.0.1:8000/sports/")
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('sports-reminders-list');
            list.innerHTML = ""; // Önce listeyi temizle
            data.sports_reminders.forEach(reminder => {
                const listItem = document.createElement('li');
                listItem.textContent = `Date: ${reminder[1]} | Time: ${reminder[2]} | Note: ${reminder[4]}`;
                list.appendChild(listItem);

                // Takvime ekle
                const start = `${reminder[1]}T${reminder[2]}`;
                addEventToCalendar(reminder[4], start, 'general');
            });
        })
        .catch(error => {
            console.error("Error fetching sports reminders:", error);
        });
}


function fetchQuizReminders() {
    fetch("http://127.0.0.1:8000/quiz/")
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('quiz-exam-list');
            list.innerHTML = ""; // Önce listeyi temizle
            data.quiz_reminders.forEach(reminder => {
                const listItem = document.createElement('li');
                listItem.textContent = `Date: ${reminder[1]} | Start Time: ${reminder[2]} | End Time: ${reminder[3]} | Subject: ${reminder[4]} (${reminder[5]})`;
                list.appendChild(listItem);

                // Takvime ekle
                const start = `${reminder[1]}T${reminder[2]}`;
                const end = `${reminder[1]}T${reminder[3]}`;
                addEventToCalendarDuration(reminder[4], start, end, 'quiz');
            });
        })
        .catch(error => {
            console.error("Error fetching quiz reminders:", error);
        });
}




function handleSportsForm(formData) {
    const list = document.getElementById('daily-sports-session-list');
    const date = formData.get('date');
    const startTime = formData.get('start-time');
    const endTime = formData.get('end-time');
    const activity = formData.get('activity');

    // Debugging logs to verify data received
    console.log("Form data received:", { date, startTime, endTime, activity });

    appendToList(list, `Date: ${date} | Start Time: ${startTime} | End Time: ${endTime} | Activity: ${activity}`);

    const start = `${date}T${startTime}`;
    const end = `${date}T${endTime}`;

    // Ensure the date and time formats are correct
    console.log("Adding to calendar:", { title: `Sports: ${activity}`, start, end });

    // Add to calendar only
    addEventToCalendarDuration(`Sports: ${activity}`, start, end, 'sports');
}

function handleAcademicForm(formData) {
    const list = document.getElementById('academic-list');
    const date = formData.get('date');
    const time = formData.get('time');
    const note = formData.get('note');

    appendToList(list, `Date: ${date} | Time: ${time} | Note: ${note}`);

    const start = `${date}T${time}`;
    addEventToCalendar(note, start, 'academic'); 
}

function handleGeneralForm(formData) {
    const list = document.getElementById('general-container');
    const date = formData.get('date');
    const time = formData.get('time');
    const note = formData.get('note');

    appendToList(list, `Date: ${date} | Time: ${time} | Note: ${note}`);

    const start = `${date}T${time}`;
    addGeneralReminder(String(date),String(time),"2h",String(note));
    addEventToCalendar(note, start, 'general'); 
}

function handleQuizForm(formData) {
    const list = document.getElementById('quiz-exam-list');
    const date = formData.get('date');
    const start_time = formData.get('start-time');
    const end_time = formData.get('end-time');
    const subject = formData.get('subject');
    const type = formData.get('type');

    appendToList(list, `Date: ${date} | Start Time: ${start_time} | End Time: ${end_time} | Subject: ${subject} (${type})`);

    const start = `${date}T${start_time}`;
    const end = `${date}T${end_time}`;
    addQuizReminder(date, start_time, end_time, subject, type);
    addEventToCalendarDuration(`${type.toUpperCase()}: ${subject}`, start, end, 'quiz');
}


function fetchQuizExamReminders() {
    fetch("http://127.0.0.1:8000/quiz_exam/")
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('quiz-exam-list');
            list.innerHTML = ""; // Önce listeyi temizle
            data.quiz_exam_reminders.forEach(reminder => {
                // Listeye ekle
                const listItem = document.createElement('li');
                listItem.textContent = `Date: ${reminder.date} | Start Time: ${reminder.start_time} | End Time: ${reminder.end_time} | Subject: ${reminder.subject} (${reminder.type})`;
                list.appendChild(listItem);

                // Takvime ekle
                const start = `${reminder.date}T${reminder.start_time}`;
                const end = `${reminder.date}T${reminder.end_time}`;
                addEventToCalendar(`${reminder.type.toUpperCase()}: ${reminder.subject}`, start, end, 'quiz');
            });
        })
        .catch(error => {
            console.error("Error fetching quiz/exam reminders:", error);
        });
}


function addEventToCalendarDuration(title, start, end, category) {
    if (calendarInstance) {
        calendarInstance.addEvent({
            title,
            start,
            end,
            extendedProps: {
                category
            }
        });
    } else {
        console.error('Calendar instance not initialized.');
    }
}


function handleStudySessionForm(formData) {
    const list = document.getElementById('study-session-list');
    const date = formData.get('date');
    const time = formData.get('time');
    const subject = formData.get('subject');

    appendToList(list, `Date: ${date} | Time: ${time} | Subject: ${subject}`);

    const start = `${date}T${time}`;
    addEventToCalendar(`Study: ${subject}`, start, 'academic');
}

function handleAssignmentForm(formData) {
    const list = document.getElementById('assignment-list');
    const dueDate = formData.get('due-date');
    const title = formData.get('title');
    const details = formData.get('details');

    appendToList(list, `Due: ${dueDate} | Title: ${title} | Details: ${details}`);

    const start = `${dueDate}T00:00`;
    addEventToCalendar(`Assignment: ${title}`, start, 'academic');
}

function parseEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(':').map(Number);
    const durationHours = parseInt(duration.match(/\d+/)[0], 10);
    const endHours = (hours + durationHours) % 24;
    return `${String(endHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function handleStudySessionForm(formData) {
    const list = document.getElementById('study-session-list');
    const date = formData.get('date');
    const time = formData.get('time');
    const subject = formData.get('subject');

    appendToList(list, `Date: ${date} | Time: ${time} | Subject: ${subject}`);

    const start = `${date}T${time}`;
    const duration = "1h";
    const endTime = parseEndTime(time, duration);
    addEventToCalendar(`Study: ${subject}`, start, 'academic', `${date}T${endTime}`);
}

function handleDailySportsSessionForm(formData) {
    const list = document.getElementById('daily-sports-session-list');
    const date = formData.get('date');
    const startTime = formData.get('start-time');
    const endTime = formData.get('end-time');
    const activity = formData.get('activity');

    appendToList(list, `Date: ${date} | Start Time: ${startTime} | End Time: ${endTime} | Activity: ${activity}`);

    const start = `${date}T${startTime}`;
    const end = `${date}T${endTime}`;

    // Add to calendar only
    addEventToCalendarDuration(`Sports: ${activity}`, start, end, 'sports');
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

function handleCalorieForm(formData) {
    const list = document.getElementById('calorie-list');
    const totalCalories = document.getElementById('total-calories');
    const food = formData.get('food');
    const calories = parseInt(formData.get('calories'), 10);

    appendToList(list, `${food}: ${calories} kcal`);

    const currentTotal = parseInt(totalCalories.textContent.replace(/\D/g, ''), 10) || 0;
    totalCalories.textContent = `Total Calories: ${currentTotal + calories}`;
}

function handleFitnessGoalForm(formData) {
    const goal = formData.get('goal'); 
    fitnessGoal = parseInt(goal, 10);
    currentProgress = 0; 

    const goalDisplay = document.getElementById('goal-display'); 
    goalDisplay.textContent = `Goal: ${fitnessGoal} reps`; 

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = "0%";
    progressBar.textContent = "0%"; 

    updateProgressBar(); 
}

function handleFitnessProgressForm(formData) {
    const date = formData.get('date');
    const reps = parseInt(formData.get('reps'), 10);
    const notes = formData.get('notes');
    currentProgress += reps;
    addFitnessProgress(date, reps, notes);
    updateProgressBar();
}

function appendToList(list, content) {
    if (list) {
        const listItem = document.createElement('li');
        listItem.textContent = content;
        list.appendChild(listItem);
    } else {
        console.error('List not found for content:', content);
    }
}

function addEventToCalendar(title, start, category) {
    if (calendarInstance) {
        calendarInstance.addEvent({
            title,
            start,
            extendedProps: {
                category
            }
        });
    } else {
        console.error('Calendar instance not initialized.');
    }
}

let eventToDelete = null;  // Silinecek etkinlik

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
        events: [
            {
                title: 'Meeting with John',
                start: '2024-12-15T10:00:00',
                end: '2024-12-15T12:00:00',
                category: 'academic',  // You can set the category as needed
            },
            {
                title: 'Yoga Class',
                start: '2024-12-16T08:00:00',
                end: '2024-12-16T09:00:00',
                category: 'sports',  // You can set the category as needed
            }
        ]
,        
        editable: true,  // Etkinlikleri taşımayı aktif hale getirir
        eventDidMount: function(info) {
            const category = info.event.extendedProps.category;
            // Kategorilere göre renk belirleme
            if (category === 'academic') {
                info.el.style.backgroundColor = '#0078D7';
            } else if (category === 'sports') {
                info.el.style.backgroundColor = '#FF5733';
            } else if (category === 'general') {
                info.el.style.backgroundColor = '#378006';
            }

            // Çarpı simgesini etkinlik üzerine ekleyelim
            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('delete-icon');
            deleteIcon.innerHTML = '×'; // Çarpı işareti
            info.el.appendChild(deleteIcon);

            // Çarpı simgesine tıklandığında etkinliği silme işlemi
            // Çarpı simgesine tıklandığında etkinliği silme işlemi
deleteIcon.addEventListener('click', function(e) {
    e.stopPropagation(); // Çarpıya tıklanınca eventClick işlevini tetiklemesin

    const confirmDelete = confirm('Are you sure you want to delete "${info.event.title}"?');
    if (confirmDelete) {
        const [day, time] = info.event.startStr.split('T'); // Tarih ve saat bilgisini al
        const desc = info.event.title; // Etkinlik açıklamasını al
        const duration = info.event.extendedProps.duration; // Süre bilgisini al
        const category = info.event.extendedProps.category; // Kategoriyi al

        // Kategoriye göre backend'e silme isteği gönder
        if (category === 'academic') {
            removeAcademicReminder(day, time, duration, desc);
        } else if (category === 'general') {
            removeGeneralReminder(day, time, duration, desc);
        } else if (category === 'sports') {
            removeSportsReminder(day, time, duration, desc);
        }

        // Takvimden etkinliği sil
        info.event.remove();
    }
});
        }
    });

    calendarInstance.render();

    // Modal öğeleri
    const deleteModal = document.getElementById('deleteModal');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');

    // Silme butonuna tıklanırsa, etkinliği takvimden sil
    confirmDelete.onclick = function() {
        if (eventToDelete) {
            // Etkinlik bilgilerini al
            const [day, time] = eventToDelete.startStr.split('T');
            const desc = eventToDelete.title; // Etkinlik başlığı
            const duration = eventToDelete.extendedProps.duration; // Etkinlik süresi
    
            // Kategoriye göre backend'e silme isteği gönder
            const category = eventToDelete.extendedProps.category;
            if (category === 'academic') {
                removeAcademicReminder(day, time, duration, desc);
            } else if (category === 'general') {
                removeGeneralReminder(day, time, duration, desc);
            } else if (category === 'sports') {
                removeSportsReminder(day, time, duration, desc);
            }
    
            // Takvimden etkinliği sil
            eventToDelete.remove();
    
            // Modal'ı kapat
            deleteModal.style.display = 'none';
        }
    };

    // İptal butonuna tıklanırsa, modal'ı kapat
    cancelDelete.onclick = function() {
        deleteModal.style.display = 'none';
    };

    // Modal dışına tıklanırsa, modal'ı kapat
    window.onclick = function(event) {
        if (event.target === deleteModal) {
            deleteModal.style.display = 'none';
        }
    };
}



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




// Akademik bir hatırlatıcıyı sil
function removeAcademicReminder(day, time, desc) {
    const data = { day, time, desc };
    
    fetch("http://127.0.0.1:8000/academic/", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log("Academic reminder removed successfully");
            fetchAcademicReminders(); // Listeyi güncelle
            removeEventFromCalendar(day, time, desc); // Takvimden sil
        } else {
            return response.json().then(err => {
                throw new Error(err.detail);
            });
        }
    })
    .catch(error => {
        console.error("Error removing academic reminder:", error);
    });
}

// Genel bir hatırlatıcıyı sil
// Genel bir hatırlatıcıyı sil
function removeGeneralReminder(day, time, desc) {
    // URL parametreleri ile direkt isteği oluştur
    const url = 'http://127.0.0.1:8000/general/?day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}&desc=${encodeURIComponent(desc)}';

    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            console.log("General reminder removed successfully");
            fetchGeneralReminders(); // Listeyi güncelle
            removeEventFromCalendar(day, time); // Takvimden sil
        } else {
            return response.json().then(err => {
                throw new Error(err.detail);
            });
        }
    })
    .catch(error => {
        console.error("Error removing general reminder:", error);
    });
}


// Spor bir hatırlatıcıyı sil
function removeSportsReminder(day, time, type) {
    const data = { day, time, type };
    
    fetch("http://127.0.0.1:8000/sports/", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log("Sports reminder removed successfully");
            fetchSportsReminders(); // Listeyi güncelle
            removeEventFromCalendar(day, time, type); // Takvimden sil
        } else {
            return response.json().then(err => {
                throw new Error(err.detail);
            });
        }
    })
    .catch(error => {
        console.error("Error removing sports reminder:", error);
    });
}

