<?php
include '../config/db.php';
include '../models/DivisionModel.php';

$divisionModel = new DivisionModel($conn);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'getDivisiones':
                $divisiones = $divisionModel->getDivisiones();
                echo json_encode($divisiones);
                break;
            case 'getDivisionById':
                $id = $_GET['id'];
                $division = $divisionModel->getDivisionById($id);
                echo json_encode($division);
                break;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'addDivision':
                $divisionModel->addDivision($data['nombre']);
                break;
            case 'updateDivision':
                $divisionModel->updateDivision($data['id'], $data['nombre']);
                break;
            case 'deleteDivision':
                $divisionModel->deleteDivision($data['id']);
                break;
        }
    }
}
?>