<?php
include "consultas.php";

class gestionEducativa
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

        /*//PRODUCCION
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

    public function getComportamientos()
    {
        return getComportamientosQuery($this->con);
    }

    public function getBarrios($id_mun)
    {
        return getBarriosQuery($this->con, $id_mun);
    }

    public function getVeredas($id_mun)
    {
        return getVeredasQuery($this->con, $id_mun);
    }

    public function getEntidades($id_mun)
    {
        return getEntidadesQuery($this->con, $id_mun);
    }

    public function getEstrategias()
    {
        return getEstrategiasQuery($this->con);
    }

    public function getFicheros()
    {
        return getFicherosQuery($this->con);
    }

    public function getIndicadoresGEXSubtema($id_subtema)
    {
        return getIndicadoresGEXSubtemaQuery($this->con, $id_subtema);
    }

    public function getTacticos($estrat)
    {
        return getTacticosQuery($this->con, $estrat);
    }

    public function getTemas($compor)
    {
        return getTemasQuery($this->con, $compor);
    }

    public function logIn($uid, $pass)
    {
        return loginQuery($this->con, $uid, $pass);
    }

    public function getMunicipiosXZona($zona)
    {
        return getMunicipiosXZonaQuery($this->con, $zona);
    }

    public function getFocalizacionesXZona($zona)
    {
        return getFocalizacionesXZonaQuery($this->con, $zona);
    }

    public function getPlaneacionesXFocalizacion($foc)
    {
        return getPlaneacionesXFocalizacionQuery($this->con, $foc);
    }

    public function getPlaneacionesCalendar($plan_ejec)
    {
        return getPlaneacionesCalendarQuery($this->con, $plan_ejec);
    }

    public function getDetallePlaneacionEjecucion($id_plan)
    {
        return getDetallePlaneacionEjecucionQuery($this->con, $id_plan);
    }

    public function getZonas()
    {
        return getZonasQuery($this->con);
    }

    public function insertFocalizacion($id_mun, $id_tipoGestion, $tipo_focalizacion, $fecha)
    {
        return insertFocalizacionQuery($this->con, $id_mun, $id_tipoGestion, $tipo_focalizacion, $fecha);
    }

    public function insertIndicadoresXFocalizacion($id_foc, $id_indicador)
    {
        return insertIndicadoresXFocalizacionQuery($this->con, $id_foc, $id_indicador);
    }

    public function getMaxIdFoc()
    {
        return getMaxIdFocQuery($this->con);
    }

    public function getMaxPlanFoc()
    {
        return getMaxIdPlanQuery($this->con);
    }

    public function getMaxIdTAdmin()
    {
        return getMaxIdTAdminQuery($this->con);
    }

    public function getIndicadoresChec($comp)
    {
        return getIndicadoresChecQuery($this->con, $comp);
    }

    public function insertContacto($cedula, $nombres, $apellidos, $correo, $telefono, $celular, $cargo, $id_entidad)
    {
        return insertContactoQuery($this->con, $cedula, $nombres, $apellidos, $correo, $telefono, $celular, $cargo, $id_entidad);
    }

    public function insertEntidad($nombre, $direccion, $telefono, $tipoEntidad, $municipio)
    {
        return insertEntidadQuery($this->con, $nombre, $direccion, $telefono, $tipoEntidad, $municipio);
    }

    public function insertPlaneacion($jornada, $lugar_encuentro, $id_barrio, $id_vereda, $id_entidad, $fecha_plan, $fecha_registro, $id_foc)
    {
        return insertPlaneacionQuery($this->con, $jornada, $lugar_encuentro, $id_barrio, $id_vereda, $id_entidad, $fecha_plan, $fecha_registro, $id_foc);
    }

    public function insertContactosXEntidad($cedula, $entidad)
    {
        return insertContactosXEntidadQuery($this->con, $cedula, $entidad);
    }

    public function insertEjecucion($fecha, $hora_inicio, $hora_fin, $id_resultado, $descripcion, $id_planeacion, $total_asist)
    {
        return insertEjecucionQuery($this->con, $fecha, $hora_inicio, $hora_fin, $id_resultado, $descripcion, $id_planeacion, $total_asist);
    }

    public function getTipoGestion($id_foc)
    {
        return getTipoGestionQuery($this->con, $id_foc);
    }

    public function insertXPlaneacion($id_param, $id_plan, $name)
    {
        return insertXPlaneacionQuery($this->con, $id_param, $id_plan, $name);
    }

    public function insertTrabajoAdministrativo($hora_inicio, $hora_fin, $id_municipio, $fecha, $descripcion)
    {
        return insertTrabajoAdministrativoQuery($this->con, $hora_inicio, $hora_fin, $id_municipio, $fecha, $descripcion);
    }

    public function insertLaborXTrabajoAdministrativo($id_labor, $id_ta)
    {
        return insertLaborXTrabajoAdministrativoQuery($this->con, $id_labor, $id_ta);
    }

    public function getTrabajosAdministrativosCalendar()
    {
        return getTrabajosAdministrativosCalendarQuery($this->con);
    }

    public function insertNovedadNoEjecucion($id_planeacion, $descripcion, $fecha_aplazamiento, $fecha_plan)
    {
        return insertNovedadNoEjecucionQuery($this->con, $id_planeacion, $descripcion, $fecha_aplazamiento, $fecha_plan);
    }

    public function getPlaneacionesEjecutadosOEnEjecucion()
    {
        return getPlaneacionesEjecutadosOEnEjecucionQuery($this->con);
    }

    public function getNovedadesNoEjecucion()
    {
        return getNovedadesNoEjecucionQuery($this->con);
    }

    public function getContactos($mun)
    {
        return getContactosQuery($this->con, $mun);
    }

    public function contactoExiste($cedula)
    {
        return contactoExisteQuery($this->con, $cedula);
    }

    public function aplazarPlaneacion($id_plan, $fecha_plan)
    {
        return aplazarPlaneacionQuery($this->con, $id_plan, $fecha_plan);
    }

    public function getSubtemasXTema($id_tema)
    {
        return getSubtemasXTemaQuery($this->con, $id_tema);
    }

    public function getMunicipioInforme()
    {
        return getMunicipioInformeQuery($this->con);
    }

    public function getUserRol($name)
    {
        return getUserRolQuery($this->con, $name);
    }

    public function insertRegistros($tipo_registro, $id_plan, $url)
    {
        return insertRegistrosQuery($this->con, $tipo_registro, $id_plan, $url);
    }

    public function getInformes()
    {
        return getInformesQuery($this->con);
    }
}
