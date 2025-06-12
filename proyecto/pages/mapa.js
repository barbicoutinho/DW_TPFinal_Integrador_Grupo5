$(document).ready(function () {
  const ferias = {
    co: {
      nombre: "Córdoba",
      fecha: "23 de noviembre",
      lugar: "Centro de Convenciones",
      descripcion: "Feria en Córdoba – 23 de noviembre",
    },
    ba: {
      nombre: "Buenos Aires - La Rural",
      fecha: "19 de diciembre",
      lugar: "Predio La Rural",
      descripcion: "Feria en Buenos Aires (La Rural) – 19 de diciembre",
    },
    c: {
      nombre: "CABA - Agronomía",
      fecha: "2 de enero",
      lugar: "Facultad de Agronomía",
      descripcion: "Feria en CABA (Agronomía) – 2 de enero",
    },
  };

  let selectedRegion = null;

  function mostrarEventInfo(visible = true) {
    if (visible) {
      $("#map-event-info").addClass("show");
    } else {
      $("#map-event-info").removeClass("show");
    }
  }

  function mostrarFlecha(codigo) {
    $(".arrow-indicator").removeClass("show");
    if (codigo) {
      $(`#arrow-${codigo}`).addClass("show");
    }
  }

  function ocultarFlechas() {
    $(".arrow-indicator").removeClass("show");
  }

  function resaltarTarjeta(codigo) {
    $(".event-card").removeClass("highlighted");
    if (codigo && ferias[codigo]) {
      const tarjetas = $(".event-card");
      tarjetas.each(function () {
        const titulo = $(this).find("h5").text();
        if (titulo.includes(ferias[codigo].nombre.split(" - ")[0])) {
          $(this).addClass("highlighted");
        }
      });
    }
  }

  function quitarResaltado() {
    if (!selectedRegion) {
      $(".event-card").removeClass("highlighted");
      ocultarFlechas();
    }
  }

  function actualizarEventInfo(codigo, tipo = "selected") {
    if (ferias[codigo]) {
      const info = ferias[codigo];
      if (tipo === "selected") {
        $("#map-event-info h4").text(`Evento Seleccionado: ${info.nombre}`);
        $("#map-event-info p").html(`
          <strong>${info.fecha}</strong><br>
          ${info.lugar}<br>
          <small>¡Haz clic en otra provincia para ver más eventos!</small>
        `);
        $("#reset-selection").show();
      } else if (tipo === "hover") {
        if (!selectedRegion) {
          $("#map-event-info h4").text(`Vista previa: ${info.nombre}`);
          $("#map-event-info p").html(`
            <strong>${info.fecha}</strong><br>
            ${info.lugar}<br>
            <small>Haz clic para seleccionar este evento</small>
          `);
        }
      }
    }
  }

  function resetearEstado() {
    selectedRegion = null;
    $("#map-event-info h4").text("Próximos Eventos");
    $("#map-event-info p").text(
      "Haz clic en las provincias destacadas en verde o en las tarjetas para ver los detalles"
    );
    $("#reset-selection").hide();
    quitarResaltado();
  }

  setTimeout(() => {
    mostrarEventInfo(true);
  }, 500);

  try {
    $("#mapa").vectorMap({
      map: "argentina_en",
      backgroundColor: "transparent",
      color: "#dfead8",
      hoverColor: "#77b86f",
      selectedColor: "#4CAF50",
      enableZoom: true,
      showTooltip: true,
      selectedRegions: ["AR-X", "AR-B", "AR-C"],

      onRegionClick: function (event, code, region) {
        if (ferias[code]) {
          selectedRegion = code;
          resaltarTarjeta(code);
          mostrarFlecha(code);
          actualizarEventInfo(code, "selected");
          console.log("Feria en " + region + ": " + ferias[code].descripcion);
        }
      },

      onRegionOver: function (event, code, region) {
        if (ferias[code] && selectedRegion !== code) {
          resaltarTarjeta(code);
          mostrarFlecha(code);
          actualizarEventInfo(code, "hover");
          $(".jqvmap-label").text(region + " - " + ferias[code].descripcion);
          console.log("Hover en " + region + ": " + ferias[code].descripcion);
        }
      },

      onRegionOut: function (event, code, region) {
        // No sale del hover si marcaste una provinciaa
        if (selectedRegion !== code && !selectedRegion) {
          quitarResaltado();
          resetearEstado();
        } else if (selectedRegion && selectedRegion !== code) {
          // Si hay una región seleccionada diferente, volver a mostrarla
          actualizarEventInfo(selectedRegion, "selected");
          resaltarTarjeta(selectedRegion);
          mostrarFlecha(selectedRegion);
        }
      },
    });

    $(".event-card").each(function (index) {
      $(this).on("click", function () {
        const titulo = $(this).find("h5").text();
        let codigoRegion = "";

        if (titulo.includes("Córdoba")) {
          codigoRegion = "co";
        } else if (titulo.includes("Buenos Aires")) {
          codigoRegion = "ba";
        } else if (titulo.includes("CABA")) {
          codigoRegion = "c";
        }

        if (codigoRegion && ferias[codigoRegion]) {
          selectedRegion = codigoRegion;
          resaltarTarjeta(codigoRegion);
          mostrarFlecha(codigoRegion);
          actualizarEventInfo(codigoRegion, "selected");

          // Actualizo
          const info = ferias[codigoRegion];
          console.log("Tarjeta clickeada: " + info.descripcion);
        }
      });

      $(this)
        .on("mouseenter", function () {
          const titulo = $(this).find("h5").text();
          let codigoRegion = "";

          if (titulo.includes("Córdoba")) {
            codigoRegion = "co";
          } else if (titulo.includes("Buenos Aires")) {
            codigoRegion = "ba";
          } else if (titulo.includes("CABA")) {
            codigoRegion = "c";
          }

          if (codigoRegion && selectedRegion !== codigoRegion) {
            $(this).addClass("card-hover");
            resaltarTarjeta(codigoRegion);
            mostrarFlecha(codigoRegion);
            actualizarEventInfo(codigoRegion, "hover");
          }
        })
        .on("mouseleave", function () {
          $(this).removeClass("card-hover");
          if (!selectedRegion) {
            quitarResaltado();
            resetearEstado();
          } else {
            actualizarEventInfo(selectedRegion, "selected");
            resaltarTarjeta(selectedRegion);
            mostrarFlecha(selectedRegion);
          }
        });
    });

    $("#reset-selection").on("click", function () {
      resetearEstado();
    });

    setTimeout(function () {
      const patterns = [, "co", "ba", "c"];

      patterns.forEach(function (pattern) {
        const element = $("#jqvmap1_" + pattern);
        if (element.length > 0) {
          element.css({
            fill: "#4CAF50",
            stroke: "#2e7d32",
            "stroke-width": "2",
          });
        }
      });
    }, 1000);
  } catch (error) {
    console.error("Error al cargar el mapa:", error);
    $("#mapa").html(`
                    <div style="text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 10px;">
                        <h4>Error al cargar el mapa</h4>
                        <p>No se pudo cargar el mapa interactivo. Por favor, intenta recargar la página.</p>
                        <button onclick="location.reload()" class="btn btn-success">Recargar</button>
                    </div>
                `);
  }
});
