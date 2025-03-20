<?php
class ResultadoModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // Obtener todos los resultados
    public function getResultados() {
        $sql = "SELECT * FROM resultados";
        $result = $this->conn->query($sql);

        $resultados = array();
        while($row = $result->fetch_assoc()) {
            $resultados[] = $row;
        }

        return $resultados;
    }

    // Obtener un resultado por ID
    public function getResultadoById($id) {
        $sql = "SELECT * FROM resultados WHERE id = $id";
        $result = $this->conn->query($sql);
        return $result->fetch_assoc();
    }

    // Agregar un resultado
    public function addResultado($fecha_id, $auto_id, $posicion, $puntos) {
        $sql = "INSERT INTO resultados (fecha_id, auto_id, posicion, puntos) 
                VALUES ($fecha_id, $auto_id, '$posicion', $puntos)";
        return $this->conn->query($sql);
    }

    // Actualizar un resultado
    public function updateResultado($id, $fecha_id, $auto_id, $posicion, $puntos) {
        $sql = "UPDATE resultados 
                SET fecha_id = $fecha_id, auto_id = $auto_id, posicion = '$posicion', puntos = $puntos 
                WHERE id = $id";
        return $this->conn->query($sql);
    }

    // Eliminar un resultado
    public function deleteResultado($id) {
        $sql = "DELETE FROM resultados WHERE id = $id";
        return $this->conn->query($sql);
    }

    public function addFecha($numero, $division_id) {
        $sql = "INSERT INTO fechas (numero, division_id) VALUES ($numero, $division_id)";
        $this->conn->query($sql);
        return $this->conn->insert_id; // Devuelve el ID de la fecha recién creada
    }
}
?>