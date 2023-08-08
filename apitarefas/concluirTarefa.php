<?php 

include_once('conexao.php');

$id = $_GET['id'];

$query = $pdo->query("UPDATE tarefas SET status = 'concluida' where id = '$id'");

 

        if($query){
                $result = json_encode(array('success'=>true));

            }else{
                $result = json_encode(array('success'=>false));

            }
            echo $result;

 ?>