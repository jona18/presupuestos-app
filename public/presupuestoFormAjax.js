$(function(){
  // Boton finalizar submit event
  $("#presupuestoForm").on("submit", function(e){
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/presupuestos/new",
      data: $("#presupuestoForm").serialize() + "&" + $("#clienteCrearForm").serialize(),
      success: function(){
        window.location.href = "/presupuestos";
      }
    });
  })



  //Boton selector base de datos change event

  var contador = 0;
  var total = 0;

  $("#buscarBase").on("click", function(e){
    e.preventDefault();
    var base = $("#baseDeDatosSelector").val();
    var baseYAuto = "base=" + $("#baseDeDatosSelector").val() + "&autolista=" + $("#autoSeleccion").val();

    $.ajax({
      type: "GET",
      url: "/presupuestos/new",
      data: baseYAuto,
      success: function(data){
        $("#muestraBaseDeDatos").html('<table class="table table-bordered table-hover"><thead><tr><th scope="col">Lista</th><th scope="col">Codigo</th><th scope="col">Descripcion</th></tr></thead><tbody></tbody></table>');
        data.forEach(function(item){
          $("#muestraBaseDeDatos > table > tbody").append("<tr><td>" + item.lista + "</td><td>" + item.codigo + "</td><td>" + item.descripcion + "</td><td>" + item.importe + "</td><td>" + item.cantidad + "</td>");
        });
        $("#muestraBaseDeDatos > table > tbody > tr").on("click", function(e){
          if(base == "mdo"){
            $("#presupuestoForm").append(
            '<div class="">' +
            '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][lista]" id="" value="' + $($(e.currentTarget).children()[0]).text() + '" hidden readonly>' +
            '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][codigo]" id="" value="' + $($(e.currentTarget).children()[1]).text() + '" readonly>' +
            '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][descripcion]" id="" value="' + $($(e.currentTarget).children()[2]).text() + '" readonly>' +
            '<input class="presupuesto-item item-m input-importe" type="text" name="presupuesto[items][' + contador + '][importe]" id="" value="' + $($(e.currentTarget).children()[3]).text() + '" readonly>' +
            '<input class="presupuesto-item item-m input-cantidad" type="text" name="presupuesto[items][' + contador + '][cantidad]" id="" value="' + $($(e.currentTarget).children()[4]).text() + '" readonly>' +
            '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][tipo]" id="" value="m" hidden  readonly>' +
            '</div>');
            contador++;
            changeTotal();
          } else {
            console.log("base no es mdo");
          }
          
        });
        if(data.base == "mdo"){
            console.log("base es mdo");
        }
      }
    });
  });

  function changeTotal(){
    var total = 0;
    $(".input-importe").each(function(i){
      total += Number($(this).val());
    })
    $("#totalPresupuesto > span").text(total);
  }
})







// $("#baseDeDatosSelector").on("change", function(e){
//   e.preventDefault();
//   var baseYAuto = "base=" + $(this).val() + "&autolista=" + $("#autoSeleccion").val();

//   $.ajax({
//     type: "GET",
//     url: "/presupuestos/new",
//     data: baseYAuto,
//     success: function(data){
//       $("#muestraBaseDeDatos").html('<table class="table table-bordered table-hover"><thead><tr><th scope="col">Lista</th><th scope="col">Codigo</th><th scope="col">Descripcion</th></tr></thead><tbody></tbody></table>');
//       data.forEach(function(item){
//         $("#muestraBaseDeDatos > table > tbody").append("<tr><td>" + item.lista + "</td><td>" + item.codigo + "</td><td>" + item.descripcion + "</td><td>" + item.importe + "</td><td>" + item.cantidad + "</td>");
//       });
//       $("#muestraBaseDeDatos > table > tbody > tr").on("click", function(e){
//         $("#presupuestoForm").append(
//           '<div class="">' +
//           '<input type="text" name="presupuesto[items][' + contador + '][lista]" id="" value="' + $($(e.currentTarget).children()[0]).text() + '" readonly>' +
//           '<input type="text" name="presupuesto[items][' + contador + '][codigo]" id="" value="' + $($(e.currentTarget).children()[1]).text() + '" readonly>' +
//           '<input type="text" name="presupuesto[items][' + contador + '][descripcion]" id="" value="' + $($(e.currentTarget).children()[2]).text() + '" readonly>' +
//           '<input type="text" name="presupuesto[items][' + contador + '][importe]" id="" value="' + $($(e.currentTarget).children()[3]).text() + '" readonly>' +
//           '<input type="text" name="presupuesto[items][' + contador + '][cantidad]" id="" value="' + $($(e.currentTarget).children()[4]).text() + '" readonly>' +
//           '<input type="text" name="presupuesto[items][' + contador + '][tipo]" id="" value="m" hidden  readonly>' +
//           '</div>');
//         contador++;
//         console.log($($(e.currentTarget).children()[2]).text());
//       });
//     }
//   });
//   console.log($(this).val());
// });





