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

function logIn($con, $sql, $pass)
{
    if ($result = $con->query($sql)) {
        if ($row = $result->fetch(PDO::FETCH_ASSOC)) {

            $pswdCheck = password_verify($pass, $row['passwd']);
            if ($pswdCheck == false) {
                header("Location: ../iniciarSesion.html?error=wrgpswd");
                exit();
                echo false;

            } elseif ($pswdCheck == true) {
                session_start();

                $_SESSION['user'] = array('uid' => $row['cedula'],
                    'pass' => $row['passwd'], 'nombre' => $row['nombres'], 'rol' => $row['id_rol'],
                    'zona' => $row['id_zona']);

                if ($row['id_rol'] != 3) {

                    header("Location: ../home.html?user=" . $row['id_rol'] . "&id_zona=all");
                    exit();
                } else {

                    header("Location: ../home.html?user=" . $row['id_rol'] . "&id_zona=" . $row['id_zona'] . "");
                    exit();
                }
            }
        } else {
            header("Location: ../iniciarSesion.html?error=nouser");
            exit();
        }
    }
}

function insertQuery($con, $sql)
{
    $result = $con->query($sql);
    if ($result) {
        return $data = array("message" => "Guardado con exito!", "error" => 0);
    } else {
        return $data = array("message" => "No se guardó", "error" => 1, "error_message" => $con->errorInfo()[2]);
    }
}

/* CONSULTAS */

function getMunicipiosXZonaQuery($con, $zona)
{
    $sql = "SELECT id_municipio, municipio, zna.zonas, zna.id_zona
    FROM municipios mn
    JOIN zonas zna ON mn.id_zona = zna.id_zona";

    if ($zona != "all") {
        $sql .= " WHERE mn.id_zona = $zona";
    }

    $sql .= " ORDER BY municipio;";

    return executeQuery($con, $sql);
}

function getZonasQuery($con)
{
    $sql = "SELECT zon.id_zona, zonas, CONCAT(nombres, ' ', apellidos) as nombre
    FROM zonas zon
    JOIN asignar_zonas asz ON asz.id_zona = zon.id_zona
    JOIN personas per ON asz.cedula_asignado = per.cedula
    ORDER BY zon.id_zona ASC";

    return executeQuery($con, $sql);
}

function getIndicadoresGEXSubtemaQuery($con, $subtemas)
{
    $ids = implode(', ', $subtemas);

    $sql = "SELECT ige.id_indicador, nombre_indicador, id_subtema
    FROM indicadores_ge ige
    JOIN indicadores_ge_x_subtemas igexs ON igexs.id_indicador = ige.id_indicador
    WHERE id_subtema IN ($ids)";

    return executeQuery($con, $sql);
}

function getEntidadesQuery($con, $id_mun)
{
    $sql = "SELECT id_entidad, nombre_entidad
    FROM entidades
    WHERE id_municipio = $id_mun
    ORDER BY nombre_entidad ASC";

    return executeQuery($con, $sql);
}

function getComportamientosQuery($con)
{
    $sql = "SELECT id_comportamientos, comportamientos, competencia
    FROM comportamientos cpc
    JOIN competencias comp ON cpc.id_competencia = comp.id_competencia";

    return executeQuery($con, $sql);
}

function getFocalizacionesXZonaQuery($con, $mun)
{
    $sql = "SELECT foc.id_focalizacion, mun.id_municipio, id_tipo_gestion, mun.municipio, mun.id_zona, compor.id_comportamientos, compor.comportamientos, foc.tipo_focalizacion, foc.fecha, compe.competencia
    FROM focalizacion foc
    LEFT JOIN indicadores_chec_x_focalizacion icxf ON icxf.id_focalizacion= foc.id_focalizacion
    LEFT JOIN indicadores_chec ind ON ind.id_indicador= icxf.id_indicador
    LEFT JOIN comportamientos compor ON compor.id_comportamientos = ind.id_comportamiento
    LEFT JOIN competencias compe ON compe.id_competencia = compor.id_competencia
    JOIN municipios mun ON mun.id_municipio = foc.id_municipio
    WHERE mun.id_municipio = $mun
    GROUP BY foc.id_focalizacion, mun.id_municipio, mun.municipio, compor.id_comportamientos, compor.comportamientos, foc.tipo_focalizacion, foc.fecha, compe.competencia
    ORDER BY foc.fecha DESC";

    return executeQuery($con, $sql);
}

