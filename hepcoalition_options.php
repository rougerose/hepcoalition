<?php

if (!defined('_ECRIRE_INC_VERSION')) {
  return;
}

if (!isset($GLOBALS['z_blocs'])) {
	$GLOBALS['z_blocs'] = array(
		'content',
		'head',
		'head_js',
		'header',
	);
}

// $GLOBALS['z_blocs'] = array('content','extra1','extra2','head','head_js','foot_js','header','footer','breadcrumb');

# notes
define('_NOTES_OUVRE_NOTE', '<span class="spip_note_ref">');
define('_NOTES_FERME_NOTE', '&nbsp;</span>');

error_reporting(E_ALL^E_NOTICE);
ini_set('display_errors', 'On');
define('SPIP_ERREUR_REPORT', E_ALL);
// //$GLOBALS['taille_des_logs'] = 50000;
// // define('_MAX_LOG', 500000);
// define('_LOG_FILELINE', true);
// define('_LOG_FILTRE_GRAVITE', 8);
// define('_DEBUG_AUTORISER', true);
// define('_DEBUG_SLOW_QUERIES', true);
// define('_BOUCLE_PROFILER', 5000);

// Stocker la langue d'arrivee pour que le sommaire affiche
// la langue souhaitee et on ajoute la langue dans le contexte
// systematiquement.
if (!$langue = _request('lang')) {
	if (empty($_COOKIE['spip_lang']) or !$langue = $_COOKIE['spip_lang']) {
		include_spip('inc/lang');
		$langues = explode(',', $GLOBALS['meta']['langues_multilingue']);
		$langue = utiliser_langue_visiteur();
		if (!in_array($langue, $langues)) {
			$langue = $GLOBALS['meta']['langue_site'];
		}
	}
	set_request('lang', $langue);
}

// stocker la langue...
if (empty($_COOKIE['spip_lang']) or $langue != $_COOKIE['spip_lang']) {
	include_spip('inc/cookie');
	spip_setcookie('spip_lang', $langue);
}
