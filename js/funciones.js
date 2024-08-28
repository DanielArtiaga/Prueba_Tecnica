document.addEventListener("DOMContentLoaded", (event) => {
    // Cargar datos al iniciar la página
    cargarBodegas();
    cargarMonedas();

     // Obtener elementos del formulario
    var bodega = document.getElementById('bodega');
    var formulario = document.getElementById('form-formulario');
    var sucursal = document.getElementById('sucursal');

    // Cargar sucursales al cambiar la bodega
    bodega.addEventListener('change', function() {
        const bodegaId = this.value;
        sucursal.innerHTML = '<option value="0"></option>';
        cargarSucursales(bodegaId);
    });

    // Al poner click en el boton guardar se dirige a esta funcion

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        // Antes de registrar los datos o  validar si el codigo del producto existe hace las primeras validaciones si encuantra algun error alerta en que campo esta el error 
        if (!validarForm()) {
            return;
        }
        // al terminar las validaciones envia el formulario para poder registrar los datos en la base
        const formData = new FormData(formulario);
        fetch('php/guardar_producto.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // si el registro fue correcto saldria la alerta que la estoy mandando del backend
                alert(result.message);
                formulario.reset();
            } else {
                // si el registro fue incorrecto saldria la alerta que la estoy mandando del backend
                alert(result.message);
            }
        });

    });

    function validarForm() {

        // Obtengo los valores de los campos del formulario y lo guardo en las variable para poder validar uno por uno, elimina los espacios al princio y al final de cada campo
        const codigo = document.getElementById('codigo').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const precio = document.getElementById('precio').value.trim();
        const bodega = document.getElementById('bodega').value.trim();
        const sucursal = document.getElementById('sucursal').value.trim();
        const moneda = document.getElementById('moneda').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const materiales = document.querySelectorAll('input[name="material[]"]:checked');

        console.log(codigo);

        //Crea las variables Regex para poder validar mas adelante
        const CodigoR = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,15}$/;
        const RegexPre = /^\d+(\.\d{1,2})?$/;

        // valido que el codigo del producto no este en blanco
        if (!codigo) {
            alert("El código del producto no puede estar en blanco.");
            return false;
        }
        // valido con el codigo regex para que solo contenga entre 5 y 15 caracteres , solo letras y numeros
        if (!CodigoR.test(codigo)) {
            alert("El código del producto debe contener letras y números y tener entre 5 y 15 caracteres.");
            return false;
        }

        // valido que el nombre del producto no este en blanco
        if (!nombre) {
            alert("El nombre del producto no puede estar en blanco.");
            return false;
        }
        // valido que el nombre del producto tenga mas de 2 y menos de 50 caracteres
        if (nombre.length < 2 || nombre.length > 50) {
            alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
            return false;
        }

        
        // valido que el tenga una bodega seleccionada y no este en blanco o 0 
        if (bodega == 0) {
            alert("Debe seleccionar una bodega.");
            return false;
        }

        // valido que el tenga una sucursal seleccionada y no este en blanco o 0 
        if (sucursal == 0) {
            alert("Debe seleccionar una sucursal para la bodega seleccionada.");
            return false;
        }

        // valido que el tenga una moneda seleccionada y no este en blanco o 0 
        if (moneda == 0) {
            alert("Debe seleccionar una moneda para el producto.");
            return false;
        }

        // valido que el precio del producto no este en blanco
        if (!precio) {
            alert("El precio del producto no puede estar en blanco.");
            return false;
        }

        // valido que el precio del producto tengo un numero entero positivo y menos de 3 decimales
        if (!RegexPre.test(precio)) {
            alert("El precio del producto debe ser un número positivo con hasta dos decimales.");
            return false;
        }

        // valido que debe seleccionar dos materiales
        if (materiales.length < 2) {
            alert("Debe seleccionar al menos dos materiales para el producto.");
            return false;
        }

        // valido que la descripcion no debe estar en blanco

        if (!descripcion) {
            alert("La descripción del producto no puede estar en blanco.");
            return false;
        }

        // valido que la descripcion debe tener mas de 10 y menos de 1000 caracteres
        if (descripcion.length < 10 || descripcion.length > 1000) {
            alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
            return false;
        }

        return true;
    }

   

});

// aca cargo los datos de bodega al momento de carga la vista  
function cargarBodegas(){
    fetch('php/cargar_datos.php?control=bodegas')
    .then(response => response.json())
    .then(data => {
        const bodegaSelect = document.getElementById('bodega');
        data.forEach(bodega => {
            const option = document.createElement('option');
            option.value = bodega.id;
            option.textContent = bodega.nombre;
            bodegaSelect.appendChild(option);
        });
    })
    .catch(error => alert('Error al cargar monedas: ' + error));
}

// aca cargo los datos de sucursales al momento de seleccionar una bodega
function cargarSucursales(bodegaid){
    fetch('php/cargar_datos.php?control=sucursales&bodega_id='+bodegaid)
    .then(response => response.json())
    .then(data => {
        const sucursalSelect = document.getElementById('sucursal');
        data.forEach(sucursal => {
            const option = document.createElement('option');
            option.value = sucursal.id;
            option.textContent = sucursal.nombre;
            sucursalSelect.appendChild(option);
        });
    })
    .catch(error => alert('Error al cargar monedas: ' + error));
}

// aca cargo los datos de monedas al momento de carga la vista  
function cargarMonedas(){
    fetch('php/cargar_datos.php?control=monedas')
    .then(response => response.json())
    .then(data => {
        const monedaSelect = document.getElementById('moneda');
        data.forEach(moneda => {
            const option = document.createElement('option');
            option.value = moneda.id;
            option.textContent = moneda.nombre;
            monedaSelect.appendChild(option);
        });
    })
    .catch(error => alert('Error al cargar monedas: ' + error));
}