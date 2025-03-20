<?php
header('Content-Type: application/json');

include 'config/db.php';

// Obtener la acción y el controlador desde la URL
$action = $_GET['action'] ?? '';
$controller = $_GET['controller'] ?? '';

// Redirigir a los controladores
switch ($controller) {
    case 'auto':
        include 'controllers/AutoController.php';
        break;
    case 'division':
        include 'controllers/DivisionController.php';
        break;
    case 'fecha':
        include 'controllers/FechaController.php';
        break;
    case 'resultado':
        include 'controllers/ResultadoController.php';
        break;
    case 'campeon':
        include 'controllers/CampeonController.php';
        break;
    case 'noticia':
        include 'controllers/NoticiaController.php';
        break;
    default:
        echo json_encode(['error' => 'Controlador no válido']);
        break;
}
?>