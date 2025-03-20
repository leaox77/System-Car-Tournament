<?php
class NoticiaModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // Obtener todas las noticias
    public function getNoticias() {
        $sql = "SELECT * FROM noticias";
        $result = $this->conn->query($sql);

        $noticias = array();
        while($row = $result->fetch_assoc()) {
            $noticias[] = $row;
        }

        return $noticias;
    }

    // Obtener una noticia por ID
    public function getNoticiaById($id) {
        $sql = "SELECT * FROM noticias WHERE id = $id";
        $result = $this->conn->query($sql);
        return $result->fetch_assoc();
    }

    // Agregar una noticia
    public function addNoticia($titulo, $contenido) {
        $sql = "INSERT INTO noticias (titulo, contenido) VALUES ('$titulo', '$contenido')";
        return $this->conn->query($sql);
    }

    // Actualizar una noticia
    public function updateNoticia($id, $titulo, $contenido) {
        $sql = "UPDATE noticias SET titulo = '$titulo', contenido = '$contenido' WHERE id = $id";
        return $this->conn->query($sql);
    }

    // Ocultar una noticia
    public function hideNoticia($id) {
        $sql = "UPDATE noticias SET visible = FALSE WHERE id = $id";
        return $this->conn->query($sql);
    }

    // Eliminar una noticia
    public function deleteNoticia($id) {
        $sql = "DELETE FROM noticias WHERE id = $id";
        return $this->conn->query($sql);
    }
}
?>