function tmblhidupNmatiku(){
    document.querySelector(".tombol").classList.toggle("active")
}
function popup(){
    document.querySelector(".popup").classList.toggle("active")
}

function updateCurrentTime(){
    const skrg = new Date()
    const hours = skrg.getHours()
    const minutes = skrg.getMinutes()
    document.querySelector('h1.tes').innerHTML = hours + ":" + minutes
}
setInterval(updateCurrentTime,1000)
updateCurrentTime()
function centang(){
    let waktu = document.querySelector(".alarmkibidi").value
    let [jam,menit] = waktu.split(":")
    let catatan = document.querySelector(".notekibidi").value
    if(jam!=null&&menit!=null){
        document.getElementById('jam').innerHTML = waktu
        document.getElementById('catatan').innerHTML = catatan
        document.querySelector(".popup").classList.toggle("active")
    }
    else{
        alert("Waktu Tidak Boleh Kosong")
    }
}
if(jam==hours&&menit==minutes){
    if(catatan!=null){
        alert(catatan)
    }
    else{
        alert("Alarm sudah berbunyi !!! /n pada pukul "+waktu)
    }
}
