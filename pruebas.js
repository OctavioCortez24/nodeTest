//var so1 = new Clases.Socio("Prueba1", "P1", 43213252, false);


var socioString = JSON.stringify(so1);

fs.writeFileSync('./Archivos/texto.txt', socioString, (error, data) => {
    if (error) {
        console.log('No se puede escribir en archivos');
    } else {
        console.log('Escritura existosa')
    }
});

var t=require("./Archivos/Datos.json");
console.log(t)






fs.readFile('./Archivos/texto.txt', (error, data) => {
    if (error) {
        console.log('Archivo no leido');
    } else {
        console.log("Parseando a JSON");
        var socioJSON = JSON.parse(data);
        console.log(socioJSON);
    }
})





/*
//var contenido=fs.readFileSync('./Archivos/texto.txt', 'utf8'  );
var contenido=fs.readFileSync('./Archivos/texto.txt','utf-8',(error, data)=>{
    console.log(data);
})
console.log(contenido);



var socioJSON = [];

fs.readFile('./Archivos/texto.txt', (error, data) => {
    
    if (error) {
        console.log('Archivo no leido');

    } else {
        console.log("Parseando a JSON");
    }


});

*/