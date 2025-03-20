<?php
include '../config/db.php';
include '../models/ResultadoModel.php';
include '../models/AutoModel.php';

$resultadoModel = new ResultadoModel($conn);
$autoModel = new AutoModel($conn);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'addResultado':
                // Agregar resultado
                $resultadoModel->addResultado($data['fecha_id'], $data['auto_id'], $data['posicion'], $data['puntos']);
                // Verificar ascensos y descensos
                $autoModel->verificarAscensosDescensos();
                echo json_encode(['success' => 'Resultado agregado y ascensos/descensos verificados']);
                break;
            case 'addFecha':
                // Agregar una nueva fecha
                $fecha_id = $resultadoModel->addFecha($data['numero'], $data['division_id']);
                // Asignar puntos a los ganadores y perdedores
                foreach ($data['ganadores'] as $ganador) {
                    $resultadoModel->addResultado($fecha_id, $ganador['auto_id'], $ganador['posicion'], $ganador['puntos']);
                }
                foreach ($data['perdedores'] as $perdedor) {
                    $resultadoModel->addResultado($fecha_id, $perdedor['auto_id'], $perdedor['posicion'], $perdedor['puntos']);
                }
                // Verificar ascensos y descensos
                $autoModel->verificarAscensosDescensos();
                echo json_encode(['success' => 'Fecha agregada y puntos asignados']);
                break;
        }
    }
}
?>