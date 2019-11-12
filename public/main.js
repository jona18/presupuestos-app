

$(function(){


  var botonAtras = $("i.fa-arrow-left"),
      botonCrearCliente = $("#botonCrearCliente"),
      botonBuscarCliente = $("#botonBuscarCliente"),
      botonSiguienteCrearCliente = $("#finalizarCliente"),
      clienteTab = $("#cliente-tab"),
      presupuestoTab = $("#presupuesto-tab"),
      botonEditarPresupuesto = $("#editarItems");


  // botonAtras.click(function(e){
  //   if($("#crearCliente").hasClass("d-flex") && $("#presupuesto").hasClass("d-none")){
  //     e.preventDefault();
  //     fadeOutAndIn("#crearCliente", "#clienteOpciones");
  //   } else if($("#presupuesto").hasClass("d-flex")){
  //     e.preventDefault();
  //     fadeOutAndIn("#crearCliente", "#clienteOpciones");
  //     $("#presupuesto").fadeOut(function(){
  //       $("#cliente").fadeIn();
  //       $("#cliente").addClass("active");
  //       $("#presupuesto").removeClass("active");
  //       $("#cliente-tab").addClass("active");
  //       $("#presupuesto-tab").removeClass("active");
  //     });
  //   } else if($("#cliente")){
  //     return;
  //   }
  // });

  botonCrearCliente.on("click", function(){
    fadeOutAndIn("#clienteOpciones", "#crearCliente");
  });

  botonBuscarCliente.on("click", function(){
    fadeOutAndIn("#clienteOpciones", "#buscarCliente");
  });

  botonSiguienteCrearCliente.on("click", function(e){
    e.preventDefault();
    fadeOutAndIn("#cliente", "#presupuesto");
    $("#cliente-tab").removeClass("active");
    $("#presupuesto-tab").addClass("active");
  })

  clienteTab.on("click", function(){
    $("#presupuesto").fadeOut(function(){
      $("#cliente").fadeIn();
      $("#presupuesto").removeClass("d-flex");
      $("#presupuesto").addClass("d-none");
    });
  });

  presupuestoTab.on("click", function(){
    $("#cliente").fadeOut(function(){
      $("#presupuesto").fadeIn();
      $("#presupuesto").addClass("d-flex");
      $("#presupuesto").removeClass("d-none");
    });
  });

  var botonEditarPClickeado = false;

  botonEditarPresupuesto.on("click", function(e){
    e.preventDefault();

    if(botonEditarPClickeado){
      botonEditarPresupuesto.removeClass("active");
      $("#muestraBaseDeDatos").addClass("d-block");
      $("#muestraBaseDeDatos").removeClass("d-none");
      $("#ajustarPreciosDiv").addClass("d-none");
      $("#ajustarPreciosDiv").removeClass("d-block");
      $(".input-importe").removeClass("input-editable");
      $(".input-cantidad").removeClass("input-editable");
      $(".item-p").removeClass("input-editable");
      $(".input-importe").attr("readonly", "true");
      $(".input-cantidad").attr("readonly", "true");
      $(".item-p").attr("readonly", "true");
      $("div > span:nth-child(2)").removeClass("achicar-descripcion");
      $("#presupuestoForm > div > input:nth-child(3)").removeClass("achicar-descripcion");
      $(".borrar-item").removeClass("d-inline-block");
      $(".borrar-item").addClass("d-none");
      botonEditarPClickeado = false;
      console.log("botonClickeado: " + botonEditarPClickeado);
    } else {
      totalManoDeObraYRepuesto();
      botonEditarPresupuesto.addClass("active");
      $("#muestraBaseDeDatos").addClass("d-none");
      $("#muestraBaseDeDatos").removeClass("d-block");
      $("#ajustarPreciosDiv").addClass("d-block");
      $("#ajustarPreciosDiv").removeClass("d-none");
      $(".input-importe").addClass("input-editable");
      $(".input-cantidad").addClass("input-editable");
      $(".item-p").addClass("input-editable");
      $(".input-importe").removeAttr("readonly");
      $(".input-cantidad").removeAttr("readonly");
      $(".item-p").removeAttr("readonly");
      $("div > span:nth-child(2)").addClass("achicar-descripcion");
      $("#presupuestoForm > div > input:nth-child(3)").addClass("achicar-descripcion");
      $(".borrar-item").addClass("d-inline-block");
      $(".borrar-item").removeClass("d-none");
      botonEditarPClickeado = true;
      console.log("botonClickeado: " + botonEditarPClickeado);
    }  
  })

  $("#ajustarPrecios").on("click", ajustarPrecios);

  
  function totalManoDeObraYRepuesto(){
    var totalManoDeObra = 0;
    $(".input-importe.item-m").each(function(item){
      totalManoDeObra += Number($(this).next().val()) * Number($(this).val());
    })
    $("#totalManoDeObra").val(totalManoDeObra.toFixed(2));
  }

  function ajustarPrecios(e){
    var porcentajeMDO = Number($("#ajustarManoDeObra").val());
    var porcentajeRep = Number($("#ajustarRepuestos").val());

    // console.log(600 * porcentajeMDO / 100);

    $(".input-importe.item-m").each(function(i){
      var temp = Number($(this).val());
      var valorFinal = 0;
      valorFinal = (temp + (temp * porcentajeMDO / 100)).toFixed(2);
      $(this).val(valorFinal);
    });
    totalManoDeObraYRepuesto();
    changeTotal();
  }


  ////////////////////////////////////////////////////////////

  // TYPEAHEAD.JS

  ////////////////////////////////////////////////////////////

  // constructs the suggestion engine
  // $(document).ready(function(){
  //   // Defining the local dataset
  //   var cars = ['Audi', 'BMW', 'Bugatti', 'Ferrari', 'Ford', 'Lamborghini', 'Mercedes Benz', 'Porsche', 'Rolls-Royce', 'Volkswagen'];
    
  //   // Constructing the suggestion engine
  //   var cars = new Bloodhound({
  //       datumTokenizer: Bloodhound.tokenizers.whitespace,
  //       queryTokenizer: Bloodhound.tokenizers.whitespace,
  //       local: cars
  //   });
    
  //   // Initializing the typeahead
  //   $('.typeahead').typeahead({
  //       hint: true,
  //       highlight: true, /* Enable substring highlighting */
  //       minLength: 1 /* Specify minimum characters required for showing suggestions */
  //   },
  //   {
  //       name: 'cars',
  //       source: cars
  //   });
  // });





  /////////////////////////////////////////////////////////////


  function fadeOutAndIn(itemOut, itemIn) {
    $(itemOut).fadeOut(function(){
      $(itemOut).removeClass("d-flex");
      $(itemIn).fadeIn();
      $(itemIn).addClass("d-flex");
      $(itemIn).removeClass("d-none");
    });
  }
  // function fadeOutAndIn(itemOut, itemIn) {
  //   $(itemOut).fadeOut(function(){
  //     $(itemOut).removeClass("d-flex");
  //   });
  //   $(itemIn).fadeTo(800, 1);
  //   $(itemIn).addClass("d-flex");
  //   $(itemIn).removeClass("d-none");
  // }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////


  //Boton selector base de datos change event

  var contador = 0;
  var total = 0;

  $('#autoSeleccion').on('change', function(e) {
    e.preventDefault();

    if($('#autoSeleccion').val() == 'nuevo') {
      popIn('#modal');
      $('#crearAuto').on('submit', function(e) {
        e.preventDefault();

        var autoData = $('#crearAuto').serialize();

        $.ajax({
          type: "POST",
          url: "/crearAuto",
          data: autoData,
          success: function(data) {
            location.reload();
          }
        });
      });
    }
  });

  $("#modal").click(function(e) {
    if($(e.target)[0].id == 'modal') {
      console.log('afuera de modal')
      popOut('#modal')
      $('#autoSeleccion').val('');
    }
  });

  function popIn(element) {
    $(element).addClass('d-flex');
    $(element).removeClass('d-none');
  }

  function popOut(element) {
    $(element).addClass('d-none');
    $(element).removeClass('d-flex');
  }

  $("#buscarBase").on("click", function(e){
    e.preventDefault();
    var base = $("#baseDeDatosSelector").val();
    var baseYAuto = "base=" + $("#baseDeDatosSelector").val() + "&autolista=" + $("#autoSeleccion").val();

    $('#autoSeleccionado').val($('#autoSeleccion option:selected').text());

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
            '<div class="d-flex w-100">' +
            '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][lista]" id="" value="' + $($(e.currentTarget).children()[0]).text() + '" hidden readonly>' +
            '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][codigo]" id="" value="' + $($(e.currentTarget).children()[1]).text() + '" readonly>' +
            '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][descripcion]" id="" value="' + $($(e.currentTarget).children()[2]).text() + '" readonly>' +
            '<input class="presupuesto-item item-m input-importe" type="text" name="presupuesto[items][' + contador + '][importe]" id="" value="' + Number($($(e.currentTarget).children()[3]).text()).toFixed(2) + '" readonly>' +
            '<input class="presupuesto-item item-m input-cantidad" type="text" name="presupuesto[items][' + contador + '][cantidad]" id="" value="' + $($(e.currentTarget).children()[4]).text() + '" readonly>' +
            '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][tipo]" id="" value="M" hidden readonly>' +
            '<i class="fas fa-times borrar-item d-none"></i>' +
            '</div>');
            $(".borrar-item").off("click");
            $(".borrar-item").on("click", borrarItem)
            $(".input-cantidad, .input-importe").off("change");
            $(".input-cantidad, .input-importe").on("change", function(){
              totalManoDeObraYRepuesto();
              changeTotal();
            });
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

  // $("html").click(function(){
  //   // console.log(total);
  // })

  

  function changeTotal(){
    total = 0;

    $(".input-importe").each(function(i){
      total += Number($(this).next().val()) * Number($(this).val());
    })
    $("#importeTotal").val(total.toFixed(2));
  }

  

  function borrarItem(e){
    $(this).parent().remove();
    totalManoDeObraYRepuesto();
    changeTotal();
  }

  $("#imprimir").on("click", function(e){
    e.preventDefault();

    

    var dd = {
      content: [
        {
          table: {
            widths: ['auto', "*", 'auto'],
            body: [
              [{
                style: 'tablaManoDeObraYRepuestos',
                table: {
                  widths: ['auto', 100],
                  body: [
                    [{text: 'Total mano de obra: ', border: [true, true, false, false]}, {text: currencyFormatES(presupuestoGuardado.manoDeObraTotal), alignment: 'right', border: [false, true, true, false]}],
                    [{text: 'Total repuestos: ', border: [true, false, false, true]}, {text: currencyFormatES(presupuestoGuardado.repuestosTotal), alignment: 'right', border: [false, false, true, true]}]
                  ]
                }
              },
              {},
              {
                style: 'totalPresupuesto',
                table: {
                  widths: ['auto', 100],
                  body: [
                    [{text: 'Total presupuesto: ', border: [true, true, false, true]}, {text: currencyFormatES(presupuestoGuardado.importeTotal), alignment: 'right', border: [false, true, true, true]}]
                  ]
                },
                layout: {
                  paddingTop: function(i, node) { return 11; },
                  paddingBottom: function(i, node) { return 11; }
                }
              }]
            ]
          },
          layout: 'noBorders'
        }
      ],
      styles: {
        tablaHeader: {
          fontSize: 11,
          bold: true
        },
        tabla: {
          fontSize: 10
        },
        tablaManoDeObraYRepuestos: {
          fontSize: 12
        },
        totalPresupuesto: {
          fontSize: 13,
          bold: true
        }
      }
    }

    pdfMake.createPdf(dd).open();


    
  });

  $('#clienteBuscarForm').on('submit', function(e){
    e.preventDefault();

    var clienteNombre = $('#clienteBuscarForm').serialize();
    console.log(clienteNombre);

    $.ajax({
      type: "GET",
      url: "/presupuestos/new",
      data: clienteNombre,
      success: function(data){
        $("#resultadosClientes").html('<table class="table table-bordered table-hover"><thead><tr><th scope="col">Nro</th><th scope="col">Nombre</th><th scope="col">Domicilio</th><th scope="col">Localidad</th><th scope="col">Telefono</th><th scope="col">Email</th><th scope="col">CUIT</th></tr></thead><tbody></tbody></table>');

        data.forEach(function(cliente){
          $("#resultadosClientes > table > tbody").append("<tr><td>" + cliente.numCliente + "</td><td>" + cliente.nombre + "</td><td>" + cliente.domicilio + "</td><td>" + cliente.localidad + "</td><td>" + cliente.telefono + "</td><td>" + cliente.email + "</td><td>" + cliente.cuit + "</td><td>" + cliente.cuit + "</td>");
        });

        $("#resultadosClientes > table > tbody > tr").on("click", function(e){
          $('#clienteNumero').val($($(this).children()[0]).text());
          $('#clienteSeleccionado').val($($(this).children()[1]).text());
          presupuestoTab.click();
        });
      }
    });
  });

  $('#finalizarPresupuesto').on('click', function(e){
    e.preventDefault();

    $('#finalizar').addClass('d-flex');
    $('#finalizar').removeClass('d-none');

    $('#conImporte').on('click', function(e){
      e.preventDefault();
      imprimirPresupuesto('conImporte');
    });
    
    $('#sinImporte').on('click', function(e){
      e.preventDefault();
      imprimirPresupuesto('sinImporte');
    });
  });

  $('#agregarItem').on('click', function(e) {
    $("#presupuestoForm").append(
      '<div class="d-flex w-100">' +
      '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][lista]" id="" value="99999" hidden readonly>' +
      '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][codigo]" id="" value="99999" readonly>' +
      '<input class="presupuesto-item item-m item-p" type="text" name="presupuesto[items][' + contador + '][descripcion]" id="" value="Descripcion..." readonly>' +
      '<input class="presupuesto-item item-m input-importe item-p" type="text" name="presupuesto[items][' + contador + '][importe]" id="" value="0" readonly>' +
      '<input class="presupuesto-item item-m input-cantidad item-p" type="text" name="presupuesto[items][' + contador + '][cantidad]" id="" value="1" readonly>' +
      '<input class="presupuesto-item item-m" type="text" name="presupuesto[items][' + contador + '][tipo]" id="" value="M" hidden readonly>' +
      '<i class="fas fa-times borrar-item d-none"></i>' +
      '</div>');
    contador++;
  });

  


  function imprimirPresupuesto(opcion){
    var formData;
      
    totalManoDeObraYRepuesto();

    if($('#clienteNumero').val() == 0) {
      formData = $("#presupuestoForm").serialize() + "&" + $("#clienteCrearForm").serialize();
    } else {
      formData = $("#presupuestoForm").serialize() + "&" + "clienteNumero=" + $('#clienteNumero').val()
    }

    $.ajax({
      type: "POST",
      url: "/presupuestos/new",
      data: formData,
      success: function(data){
        
        var clienteGuardado = data;
        var presupuestoGuardado = clienteGuardado.presupuestos[clienteGuardado.presupuestos.length - 1];
        var itemsArray = presupuestoGuardado.items;
        var tableBody = [
          [
            {text: 'Codigo', colSpan: 2, style: 'tablaHeader', alignment: 'center'},
            {},
            {text: 'Descripcion', style: 'tablaHeader', alignment: 'center'},
            {text: 'Cant.', style: 'tablaHeader', alignment: 'center'},
            {text: 'Imp. Unit.', style: 'tablaHeader', alignment: 'center'},
            {text: 'Total', style: 'tablaHeader', alignment: 'center'}
          ]
        ]
        
        itemsArray.forEach(function(item){
          tableBody.push([{text: item.tipo, alignment: 'center'}, {text: item.codigo, alignment: 'center'}, {text: item.descripcion, alignment: 'center'}, {text: item.cantidad, alignment: 'center'}, {text: currencyFormatES(item.importe), alignment: 'right'}, {text: currencyFormatES(item.cantidad * item.importe), alignment: 'right'}]);
        });

        if(opcion == 'conImporte'){
          var tablawidths = ['auto', 'auto', '*', 'auto', 'auto', 'auto'];
          var tableBody = [
            [
              {text: 'Codigo', colSpan: 2, style: 'tablaHeader', alignment: 'center'},
              {},
              {text: 'Descripcion', style: 'tablaHeader', alignment: 'center'},
              {text: 'Cant.', style: 'tablaHeader', alignment: 'center'},
              {text: 'Imp. Unit.', style: 'tablaHeader', alignment: 'center'},
              {text: 'Total', style: 'tablaHeader', alignment: 'center'}
            ]
          ]
          
          itemsArray.forEach(function(item){
            tableBody.push([{text: item.tipo, alignment: 'center'}, {text: item.codigo, alignment: 'center'}, {text: item.descripcion, alignment: 'center'}, {text: item.cantidad, alignment: 'center'}, {text: currencyFormatES(item.importe), alignment: 'right'}, {text: currencyFormatES(item.cantidad * item.importe), alignment: 'right'}]);
          });

        } else if(opcion == 'sinImporte'){
          var tablawidths = ['auto', 'auto', '*', 'auto'];
          var tableBody = [
            [
              {text: 'Codigo', colSpan: 2, style: 'tablaHeader', alignment: 'center'},
              {},
              {text: 'Descripcion', style: 'tablaHeader', alignment: 'center'},
              {text: 'Cant.', style: 'tablaHeader', alignment: 'center'}
            ]
          ]
          
          itemsArray.forEach(function(item){
            tableBody.push([{text: item.tipo, alignment: 'center'}, {text: item.codigo, alignment: 'center'}, {text: item.descripcion, alignment: 'center'}, {text: item.cantidad, alignment: 'center'}]);
          });
        }

        var dd = {
          pageMargins: [20, 20],
          content: [
            {
              layout: 'noBorders',
              table: {
                widths: ['*', '*'],
                body: [
                  [{
                    style: 'numPresupYFecha',
                    table: {
                      widths: ['auto', '*', 67],
                      body: [
                        [{image: 'fondoBlanco', colSpan: 3, width: 255, height: 92.5}, {} ,{}],
                        [{text: 'Presupuesto Nro.: ', border: [true, true, false, true]}, {text: presupuestoGuardado.numPresupuesto, border: [false, true, true, true], alignment: 'right', style: 'numPresupuesto'}, {text: moment(presupuestoGuardado.creado).format('DD/MM/YY'), alignment: 'center', style: 'fecha'}]
                      ]
                    }
                  },
                  {
                    layout: 'noBorders',
                    table: {
                      widths: ['*'],
                      body: [
                        [{text: 'Los precios detallados no contienen el I.V.A.', alignment: 'center', style: 'iva'}],
                        [{style: 'cuadroCliente',
                          table: {
                          widths: ['*', 'auto'],
                          body: [
                            [{text: clienteGuardado.numCliente, border: [true, true, false, false], style: 'cliente'}, {text: clienteGuardado.nombre, border: [false, true, true, false], alignment: 'right', style: 'cliente'}],
                            [{text: ['Docimilio: ', {text: clienteGuardado.domicilio, style: 'cuadroCliente2'}], border: [true, false, true, false], colSpan: 2}, {}],
                            [{text: ['Localidad: ', {text: clienteGuardado.localidad, style: 'cuadroCliente2'}], border: [true, false, true, false], colSpan: 2}, {}],
                            [{text: ['Telefono: ', {text: clienteGuardado.telefono, style: 'cuadroCliente2'}], border: [true, false, true, false], colSpan: 2}, {}],
                            [{text: ['Auto: ', {text: presupuestoGuardado.auto, style: 'auto2'}], colSpan: 2, style: 'auto', border: [true, true, true, true]}, {}]
                            // [{text: ['Auto', {text: 'asdasdasd'}], style: 'auto', border: [true, true, false, true]}, {text: 'CHEVROLET ASTRA 1.7 TURBO DIESEL * 4 CIL * 79 mm', style: 'auto2', border: [false, true, true, true]}]
                          ]
                        }}]
                      ]
                    }
                  }]
                ]
              }
            },
            {
              style: 'tabla',
              table: {
                widths: tablawidths,
                headerRows: 1,
                // keepWithHeaderRows: 1,
                body: tableBody
              }
            },
            {
              table: {
                widths: ['auto', "*", 'auto'],
                body: [
                  [{
                    style: 'tablaManoDeObraYRepuestos',
                    table: {
                      widths: ['auto', 100],
                      body: [
                        [{text: 'Total mano de obra: ', border: [true, true, false, false]}, {text: currencyFormatES(presupuestoGuardado.manoDeObraTotal), alignment: 'right', border: [false, true, true, false]}],
                        [{text: 'Total repuestos: ', border: [true, false, false, true]}, {text: currencyFormatES(presupuestoGuardado.repuestosTotal), alignment: 'right', border: [false, false, true, true]}]
                      ]
                    }
                  },
                  {},
                  {
                    style: 'totalPresupuesto',
                    table: {
                      widths: ['auto', 100],
                      body: [
                        [{text: 'Total presupuesto: ', border: [true, true, false, true]}, {text: currencyFormatES(presupuestoGuardado.importeTotal), alignment: 'right', border: [false, true, true, true]}]
                      ]
                    },
                    layout: {
                      paddingTop: function(i, node) { return 11; },
                      paddingBottom: function(i, node) { return 11; }
                    }
                  }]
                ]
              },
              layout: 'noBorders'
            },
            {
              text: 'Si al proceder al desarme, limpieza y reacondicionamiento de este trabajo, encontramos algun otro elemento que necesite reparacion, el mismo sera presupuestados aparte.',
              alignment: 'center'
            },
            {
              text: 'PASADOS LOS 180 DIAS, PIERDE DERECHO AL RECLAMO.',
              alignment: 'center',
              style: ''
            },
            {
              table: {
                widths: ['auto', '*'],
                body: [
                  [{text: 'Ovservacion: ', border: [false, false, true, false]}, {}]
                ]
              }
            }
          ],
          styles: {
            tablaHeader: {
              fontSize: 11,
              bold: true
            },
            tabla: {
              fontSize: 10
            },
            tablaManoDeObraYRepuestos: {
              fontSize: 12
            },
            totalPresupuesto: {
              fontSize: 13,
              bold: true
            },
            numPresupYFecha: {
              fontSize: 12
            },
            numPresupuesto: {
              fontSize: 13,
              bold: true
            },
            fecha: {
              fontSize: 11
            },
            iva: {
              fontSize: 11,
              bold: true
            },
            cuadroCliente: {
              fontSize: 10
            },
            cuadroCliente2: {
              fontSize: 10,
              bold: true
            },
            cliente: {
              fontSize: 11,
              bold: true
            },
            auto: {
              fontSize: 11,
              bold: true
            },
            auto2: {
              fontSize: 11,
              bold: false
            }
          },
          images: {
            rectificaciones: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAABCCAIAAACHCLnQAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAACxMAAAsTAQCanBgAAApBaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA5LTAzVDE1OjMyOjI5LTAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA5LTAzVDE1OjMyOjM3LTAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wOS0wM1QxNTozMjozNy0wMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjZkNmE2MDAtZGUyZC1iMDQ1LTkwZGYtNWEzZmY3MzNiZmNmIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MWMwYzdkZjItNWNhMS1kZjRjLTgwMTktZTdjOWU2ODZkOWViIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MTFiMjZiMDctMGEwYi1jYzQzLWEwNzMtYWJjZDE1MzJhMDQ3IiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMWIyNmIwNy0wYTBiLWNjNDMtYTA3My1hYmNkMTUzMmEwNDciIHN0RXZ0OndoZW49IjIwMTktMDktMDNUMTU6MzI6MjktMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjFiZjIyNjYtNDU0NS1hYTQ1LTgxZGUtNjg3ZWUxYTUyMjhkIiBzdEV2dDp3aGVuPSIyMDE5LTA5LTAzVDE1OjMyOjM3LTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2ZDZhNjAwLWRlMmQtYjA0NS05MGRmLTVhM2ZmNzMzYmZjZiIgc3RFdnQ6d2hlbj0iMjAxOS0wOS0wM1QxNTozMjozNy0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MWJmMjI2Ni00NTQ1LWFhNDUtODFkZS02ODdlZTFhNTIyOGQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTFiMjZiMDctMGEwYi1jYzQzLWEwNzMtYWJjZDE1MzJhMDQ3IiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MTFiMjZiMDctMGEwYi1jYzQzLWEwNzMtYWJjZDE1MzJhMDQ3Ii8+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iUmVjdGlmaWNhY2lvbmVzIiBwaG90b3Nob3A6TGF5ZXJUZXh0PSJSZWN0aWZpY2FjaW9uZXMiLz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSJDaHVidXQgMjQ0OCBUZWwuIDAyOTEtNDU2MDUwMyAoODAw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',
            fondoBlanco: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU0AAAClCAIAAABX8jjIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHdSURBVHhe7dMBDQAADMOg+ze9+2jAAzegznPo8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7Poc9z6PMc+jyHPs+hz3Po8xz6PIc+z6HPc+jzHPo8hz7PoW575BmErdwpe50AAAAASUVORK5CYII='
          }
        }

        
        pdfMake.createPdf(dd).open();
      }
    }).then(function() {
      window.location.href = "/presupuestos";
    });
  }

  function currencyFormatES(num) {
    return (num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
  }
});