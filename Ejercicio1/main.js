const path = require("path")
const fs = require("fs-extra")
const { get } = require("https")
const args = require("minimist")(process.argv.slice(2))




const dataPath = path.join(__dirname, "data.json")



function getData(){
  //Comprobar si existe el archivo
  const exists = fs.pathExistsSync(dataPath)

  // Si existe devolvemos los datos parseados
  if(exists){
    return JSON.parse(fs.readFileSync(dataPath))
  } 

  //Si no existe, devolvemos un array vacio
  return []
}


//Añadir evento
function addNewEvent(){
  try{

    //Creamos el objeto con los datos
    const newEvent = {
    date: new Date(args.d),
    text: args.t
  }


  //Si la fecha es erronea, lanzamos error
  if(!newEvent.date.getDate()){
    throw new Error("formato de fecha incorrecto")
  }

//Si no hay texto, lanzamos error
  if(!newEvent.text.length){
    throw new Error("Texto demasiado corto")
  }

  // Leemos lo que ya hay en el archivo
  const data = getData()

  // Añadimos lo nuevo a lo que habia
  data.push(newEvent)

  //Lo escribimos todo en el archivo (como JSON)
  fs.writeFileSync(dataPath, JSON.stringify(data))
  } catch(e){
    console.error(e.message)
  }
  

}

//Funcion que muestra las instrucciones
function printHelp(){
  console.log("Uso:")
  console.log("-t \t texto del evento")
  console.log("-d \t fecha del evento (format: yyyy-mm-dd)")
  console.log("-l \t mostrar eventos")
}


// Si tienen los datos necesarios para un nuevo evento, lo crea
if(args.d && args.t){
  addNewEvent()
}


// Si tiene el argumento -l, lista los eventos
if(args.l){
  const data = getData()
  for(const {date, text} of data){
    const formatedDate = new Date(date).toLocaleDateString("es-ES")

    console.log(`${formatedDate}: ${text}`)
  }
}


// Si no tiene ni la -l ni alguno de los necesarios para eventos, muestra las instrucciones
if(!args.l && !args.d){
  printHelp()
}