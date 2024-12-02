$(document).on("submit", ".form_agregar_carrito", function (e) {
    e.preventDefault();

    var idProduc = e.target.children[0].value;
    var desProduct = e.target.children[1].value;
    var precio = e.target.children[2].value;
    var cant = e.target.children[3].value;
    var idCaj = e.target.children[4].value;
    var idClien = e.target.children[5].value;

    $.ajax({
        type: "POST",
        url: "php/producto/agregar_carrito.php",
        data: {
            idProducto: idProduc,
            descripcion: desProduct,
            precio: precio,
            cantidad: cant,
            idCajero: idCaj,
            idCliente: idClien
        },
        dataType: "html",
        success: function (response) {
            if (response == "no") {
                window.location.href = "login.php";
            }
            if (response == "error") {
                VanillaToasts.create({
                    type: 'error',
                    icon: 'plugins/VanillaToasts/icons/icon_error.png',
                    title: 'UPS... ERROR',
                    text: 'Ha ocurrido un error',
                    timeout: 2500,
                    positionClass: 'bottomRight'
                });
            }
            if (response == "vacio") {
                VanillaToasts.create({
                    type: 'error',
                    icon: 'plugins/VanillaToasts/icons/icon_error.png',
                    title: 'UPS... ERROR',
                    text: 'Ha ocurrido un error',
                    timeout: 2500,
                    positionClass: 'bottomRight'
                });
            }
            if (response == "exito") {
                VanillaToasts.create({
                    type: 'success',
                    icon: 'plugins/VanillaToasts/icons/icon_success.png',
                    title: 'AGREGADO AL CARRITO',
                    text: 'Producto agregado a tu carrito',
                    timeout: 2500,
                    positionClass: 'bottomRight'
                });
            }
        }
    });
});
