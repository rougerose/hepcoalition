<?php

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}

function formulaires_configurer_hepcoalition_saisies() {
	$saisies = [
		[
			'saisie' => 'case',
			'options' => [
				'nom' => 'matomo_activation',
				'label_case' => '<:local:cfg_matomo_activation_label:>',
				'conteneur_class' => 'pleine_largeur'

			]
		],
		[
			'saisie' => 'textarea',
			'options' => [
				'nom' => 'matomo_code',
				'label' => '<:local:cfg_matomo_code_label:>',
				'explication' => '<:local:cfg_matomo_code_explication:>',
			]
		],
	];
	return $saisies;
}
