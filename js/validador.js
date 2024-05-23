$(document).ready(function() {

  // Agregar método de validación para RUT chileno
  $.validator.addMethod("rutChileno", function(value, element) {

    // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
    var rutPattern = /^\d{7,8}-[\dK]$/;
    if (!rutPattern.test(value)) {
        return false;
    }

    // Validar el dígito verificador
    var rutSinGuion = value.replace("-", "");
    var rut = rutSinGuion.slice(0, -1);
    var dv = rutSinGuion.slice(-1);
    var factor = 2;
    var sum = 0;
    for (var i = rut.length - 1; i >= 0; i--) {
        sum += parseInt(rut.charAt(i)) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }
    var dvCalculado = 11 - (sum % 11);
    dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

    return dv === dvCalculado;
  }, "El RUT no es válido (escriba sin puntos y con guión)");

  // Agregar método de validación para correo
  $.validator.addMethod("emailCompleto", function(value, element) {

    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

    // Validar correo electrónico con la expresión regular
    return regex.test(value);

  }, 'El formato del correo no es válido');
  
  // Agregar método de validación para que un campo sólo acepte 
  // letras y espacios en blanco, pero no números ni símbolos,
  // ideal para campos como nombres y apellidos
  $.validator.addMethod("soloLetras", function(value, element) {

    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);

  }, "Sólo se permiten letras y espacios en blanco.");

  $.validator.addMethod("soloNumeros", function(value, element) {
    return this.optional(element) || /^[0-9]+$/.test(value);
  }, "Por favor, ingresa solo números.");



  // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula

  if(document.getElementById('rut')){
    document.getElementById('rut').addEventListener('keyup', function(e) {
      e.target.value = e.target.value.toUpperCase();
    });
  }


  $("#formulario-ingresar").validate({
    rules: {
      correo: {
        required: true,
        emailCompleto: true
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 15
      }
    }, // --> Fin de reglas
    messages: {
      correo: {
        required: "El correo es un campo requerido",
        email: "El formato del correo no es válido"
      },
      password: {
        required: "La contraseña es un campo requerido",
        minlength: "La contraseña debe tener un mínimo de 8 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres"
      },
    }, 
  });

  // Validar formulario con JQuery
  $("#formulario-registro").validate({
    rules: {
      rut: {
        required: true,
        rutChileno: true
      },
      nombre: {
        required: true,
        soloLetras: true,
        minlength: 3,
        maxlength: 30
      },
      apellido: {
        required: true,
        soloLetras: true
      },
      correo: {
        required: true,
        emailCompleto: true,
      },
      direccion: {
        required: true,
        minlength: 10
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 15,
      },
      password2: {
        required: true,
        minlength: 8,
        maxlength: 15,
        equalTo: "#password",
      },
    }, // --> Fin de reglas
    messages: {
      rut: {
        required: "El RUT es un campo requerido",
        rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
      },
      nombre: {
        required: "El nombre es un campo requerido",
        soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        minlength: "El nombre no puede ser menor a 3 letras",
        maxlength: "El nombre no puede ser menor a 30 letras"
      },
      apellido: {
        required: "El apellido es un campo requerido",
        soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
      },
      correo: {
        required: "El correo es un campo requerido",
        email: "El formato del correo no es válido",
      },
      direccion: {
        required: "la Dirección es un campo requerido",
        minlength: "la Dirección no puede ser menor a 10 caracteres"
      },
      password: {
        required: "La contraseña es un campo requerido",
        minlength: "La contraseña debe tener un mínimo de 8 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      },
      password2: {
        required: "Repetir contraseña es un campo requerido",
        minlength: "Repetir contraseña debe tener un mínimo de 8 caracteres",
        maxlength: "Repetir contraseña debe tener un máximo de 15 caracteres",
        equalTo: "Debe repetir la contraseña escrita anteriormente",
      },
    }, 
  });



  $("#formulario-usuarios").validate({
    rules: {
      id: {
        required: true,
        minlength: 1,
        maxlength: 15,
        soloNumeros:true
      },
      rut: {
        required: true,
        rutChileno: true
      },
      apellido: {
        required: true,
        minlength: 3,
        soloLetras: true,
        maxlength: 20
      },
      correo: {
        required: true,
        emailCompleto: true,
      },
      direccion: {
        required: true,
        minlength: 10
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 15,
      },
    }, // --> Fin de reglas
    messages: {
      id: {
        required: "El ID es un campo requerido",
        minlength: "El ID tiene que tener al menos 1 dígito",
        maxlength: "El ID debe tener un maximo de 15 dígitos",
        soloNumeros: "El ID solo pueden ser números"
      },
      rut: {
        required: "El RUT es un campo requerido",
        rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
      },
      apellido: {
        required: "El apellido es un campo requerido",
        minlength: "El apellido tiene que tener al menos 3 letras",
        soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
        maxlength: "El apellido tiene como máximo 20 letras"
      },
      correo: {
        required: "El correo es un campo requerido",
        email: "El formato del correo no es válido",
      },
      direccion: {
        required: "la Dirección es un campo requerido",
        minlength: "la Dirección no puede ser menor a 10 caracteres"
      },
      password: {
        required: "La contraseña es un campo requerido",
        minlength: "La contraseña debe tener un mínimo de 8 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      },
    }, 
  });


  $("#formulario-bodega").validate({
    rules: {
      categoria: {
        required: true
      },
      nombre: {
        required: true
      },
      cantidad: {
        required: true,
        minlength: 1,
        maxlength: 3,
        soloNumeros: true
      }
    }, // --> Fin de reglas
    messages: {
      categoria: {
        required: "El categoria es un campo requerido",
      },
      nombre: {
        required: "El nombre es un campo requerido",
      },
      cantidad: {
        required: "La cantidad es un campo requerido",
        minlength: "La cantidad debe tener un mínimo de 1 caracteres",
        maxlength: "La cantidad debe tener un máximo de 3 caracteres",
        soloNumeros: "La cantidad solo pueden ser números"
      },
    }, 
  });


  $("#formulario-productos").validate({
    rules: {
      id: {
        required: true,
        minlength: 1,
        maxlength: 15,
        soloNumeros: true
      },
      nombre: {
        required: true,
        minlength: 3,
        maxlength: 15,
      },
      descripcion: {
        required: true,
        minlength: 20,
        maxlength: 200
      },
      precio: {
        required: true,
        minlength: 2,
        maxlength: 6,
        soloNumeros: true
      },
      dsub: {
        soloNumeros: true,
        range: [0, 100] 
      },
      dofer: {
        soloNumeros: true,
        range: [0, 100000]
      }
      
    }, // --> Fin de reglas
    messages: {
      id: {
        required: "El ID es un campo requerido",
        minlength: "El ID minimo tiene que tener 1 caracter",
        maxlength: "El ID maximo tiene 15 caracteres",
        soloNumeros: "El ID solo puenden ser números"
      },
      nombre: {
        required: "El nombre es un campo requerido",
        minlength: "El nombre tiene que ser mínimo de 3 caracteres",
        maxlength: "El nombre como máximo es 15",
      },
      descripcion: {
        required: "La descripción es un campo requerido",
        minlength: "La descripción debe tener un mínimo de 20 caracteres",
        maxlength: "La descripción debe tener un máximo de 200 caracteres",
      },
      precio: {
        required: "El precio es requerido",
        minlength: "El precio tiene que tener al menos 2 dígitos",
        maxlength: "El precio no puede tener más de 6 dígitos",
        soloNumeros: "El precio solo puenden ser números"
      },
      dsub: {
        soloNumeros: "El descuento subscriptor solo pueden ser números",
        range: "El descuento subscriptor no puede ser mayor a 100"
      },
      dofer: {
        soloNumeros: "El %Descuento por oferta tiene que ser un número",
        range: "El %Descuento por oferta no puede ser menor a 0 y mayor a 100.000"
      }
    }, 
  });


  $("#formulario-datos").validate({
    rules: {
      rut: {
        required: true,
        rutChileno: true
      },
      nombre: {
        required: true,
        soloLetras: true,
        minlength: 3,
        maxlength: 30
      },
      apellido: {
        required: true,
        soloLetras: true,
        minlength: 3,
        maxlength: 30
      },
      correo: {
        required: true,
        emailCompleto: true,
      },
      direccion: {
        required: true,
        minlength: 10
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 15,
      },
      password2: {
        required: true,
        minlength: 8,
        maxlength: 15,
        equalTo: "#password",
      },
    }, // --> Fin de reglas
    messages: {
      rut: {
        required: "El RUT es un campo requerido",
        rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
      },
      nombre: {
        required: "El nombre es un campo requerido",
        soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        minlength: "El nombre no puede ser menor a 3 letras",
        maxlength: "El nombre no puede ser menor a 30 letras"
      },
      apellido: {
        required: "El apellidos es un campo requerido",
        soloLetras: "El apellidos sólo puede contener letras y espacios en blanco",
        minlength: "El apellidos no puede ser menor a 3 letras",
        maxlength: "El apellidos no puede ser menor a 30 letras"
      },
      correo: {
        required: "El correo es un campo requerido",
        email: "El formato del correo no es válido",
      },
      direccion: {
        required: "la Dirección es un campo requerido",
        minlength: "la Dirección no puede ser menor a 10 caracteres"
      },
      password: {
        required: "La contraseña es un campo requerido",
        minlength: "La contraseña debe tener un mínimo de 8 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      },
      password2: {
        required: "Repetir contraseña es un campo requerido",
        minlength: "Repetir contraseña debe tener un mínimo de 8 caracteres",
        maxlength: "Repetir contraseña debe tener un máximo de 15 caracteres",
        equalTo: "Debe repetir la contraseña escrita anteriormente",
      },
    }, 
  });


});
