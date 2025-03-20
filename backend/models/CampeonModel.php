<?php
class CampeonModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // Obtener todos los campeones
    public function getCampeones() {
        $sql = "SELECT campeones.*, autos.nombre AS auto_nombre 
                FROM campeones 
                JOIN autos ON campeones.auto_id = autos.id";
        $result = $this->conn->query($sql);

        $campeones = array();
        while($row = $result->fetch_assoc()) {
            $campeones[] = $row;
        }

        return $campeones;
    }

    // Obtener un campeón por ID
    public function getCampeonById($id) {
        $sql = "SELECT * FROM campeones WHERE id = $id";
        $result = $this->conn->query($sql);
        return $result->fetch_assoc();
    }

    // Agregar un campeón
    public function addCampeon($auto_id, $anio, $competencia, $foto_trofeo) {
        $sql = "INSERT INTO campeones (auto_id, anio, competencia, foto_trofeo) 
                VALUES ($auto_id, $anio, '$competencia', '$foto_trofeo')";
        return $this->conn->query($sql);
    }

    // Actualizar un campeón
    public function updateCampeon($id, $auto_id, $anio, $competencia, $foto_trofeo) {
        $sql = "UPDATE campeones 
                SET auto_id = $auto_id, anio = $anio, competencia = '$competencia', foto_trofeo = '$foto_trofeo' 
                WHERE id = $id";
        return $this->conn->query($sql);
    }

    // Eliminar un campeón
    public function deleteCampeon($id) {
        $sql = "DELETE FROM campeones WHERE id = $id";
        return $this->conn->query($sql);
    }
}
?>