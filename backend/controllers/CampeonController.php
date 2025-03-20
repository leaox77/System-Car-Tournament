<?php
include '../config/db.php';
include '../models/CampeonModel.php';

$campeonModel = new CampeonModel($conn);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'getCampeones':
                $campeones = $campeonModel->getCampeones();
                echo json_encode($campeones);
                break;
            case 'getCampeonById':
                $id = $_GET['id'];
                $campeon = $campeonModel->getCampeonById($id);
                echo json_encode($campeon);
                break;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'addCampeon':
                $campeonModel->addCampeon($data['auto_id'], $data['anio'], $data['competencia'], $data['foto_trofeo']);
                break;
            case 'updateCampeon':
                $campeonModel->updateCampeon($data['id'], $data['auto_id'], $data['anio'], $data['competencia'], $data['foto_trofeo']);
                break;
            case 'deleteCampeon':
                $campeonModel->deleteCampeon($data['id']);
                break;
        }
    }
}
?>