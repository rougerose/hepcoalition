<?php

if (!defined('_ECRIRE_INC_VERSION')) {
  return;
}

// plugin Langue préférée : langue par défaut.
define('_LANGUE_PREFEREE_DEFAUT', 'en');

//define('_DEV_VERSION_SPIP_COMPAT', '3.2.99');

if (!isset($GLOBALS['z_blocs'])) {
	$GLOBALS['z_blocs'] = array(
		'content',
		'head',
		'head_js',
		'header',
		'footer',
		'breadcrumb',
	);
}

// error_reporting(E_ALL^E_NOTICE);
// ini_set('display_errors', 'On');
// define('SPIP_ERREUR_REPORT', E_ALL);
// //$GLOBALS['taille_des_logs'] = 50000;
// // define('_MAX_LOG', 500000);
// define('_LOG_FILELINE', true);
// define('_LOG_FILTRE_GRAVITE', 8);
// define('_DEBUG_AUTORISER', true);
// define('_DEBUG_SLOW_QUERIES', true);
// define('_BOUCLE_PROFILER', 5000);
