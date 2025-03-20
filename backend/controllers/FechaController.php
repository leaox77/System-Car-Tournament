<?php
include '../config/db.php';
include '../models/FechaModel.php';

$fechaModel = new FechaModel($conn);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'getFechas':
                $fechas = $fechaModel->getFechas();
                echo json_encode($fechas);
                break;
            case 'getFechaById':
                $id = $_GET['id'];
                $fecha = $fechaModel->getFechaById($id);
                echo json_encode($fecha);
                break;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'addFecha':
                $fechaModel->addFecha($data['numero'], $data['division_id']);
                break;
            case 'updateFecha':
                $fechaModel->updateFecha($data['id'], $data['numero'], $data['division_id']);
                break;
            case 'deleteFecha':
                $fechaModel->deleteFecha($data['id']);
                break;
        }
    }
}
?>