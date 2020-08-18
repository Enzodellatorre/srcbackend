const express=require('express');
const router=express.Router();
const mysql=require('../mysql').pool;
//Retorna todos os pedidos
router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM DIA',
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });
});
//adiciona um dia
router.post('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'INSERT INTO DIA(descricaoDia) VALUES(?)',
            [req.body.descricaoDia],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(201).send({
                    mensagem:'dia inserido com sucesso',
                  id_dia: resultado.insertId
                });
            }
        )
    });
});
//Retorna um dia especifico
router.get('/:idDia',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM DIA WHERE IDDIA=?;',
        [req.params.idDia],
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });   
    
});
routes.patch('/:idDia',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `UPDATE DIA
            SET DESCRICAODIA = ?,
            WHERE IDDIA = ?`
            [req.body.descricaoDia,req.body.idDia],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'dia alterado com sucesso'
                
                });
            }
        )
    });
});
//deletar dia
router.delete('/:idDia',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `DELETE FROM DIA WHERE IDDIA = ?`,
            [req.body.idDia],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'Dia removido com sucesso'
                
                });
            }
        )
    });
});
module.exports=router;