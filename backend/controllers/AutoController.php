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
?>