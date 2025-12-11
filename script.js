function tmblhidupNmatiku() {
       
    document.querySelector(".tombol").classList.toggle("active");
    document.getElementById("alarm-toggle").classList.toggle("on");


}
let notif = new Audio("suara.mp3");
function popup() {
    document.querySelector(".popup").classList.toggle("active");
}

let alarmJam = null;
let alarmMenit = null;
let alarmCatatan = null;

function centang() {
    let waktu = document.querySelector(".alarmkibidi").value;
    let catatan = document.querySelector(".notekibidi").value;

    if (!waktu) {
        return alert("Waktu Tidak Boleh Kosong");
    }

    let [jam, menit] = waktu.split(":");

    alarmJam = parseInt(jam);
    alarmMenit = parseInt(menit);
    alarmCatatan = catatan;

    document.getElementById('jam').innerHTML = waktu;
    document.getElementById('catatan').innerHTML = catatan;

    document.querySelector(".popup").classList.toggle("active");
}



function updateCurrentTime() {
    const skrg = new Date();
    const hours = skrg.getHours();
    const minutes = skrg.getMinutes();

    document.querySelector('h1.tes').innerHTML =
        String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0');


    if(document.getElementById("alarm-toggle").classList.contains("on")) {
          if (alarmJam === hours && alarmMenit === minutes) {
        if (alarmCatatan) {
            alert(alarmCatatan);
        } else {
            alert("Alarm sudah berbunyi!\nPada pukul " + 
                  String(hours).padStart(2, '0') + ":" + 
                  String(minutes).padStart(2, '0'));
        }

        alarmJam = null;
        alarmMenit = null;
        alarmCatatan = null;
        notif.play();
        }
    }
    else{
        notif.pause();
    }
      
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime();