function getPlaneacionesXFocalizacionQuery($con, $foc)
{
    $sql = "SELECT DISTINCT pl.id_planeacion, tg.tipo_gestion, estrat.nombre_estrategia, tem.temas, pl.fecha_plan, pl.fecha_registro, zon.id_zona, pl.id_focalizacion
	FROM planeacion pl
    JOIN focalizacion foc ON pl.id_focalizacion = foc.id_focalizacion
    JOIN subtemas_x_planeacion sxp ON sxp.id_planeacion = pl.id_planeacion
	JOIN subtemas sutem ON sutem.id_subtema = sxp.id_subtema
    JOIN temas tem ON tem.id_temas = sutem.id_temas
    JOIN tacticos_x_planeacion txp ON txp.id_planeacion = pl.id_planeacion
    JOIN tactico tact ON txp.id_tactico = tact.id_tactico
    JOIN estrategias estrat ON estrat.id_estrategia = tact.id_estrategia
    JOIN tipo_gestion tg ON tg.id_tipo_gestion = foc.id_tipo_gestion
	JOIN municipios mun ON mun.id_municipio = foc.id_municipio
	JOIN zonas zon ON mun.id_zona = zon.id_zona
    WHERE pl.id_focalizacion = '$foc'";

    return executeQuery($con, $sql);
}

function getBarriosQuery($con, $id_mun)
{
    $sql = "SELECT id_barrio, barrio
    FROM barrios bar
    JOIN comunas com ON com.id_comuna = bar.id_comuna
    WHERE com.id_municipio = $id_mun";

    return executeQuery($con, $sql);
}

function getTipoGestionQuery($con, $id_foc)
{
    $sql = "SELECT id_tipo_gestion
    FROM focalizacion
    WHERE id_focalizacion = $id_foc";

    return executeQuery($con, $sql);
}

function getVeredasQuery($con, $id_mun)
{
    $sql = "SELECT id_veredas, vereda
    FROM veredas
    WHERE id_municipio = $id_mun";

    return executeQuery($con, $sql);
}

function getEstrategiasQuery($con)
{
    $sql = "SELECT * FROM estrategias";

    return executeQuery($con, $sql);
}

function getContactosQuery($con, $mun)
{
    $sql = "SELECT con.id_contacto, cedula, CONCAT(nombres, ' ', apellidos) as nombre, celular, cargo, nombre_entidad
    FROM contacto con
    JOIN entidades ent ON con.id_entidad = ent.id_entidad
    JOIN municipios mun ON mun.id_municipio = ent.id_municipio
    WHERE mun.id_municipio = $mun";

    return executeQuery($con, $sql);
}

function getFicherosQuery($con)
{
    $sql = "SELECT codigo FROM ficheros";

    return executeQuery($con, $sql);
}

function getTacticosQuery($con, $estrat)
{
    $sql = "SELECT id_tactico, nombre_tactico
    FROM tactico
    WHERE id_estrategia = $estrat";

    return executeQuery($con, $sql);
}

function getTemasQuery($con, $compor)
{
    $sql = "SELECT id_temas, temas
    FROM temas
    WHERE id_comportamiento = $compor";

    return executeQuery($con, $sql);
}

function loginQuery($con, $uid, $psswd)
{
    $sql = "SELECT per.cedula, per.id_rol, rol.cargo, per.email, per.usuario, per.passwd, per.foto_url, asz.id_zona, per.nombres
    FROM personas per
	LEFT JOIN asignar_zonas asz ON asz.cedula_asignado = per.cedula
    JOIN roles rol ON rol.id_cargo = per.id_rol
    WHERE email = '" . $uid . "' OR usuario = '" . $uid . "' ";

    return logIn($con, $sql, $psswd);
}

function getIndicadoresChecQuery($con, $comp)
{
    $sql = "SELECT id_indicador, indicador
    FROM indicadores_chec
    WHERE id_comportamiento = $comp";

    return executeQuery($con, $sql);
}

