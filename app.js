const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const rotaDias=require('./routes/dias');
const rotaPeriodos=require('./routes/periodos');
const rotaNiveis=require('./routes/niveis');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
        );
        if(req.method==='OPTIONS'){
            res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
            return res.status(200).send({});
        }
        next();
});
app.use('/dias',rotaDias);
app.use('/periodos',rotaPeriodos);
app.use('/niveis',rotaNiveis);

app.use((req,res,next)=>{
    const erro=new Error('nao encontrado');
    erro.status=404;
    next(erro);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.send({
        erro:{
            mensagem:error.message
        }
    });
});


module.exports=app;