<?php

function executeQuery($con, $sql)
{
    $result = $con->query($sql);
    if ($result) {
        $data = array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            array_push($data, $row);
        }
        return $data;
    } else {
        return $con->errorInfo()[2];
    }
}

function executeQueryInsert($con, $sql, $file_tmp, $file_dest)
{
    $data = array('success' => 0, 'message' => "");
    $result = $con->query($sql);
    if ($result) {
        if (move_uploaded_file($file_tmp, $file_dest)) {
            $data['message'] = 'Subido con exito';
            return $data;
        }
    } else {
        $data['success'] = 1;
        $data['message'] = $con->errorInfo()[2];
    }
    return $data;
}

function getRecursosQuery($con)
{
    $sql = "SELECT id_archivo, rec.recurso_url || '/' || nombre_archivo AS recurso_url, nombre_archivo, rec.icon, rec.id_recurso
    FROM archivos_recursos ar
    JOIN recursos rec ON rec.id_recurso = ar.id_recurso";

    return executeQuery($con, $sql);
}

function getFicherosQuery($con, $competencia, $tema)
{

    $sql = "SELECT CONCAT(rec.recurso_url,'/', nombre,'.pdf') AS fichero_url, nombre, rec.icon, tem.temas 
    FROM guias as gui
    JOIN subtemas stm ON stm.id_subtema = gui.id_subtema
    JOIN temas tem ON tem.id_temas = stm.id_temas
    JOIN comportamientos compor ON compor.id_comportamientos = tem.id_comportamiento
    JOIN recursos rec ON rec.id_recurso = gui.id_recurso";
    /* Validar que la consulta termine en un WHERE y no en un AND */
    $is_where = true;

    if (!is_null($competencia)) {
        if ($is_where) {
            $sql .= " WHERE compor.id_competencia = $competencia";
            $is_where = false;
        } else {
            $sql .= " AND compor.id_competencia = $competencia";
        }
    }
    if (!is_null($tema)) {
        if ($is_where) {
            $sql .= " WHERE tem.id_tema = $tema";
            $is_where = false;
        } else {
            $sql .= " AND tem.id_tema = $tema";
        }
    }

    return executeQuery($con, $sql);
}

function getCompetenciasQuery($con)
{
    $sql = "SELECT id_competencia, competencia
    FROM competencias";

    return executeQuery($con, $sql);
}

function getTemasQuery($con, $competencia)
{
    $sql = "SELECT id_temas, temas
    FROM temas tem
    JOIN comportamientos compor ON compor.id_comportamientos = tem.id_comportamiento
    WHERE compor.id_competencia = $competencia";

    return executeQuery($con, $sql);
}

function getZonasQuery($con)
{
    $sql = "SELECT id_zona, zonas
    FROM zonas";

    return executeQuery($con, $sql);
}

function getIndicadoresQuery($con)
{
    $sql = "SELECT id_indicador, indicador FROM indicador_fichero";

    return executeQuery($con, $sql);
}

function getListaRecursosQuery($con)
{
    $sql = "SELECT id_recurso, recurso, recurso_url FROM recursos WHERE id_recurso <> 8 ORDER BY id_recurso ASC";

    return executeQuery($con, $sql);
}

function subirFicheroQuery($con, $competencia, $tema, $zona, $nombre_fichero, $codigo, $recurso, $indicador, $file_tmp, $file_dest)
{

    $sql = "INSERT INTO ficheros (id_competencia, id_tema, id_zona, nombre_fichero, codigo, id_recurso, id_indicador)
    VALUES ($competencia, $tema, $zona, '$nombre_fichero', '$codigo', $recurso, $indicador)";

    return executeQueryInsert($con, $sql, $file_tmp, $file_dest);
}

function subirArchivoQuery($con, $archivo, $recurso, $file_tmp, $file_destination)
{
    $sql = "INSERT INTO archivos_recursos (id_archivo, nombre_archivo, id_recurso) VALUES (nextval('sec_archivos_recursos'::regclass), '$archivo', $recurso)";

    return executeQueryInsert($con, $sql, $file_tmp, $file_destination);
}
