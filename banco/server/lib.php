<?php
include "consultas.php";

class geBanco
{
    private $con;

    public function __construct()
    {
        $this->connectDB();
    }

    public function connectDB()
    {
        //DEV
        $database = "d4asqdqb9dlt9p";
        $uid = "ntafkvnrqqlbig";
        $pwd = "300113b0978731b5003f9916b2684ec44d7eafdeb2f3a36dca99bfcd115f33f1";
        $host = "ec2-54-197-233-123.compute-1.amazonaws.com";

/*         //PRODUCCION
        $database = "gestjjlg_gestion_educativa";
        $uid = "gestjjlg_usr_gestion";
        $pwd = "r!Hh7XNv22E(";
        $host = "127.0.0.1";  */

        //establecer la conexión
        $this->con = new PDO("pgsql:host=$host;port=5432;dbname=$database;user=$uid;password=$pwd");
        if (!$this->con) {
            die('error de conexión');
        }
    }

    public function getRecursos()
    {
        return getRecursosQuery($this->con);
    }

    public function getFicheros($competencia, $tema)
    {
        return getFicherosQuery($this->con, $competencia, $tema);
    }

    public function getCompetencias()
    {
        return getCompetenciasQuery($this->con);
    }

    public function getTemas($competencia)
    {
        return getTemasQuery($this->con, $competencia);
    }

    public function getZonas()
    {
        return getZonasQuery($this->con);
    }

    public function getIndicadores()
    {
        return getIndicadoresQuery($this->con);
    }

    public function getListaRecursos()
    {
        return getListaRecursosQuery($this->con);
    }

    public function subirArchivo($archivo, $recurso, $file_tmp, $file_destination)
    {
        return subirArchivoQuery($this->con, $archivo, $recurso, $file_tmp, $file_destination);
    }

    public function subirFichero($competencia, $tema, $zona, $nombre_fichero, $codigo, $recurso, $indicador, $file_tmp, $file_dest)
    {
        return subirFicheroQuery($this->con, $competencia, $tema, $zona, $nombre_fichero, $codigo, $recurso, $indicador, $file_tmp, $file_dest);
    }
}