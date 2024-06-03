<?php

namespace App\Services;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class ImageUploadHandler
{
    public function uploadImage($request, $response, $args)
    {
        // Get uploaded file
        $uploadedFile = $request->getUploadedFiles()['image'];

        // Move file to uploads folder
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $imageId = uniqid(); // Generate unique ID for the image
            $uploadPath = './uploads'; // Set upload folder path
            $uploadedFileName = $uploadedFile->getClientFilename();
            $uploadedFile->moveTo("$uploadPath/$imageId-$uploadedFileName");

            // Return image ID
            return $response->withJson(['imageId' => $imageId]);
        } else {
            // Handle upload error
            return $response->withStatus(500)->write('Failed to upload image');
        }
    }
}
