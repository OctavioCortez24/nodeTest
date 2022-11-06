const modelo = {};//Objeto

var fs = require('fs');
const Clases = require('./Clases');
var libros = [];//Array de Libros


//Cargo los libros que se encuentran en el archivo txt
try {
    var contenidoLibro = fs.readFileSync('./Archivos/Para_Guardar/Libros.txt', 'utf-8');
    libros = JSON.parse(contenidoLibro);
} catch (error) {
    console.log("No se pudo parcear el contenido de Libros.txt")
    libros = [];
}


var libro = new Clases.Libro("El extranjero", " Albert Camus.", "Novela", true, false)
var libro2 = new Clases.Libro("El extranjero2", "Albert Camus", "Novela", true, false)
var libro3 = new Clases.Libro("El extranjero", "Albert Camus", "Novela", true, false)

console.log("Libro en BD --> " + libros[6].nombreAutor);
console.log("Libro creado--> " + libro.getNombreAutor());
console.log(libros[6].nombreAutor==libro.getNombreAutor())

var validacion = libros.reduce((acumulador, librosItem) => {
    return acumulador=acumulador || (librosItem.titulo == libro.getTitulo()  && librosItem.nombreAutor==libro.getNombreAutor() && librosItem.categoria== libro.getCategoria());
}, false)


var validacion2 = libros.reduce((acumulador, librosItem) => {
    return acumulador=acumulador || (librosItem.titulo == libro2.getTitulo());
}, false)

var validacion3 = libros.reduce((acumulador, librosItem) => {
    return acumulador=(acumulador || librosItem.titulo == libro3.getTitulo());
}, false)


console.log("Primera validacion, deberia dar true: "+validacion)
console.log("Segunda validacion, deberia dar false: "+validacion2)
console.log("Tercera validacion, deberia dar true: "+validacion3)

