<?php
include '../config/db.php';
include '../models/AutoModel.php';

$autoModel = new AutoModel($conn);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'getAutos':
                $autos = $autoModel->getAutos();
                echo json_encode($autos);
                break;
            case 'getAutoById':
                if (isset($_GET['id'])) {
                    $id = $_GET['id'];
                    $auto = $autoModel->getAutoById($id);
                    echo json_encode($auto);
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
        $nombre = $_POST['nombre'];
        $marca = $_POST['marca'];
        $anio = $_POST['anio'];
        $color = $_POST['color'];
        $division_id = $_POST['division_id'];

        // Insertar el auto en la base de datos
        $auto_id = $autoModel->addAuto($nombre, $marca, $anio, $color, $division_id);

        // Subir imágenes y guardar enlaces en la base de datos
        foreach ($_FILES['fotos']['tmp_name'] as $key => $tmp_name) {
            $file_name = $_FILES['fotos']['name'][$key];
            $file_tmp = $_FILES['fotos']['tmp_name'][$key];
            $file_path = '../uploads/' . basename($file_name);

            if (move_uploaded_file($file_tmp, $file_path)) {
                // Guardar el enlace de la imagen en la base de datos
                $autoModel->addFoto($auto_id, $file_path);
            }
        }

        echo json_encode(['success' => 'Auto e imágenes agregados correctamente']);
    } else {
        // Manejar solicitudes JSON (sin imágenes)
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['action'])) {
            switch ($data['action']) {
                case 'addAuto':
                    if (isset($data['nombre']) && isset($data['marca']) && isset($data['anio']) && isset($data['color']) && isset($data['division_id'])) {
                        $autoModel->addAuto($data['nombre'], $data['marca'], $data['anio'], $data['color'], $data['division_id']);
                        echo json_encode(['success' => 'Auto agregado correctamente']);
                    } else {
                        echo json_encode(['error' => 'Faltan datos']);
                    }
                    break;
                case 'updateAuto':
                    if (isset($data['id']) && isset($data['nombre']) && isset($data['marca']) && isset($data['anio']) && isset($data['color']) && isset($data['division_id'])) {
                        $autoModel->updateAuto($data['id'], $data['nombre'], $data['marca'], $data['anio'], $data['color'], $data['division_id']);
                        echo json_encode(['success' => 'Auto actualizado correctamente']);
                    } else {
                        echo json_encode(['error' => 'Faltan datos']);
                    }
                    break;
                case 'deleteAuto':
                    if (isset($data['id'])) {
                        $autoModel->deleteAuto($data['id']);
                        echo json_encode(['success' => 'Auto eliminado correctamente']);
                    } else {
                        echo json_encode(['error' => 'ID no proporcionado']);
                    }
                    break;
            }
        }
    }
}
?>