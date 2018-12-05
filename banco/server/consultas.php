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

function getFicherosQuery($con, $competencia, $tema, $zona, $indicador)
{
    if ($zona == 0) {
        $sql = "SELECT rec.recurso_url || '/' || nombre_fichero AS fichero_url, fro.nombre_fichero, rec.icon, fro.codigo, tma.temas ";
    } else {
        $sql = "SELECT rec.recurso_url || '/' || zna.id_zona || '/' || nombre_fichero AS fichero_url, fro.nombre_fichero, rec.icon, fro.codigo, tma.temas";
    }

    $sql .= "FROM ficheros as fro
    JOIN competencias as cpte ON fro.id_competencia = cpte.id_competencia
    JOIN temas as tma ON tma.id_temas = fro.id_tema
    LEFT JOIN zonas as zna ON zna.id_zona = fro.id_zona
    JOIN recursos rec ON rec.id_recurso = fro.id_recurso";
    /* Validar que la consulta termine en un WHERE y no en un AND */
    $is_where = true;

    if (!is_null($competencia)) {
        if ($is_where) {
            $sql .= " WHERE fro.id_competencia = $competencia";
            $is_where = false;
        } else {
            $sql .= " AND fro.id_competencia = $competencia";
        }
    }
    if (!is_null($tema)) {
        if ($is_where) {
            $sql .= " WHERE fro.id_tema = $tema";
            $is_where = false;
        } else {
            $sql .= " AND fro.id_tema = $tema";
        }
    }
    if (!is_null($zona)) {
        if ($zona == 0) {
            if ($is_where) {
                $sql .= " WHERE fro.id_zona isnull";
                $is_where = false;
            } else {
                $sql .= " AND fro.id_zona isnull";
            }
        } else {
            if ($is_where) {
                $sql .= " WHERE fro.id_zona = $zona";
                $is_where = false;
            } else {
                $sql .= " AND fro.id_zona = $zona";
            }
        }
    }

    if (!is_null($indicador)) {
        if ($is_where) {
            $sql .= " WHERE id_indicador = $indicador";
            $is_where = false;
        } else {
            $sql .= " AND id_indicador = $indicador";
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
    FROM temas
    WHERE compe_por_compo_compe_id_compe = $competencia";

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
