$("#presupuestoForm").submit(function(e){
  var clienteFormData;
  $("#clienteCrearForm").submit(function(e){
    e.preventDefault();

    var clienteForm = $(this).serialize();
    console.log("1--- " + clienteForm);
    $.get("/presupuestos/new", clienteForm).done(function(data){
      clienteFormData = data.cliente;
      console.log("3--- " + clienteFormData.nombre);
    });
  });
  e.preventDefault();
  $("#clienteCrearForm").submit();
  console.log("4--- " + clienteFormData);

  var presupuestoForm = $(this).serialize();

  $.post("/presupuestos/new", presupuestoForm, function(data){
    
  });
});



// $("#clienteCrearForm").submit(function(e){
//   e.preventDefault();

//   var clienteForm = $(this).serialize();

//   $.get("/presupuestos/new", clienteForm, function(data){
//     console.log(data);
//     //form1Data = data.asd;
//   });
// });



// $("#presupuestoForm").submit(function(e){
//   var clienteFormData;
//   $("#clienteCrearForm").submit(function(e){
//     e.preventDefault();

//     var clienteForm = $(this).serialize();

//     $.get("/presupuestos/new", clienteForm, function(data){
//       console.log(data.cliente);
//       //form1Data = data.asd;
//     });
//   });
//   e.preventDefault();
//   $("#clienteCrearForm").submit();

//   var presupuestoForm = $(this).serialize();

//   $.post("/presupuestos/new", presupuestoForm, function(data){
//     console.log(data);
//   });
// });






// $("#form1").submit(function(e){
//   e.preventDefault();
//   var form1 = $(this).serialize();

 
//   $.get("/presupuestos/new", form1, function(data){
//     $("#form1").append("<p>" + data.texto + " --- " + data.numero + "</p>");
//     console.log(data);
//   });
// });
// $("#form2").submit(function(e){
//   e.preventDefault();
//   var form2 = $(this).serialize();

 
//   $.get("/presupuestos/new", form2, function(data){
//     $("#form2").append("<p>" + data.texto + " --- " + data.numero + "</p>");
//     console.log(data);
//   });
// });