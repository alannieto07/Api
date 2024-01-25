import express from 'express'; //Importamos express
import messages from './Messages.js' //importamos el archivo para la obtencion del json
const app = express(); //Lo guardamos en la constante app

//utilizamos express.json para captar informacion en formato json en el body
app.use(express.json()) 


//Get de prueba: trae todos los msjs
app.get('/academia.tim.teknosgroup.com/:usuario/api/menssages', (req,res) =>{ 
        //captamos el usuario por parametros con el require
        const usuario = req.params.usuario
        //traemos es archivo messages en formato json que importamos con el response
        res.send(messages)
});



//GET(FOLDERS):https://academia.tim.teknosgroup.com/:usuario/api/folders
app.get('/academia.tim.teknosgroup.com/:usuario/api/folders', (req,res) => { 
       const usuario = req.params.usuario
      res.send(messages.folders) 
});



//GET(MESSAGES LIST):https://academia.tim.teknosgroup.com/:usuario/api/messages/important?from=Alice&to=me&subject=Commits 
app.get('/academia.tim.teknosgroup.com/:usuario/api/menssages/important?from=Alice&to=me&subject=Commits', (req,res) => {
    const usuario = req.params.usuario   
    return res.json("no llegue a hacerlo, perdon :C")
});

//POST(MESSAGES):https://academia.tim.teknosgroup.com/:usuario/api/messages/important
app.post('/academia.tim.teknosgroup.com/:usuario/api/messages/important', (req,res) =>{
        //captamos los parametros con require
        const usuario= req.params.usuario
        //captamos el body con require, en formato json
        const nuevoMsj =  req.body;
        //guardamos el body como un nuevo mensaje importante 
        messages.important.push(nuevoMsj)
        //mandamos como respuesta los mensajes importantes con el nuevo msj guardado
        res.send(messages.important)        
}); 

//DELETE(MESSAGES):https://academia.tim.teknosgroup.com/:usuario/api/messages/important/15459251a6d6b397565
app.delete('/academia.tim.teknosgroup.com/:usuario/api/messages/important/:id', (req, res) =>{
    //captamos el parametro de usuario con el require
    const usuario= req.params.usuario 
    //captamos el id de los parametros
    const ideliminar = req.params.id
    //con la constante index buscamos encontrar el id del msj con el metodo find
    const index = messages.important.find(x => x.id == ideliminar); 
     //con el metodo splice eliminamos el msj que mandaron por parametro
     messages.important.splice(index,1);
     //mandamos los mensajes importantes, excluyendo al que se elimino 
     res.send(messages.important);
});


//PORT
const port = process.env.PORT ?? 3000
//hacemos que app escuche el puerto 3000
app.listen(port, console.log(`listening on port ${port}`))