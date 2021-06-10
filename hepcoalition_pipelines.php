<?php

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}

function hepcoalition_insert_head($flux) {
	$js = find_in_path('dist/js/hepcoalition.js');
	if ($js) {
		$flux .= "\n" . '<script defer="true" src="' . $js . '" type="text/javascript"></script>';
	}

	return $flux;
}
