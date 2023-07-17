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
				'label_case' => 'Activer l insertion du code',
				'conteneur_class' => 'pleine_largeur'

			]
		],
		[
			'saisie' => 'textarea',
			'options' => [
				'nom' => 'matomo_code',
				'label' => 'Le code de suivi',
				'explication' => 'Copier dans ce champ le code javascript de Matomo',
			]
		],
	];
	return $saisies;
}
