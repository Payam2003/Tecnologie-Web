var timeout;
var interval;
var i=0;
let progressBar = document.getElementById('progressBar');
let progressWidth = 100;
let progressPause = 100;
let progressBarPause = document.getElementById('progressBarr');

function start() {
  var tot = parseInt(document.getElementById('tot').value);
  if(i<tot){
    i++;
    const studyTime = parseInt(document.getElementById('study').value);
    const endTime = Date.now() + studyTime * 60000;
    timeout = setInterval(function () {
      const now = Date.now();
      const difference = endTime - now;
      if(difference <= 0){
        document.getElementById('countdown').classList.remove('animate');
        document.getElementById('countdown').textContent = '00:00';
        clearInterval(timeout);
        stop();
        return
      }

      const progress = (difference / (studyTime * 60000)) * 100;
      progressWidth = progress < 0 ? 0 : progress;
      progressBar.style.width = progressWidth + '%';

      // Calcola i minuti e i secondi rimanenti
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Visualizza il tempo rimanente nell'elemento con id 'timerDisplay'
    //padstart aggiunge uno zero prima della stringa se non raggiunge almeno una lunghezza di 2
      document.getElementById('countdown').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      // Aggiungi la classe per l'animazione
      document.getElementById('countdown').classList.add('animate');

      // Rimuovi la classe dopo un breve ritardo per consentire la ripetizione dell'animazione

    }, 1000);
  }else{
    alert('Fine sessione!')
    return
  }
}


function stop() {
  const pauseTime = parseInt(document.getElementById('pause').value);
  const endTime = Date.now() + pauseTime * 60000; // Converti in millisecondi

  interval = setInterval(function () {
    const now = Date.now();
    const diff = endTime - now;
    
    if (diff <= 0) {
      clearInterval(interval);
      document.getElementById('countpause').classList.remove('animate');
      document.getElementById('countpause').textContent = '00:00';
      start();
      return
    } 
    const progress = (diff / (pauseTime * 60000)) * 100;
    progressPause = progress < 0 ? 0 : progress;
    progressBarPause.style.width = progress + '%'; // Aggiorna la barra di progresso della pausa
    
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countpause').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Aggiungi la classe per l'animazione
    document.getElementById('countpause').classList.add('animate');

    // Rimuovi la classe dopo un breve ritardo per consentire la ripetizione dell'animazione
  }, 1000); // Ogni secondo
} 
document.getElementById('time').onclick = function() { start() };
