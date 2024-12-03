tipoUsuario();

//recuperar el modal
const modalUser = new bootstrap.Modal(document.getElementById('modalUser'));
var opcion = "";

//cuerpo del select para crear o editar un usuario
var cuerpo_tipo = document.querySelector('#tipoUsuario');
var form = document.querySelector('form');

//datos del formulario
var nombre = document.getElementById('nombre');
var apellido = document.getElementById('apellido');
var correo = document.getElementById('correo');
var contra = document.getElementById('contra');
var tipoUsuario = document.getElementById('tipoUsuario');

function tipoUsuario () {
    $.post("php/usuarios/admin/tipoUser.php",
        function (data, textStatus) {
            cuerpo_tipo.innerHTML = data;
        }
    );
}

//abrir el modal cuando se va a crear un nuevo usuario
$(document).on('click', '#btnCrearUsuario', function () {
    
    $('#modalUserTitulo').text('Crear Usuario');
    $('#btnEnviar').text('Crear usuario');

    form.reset();
    opcion = "crear";
    modalUser.show();
});

$(document).on('click', '.btnEditar', function (e) {
    e.preventDefault();
    var fila = e.target.parentNode.parentNode;
    var idEdit = fila.children[0].innerHTML;
    var nomEdit = fila.children[1].innerHTML;
    var apeEdit = fila.children[2].innerHTML;
    var correoEdit = fila.children[3].innerHTML;

    $('#modalUserTitulo').text('Editar Usuario');
    $('#btnEnviar').text('Guardar Cambios');

    $(nombre).val(nomEdit);
    $(apellido).val(apeEdit);
    $(correo).val(correoEdit);

    modalUser.show();
});

//crear o editar nuevo usuario
$(document).on('click', '#btnEnviar', function (e) {
    e.preventDefault();
    if (opcion == "crear") {
        $.post("php/usuarios/admin/control_registro.php", {
            nombre: nombre.value,
            apellido: apellido.value,
            correo: correo.value,
            contra: contra.value,
            tipoUsuario: tipoUsuario.value
        },
            function (data, textStatus) {
                if (data == "vacio") {
                    modalUser.hide();
                    VanillaToasts.create({
                        type: 'warning',
                        icon: 'plugins/VanillaToasts/icons/icon_warning.png',
                        title: 'CAMPOS VACIOS',
                        text: 'Completa el formulario',
                        timeout: 3500
                    });
                }
                if (data == "existe") {
                    modalUser.hide();
                    VanillaToasts.create({
                        type: 'error',
                        icon: 'plugins/VanillaToasts/icons/icon_error.png',
                        title: 'CORREO OCUPADO',
                        text: correo.value + ' en uso',
                        timeout: 3500
                    });
                    form.reset();
                }
                if (data == "exito") {
                    modalUser.hide();
                    VanillaToasts.create({
                        type: 'success',
                        icon: 'plugins/VanillaToasts/icons/icon_success.png',
                        title: 'REGISTRO EXITOSO',
                        text: 'Usuario creado con exito',
                        timeout: 3500
                    });
                    form.reset();
                    ListarUsuario();
                }
            }
        );
    }
    if (opcion == "editar") {
        
    }
});
