<?php 

include_once('conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);

if($postjson['doc'] == ''){
  $result = json_encode(array('success'=>'Preencha o Documento!'));
  echo $result;
  exit();
}

 
 $query_buscar = $pdo->query("SELECT * from clientes where doc = '$postjson[doc]' and usuario = '$postjson[cpf]'");
 $dados_buscar = $query_buscar->fetchAll(PDO::FETCH_ASSOC);
 if(@count($dados_buscar) > 0){
 	 $result = json_encode(array('success'=>'Dado já Cadastrado!'));
 	 echo $result;
 	 exit();
 }else{
 	$query = $pdo->prepare("INSERT INTO clientes SET nome = :nome, doc = :doc, telefone = :telefone, endereco = :endereco, usuario = :usuario ");
  
       $query->bindValue(":nome", $postjson['nome']);
       $query->bindValue(":doc", $postjson['doc']);
       $query->bindValue(":telefone", $postjson['telefone']);
       $query->bindValue(":endereco", $postjson['endereco']);
       $query->bindValue(":usuario", $postjson['cpf']);
       

      
       $query->execute();
  
             
  
      if($query){
        $result = json_encode(array('success'=>true));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }

        echo $result;
 }

 
     


?>