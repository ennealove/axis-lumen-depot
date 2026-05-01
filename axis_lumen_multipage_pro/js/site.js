
(function(){
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-link').forEach(a=>{
    if(a.dataset.page===page) a.classList.add('active');
  });

  document.querySelectorAll('.go-view').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = btn.dataset.target;
      const map = {
        session:'creer-seance.html',
        pratique:'pratiquer.html',
        boutique:'boutique.html',
        abonnement:'abonnement.html',
        apropos:'a-propos.html',
        parrainage:'parrainage.html'
      };
      if(map[target]) location.href = map[target];
    });
  });

  const build = document.getElementById('buildSession');
  if(build){
    build.addEventListener('click', ()=>{
      const intent = document.getElementById('intent').value;
      const movement = document.getElementById('movement').value;
      const breath = document.getElementById('breath').value;
      const duration = document.getElementById('duration').value;
      const result = document.getElementById('sessionResult');
      result.innerHTML = `
        <h2>Séance ${intent}</h2>
        <p>Durée : <strong>${duration}</strong></p>
        <ol class="timeline">
          <li><strong>Préparation</strong><span>Posture, silence, intention : ${intent}.</span></li>
          <li><strong>Lumière</strong><span>Observation 20 à 30 secondes, puis yeux fermés.</span></li>
          <li><strong>Mouvement</strong><span>${movement}, lent et régulier.</span></li>
          <li><strong>Souffle</strong><span>${breath}, sans forcer.</span></li>
          <li><strong>Intégration</strong><span>Écrire une trace courte dans le carnet.</span></li>
        </ol>`;
    });
  }

  const copyRef = document.getElementById('copyRef');
  if(copyRef){
    copyRef.addEventListener('click', async ()=>{
      const link = document.getElementById('refLink').value;
      try { await navigator.clipboard.writeText(link); copyRef.textContent='Copié'; }
      catch(e){ document.getElementById('refLink').select(); document.execCommand('copy'); }
      setTimeout(()=>copyRef.textContent='Copier', 1200);
    });
  }

  document.querySelectorAll('[data-video]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.video;
      const title = btn.dataset.title;
      const video = document.querySelector('.studio-video');
      const titleNode = document.getElementById('practiceTitle');
      if(video){
        video.innerHTML = `
          <source src="assets/videos/web/${id}.web.mp4" type="video/mp4">
          <source src="assets/videos/web/${id}.mp4" type="video/mp4">
          Ton navigateur ne peut pas lire cette vidéo.`;
        video.load();
      }
      if(titleNode) titleNode.textContent = title;
    });
  });

  const saveNotes = document.getElementById('saveNotes');
  if(saveNotes){
    const area = document.getElementById('practiceNotes');
    area.value = localStorage.getItem('axis_lumen_practice_notes') || '';
    saveNotes.addEventListener('click', ()=>{
      localStorage.setItem('axis_lumen_practice_notes', area.value || '');
      saveNotes.textContent = 'Sauvegardé';
      setTimeout(()=>saveNotes.textContent='Sauvegarder localement', 1200);
    });
  }
})();
