<?php
include '../config/db.php';
include '../models/NoticiaModel.php';

$noticiaModel = new NoticiaModel($conn);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'getNoticias':
                $noticias = $noticiaModel->getNoticias();
                echo json_encode($noticias);
                break;
            case 'getNoticiaById':
                $id = $_GET['id'];
                $noticia = $noticiaModel->getNoticiaById($id);
                echo json_encode($noticia);
                break;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'addNoticia':
                $noticiaModel->addNoticia($data['titulo'], $data['contenido']);
                break;
            case 'updateNoticia':
                $noticiaModel->updateNoticia($data['id'], $data['titulo'], $data['contenido']);
                break;
            case 'hideNoticia':
                $noticiaModel->hideNoticia($data['id']);
                break;
            case 'deleteNoticia':
                $noticiaModel->deleteNoticia($data['id']);
                break;
        }
    }
}
?>