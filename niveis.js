const express=require('express');
const router=express.Router();
const mysql=require('../mysql').pool;
//Retorna todos os niveis
router.get('/',(req,res,next)=>{

mysql.getConnection((error,conn)=>{
    if(error){return res.status(500).send({error:error})} 
    conn.query('SELECT * FROM NIVEL',
    (error,resultado,fields)=>{
        if(error){return res.status(500).send({error:error})}
        return res.status(200).send({response:resultado})
    }
    )
});

});
//adiciona um nivel
router.post('/',(req,res,next)=>{
    
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'INSERT INTO NIVEL(valorNivel,idPeriodo,idDia) VALUES(?,?,?)',
            [req.body.valorNivel,req.body.idPeriodo,req.body.idDia],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(201).send({
                    mensagem:'nivel inserido com sucesso',
                  id_nivel: resultado.insertId
                });
            }
        )
    });
    
});
//Retorna um nivel especifico
router.get('/:idNivel',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})} 
        conn.query('SELECT * FROM NIVEL WHERE IDNIVEL=?;',
        [req.params.idNivel],
        (error,resultado,fields)=>{
            if(error){return res.status(500).send({error:error})}
            return res.status(200).send({response:resultado})
        }
        )
    });   
    
});
routes.patch('/:idNivel',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `UPDATE NIVEL
            SET VALORNIVEL = ?,
            IDPERIODO = ?,
            IDDIA = ?
            WHERE IDNIVEL = ?`
            [req.body.valorNivel,req.body.idPeriodo,req.body.idDia,req.body.idNivel],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'nivel alterado com sucesso'
                
                });
            }
        )
    });
});
//deletar nivel
router.delete('/:idNivel',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `DELETE FROM NIVEL WHERE IDNIVEL = ?`,
            [req.body.idNivel],
            (error,resultado,field)=>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                res.status(202).send({
                    mensagem:'nivel removido com sucesso'
                
                });
            }
        )
    });
});
module.exports=router;