function getDetallePlaneacionEjecucionQuery($con, $id_plan)
{
    $sql = "SELECT DISTINCT fecha_plan, municipio, CONCAT(nombres, ' ', apellidos) as nombre, zonas, nombre_entidad, comportamientos, competencia, nombre_estrategia, temas, nombre_tactico
	FROM planeacion pl
    JOIN focalizacion foc ON pl.id_focalizacion = foc.id_focalizacion
    JOIN subtemas_x_planeacion sxp ON sxp.id_planeacion = pl.id_planeacion
	JOIN subtemas sutem ON sutem.id_subtema = sxp.id_subtema
    JOIN temas tem ON tem.id_temas = sutem.id_temas
    JOIN tacticos_x_planeacion txp ON txp.id_planeacion = pl.id_planeacion
    JOIN tactico tact ON txp.id_tactico = tact.id_tactico
    JOIN estrategias estrat ON estrat.id_estrategia = tact.id_estrategia
    JOIN tipo_gestion tg ON tg.id_tipo_gestion = foc.id_tipo_gestion
	JOIN municipios mun ON mun.id_municipio = foc.id_municipio
	JOIN zonas zon ON mun.id_zona = zon.id_zona
	JOIN asignar_zonas az ON az.id_zona = zon.id_zona
	JOIN personas per ON per.cedula = az.cedula_asignado
	JOIN entidades ent ON pl.id_entidad = ent.id_entidad
	JOIN indicadores_chec_x_focalizacion ixf ON ixf.id_focalizacion = foc.id_focalizacion
	JOIN indicadores_chec ic ON ic.id_indicador = ixf.id_indicador
	JOIN comportamientos compor ON ic.id_comportamiento = compor.id_comportamientos
	JOIN competencias compe ON compor.id_competencia = compe.id_competencia
    WHERE pl.id_planeacion = $id_plan";

    return executeQuery($con, $sql);
}

function getMaxIdFocQuery($con)
{
    $sql = "SELECT MAX(id_focalizacion) FROM focalizacion";

    return executeQuery($con, $sql);
}

function getMaxIdPlanQuery($con)
{
    $sql = "SELECT MAX(id_planeacion) FROM planeacion";

    return executeQuery($con, $sql);
}

function getMaxIdTAdminQuery($con)
{
    $sql = "SELECT MAX(id_trabajo_administrativo) FROM trabajo_administrativo";

    return executeQuery($con, $sql);
}

function getPlaneacionesCalendarQuery($con, $plan_ejec)
{
    $sql = "SELECT DISTINCT plan.id_planeacion, fecha_plan, jornada, lugar_encuentro, mun.municipio,
	foc.id_focalizacion, bar.barrio, ver.vereda, compor.comportamientos, compe.competencia, zon.zonas, zon.id_zona, nombre_estrategia, nombre_tactico, temas,
	CONCAT(per.nombres, ' ', per.apellidos) as nombre, solicitud_interventora
    FROM planeacion plan
    LEFT JOIN barrios bar ON bar.id_barrio = plan.id_barrio
    LEFT JOIN comunas com ON bar.id_comuna = com.id_comuna
    LEFT JOIN veredas ver ON ver.id_veredas = plan.id_vereda
    LEFT JOIN municipios mun ON mun.id_municipio = com.id_municipio OR mun.id_municipio = ver.id_municipio
    JOIN focalizacion foc ON foc.id_focalizacion = plan.id_focalizacion
    JOIN indicadores_chec_x_focalizacion icxf ON icxf.id_focalizacion = foc.id_focalizacion
    JOIN indicadores_chec ic ON ic.id_indicador = icxf.id_indicador
    JOIN comportamientos compor ON compor.id_comportamientos = ic.id_comportamiento
    JOIN competencias compe ON compe.id_competencia = compor.id_competencia
    JOIN zonas zon ON zon.id_zona = mun.id_zona
	JOIN asignar_zonas az ON az.id_zona = zon.id_zona
    JOIN personas per ON per.cedula = az.cedula_asignado
    JOIN subtemas_x_planeacion sxp ON sxp.id_planeacion = plan.id_planeacion
	JOIN subtemas sutem ON sutem.id_subtema = sxp.id_subtema
    JOIN temas tem ON tem.id_temas = sutem.id_temas
    JOIN tacticos_x_planeacion txp ON txp.id_planeacion = plan.id_planeacion
    JOIN tactico tact ON txp.id_tactico = tact.id_tactico
    JOIN estrategias estrat ON estrat.id_estrategia = tact.id_estrategia
    JOIN tipo_gestion tg ON tg.id_tipo_gestion = foc.id_tipo_gestion ";

    if (!empty($plan_ejec)) {

        $and_true = true;

        foreach ($plan_ejec as $key => $value) {
            $val = $value['id'];
            if ($and_true) {
                $sql .= "WHERE plan.id_planeacion <> $val";
                $and_true = false;
            } else {
                $sql .= " AND plan.id_planeacion <> $val";
            }
        }

        $sql .= " ORDER BY plan.id_planeacion ASC";

    }

    return executeQuery($con, $sql);
}

