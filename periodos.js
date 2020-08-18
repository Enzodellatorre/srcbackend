const express=require('express');
const router=express.Router();
const mysql=require('../mysql').pool;
//Retorna todos os periodos
router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM PERIODO',
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });
});
//adiciona um pedido
router.post('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'INSERT INTO PERIODO(descricaoPeriodo) VALUES(?)',
            [req.body.descricaoPeriodo],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(201).send({
                    mensagem:'periodo inserido com sucesso',
                  id_periodo: resultado.insertId
                });
            }
        )
    });
});
//Retorna um periodo especifico
router.get('/:idPeriodo',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM PERIODO WHERE IDPERIODO=?;',
        [req.params.idPeriodo],
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });  
    
});
routes.patch('/:idPeriodo',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `UPDATE PERIODO
            SET DESCRICAOPERIODO = ?
            WHERE IDPERIODO = ?`
            [req.body.descricaoPeriodo,req.body.idPeriodo],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'periodo alterado com sucesso'
                
                });
            }
        )
    });
});
//deletar periodo
router.delete('/:idPeriodo',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `DELETE FROM PERIODO WHERE IDPERIODO = ?`,
            [req.body.idPeriodo],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'periodo removido com sucesso'
                
                });
            }
        )
    });
});
module.exports=router;