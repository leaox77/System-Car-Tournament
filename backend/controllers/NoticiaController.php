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
                if (isset($_GET['id'])) {
                    $id = $_GET['id'];
                    $noticia = $noticiaModel->getNoticiaById($id);
                    echo json_encode($noticia);
                } else {
                    echo json_encode(['error' => 'ID no proporcionado']);
                }
                break;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar si se están enviando archivos (imágenes)
    if (!empty($_FILES['fotos'])) {
        // Manejar la subida de imágenes
        $titulo = $_POST['titulo'];
        $contenido = $_POST['contenido'];

        // Insertar la noticia en la base de datos
        $noticia_id = $noticiaModel->addNoticia($titulo, $contenido);

        // Subir imágenes y guardar enlaces en la base de datos
        foreach ($_FILES['fotos']['tmp_name'] as $key => $tmp_name) {
            $file_name = $_FILES['fotos']['name'][$key];
            $file_tmp = $_FILES['fotos']['tmp_name'][$key];
            $file_path = '../uploads/' . basename($file_name);

            if (move_uploaded_file($file_tmp, $file_path)) {
                // Guardar el enlace de la imagen en la base de datos
                $noticiaModel->addFotoNoticia($noticia_id, $file_path);
            }
        }

        echo json_encode(['success' => 'Noticia e imágenes agregadas correctamente']);
    } else {
        // Manejar solicitudes JSON (sin imágenes)
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['action'])) {
            switch ($data['action']) {
                case 'addNoticia':
                    if (isset($data['titulo']) && isset($data['contenido'])) {
                        $noticiaModel->addNoticia($data['titulo'], $data['contenido']);
                        echo json_encode(['success' => 'Noticia agregada correctamente']);
                    } else {
                        echo json_encode(['error' => 'Faltan datos']);
                    }
                    break;
                case 'hideNoticia':
                    if (isset($data['id'])) {
                        $noticiaModel->hideNoticia($data['id']);
                        echo json_encode(['success' => 'Noticia oculta correctamente']);
                    } else {
                        echo json_encode(['error' => 'ID no proporcionado']);
                    }
                    break;
            }
        }
    }
}
?>