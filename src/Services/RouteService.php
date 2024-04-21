<?php
// services/RouteService.php

namespace App\Services;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class RouteService
{
    public function helloWorld(Request $request, Response $response, $args)
    {
        // Ensure that we're using the Slim Response object
        $response->getBody()->write("Hello world_MWHAHAHAHHAHAHAH");
        return $response;
    }
}
