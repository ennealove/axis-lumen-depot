(function () {
  "use strict";

  const allVideos = [
    {
        "file":  "balancement-lateral-complet.mp4",
        "path":  "assets/videos/complete/balancement-lateral-complet.mp4"
    },
    {
        "file":  "balancement-vertical-complet.mp4",
        "path":  "assets/videos/complete/balancement-vertical-complet.mp4"
    },
    {
        "file":  "observer-la-lumiere-2.mp4",
        "path":  "assets/videos/complete/observer-la-lumiere-2.mp4"
    },
    {
        "file":  "respiration-complete-10-minutes.mp4",
        "path":  "assets/videos/complete/respiration-complete-10-minutes.mp4"
    },
    {
        "file":  "tension-statique-complete.mp4",
        "path":  "assets/videos/complete/tension-statique-complete.mp4"
    },
    {
        "file":  "balancement-lateral-complet.web.mp4",
        "path":  "assets/videos/web/balancement-lateral-complet.web.mp4"
    },
    {
        "file":  "balancement-vertical-complet.web.mp4",
        "path":  "assets/videos/web/balancement-vertical-complet.web.mp4"
    },
    {
        "file":  "observer-la-lumiere-2.web.mp4",
        "path":  "assets/videos/web/observer-la-lumiere-2.web.mp4"
    },
    {
        "file":  "respiration-complete-10-minutes.web.mp4",
        "path":  "assets/videos/web/respiration-complete-10-minutes.web.mp4"
    },
    {
        "file":  "tension-statique-complete.web.mp4",
        "path":  "assets/videos/web/tension-statique-complete.web.mp4"
    },
    {
        "file":  "allumez la lumiere .mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/allumez la lumiere .mp4"
    },
    {
        "file":  "allumé la lumière.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/allumé la lumière.mp4"
    },
    {
        "file":  "balancement latéral complet 27 secondes.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/balancement latéral complet 27 secondes.mp4"
    },
    {
        "file":  "balancement latéral.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/balancement latéral.mp4"
    },
    {
        "file":  "balancement vertical (4 minute).mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/balancement vertical (4 minute).mp4"
    },
    {
        "file":  "balancement vertical.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/balancement vertical.mp4"
    },
    {
        "file":  "bras droit.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/bras droit.mp4"
    },
    {
        "file":  "bras gauche bis.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/bras gauche bis.mp4"
    },
    {
        "file":  "bras gauche.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/bras gauche.mp4"
    },
    {
        "file":  "gyrascope.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/gyrascope.mp4"
    },
    {
        "file":  "jambe droite.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/jambe droite.mp4"
    },
    {
        "file":  "jambe gauche.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/jambe gauche.mp4"
    },
    {
        "file":  "respiration 1.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/respiration 1.mp4"
    },
    {
        "file":  "respiration 2.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/respiration 2.mp4"
    },
    {
        "file":  "spiral.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/spiral.mp4"
    },
    {
        "file":  "tension statique 2.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/tension statique 2.mp4"
    },
    {
        "file":  "tension statique.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/tension statique.mp4"
    },
    {
        "file":  "tete.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/tete.mp4"
    },
    {
        "file":  "ventre.mp4",
        "path":  "assets/vidéo/vidéo complète/séquencage vidéo/ventre.mp4"
    },
    {
        "file":  "allumer la lumière 30 secondes.mp4",
        "path":  "assets/vidéo/vidéo complète/utiles/allumer la lumière 30 secondes.mp4"
    },
    {
        "file":  "balancement latéral 3 minutes .mp4",
        "path":  "assets/vidéo/vidéo complète/utiles/balancement latéral 3 minutes .mp4"
    },
    {
        "file":  "balancement vertical 3 minutes .mp4",
        "path":  "assets/vidéo/vidéo complète/utiles/balancement vertical 3 minutes .mp4"
    },
    {
        "file":  "détente.mp4",
        "path":  "assets/vidéo/vidéo complète/utiles/détente.mp4"
    },
    {
        "file":  "respiration .mp4",
        "path":  "assets/vidéo/vidéo complète/utiles/respiration .mp4"
    },
    {
        "file":  "respiration 10 minutes.mp4",
        "path":  "assets/vidéo/vidéo complète/utiles/respiration 10 minutes.mp4"
    },
    {
        "file":  "rotation.mp4",
        "path":  "assets/vidéo/vidéo complète/utiles/rotation.mp4"
    },
    {
        "file":  "tension statique .mp4",
        "path":  "assets/vidéo/vidéo complète/utiles/tension statique .mp4"
    },
    {
        "file":  "balancement latéral complet.mp4",
        "path":  "assets/vidéo/vidéo complète/vidéo complète/balancement latéral complet.mp4"
    },
    {
        "file":  "balancement vertical complet.mp4",
        "path":  "assets/vidéo/vidéo complète/vidéo complète/balancement vertical complet.mp4"
    },
    {
        "file":  "respiration complète 10 minutes.mp4",
        "path":  "assets/vidéo/vidéo complète/vidéo complète/respiration complète 10 minutes.mp4"
    },
    {
        "file":  "rotation .mp4",
        "path":  "assets/vidéo/vidéo complète/vidéo complète/rotation .mp4"
    },
    {
        "file":  "tension statique .mp4",
        "path":  "assets/vidéo/vidéo complète/vidéo complète/tension statique .mp4"
    }
];
  const byRole = {
    "light_on":  "assets/videos/complete/observer-la-lumiere-2.mp4",
    "lateral_swing":  "assets/videos/complete/balancement-lateral-complet.mp4",
    "vertical_swing":  "assets/videos/complete/balancement-vertical-complet.mp4",
    "rotation_swing":  "assets/vidéo/vidéo complète/utiles/rotation.mp4",
    "breathing":  "assets/videos/complete/respiration-complete-10-minutes.mp4",
    "gyro_rotation":  "assets/vidéo/vidéo complète/séquencage vidéo/gyrascope.mp4",
    "rotor":  "assets/vidéo/vidéo complète/séquencage vidéo/gyrascope.mp4",
    "static_tension":  "assets/videos/complete/tension-statique-complete.mp4"
};

  const aliases = {
    light: "light_on",
    light_on: "light_on",
    lumiere: "light_on",
    lampe: "light_on",
    fixation: "light_on",

    lateral: "lateral_swing",
    lateral_swing: "lateral_swing",
    balancement_lateral: "lateral_swing",

    vertical: "vertical_swing",
    vertical_swing: "vertical_swing",
    balancement_vertical: "vertical_swing",

    rotation: "rotation_swing",
    rotation_swing: "rotation_swing",
    rotational_swing: "rotation_swing",

    respiration: "breathing",
    breathing: "breathing",
    breath: "breathing",
    souffle: "breathing",

    gyro: "gyro_rotation",
    gyrascope: "gyro_rotation",
    gyro_rotation: "gyro_rotation",
    rotor: "gyro_rotation",
    rotor_optique: "gyro_rotation",

    tension: "static_tension",
    tensions: "static_tension",
    static_tension: "static_tension",
    static_tensions: "static_tension"
  };

  function canonical(role) {
    const key = String(role || "").trim();
    return aliases[key] || aliases[key.toLowerCase()] || key;
  }

  function get(role) {
    const key = canonical(role);
    return byRole[key] || null;
  }

  function list() {
    return allVideos.slice();
  }

  const api = {
    allVideos,
    byRole,
    aliases,
    canonical,
    get,
    list
  };

  window.AXIS_LUMEN_VIDEO_ENUMS = api;
  window.PHOSPHENE_VIDEO_ENUMS = api;
  window.VIDEO_ROLE_MAP = Object.assign({}, byRole, {
    light: byRole.light_on || null,
    lateral: byRole.lateral_swing || null,
    vertical: byRole.vertical_swing || null,
    rotation: byRole.rotation_swing || null,
    respiration: byRole.breathing || null,
    breathing: byRole.breathing || null,
    gyro: byRole.gyro_rotation || byRole.rotor || null,
    gyrascope: byRole.gyro_rotation || byRole.rotor || null,
    rotor: byRole.gyro_rotation || byRole.rotor || null,
    tension: byRole.static_tension || null,
    tensions: byRole.static_tension || null
  });

  document.dispatchEvent(new CustomEvent("axis-lumen:video-enums-ready", { detail: api }));
})();