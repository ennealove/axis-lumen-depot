// axis-pdf-paths-patch.js
// Patch automatique des chemins PDF pour les 112 cours
// Genere automatiquement - ne pas modifier a la main
(function() {
  "use strict";
  var PDF_MAP = {
    1: "data/courses/Axis_Lumen_Cours_001_PACK/pdf/Cours_001_la_loi_des_deux_secondes.pdf",
    2: "data/courses/Axis_Lumen_Cours_002_PACK/pdf/Cours_002_préparer_le_lieu_préparer_le_corps.pdf",
    3: "data/courses/Axis_Lumen_Cours_003_PACK/pdf/Cours_003_le_carnet_de_lexpérience.pdf",
    4: "data/courses/Axis_Lumen_Cours_004_PACK/pdf/Cours_004_clore_une_séance.pdf",
    5: "data/courses/Axis_Lumen_Cours_005_PACK/pdf/Cours_005_préparer_une_séance_ouvrir_le_seuil.pdf",
    6: "data/courses/Axis_Lumen_Cours_006_PACK/pdf/Cours_006_clore_une_séance.pdf",
    7: "data/courses/Axis_Lumen_Cours_007_PACK/pdf/Cours_007_présence_carte_et_lumière.pdf",
    8: "data/courses/Axis_Lumen_Cours_008_PACK/pdf/Cours_008_construire_une_séance_dune_heure.pdf",
    9: "data/courses/Axis_Lumen_Cours_009_PACK/pdf/Cours_009_terrain_vivant_eau_sang_souffle_minéraux.pdf",
    10: "data/courses/Axis_Lumen_Cours_010_PACK/pdf/Cours_010_alimentation_fraîche_et_réduction_de_la_.pdf",
    11: "data/courses/Axis_Lumen_Cours_011_PACK/pdf/Cours_011_émonctoires_intestins_reins_foie_lymphe.pdf",
    12: "data/courses/Axis_Lumen_Cours_012_PACK/pdf/Cours_012_rh²_ph_et_résistivité_boussole_du_terrai.pdf",
    13: "data/courses/Axis_Lumen_Cours_013_PACK/pdf/Cours_013_électrolytes_sel_complet_et_conductivité.pdf",
    14: "data/courses/Axis_Lumen_Cours_014_PACK/pdf/Cours_014_jeûne_juste_et_temps_sans_manger.pdf",
    15: "data/courses/Axis_Lumen_Cours_015_PACK/pdf/Cours_015_recettes_de_clarification_avant_pratique.pdf",
    16: "data/courses/Axis_Lumen_Cours_016_PACK/pdf/Cours_016_protocole_terrain_de_sept_jours.pdf",
    17: "data/courses/Axis_Lumen_Cours_017_PACK/pdf/Cours_017_soleil_visible_et_lumière_intérieure.pdf",
    18: "data/courses/Axis_Lumen_Cours_018_PACK/pdf/Cours_018_prudence_oculaire_et_observation_douce.pdf",
    19: "data/courses/Axis_Lumen_Cours_019_PACK/pdf/Cours_019_rémanence_lumineuse_et_système_nerveux.pdf",
    20: "data/courses/Axis_Lumen_Cours_020_PACK/pdf/Cours_020_lumière_du_matin_et_rythme_circadien.pdf",
    21: "data/courses/Axis_Lumen_Cours_021_PACK/pdf/Cours_021_photons_attention_et_plasticité_cérébral.pdf",
    22: "data/courses/Axis_Lumen_Cours_022_PACK/pdf/Cours_022_lumière_sommeil_et_réparation.pdf",
    23: "data/courses/Axis_Lumen_Cours_023_PACK/pdf/Cours_023_source_lumineuse_intention_et_imprégnati.pdf",
    24: "data/courses/Axis_Lumen_Cours_024_PACK/pdf/Cours_024_intégrer_la_lumière_dans_la_journée.pdf",
    25: "data/courses/Axis_Lumen_Cours_025_PACK/pdf/Cours_025_loi_du_rythme_biologique.pdf",
    26: "data/courses/Axis_Lumen_Cours_026_PACK/pdf/Cours_026_alternance_gauche-droite_et_attention.pdf",
    27: "data/courses/Axis_Lumen_Cours_027_PACK/pdf/Cours_027_nombre_dor_comme_architecture_vivante.pdf",
    28: "data/courses/Axis_Lumen_Cours_028_PACK/pdf/Cours_028_fractales_du_vivant_et_perception.pdf",
    29: "data/courses/Axis_Lumen_Cours_029_PACK/pdf/Cours_029_spirales_proportions_et_axe_intérieur.pdf",
    30: "data/courses/Axis_Lumen_Cours_030_PACK/pdf/Cours_030_rythmes_cérébraux_et_états_de_conscience.pdf",
    31: "data/courses/Axis_Lumen_Cours_031_PACK/pdf/Cours_031_musique_mantra_et_cadence.pdf",
    32: "data/courses/Axis_Lumen_Cours_032_PACK/pdf/Cours_032_construire_un_protocole_rythmique_person.pdf",
    33: "data/courses/Axis_Lumen_Cours_033_PACK/pdf/Cours_033_ce_qui_est_en_haut_comme_ce_qui_est_en_b.pdf",
    34: "data/courses/Axis_Lumen_Cours_034_PACK/pdf/Cours_034_le_miroir_inversé_de_lincarnation.pdf",
    35: "data/courses/Axis_Lumen_Cours_035_PACK/pdf/Cours_035_polarités_axe_croix_et_retournement.pdf",
    36: "data/courses/Axis_Lumen_Cours_036_PACK/pdf/Cours_036_descendre_pour_élever.pdf",
    37: "data/courses/Axis_Lumen_Cours_037_PACK/pdf/Cours_037_ombre_lumière_et_inversion_du_regard.pdf",
    38: "data/courses/Axis_Lumen_Cours_038_PACK/pdf/Cours_038_symbolique_du_temple_inversé.pdf",
    39: "data/courses/Axis_Lumen_Cours_039_PACK/pdf/Cours_039_intégrer_linversion_dans_les_exercices.pdf",
    40: "data/courses/Axis_Lumen_Cours_040_PACK/pdf/Cours_040_méditation_du_retournement_intérieur.pdf",
    41: "data/courses/Axis_Lumen_Cours_041_PACK/pdf/Cours_041_balancement_latéral_complet.pdf",
    42: "data/courses/Axis_Lumen_Cours_042_PACK/pdf/Cours_042_balancement_vertical_complet.pdf",
    43: "data/courses/Axis_Lumen_Cours_043_PACK/pdf/Cours_043_balancement_antéro-postérieur.pdf",
    44: "data/courses/Axis_Lumen_Cours_044_PACK/pdf/Cours_044_balancement_en_huit.pdf",
    45: "data/courses/Axis_Lumen_Cours_045_PACK/pdf/Cours_045_balancement_en_croix.pdf",
    46: "data/courses/Axis_Lumen_Cours_046_PACK/pdf/Cours_046_rotation_douce.pdf",
    47: "data/courses/Axis_Lumen_Cours_047_PACK/pdf/Cours_047_fer_à_cheval_et_perception_arrière.pdf",
    48: "data/courses/Axis_Lumen_Cours_048_PACK/pdf/Cours_048_séance_combinée_de_balancements.pdf",
    49: "data/courses/Axis_Lumen_Cours_049_PACK/pdf/Cours_049_yoga_du_temple_vivant.pdf",
    50: "data/courses/Axis_Lumen_Cours_050_PACK/pdf/Cours_050_postures_statiques_et_axe.pdf",
    51: "data/courses/Axis_Lumen_Cours_051_PACK/pdf/Cours_051_respiration_naturelle.pdf",
    52: "data/courses/Axis_Lumen_Cours_052_PACK/pdf/Cours_052_respiration_carrée.pdf",
    53: "data/courses/Axis_Lumen_Cours_053_PACK/pdf/Cours_053_respiration_triangulaire_et_rectangulair.pdf",
    54: "data/courses/Axis_Lumen_Cours_054_PACK/pdf/Cours_054_mantras_illi_alla_ollo_roro.pdf",
    55: "data/courses/Axis_Lumen_Cours_055_PACK/pdf/Cours_055_om_et_vibration_intérieure.pdf",
    56: "data/courses/Axis_Lumen_Cours_056_PACK/pdf/Cours_056_séquence_souffle_mantra_et_mouvement.pdf",
    57: "data/courses/Axis_Lumen_Cours_057_PACK/pdf/Cours_057_développer_limagination_sensorielle.pdf",
    58: "data/courses/Axis_Lumen_Cours_058_PACK/pdf/Cours_058_stabiliser_un_point_lumineux_interne.pdf",
    59: "data/courses/Axis_Lumen_Cours_059_PACK/pdf/Cours_059_images_mentales_et_rémanence.pdf",
    60: "data/courses/Axis_Lumen_Cours_060_PACK/pdf/Cours_060_clairvoyance_fondations_sobres.pdf",
    61: "data/courses/Axis_Lumen_Cours_061_PACK/pdf/Cours_061_rêves_symboles_et_carnet.pdf",
    62: "data/courses/Axis_Lumen_Cours_062_PACK/pdf/Cours_062_vision_intérieure_et_silence.pdf",
    63: "data/courses/Axis_Lumen_Cours_063_PACK/pdf/Cours_063_protocole_de_vérification_intérieure.pdf",
    64: "data/courses/Axis_Lumen_Cours_064_PACK/pdf/Cours_064_séance_de_clairvoyance_guidée.pdf",
    65: "data/courses/Axis_Lumen_Cours_065_PACK/pdf/Cours_065_clair-ressenti_corporel.pdf",
    66: "data/courses/Axis_Lumen_Cours_066_PACK/pdf/Cours_066_lecture_des_sensations_subtiles.pdf",
    67: "data/courses/Axis_Lumen_Cours_067_PACK/pdf/Cours_067_communication_animale_approche_éthique.pdf",
    68: "data/courses/Axis_Lumen_Cours_068_PACK/pdf/Cours_068_communication_végétale_et_présence.pdf",
    69: "data/courses/Axis_Lumen_Cours_069_PACK/pdf/Cours_069_dialogue_avec_le_vivant_par_la_lumière.pdf",
    70: "data/courses/Axis_Lumen_Cours_070_PACK/pdf/Cours_070_ressenti_des_lieux_et_ambiances.pdf",
    71: "data/courses/Axis_Lumen_Cours_071_PACK/pdf/Cours_071_différencier_intuition_et_projection.pdf",
    72: "data/courses/Axis_Lumen_Cours_072_PACK/pdf/Cours_072_pratique_quotidienne_du_clair-ressenti.pdf",
    73: "data/courses/Axis_Lumen_Cours_073_PACK/pdf/Cours_073_contact_avec_les_guides_cadre_et_prudenc.pdf",
    74: "data/courses/Axis_Lumen_Cours_074_PACK/pdf/Cours_074_prière_demande_claire_et_écoute.pdf",
    75: "data/courses/Axis_Lumen_Cours_075_PACK/pdf/Cours_075_défunts_et_au-delà_respect_et_discerneme.pdf",
    76: "data/courses/Axis_Lumen_Cours_076_PACK/pdf/Cours_076_tenir_une_guidance_sans_sidentifier.pdf",
    77: "data/courses/Axis_Lumen_Cours_077_PACK/pdf/Cours_077_écrire_un_message_intérieur.pdf",
    78: "data/courses/Axis_Lumen_Cours_078_PACK/pdf/Cours_078_signes_synchronicités_et_tri.pdf",
    79: "data/courses/Axis_Lumen_Cours_079_PACK/pdf/Cours_079_protéger_la_guidance_de_lego.pdf",
    80: "data/courses/Axis_Lumen_Cours_080_PACK/pdf/Cours_080_rituel_de_clôture_dune_guidance.pdf",
    81: "data/courses/Axis_Lumen_Cours_081_PACK/pdf/Cours_081_télépathie_bases_expérimentales.pdf",
    82: "data/courses/Axis_Lumen_Cours_082_PACK/pdf/Cours_082_émettre_une_image_simple.pdf",
    83: "data/courses/Axis_Lumen_Cours_083_PACK/pdf/Cours_083_recevoir_sans_inventer.pdf",
    84: "data/courses/Axis_Lumen_Cours_084_PACK/pdf/Cours_084_travail_à_deux_protocole_et_carnet.pdf",
    85: "data/courses/Axis_Lumen_Cours_085_PACK/pdf/Cours_085_télékinésie_cadre_de_recherche_et_pruden.pdf",
    86: "data/courses/Axis_Lumen_Cours_086_PACK/pdf/Cours_086_micro-intentions_et_observation.pdf",
    87: "data/courses/Axis_Lumen_Cours_087_PACK/pdf/Cours_087_statistiques_simples_et_vérification.pdf",
    88: "data/courses/Axis_Lumen_Cours_088_PACK/pdf/Cours_088_éthique_des_capacités_extrasensorielles.pdf",
    89: "data/courses/Axis_Lumen_Cours_089_PACK/pdf/Cours_089_protection_énergétique_du_corps.pdf",
    90: "data/courses/Axis_Lumen_Cours_090_PACK/pdf/Cours_090_nettoyage_du_lieu.pdf",
    91: "data/courses/Axis_Lumen_Cours_091_PACK/pdf/Cours_091_prière_de_protection.pdf",
    92: "data/courses/Axis_Lumen_Cours_092_PACK/pdf/Cours_092_vertus_comme_armure_intérieure.pdf",
    93: "data/courses/Axis_Lumen_Cours_093_PACK/pdf/Cours_093_couper_les_charges_relationnelles.pdf",
    94: "data/courses/Axis_Lumen_Cours_094_PACK/pdf/Cours_094_se_recentrer_après_un_soin_ou_un_échange.pdf",
    95: "data/courses/Axis_Lumen_Cours_095_PACK/pdf/Cours_095_eau_sel_lumière_et_intention.pdf",
    96: "data/courses/Axis_Lumen_Cours_096_PACK/pdf/Cours_096_rituel_quotidien_de_protection.pdf",
    97: "data/courses/Axis_Lumen_Cours_097_PACK/pdf/Cours_097_eau_informée_principe_symbolique_et_prat.pdf",
    98: "data/courses/Axis_Lumen_Cours_098_PACK/pdf/Cours_098_transfert_de_pensée_dans_leau.pdf",
    99: "data/courses/Axis_Lumen_Cours_099_PACK/pdf/Cours_099_verre_deau_intention_et_lumière.pdf",
    100: "data/courses/Axis_Lumen_Cours_100_PACK/pdf/Cours_100_biorésonance_et_information_du_terrain.pdf",
    101: "data/courses/Axis_Lumen_Cours_101_PACK/pdf/Cours_101_spooky²_plasma_pemf_cadre_expérimental.pdf",
    102: "data/courses/Axis_Lumen_Cours_102_PACK/pdf/Cours_102_choisir_la_bonne_eau_pour_le_bon_corps.pdf",
    103: "data/courses/Axis_Lumen_Cours_103_PACK/pdf/Cours_103_journal_de_leau_et_mesures_du_terrain.pdf",
    104: "data/courses/Axis_Lumen_Cours_104_PACK/pdf/Cours_104_protocole_eau_informée_sept_jours.pdf",
    105: "data/courses/Axis_Lumen_Cours_105_PACK/pdf/Cours_105_exercice_1_préparer_une_séance.pdf",
    106: "data/courses/Axis_Lumen_Cours_106_PACK/pdf/Cours_106_exercice_2_observer_une_source_lumineuse.pdf",
    107: "data/courses/Axis_Lumen_Cours_107_PACK/pdf/Cours_107_exercice_3_accueillir_la_rémanence.pdf",
    108: "data/courses/Axis_Lumen_Cours_108_PACK/pdf/Cours_108_exercice_4_stabiliser_le_point_intérieur.pdf",
    109: "data/courses/Axis_Lumen_Cours_109_PACK/pdf/Cours_109_exercice_5_tenir_le_carnet_dexpérience.pdf",
    110: "data/courses/Axis_Lumen_Cours_110_PACK/pdf/Cours_110_exercice_6_clore_une_séance.pdf",
    111: "data/courses/Axis_Lumen_Cours_111_PACK/pdf/Cours_111_point_fixe_objet_et_lumière.pdf",
    112: "data/courses/Axis_Lumen_Cours_112_PACK/pdf/Cours_112_synthèse_du_livre_dexercices.pdf",
  };

  function applyPdfPaths() {
    if (!window.AXIS_ONE_HOUR_COURSES) return;
    window.AXIS_ONE_HOUR_COURSES.forEach(function(course) {
      var n = Number(course.number);
      if (PDF_MAP[n] && !course.pdfPath) {
        course.pdfPath = PDF_MAP[n];
        if (!course.pdf) course.pdf = {};
        course.pdf.path = PDF_MAP[n];
      } else if (PDF_MAP[n]) {
        // Override old paths with new generated PDFs
        course.pdfPath = PDF_MAP[n];
        if (!course.pdf) course.pdf = {};
        course.pdf.path = PDF_MAP[n];
      }
    });
  }

  applyPdfPaths();
  window.AXIS_PDF_PATHS = PDF_MAP;
})();