function contactoExisteQuery($con, $cedula)
{
    $sql = "SELECT id_contacto, cedula
    FROM contacto
    WHERE cedula = $cedula";

    return executeQuery($con, $sql);
}

function getSubtemasXTemaQuery($con, $id_tema)
{
    $sql = "SELECT id_subtema, subtemas, id_temas
    FROM subtemas
    WHERE id_temas = $id_tema";

    return executeQuery($con, $sql);
}

function getPlaneacionesEjecutadosOEnEjecucionQuery($con)
{
    $sql = "SELECT DISTINCT plan.id_planeacion, fecha_plan, jornada, lugar_encuentro, mun.municipio,
	foc.id_focalizacion, bar.barrio, ver.vereda, compor.comportamientos, compe.competencia, zon.zonas, zon.id_zona, nombre_estrategia, nombre_tactico, temas,
	CONCAT(per.nombres, ' ', per.apellidos) as nombre
    FROM planeacion plan
    LEFT JOIN barrios bar ON bar.id_barrio = plan.id_barrio
    LEFT JOIN comunas com ON bar.id_comuna = com.id_comuna
    LEFT JOIN veredas ver ON ver.id_veredas = plan.id_vereda
    LEFT JOIN municipios mun ON mun.id_municipio = com.id_municipio OR mun.id_municipio = ver.id_municipio
    JOIN focalizacion foc ON foc.id_focalizacion = plan.id_focalizacion
    JOIN indicadores_chec_x_focalizacion icxf ON icxf.id_focalizacion = foc.id_focalizacion
    JOIN indicadores_chec ic ON ic.id_indicador = icxf.id_indicador
    JOIN comportamientos compor ON compor.id_comportamientos = ic.id_comportamiento
    JOIN competencias compe ON compe.id_competencia = compor.id_competencia
    JOIN zonas zon ON zon.id_zona = mun.id_zona
	JOIN asignar_zonas az ON az.id_zona = zon.id_zona
    JOIN personas per ON per.cedula = az.cedula_asignado
	JOIN subtemas_x_planeacion sxp ON sxp.id_planeacion = plan.id_planeacion
	JOIN subtemas sutem ON sutem.id_subtema = sxp.id_subtema
    JOIN temas tem ON tem.id_temas = sutem.id_temas
    JOIN tacticos_x_planeacion txp ON txp.id_planeacion = plan.id_planeacion
    JOIN tactico tact ON txp.id_tactico = tact.id_tactico
    JOIN estrategias estrat ON estrat.id_estrategia = tact.id_estrategia
    JOIN tipo_gestion tg ON tg.id_tipo_gestion = foc.id_tipo_gestion
    WHERE plan.id_planeacion IN (SELECT id_planeacion FROM ejecucion)";

    return executeQuery($con, $sql);
}

