<?php
class DivisionModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // Obtener todas las divisiones
    public function getDivisiones() {
        $sql = "SELECT * FROM divisiones";
        $result = $this->conn->query($sql);

        $divisiones = array();
        while($row = $result->fetch_assoc()) {
            $divisiones[] = $row;
        }

        return $divisiones;
    }

    // Obtener una división por ID
    public function getDivisionById($id) {
        $sql = "SELECT * FROM divisiones WHERE id = $id";
        $result = $this->conn->query($sql);
        return $result->fetch_assoc();
    }

    // Agregar una división
    public function addDivision($nombre) {
        $sql = "INSERT INTO divisiones (nombre) VALUES ('$nombre')";
        return $this->conn->query($sql);
    }

    // Actualizar una división
    public function updateDivision($id, $nombre) {
        $sql = "UPDATE divisiones SET nombre = '$nombre' WHERE id = $id";
        return $this->conn->query($sql);
    }

    // Eliminar una división
    public function deleteDivision($id) {
        $sql = "DELETE FROM divisiones WHERE id = $id";
        return $this->conn->query($sql);
    }
}
?>