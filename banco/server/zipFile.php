<?php

// Get real path for our folder
$rootPath = realpath('../recursos');

// Initialize archive object
$zip = new ZipArchive();
$zip_file = '../banco.zip';
$zip->open($zip_file, ZipArchive::CREATE | ZipArchive::OVERWRITE);

// Create recursive directory iterator
/** @var SplFileInfo[] $files */
$files = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($rootPath),
    RecursiveIteratorIterator::LEAVES_ONLY
);

foreach ($files as $name => $file) {
    // Skip directories (they would be added automatically)
    if (!$file->isDir()) {
        // Get real and relative path for current file
        $filePath = $file->getRealPath();
        $relativePath = substr($filePath, strlen($rootPath) + 1);

        // Add current file to archive
        $zip->addFile($filePath, $relativePath);
    }
}

// Zip archive will be created only after closing object
$zip->close();

header('Content-type: application/zip');
header('Content-Disposition: attachment; filename="' . basename($zip_file) . '"');
header("Content-length: " . filesize($zip_file));
header("Pragma: no-cache");
header("Expires: 0");

ob_clean();
flush();
readfile($zip_file);
unlink($zip_file);
exit;