// Boton seleccion de auto
// $("#autoSeleccion").on("focus", function(e){
//   $("#autoSeleccion").html('<option value="" selected disabled>Seleccionar Auto/Motor</option>')

//   var auto = "auto=" + true;

//   $.ajax({
//     type: "GET",
//     url: "/presupuestos/new",
//     data: auto,
//     success: function(data){
//       data.forEach(function(auto){
//         $("#autoSeleccion").append(
//           '<option value="' + auto.listamo + '">' + auto.descripcion + '</option>'
//         );
//       });
//     }
//   });
// })































// $("#presupuestoForm").on("submit", function(e){
//   var clienteFormData;

//   $("#clienteCrearForm").on("submit", function(e){
//     e.preventDefault();

//     var clienteForm = $(this).serialize();

//     $.post("/presupuestos/new", clienteForm).done(function(data){
//       return;
//     });
//   });

//   e.preventDefault();

//   $("#clienteCrearForm").submit();

//   var presupuestoForm = $(this).serialize();

//   $.post("/presupuestos/new", presupuestoForm).done(function(data){
//     return;
//   })
// });







// $("#form2").submit(function(e){
//   var form1Data;
//   $("#form1").submit(function(e){
//     e.preventDefault();
  
//     var form1 = $(this).serialize();
  
//     $.post("/presupuestos/new", form1, function(data){
//       console.log(data);
//       form1Data = data.asd;
//     });
//   });
//   e.preventDefault();
//   $("#form1").submit();

//   var form2 = $(this).serialize();

//   $.post("/presupuestos/new", form2, function(data){
//     console.log(data);
//     $("#form2").append("<p>Form1: " + form1Data.texto + " - " + form1Data.numero + " | " + "Form2: " + data.asd2.texto + " - " + data.asd2.numero + "</p>");
//   });
// });











// $("#presupuestoForm").on("submit", function(e){
//   var PresupuestoFinalDatos;

//   e.preventDefault();

//   $("#clienteCrearForm").on("submit", function(e){
//     var clienteForm = $(this).serialize();
//     console.log("1---" + clienteForm);

//     e.preventDefault();

//     $.post("/presupuestos/new", clienteForm).done(function(dataC){
//       console.log("HHHHHHHHHHHHHHHHHH");

//       var presupuestoForm = $("#presupuestoForm").serialize();

//       $.post("/presupuestos/new", presupuestoForm).done(function(dataP){
//         console.log("LLLLLLLLLL");
//       })
//     });
//   })

//   $("#clienteCrearForm").submit();

// });






// $("#presupuestoForm").submit(function(e){
//   e.preventDefault();
//   var clienteFormData;
//   $("#clienteCrearForm").submit(function(e){
//     e.preventDefault();

//     var clienteForm = $(this).serialize();
//     console.log("1--- " + clienteForm);
//     $.get("/presupuestos/new", clienteForm).done(function(data){
//       clienteFormData = data.cliente;
//       console.log("3--- " + clienteFormData.nombre);
//     });
//   });

//   console.log("4--- " + clienteFormData);

//   var presupuestoForm = $(this).serialize();

//   $.post("/presupuestos/new", presupuestoForm, function(data){
    
//   });
// });