function getNovedadesNoEjecucionQuery($con)
{
    $sql = "SELECT DISTINCT ON (plan.id_planeacion) plan.id_planeacion, nne.fecha_no_ejecutada, fecha_plan, jornada, lugar_encuentro, mun.municipio,
    foc.id_focalizacion, bar.barrio, ver.vereda, compor.comportamientos,
    compe.competencia, zon.zonas, zon.id_zona, CONCAT(per.nombres, ' ', per.apellidos) as nombre,
    temas, nombre_estrategia
        FROM planeacion plan
        JOIN novedad_no_ejecucion nne ON plan.id_planeacion = nne.id_planeacion
        LEFT JOIN barrios bar ON bar.id_barrio = plan.id_barrio
        LEFT JOIN comunas com ON bar.id_comuna = com.id_comuna
        LEFT JOIN veredas ver ON ver.id_veredas = plan.id_vereda
        LEFT JOIN municipios mun ON mun.id_municipio = com.id_municipio OR mun.id_municipio = ver.id_municipio
        JOIN focalizacion foc ON foc.id_focalizacion = plan.id_focalizacion
        JOIN indicadores_chec_x_focalizacion icxf ON icxf.id_focalizacion = foc.id_focalizacion
        JOIN indicadores_chec ic ON ic.id_indicador = icxf.id_indicador
        JOIN comportamientos compor ON compor.id_comportamientos = ic.id_comportamiento
        JOIN competencias compe ON compe.id_competencia = compor.id_competencia
        JOIN zonas zon ON zon.id_zona = mun.id_zona
        JOIN asignar_zonas az ON az.id_zona = zon.id_zona
        JOIN personas per ON per.cedula = az.cedula_asignado
        JOIN subtemas_x_planeacion sxp ON sxp.id_planeacion = plan.id_planeacion
	    JOIN subtemas sutem ON sutem.id_subtema = sxp.id_subtema
        JOIN temas tem ON tem.id_temas = sutem.id_temas
        JOIN tacticos_x_planeacion txp ON txp.id_planeacion = plan.id_planeacion
        JOIN tactico tact ON txp.id_tactico = tact.id_tactico
        JOIN estrategias estrat ON estrat.id_estrategia = tact.id_estrategia
        JOIN tipo_gestion tg ON tg.id_tipo_gestion = foc.id_tipo_gestion
        WHERE plan.id_planeacion IN(SELECT id_planeacion FROM novedad_no_ejecucion WHERE estado_novedad = 'No ejecutado')
        AND plan.id_planeacion NOT IN (SELECT id_planeacion FROM ejecucion)
        ORDER BY plan.id_planeacion, fecha_no_ejecutada DESC NULLS LAST";

    return executeQuery($con, $sql);
}

function getTrabajosAdministrativosCalendarQuery($con)
{
    $sql = "SELECT ta.id_trabajo_administrativo, municipio, ta.fecha, hora_inicio, hora_fin, zonas, zon.id_zona, labor, id_labor, CONCAT(per.nombres, ' ', per.apellidos) as nombre
    FROM trabajo_administrativo ta
    JOIN municipios mun ON mun.id_municipio = ta.id_municipio
    JOIN zonas zon ON zon.id_zona = mun.id_zona
	JOIN labores_x_trabajo_administrativo lxta ON lxta.id_trabajo_administrativo = ta.id_trabajo_administrativo
	JOIN tipo_labor tl ON tl.id_labor = lxta.id_tipo_labor
	JOIN asignar_zonas az ON az.id_zona = zon.id_zona
	JOIN personas per ON per.cedula = az.cedula_asignado";

    return executeQuery($con, $sql);
}

function getUserRolQuery($con, $name)
{
    $sql = "SELECT id_rol
    FROM personas
    WHERE email = '$name' OR usuario = '$name'";

    return executeQuery($con, $sql);
}

/* INSERTS */

function insertIndicadoresXFocalizacionQuery($con, $id_focalizacion, $id_indicador)
{
    $sql = "INSERT INTO public.indicadores_chec_x_focalizacion(id_indicador, id_focalizacion)
    VALUES ($id_indicador, $id_focalizacion);";

    return insertQuery($con, $sql);
}

function insertFocalizacionQuery($con, $id_mun, $id_tipoGestion, $tipo_focalizacion, $fecha)
{
    $sql = "INSERT INTO public.focalizacion(id_municipio, id_tipo_gestion, fecha, tipo_focalizacion)
    VALUES ($id_mun, $id_tipoGestion, '$fecha', '$tipo_focalizacion');";

    return insertQuery($con, $sql);

}

function insertPlaneacionQuery($con, $jornada, $lugar_encuentro, $id_barrio, $id_vereda, $id_entidad, $fecha_plan, $fecha_registro, $id_foc)
{
    $sql = "INSERT INTO public.planeacion(
	jornada, lugar_encuentro, id_barrio, id_vereda, id_entidad, fecha_plan, fecha_registro, id_focalizacion)
    VALUES ('$jornada', '$lugar_encuentro', $id_barrio, $id_vereda, $id_entidad, '$fecha_plan', '$fecha_registro', $id_foc);";

    return insertQuery($con, $sql);
}

