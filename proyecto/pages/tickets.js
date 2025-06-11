const precioTicket = 2000;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cantidad").addEventListener("input", actualizarTotal);
  document.getElementById("categoria").addEventListener("change", actualizarTotal);
  document.getElementById("submit1").addEventListener("click", calcular);
});

function actualizarTotal() {
  const cant = parseInt(document.getElementById("cantidad").value);
  const categoria = document.getElementById("categoria").value;
  let precioTotal = isNaN(cant) || cant < 1 ? 0 : cant * precioTicket;
  let descuento = 0;

  switch (categoria) {
    case "estudiante":
      descuento = 0.4;
      break;
    case "jubilado":
      descuento = 0.6;
      break;
    default:
      descuento = 0;
  }

  const totalFinal = precioTotal * (1 - descuento);
  document.getElementById("total").value = "Total a Pagar: $" + totalFinal.toFixed(2);
}

function calcular() {
  if (!validoCampos()) {
    mensajeError2();
    return;
  }

  const cant = parseInt(document.getElementById("cantidad").value);
  if (isNaN(cant) || cant < 1) {
    mensajeError1();
    return;
  }

  const categoria = document.getElementById("categoria").value;
  let descuento = 0;

  switch (categoria) {
    case "estudiante":
      descuento = 0.4;
      break;
    case "jubilado":
      descuento = 0.6;
      break;
    default:
      descuento = 0;
  }

  const total = cant * precioTicket * (1 - descuento);
  document.getElementById("total").value = "Total a Pagar: $" + total.toFixed(2);
  printCompra(cant, total.toFixed(2));
  document.getElementById("cantidad").value = "";
}

function validoCampos() {
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("email");

  let valido = true;

  [nombre, apellido, email].forEach((campo) => {
    if (campo.value.trim() === "") {
      campo.classList.add("is-invalid");
      valido = false;
    } else {
      campo.classList.remove("is-invalid");
      campo.classList.add("is-valid");
    }
  });

  return valido;
}

function mensajeError1() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: '¡Ingresá una cantidad válida de tickets!',
  });
}

function mensajeError2() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: '¡Validá todos los campos antes de comprar!',
  });
}

function printCompra(cant, precioDescuento) {
  Swal.fire({
    title: '¿Confirmar compra?',
    text: "Estás por comprar " + cant + " entrada/s por: $" + precioDescuento,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#008000',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar Compra'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '¡Compra Exitosa!',
        'Se realizó la compra de ' + cant + ' entrada/s por $' + precioDescuento,
        'success'
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Compra cancelada',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
}
