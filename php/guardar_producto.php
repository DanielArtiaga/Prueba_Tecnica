<?php
include 'conexion.php';

$codigo = $_POST['codigo'];
$nombre = $_POST['nombre'];
$bodega_id = $_POST['bodega'];
$sucursal_id = $_POST['sucursal'];
$moneda_id = $_POST['moneda'];
$precio = $_POST['precio'];
$materiales = isset($_POST['material']) ? implode(',', $_POST['material']) : '';
$descripcion = $_POST['descripcion'];

// var_dump($materiales);

$stmt = $pdo->prepare("SELECT COUNT(*) FROM producto WHERE codigo = ?");
$stmt->execute([$codigo]);

if ($stmt->fetchColumn() > 0) {
    echo json_encode(['success' => false, 'message' => 'El código del producto ya está registrado.']);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO producto (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, material, descripcion,fecharegistro) VALUES (?, ?, ?, ?, ?, ?, ?, ?,NOW())");
$insert = $stmt->execute([$codigo, $nombre, $bodega_id, $sucursal_id, $moneda_id, $precio, $materiales, $descripcion]);

if ($insert) {
    echo json_encode(['success' => true, 'message' => 'Producto Guardado Correctamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar el producto.']);
}
?>