function insertEntidadQuery($con, $nombre, $direccion, $telefono, $tipoEntidad, $municipio)
{
    $sql = "INSERT INTO public.entidades(
    nombre_entidad, direccion, telefono, id_tipo_entidad, id_municipio)
    VALUES ('$nombre', '$direccion', '$telefono', $tipoEntidad, $municipio);";

    return insertQuery($con, $sql);
}

function insertContactoQuery($con, $cedula, $nombres, $apellidos, $correo, $telefono, $celular, $cargo, $id_entidad)
{
    $sql = "INSERT INTO public.contacto(
    id_contacto, cedula, nombres, apellidos, correo, telefono, celular, cargo, id_entidad)
    VALUES (nextval('seq_contacto'), '$cedula', '$nombres', '$apellidos', '$correo', '$telefono', '$celular', '$cargo', $id_entidad);";

    return insertQuery($con, $sql);
}

function insertContactosXEntidadQuery($con, $cedula, $entidad)
{
    $sql = "INSERT INTO public.contactos_x_entidad(cedula, id_entidad)
    VALUES ('$cedula', $entidad);";

    return insertQuery($con, $sql);
}

function insertEjecucionQuery($con, $fecha, $hora_inicio, $hora_fin, $id_resultado, $descripcion, $id_planeacion, $total_asist)
{
    $sql = "INSERT INTO public.ejecucion(
    fecha, hora_inicio, hora_fin, id_resultado_ejecucion, descripcion_resultado, id_planeacion, total_asistentes)
    VALUES ('$fecha', '$hora_inicio', '$hora_fin', $id_resultado, '$descripcion', $id_planeacion, $total_asist);";

    return insertQuery($con, $sql);
}

function insertXPlaneacionQuery($con, $id_param, $id_plan, $name)
{

    if ($name == 'subtema') {
        $sql = "INSERT INTO public.subtemas_x_planeacion(
        id_subtema, id_planeacion)
        VALUES ($id_param, $id_plan);";

        return insertQuery($con, $sql);
    }

    if ($name == 'contacto') {
        $sql = "INSERT INTO public.contactos_x_planeacion(
        id_contacto, id_planeacion)
        VALUES ($id_param, $id_plan);";

        return insertQuery($con, $sql);
    }

    if ($name == 'tactico[]') {

        $sql = "INSERT INTO public.tacticos_x_planeacion(
            id_planeacion, id_tactico)
            VALUES ($id_plan, $id_param);";

        return insertQuery($con, $sql);

    }

}

function insertTrabajoAdministrativoQuery($con, $hora_inicio, $hora_fin, $id_municipio, $fecha, $descripcion)
{
    $sql = "INSERT INTO public.trabajo_administrativo(
    hora_inicio, hora_fin, id_municipio, fecha, descripcion)
    VALUES ('$hora_inicio', '$hora_fin', $id_municipio, '$fecha', '$descripcion');";

    return insertQuery($con, $sql);
}

function insertLaborXTrabajoAdministrativoQuery($con, $id_labor, $id_ta)
{
    $sql = "INSERT INTO public.labores_x_trabajo_administrativo(
    id_tipo_labor, id_trabajo_administrativo)
    VALUES ($id_labor, $id_ta);";

    return insertQuery($con, $sql);
}

function insertNovedadNoEjecucionQuery($con, $id_planeacion, $descripcion, $fecha_aplazamiento, $fecha_plan)
{
    $sql = "INSERT INTO public.novedad_no_ejecucion(
    id_planeacion, descripcion, fecha_aplazamiento, estado_novedad, fecha_no_ejecutada)
    VALUES ($id_planeacion, '$descripcion', '$fecha_aplazamiento', 'No ejecutado', '$fecha_plan');";

    return insertQuery($con, $sql);
}

/* UPDATES */
function aplazarPlaneacionQuery($con, $id_plan, $fecha_plan)
{
    $sql = "UPDATE public.planeacion
	SET fecha_plan='$fecha_plan'
    WHERE id_planeacion = $id_plan;";

    insertQuery($con, $sql);
}
