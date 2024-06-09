<?php

namespace App\Services;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteContext;

final class ImageMiddleware
{
    public function __invoke(Request $request, Response $response, $next)
    {
        $uri = $request->getUri();
        $path = $uri->getPath();

        // If the request is not for a file, pass it to the next middleware
        if (!preg_match('#^/uploads/(.*)$#', $path, $matches)) {
            return $next($request, $response);
        }

        $file = __DIR__ . '/../public' . $path; // Adjusted path for public directory
        $extension = pathinfo($file, PATHINFO_EXTENSION);

        if (file_exists($file) && is_file($file) && in_array(strtolower($extension), ['jpeg', 'jpg'])) {
            $response = new \Slim\Psr7\Response();
            $mimeType = mime_content_type($file);
            $response = $response->withHeader('Content-Type', $mimeType);
            $response->getBody()->write(file_get_contents($file));
            return $response;
        } else {
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write('File not found or not a JPEG/JPG');
            return $response->withStatus(404);
        }
    }
}
