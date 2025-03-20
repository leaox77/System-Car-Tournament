<?php
class FechaModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // Obtener todas las fechas
    public function getFechas() {
        $sql = "SELECT * FROM fechas";
        $result = $this->conn->query($sql);

        $fechas = array();
        while($row = $result->fetch_assoc()) {
            $fechas[] = $row;
        }

        return $fechas;
    }

    // Obtener una fecha por ID
    public function getFechaById($id) {
        $sql = "SELECT * FROM fechas WHERE id = $id";
        $result = $this->conn->query($sql);
        return $result->fetch_assoc();
    }

    // Agregar una fecha
    public function addFecha($numero, $division_id) {
        $sql = "INSERT INTO fechas (numero, division_id) VALUES ($numero, $division_id)";
        return $this->conn->query($sql);
    }

    // Actualizar una fecha
    public function updateFecha($id, $numero, $division_id) {
        $sql = "UPDATE fechas SET numero = $numero, division_id = $division_id WHERE id = $id";
        return $this->conn->query($sql);
    }

    // Eliminar una fecha
    public function deleteFecha($id) {
        $sql = "DELETE FROM fechas WHERE id = $id";
        return $this->conn->query($sql);
    }
}
?>