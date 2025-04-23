<?php 
$FILES = [
	'mod/doc/info.js',
	'mod/doc/load.js',
	'mod/doc/modern-screenshot.min.js',
	'mod/doc/qrcode.min.js',
];

foreach ($FILES as $v) {
	$v_ = str_replace('/', '_', $v);
	copy(__DIR__.'/../alqalammedialestari_publish/'.$v, __DIR__.'/'.$v_);
}