<?php

if (!defined('_ECRIRE_INC_VERSION')) {
  return;
}

function tri_alpha($array) {
   natcasesort($array);
   return $array;
}
