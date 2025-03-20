<?php
class AutoModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // Obtener todos los autos
    public function getAutos() {
        $sql = "SELECT autos.*, divisiones.nombre AS division_nombre 
                FROM autos 
                JOIN divisiones ON autos.division_id = divisiones.id";
        $result = $this->conn->query($sql);

        $autos = array();
        while($row = $result->fetch_assoc()) {
            $autos[] = $row;
        }

        return $autos;
    }

    // Obtener un auto por ID
    public function getAutoById($id) {
        $sql = "SELECT * FROM autos WHERE id = $id";
        $result = $this->conn->query($sql);
        return $result->fetch_assoc();
    }

    // Agregar un auto
    public function addAuto($nombre, $marca, $anio, $color, $division_id) {
        $sql = "INSERT INTO autos (nombre, marca, anio, color, division_id) 
                VALUES ('$nombre', '$marca', $anio, '$color', $division_id)";
        return $this->conn->query($sql);
    }

    // Actualizar un auto
    public function updateAuto($id, $nombre, $marca, $anio, $color, $division_id) {
        $sql = "UPDATE autos 
                SET nombre = '$nombre', marca = '$marca', anio = $anio, color = '$color', division_id = $division_id 
                WHERE id = $id";
        return $this->conn->query($sql);
    }

    // Eliminar un auto
    public function deleteAuto($id) {
        $sql = "DELETE FROM autos WHERE id = $id";
        return $this->conn->query($sql);
    }

    // Actualizar la división de un auto
    public function updateDivision($auto_id, $new_division_id) {
        $sql = "UPDATE autos SET division_id = $new_division_id WHERE id = $auto_id";
        return $this->conn->query($sql);
    }

    // Método para verificar ascensos y descensos
    public function verificarAscensosDescensos() {
        // Obtener todos los autos ordenados por división y puntos
        $sql = "SELECT * FROM autos ORDER BY division_id, puntos DESC";
        $result = $this->conn->query($sql);

        $autos = array();
        while($row = $result->fetch_assoc()) {
            $autos[] = $row;
        }

        // Lógica de ascensos y descensos
        foreach ($autos as $auto) {
            $id = $auto['id'];
            $division_id = $auto['division_id'];
            $puntos = $auto['puntos'];

            // Ascender si tiene 10 puntos y no está en la primera división
            if ($puntos >= 10 && $division_id > 1) {
                $this->ascenderAuto($id, $division_id);
            }

            // Descender si tiene -10 puntos y no está en la tercera división
            if ($puntos <= -10 && $division_id < 3) {
                $this->descenderAuto($id, $division_id);
            }
        }
    }

    // Método para ascender un auto
    private function ascenderAuto($auto_id, $current_division_id) {
        $new_division_id = $current_division_id - 1; // Sube a la división superior
        $this->updateDivision($auto_id, $new_division_id);

        // Descender un auto de la división superior
        $this->descenderAutoDeDivisionSuperior($new_division_id);
    }

    // Método para descender un auto
    private function descenderAuto($auto_id, $current_division_id) {
        $new_division_id = $current_division_id + 1; // Baja a la división inferior
        $this->updateDivision($auto_id, $new_division_id);

        // Ascender un auto de la división inferior
        $this->ascenderAutoDeDivisionInferior($new_division_id);
    }

    // Método para descender un auto de la división superior
    private function descenderAutoDeDivisionSuperior($division_id) {
        // Obtener el auto con menos puntos en la división superior
        $sql = "SELECT id FROM autos WHERE division_id = $division_id ORDER BY puntos ASC LIMIT 1";
        $result = $this->conn->query($sql);
        $auto = $result->fetch_assoc();

        if ($auto) {
            $this->descenderAuto($auto['id'], $division_id);
        }
    }

    // Método para ascender un auto de la división inferior
    private function ascenderAutoDeDivisionInferior($division_id) {
        // Obtener el auto con más puntos en la división inferior
        $sql = "SELECT id FROM autos WHERE division_id = $division_id ORDER BY puntos DESC LIMIT 1";
        $result = $this->conn->query($sql);
        $auto = $result->fetch_assoc();

        if ($auto) {
            $this->ascenderAuto($auto['id'], $division_id);
        }
    }

    public function addFoto($auto_id, $url) {
        $sql = "INSERT INTO fotos (auto_id, url) VALUES ($auto_id, '$url')";
        return $this->conn->query($sql);
    }
}
?>