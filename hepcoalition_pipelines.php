<?php

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}

function hepcoalition_formulaire_verifier($flux) {
	if ($flux['args']['form'] == 'configurer_hepcoalition') {
		$activation = _request('matomo_activation');
		$code = _request('matomo_code');

		if ($activation == 'on' && $code == '') {
			$flux['data']['matomo_code'] = _T('info_obligatoire');
		}
	}
	return $flux;
}

function hepcoalition_insert_head($flux) {
	$matomo_code = lire_config('hepcoalition/matomo_code');
	if (strstr($matomo_code, '<script>')) {
		$flux .= "\n" . $matomo_code . "\n";
	}
	return $flux;
}
