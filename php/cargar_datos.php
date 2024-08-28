<?php 
include 'conexion.php';
header('Content-Type: application/json'); 

// aca simplifique el codigo en un solo archivo y lo que mando es un control para saber en que campo va a cargar los datos
$action = isset($_GET['control']) ? $_GET['control'] : '';

// cree una variable para poder reutilizarlo si mas adelante se requiere utilizar
$bodega_id = isset($_GET['bodega_id']) ? $_GET['bodega_id'] : '';

// por un switc tomo la variable que viene por el get para poder saber que query iria a consultar
switch ($action) {
    case 'bodegas':
        $stmt = $pdo->query("SELECT id, nombre FROM bodega");
        $bodegas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($bodegas);
        break;
    case 'sucursales':
        $stmt = $pdo->query("SELECT id, nombre FROM sucursal WHERE bodega_id =".$bodega_id);
        // $stmt->execute([$bodega_id]);
        $bodegas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($bodegas);
        break;
    case 'monedas':
        $stmt = $pdo->query("SELECT id, nombre FROM moneda");
        $bodegas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($bodegas);
        break;                
    default:
        echo json_encode(['ERROR']);
        break;
}
?> 