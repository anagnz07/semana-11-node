const path = require("path")
const fs = require("fs-extra")
const sharp = require("sharp")


async function main(){

  try{

    //leemos la ruta parcial
    const rawPath = process.argv[2]

    //Si no hay, lanzamos error
if(!rawPath){
  throw new Error("No hay ruta.")
}

// Completamos la ruta
const img = path.resolve(rawPath)

// Si el archivo no existe, lanzamos error
if(!fs.pathExistsSync(img)){
  throw new Error("El archivo no existe")
}

// Cogemos datos de la ruta
const {dir, name} = path.parse(img)

// Creamos la ruta a la carpeta samples
const samplesDir = path.join(dir, "samples")


// Aseguramos que exista
fs.ensureDirSync(samplesDir)


//Hacemos las modificaciones y guardamos los archivos
// Rotada
const rotated = await sharp(img).rotate(90)
rotated.toFile(path.join(samplesDir, `${name}-rotated.jpeg`))

//Escala de grises
await sharp(img).grayscale().toFile(path.join(samplesDir, `${name}-grayscale.jpeg`))

//cuadrada
await sharp(img).resize(500, 500, {fit: "cover"}).toFile(path.join(samplesDir, `${name}-square.jpeg`))


//Borrosa
await sharp(img).blur(10).toFile(path.join(samplesDir, `${name}-blur.jpeg`))

  } catch(e){
    console.error(e.message)
    console.log("Uso: node main.js [ruta de la imagen]")
  }

}


main()


