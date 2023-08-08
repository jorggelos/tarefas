<?php 

include_once('conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);

if($postjson['dataInserir'] == ''){
  $result = json_encode(array('success'=>'Preencha a Data!'));
  echo $result;
  exit();
}

if($postjson['horaInserir'] == ''){
  $result = json_encode(array('success'=>'Preencha a Hora!'));
  echo $result;
  exit();
}
 
 $query_buscar = $pdo->query("SELECT * from tarefas where data = '$postjson[dataInserir]' and hora = '$postjson[horaInserir]'");
 $dados_buscar = $query_buscar->fetchAll(PDO::FETCH_ASSOC);
 if(@count($dados_buscar) > 0){
 	 $result = json_encode(array('success'=>'Dado já Cadastrado!'));
 	 echo $result;
 	 exit();
 }else{
 	$query = $pdo->prepare("INSERT INTO tarefas SET titulo = :titulo, descricao = :descricao, data = :data, hora = :hora, cpf = :cpf, status = :status ");
  
       $query->bindValue(":titulo", $postjson['titulo']);
       $query->bindValue(":descricao", $postjson['descricao']);
       $query->bindValue(":data", $postjson['dataInserir']);
       $query->bindValue(":hora", $postjson['horaInserir']);
       $query->bindValue(":cpf", $postjson['cpf']);
       $query->bindValue(":status", '');

      
       $query->execute();
  
             
  
      if($query){
        $result = json_encode(array('success'=>true));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }

        echo $result;
 }

 
     


?>