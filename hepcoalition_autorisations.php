<?php

/**
 * Définit les autorisations du plugin Fraap : bibliographie
 *
 * @plugin     Hepcoalition
 * @copyright  2023
 * @author     Christophe Le Drean
 * @licence    GNU/GPL
 * @package    SPIP\Hepcoalition\Autorisations
 */

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}


/*
 * Un fichier d'autorisations permet de regrouper
 * les fonctions d'autorisations de votre plugin
 */

/**
 * Fonction d'appel pour le pipeline
 * @pipeline autoriser */
function hepcoalition_autoriser() {
}



function autoriser_hepcoalition_configurer_dist($faire, $type, $id, $qui, $opt) {
	return autoriser('webmestre', $type, $id, $qui, $opt); // seulement les webmestres
}
