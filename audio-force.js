(() => {
  const AUDIO_FILES = [
    "35433346-angelic-meditation-172334.mp3",
    "alan_frijns-dunbarton-meditative-ambient-soundscape-for-learning-and-relaxing-95403.mp3",
    "alan_frijns-full-moon-deep-relaxation-meditation-yoga-zen-positive-sleep-music-140639.mp3",
    "alan_frijns-rain-in-the-paradise-forest-yoga-zen-relaxation-positive-sleep-music-140636.mp3",
    "AUD-20251120-WA0006.mp3",
    "ck3_piste_01.mp3",
    "ck3_piste_02.mp3",
    "ck3_piste_02.wav",
    "ck3_piste_03.mp3",
    "ck3_piste_03.wav",
    "ck3_piste_04.mp3",
    "ck3_piste_04.wav",
    "equilibrage rythme 1 sec alt.wav",
    "light_music-heavenly-energy-188908.mp3",
    "light_music-lonely-heart-190966.mp3",
    "light_music-zen-walk-176110.mp3",
    "mantra_aum_20mn.mp3",
    "mantra_aum_3mn.mp3",
    "neuro_piste_01.mp3",
    "neuro_piste_02.mp3",
    "neuro_piste_03.mp3",
    "neuro_piste_04.mp3",
    "neuro_piste_05.mp3",
    "neuro_piste_06.mp3",
    "neuro_piste_07.mp3",
    "OM_en_mi.mp3",
    "OM-Mantra-01.mp3",
    "OM-Mantra-02.mp3",
    "OM-Mantra-03.mp3",
    "OM-Mantra-04.mp3",
    "onetent-realxing-meditation-music-1-225174.mp3",
    "petrushkasound-healing-meditative-music-438191.mp3",
    "petrushkasound-yoga-calming-music-438215.mp3",
    "relaxingtime-healing-sounds-124056.mp3",
    "relaxingtime-relax-music-vol10-188655 (1).mp3",
    "relaxingtime-relax-music-vol10-188655.mp3",
    "relaxingtime-sleep-music-121638.mp3",
    "Respirations-Phosphenique.mp3",
    "rockot-airy-meditation-background-184567.mp3",
    "rockot-ambient-for-meditation-184568.mp3",
    "rockot-beautiful-meditative-ambient-184570.mp3",
    "rockot-meditation-and-gentle-nature-184572.mp3",
    "rythme_1s_3mn.mp3",
    "rythme_1s_alt_3mn.mp3",
    "rythme_6eme_s_alt_15mn.mp3",
    "rythme_afr_austr_1s_alt_6e_sec_3min.mp3",
    "rythme_afrique1_1s_4mn.mp3",
    "rythme_afrique2_1s_4mn.mp3",
    "rythme_australie1_1.05s_4mn.mp3",
    "rythme_australie2_ 1.12s_4mn.mp3",
    "rythme_australie3_0.94s_4mn.mp3",
    "rythme_australie4_om.mp3",
    "rythme_bass_rotations_1s_6e_sec_8min.mp3",
    "rythme_cloches_3s_8min.mp3",
    "rythme_electro1_1.01s_4mn.mp3",
    "rythme_electro2_1.11s_4mn.mp3",
    "rythme_electro3_1.16s_4mn.mp3",
    "rythme_multidimensionnel_1s_alt_6e_sec_11min.mp3",
    "rythme_rapide_1s_6e_sec_8min.mp3",
    "rythme_tictac_1s_6e_sec_8min.mp3",
    "rythme_toumtac_1s_6e_sec_8min.mp3",
    "sonorahealing-healing-sound-396_-hz-452272.mp3",
    "tim_kulig_free_music-deep-5hz-theta-relaxation-232572.mp3",
    "variation_78Hz_144Hz_6eme_s_30s.mp3"
  ];

  const SELECT_IDS = [
    "mixageAudio",
    "breathAudio",
    "gyroAudio",
    "tensionAudio",
    "sessionMixageAudio",
    "sessionBreathAudio",
    "sessionFinalAudio"
  ];

  function makeId(name) {
    return "force-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function fillSelect(select) {
    if (!select) return;
    const current = select.value || "";
    const seen = new Set();

    const first = document.createElement("option");
    first.value = "";
    first.textContent = "Aucun";

    const frag = document.createDocumentFragment();
    frag.appendChild(first);

    for (const file of AUDIO_FILES) {
      const value = makeId(file);
      if (seen.has(value)) continue;
      seen.add(value);

      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = file;
      frag.appendChild(opt);
    }

    select.innerHTML = "";
    select.appendChild(frag);

    if ([...select.options].some(o => o.value === current)) {
      select.value = current;
    }
  }

  function fillAll() {
    SELECT_IDS.forEach(id => fillSelect(document.getElementById(id)));
  }

  function run() {
    fillAll();
    setTimeout(fillAll, 300);
    setTimeout(fillAll, 1000);
    setTimeout(fillAll, 2500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
