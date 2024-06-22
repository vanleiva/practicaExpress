//nombre: VANEXEL LEIVA 22-02244-1
//year 2024
//ingenieria en tecnologia de la informacion
import  express  from 'express';
import  ejs  from 'ejs';
import  mysql  from 'mysql'
import { toRaw } from 'vue';

//creado la aplicacion 
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.set('views','./views');

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//base de datos
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'productosdb',
    password:""
})

connection.connect((err)=>{
    if(err) throw err;
    console.log('conexion exitosa');
})

//Rutas
app.get('/',(req,res)=>{
    res.render('index')
}); 
app.get('/productos',(req,res)=>{
    connection.query('SELECT * FROM productos',(err,val)=>{
        if (err) throw err;
        res.render('productos',{ datos:val });
    })
});

app.get('/formulario',(req,res)=>{
    res.render('formulario')
})

//ingresar datos
app.post('/ingresar',(req,res)=>{
    const guardar =req.body;

    const sql = 'INSERT INTO productos (Nombre,precio,descripcion) VALUES (?,?,?)';
    connection.query(sql,[guardar.nom,guardar.pre,guardar.des],(err,res)=>{
        if(err) throw err;
        console.log('datos guradados exitosamente')
    })
    res.redirect('formulario')
})

//servidor
app.listen(3000,()=>{
    console.log('el servidor esta activo')
})