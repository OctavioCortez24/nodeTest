
const modelo={};//Objeto

var fs = require('fs');
const Clases = require('./Clases');
var socios = [];//Array de Socios
var libros = [];//Array de Libros
var pedidos = [];//Array de pedidos




try {
    var contenido = fs.readFileSync('./Archivos/Para_Guardar/Socios.txt', 'utf-8');
    socios = JSON.parse(contenido);
} catch (erroSocios) {
    console.log("No se pudo cargar a los socios");
    socios = [];
}//Cargo los socios que se encuentran en el archivo txt


try {
    var contenidoLibro = fs.readFileSync('./Archivos/Para_Guardar/Libros.txt', 'utf-8');
    libros = JSON.parse(contenidoLibro);
} catch (error) {
    console.log("No se pudo parcear el contenido de Libros.txt")
    libros = [];
}//Cargo los libros que se encuentran en el archivo txt

try {
    var contenidoPedido = fs.readFileSync('./Archivos/Para_Guardar/Pedidos.txt', 'utf-8');
    pedidos = JSON.parse(contenidoPedido);
} catch (errorPedido) {
    console.log("No se pudo parcear el contenido del archivo Pedido.txt")
    pedidos = [];
}//Cargo los pedidos que se encuentran en el archivo txt



modelo.guardarSocio=(atributos) => {
    
    var nombre = atributos.name;
    var apellido = atributos.surname;
    var dNI = atributos.dni;

    var so1 = new Clases.Socio(nombre, apellido, dNI, false);//Instancio un socio
    
    //Compruebo si existe un socio igual
    var bandera = false;
    var validacion = socios.map(socio => socio.name == so1.getName() & socio.apellido == so1.getApellido() & socio.dNI == so1.getDNI());

    for (var i = 0; i < validacion.length; i++) {
        if (validacion[i]) {
            bandera = true;
            break;
        }
    }

    //Terimina de comprobar

    if (!bandera) {
        console.log("Funciona")
        socios.push(so1);
        var sociosString = JSON.stringify(socios);

        fs.writeFileSync('./Archivos/Para_Guardar/Socios.txt', sociosString, (error) => {
            if (error) {
                console.log('No se puede escribir en archivos');
            } else {
                console.log('Escritura existosa')
            }
        });

    } else {

        console.log('No se guardo porque hay uno igual')
    }
}

modelo.enviarSocios= ()=>{
    return socios;
}

modelo.guardarLibro= (atributosLibro)=>{
    var tituloLibro = atributosLibro.titulo;
    var autorLibro = atributosLibro.nombreAutor;
    var categoriaLibro = atributosLibro.categoria;

    var libro = new Clases.Libro(tituloLibro, autorLibro, categoriaLibro, true, false);
    libros.push(libro);

    var librosString = JSON.stringify(libros);

    fs.writeFile('./Archivos/Para_Guardar/Libros.txt', librosString, (error) => {

        if (error) {
            console.log('No se puede escribir en archivos');
        } else {
            console.log('Escritura existosa')
        }
    });
}

modelo.enviarLibros= ()=>{
    return libros;
}

modelo.guardarPedido= (atributosPedido)=> {
    const fechaActual = new Date();

    var fechaPrestamo = fechaActual.toLocaleDateString();

    fechaActual.setDate(fechaActual.getDate() + 15);//Sumo 15 dias a la fecha actual

    var fechaDevolucion = fechaActual.toLocaleDateString();//A la fecha actual se le sumaron 15 dias

    var fechaReintegro = null;

    var libro;
    var socio;

    try {
        try {
           libro = JSON.parse(atributosPedido.libro);
        } catch (errorJSON) {
            console.log("Erorr al libro convertir en JSON")
            libro = null;
        }

        try{
            socio = JSON.parse(atributosPedido.socio);
        }catch(errorSocioJSON){
            console.log("Erorr al convertir socio en JSON")
            socio = null;
        }
    } catch (error) {
        console.log(error);
        libro = null;
        socio = null;
    }
    libro.disponible=false;

    var pedido = new Clases.Pedido(fechaPrestamo, fechaDevolucion, libro, socio, fechaReintegro);

    pedidos.push(pedido);
    var pedidosString = JSON.stringify(pedidos);

    fs.writeFileSync('./Archivos/Para_Guardar/Pedidos.txt', pedidosString, (error) => {
        if (error) {
            console.log('No se puede escribir en archivos');
        } else {
            console.log('Escritura existosa')
        }
    });
}

modelo.enviarPedidos= ()=>{
    return pedidos;
}

module.exports = modelo;