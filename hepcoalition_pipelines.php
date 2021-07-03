<?php

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}

function hepcoalition_insert_head($flux) {
	// $files = array();
	// $files[] = find_in_path('dist/js/lib/van11y-accessible-hide-show-aria.min.js');
	// $files[] = find_in_path('dist/js/hepcoalition.js');

	// foreach ($files as $file) {
	// 	if ($file) {
	// 		$flux .= "\n" . '<script defer="true" src="' . $file . '" type="text/javascript"></script>';
	// 	}
	// }

	return $flux;
}
