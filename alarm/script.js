let suara = new Audio("horeg.mp3")

// waktu rt
function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    
    // atur waktu
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    // tanggal
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('id-ID', options);

    // Reset dismissed jika menit berganti
    resetDismissedIfNeeded(minutes);

    // cek alarm
    checkAlarms(hours, minutes);
}

// data alarm
let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
let activeAlarmTime = JSON.parse(localStorage.getItem('activeAlarmTime')) || null;

// Daftar alarm yang diabaikan di menit yang sama (agar tidak bunyi lagi)
let dismissedAlarms = JSON.parse(localStorage.getItem('dismissedAlarms')) || [];

// mendeteksi pergantian menit
let lastMinute = null;

// Reset dismissed ketika menit berubah
function resetDismissedIfNeeded(currentMinute) {
    if (lastMinute !== currentMinute) {
        dismissedAlarms = [];
        localStorage.removeItem('dismissedAlarms');
        lastMinute = currentMinute;
    }
}

// Tampilkan alarm
function displayAlarms() {
    const alarmContainer = document.getElementById('alarm-container');
    alarmContainer.innerHTML = '';

    if (alarms.length === 0) {
        alarmContainer.innerHTML = '<p>Tidak ada alarm yang diatur</p>';
        return;
    }

    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('div');
        alarmItem.className = 'alarm-item';
        alarmItem.innerHTML = `
            <div class="alarm-time">${alarm.hour}:${alarm.minute}</div>
            <button class="delete-alarm" data-index="${index}">Hapus</button>
        `;
        alarmContainer.appendChild(alarmItem);
    });

    document.querySelectorAll('.delete-alarm').forEach(button => {
        button.addEventListener('click', function() {
            deleteAlarm(parseInt(this.getAttribute('data-index')));
        });
    });
}

// nambahin alarm baru
document.getElementById('set-alarm').addEventListener('click', function() {
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;

    if (!hour || !minute) {
        alert('Silakan pilih waktu untuk alarm!');
        return;
    }

    alarms.push({ hour, minute });
    localStorage.setItem('alarms', JSON.stringify(alarms));

    displayAlarms();
    alert(`Alarm berhasil diatur untuk pukul ${hour}:${minute}`);
});

// hapus alarm
function deleteAlarm(index) {
    alarms.splice(index, 1);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    displayAlarms();
}

// cek alarm
function checkAlarms(currentHour, currentMinute) {
    const stopAlarmBtn = document.getElementById('stop-alarm');
    const timeDisplay = document.getElementById('current-time');

    // matikan alarm otomatis setelah 1 menit
    if (activeAlarmTime) {
        const [alarmHour, alarmMinute] = activeAlarmTime.split(':');

        if (isOneMinutePassed(alarmHour, alarmMinute, currentHour, currentMinute)) {
            timeDisplay.classList.remove('alarm-active');
            stopAlarmBtn.style.display = 'none';
            activeAlarmTime = null;
            localStorage.removeItem('activeAlarmTime');
        }
    }

    // cek alarm cocok
    const matchingAlarm = alarms.find(alarm => {
        const alarmTime = `${alarm.hour}:${alarm.minute}`;
        return (
            alarm.hour === currentHour &&
            alarm.minute === currentMinute &&
            !dismissedAlarms.includes(alarmTime) &&
            !activeAlarmTime
        );
    });

    // jika ada alarm baru
    if (matchingAlarm) {
        const alarmTime = `${currentHour}:${currentMinute}`;

        // aktifkan alarm
        timeDisplay.classList.add('alarm-active');
        stopAlarmBtn.style.display = 'block';
        activeAlarmTime = alarmTime;
        localStorage.setItem('activeAlarmTime', JSON.stringify(activeAlarmTime));
        suara.play()

        // jika tab tidak aktif → Notifikasi
        if (document.hidden && Notification.permission === 'granted') {
            new Notification('Alarm Banyuwangi', {
                body: `Waktunya bangun! Sekarang pukul ${alarmTime}`,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⏰</text></svg>'
            });
        }

        // alarm sudah berbunyi → masukkan ke dismissed
        dismissedAlarms.push(alarmTime);
        localStorage.setItem('dismissedAlarms', JSON.stringify(dismissedAlarms));
    }
}

// cek sudah lewat 1 menit
function isOneMinutePassed(alarmHour, alarmMinute, currentHour, currentMinute) {
    const alarmTotal = parseInt(alarmHour) * 60 + parseInt(alarmMinute);
    const currentTotal = parseInt(currentHour) * 60 + parseInt(currentMinute);
    return currentTotal >= alarmTotal + 1;
    suara.pause()
}

// stop alarm manual
document.getElementById('stop-alarm').addEventListener('click', function() {
    const timeDisplay = document.getElementById('current-time');
    timeDisplay.classList.remove('alarm-active');
    this.style.display = 'none';
    suara.pause()

    if (activeAlarmTime) {
        dismissedAlarms.push(activeAlarmTime);
        localStorage.setItem('dismissedAlarms', JSON.stringify(dismissedAlarms));
    }

    activeAlarmTime = null;
    localStorage.removeItem('activeAlarmTime');
});

// njalok izin notifikasi
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Inisialisasi
updateTime();
displayAlarms();
setInterval(updateTime, 1000);

function pulauMerah(){
    document.querySelector('body').style.background
}


