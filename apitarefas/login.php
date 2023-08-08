<?php 

include_once('conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);
 
 $query_buscar = $pdo->query("SELECT * from usuarios where email = '$postjson[email]' and senha = '$postjson[senha]' ");
 $dados_buscar = $query_buscar->fetchAll(PDO::FETCH_ASSOC);

  for ($i=0; $i < count($dados_buscar); $i++) { 
            foreach ($dados_buscar[$i] as $key => $value) {
            }
          
           $dados = array(
             'id' => $dados_buscar[$i]['id'],
             'nome' => $dados_buscar[$i]['nome'],
             'cpf' => $dados_buscar[$i]['cpf'],
             'email' => $dados_buscar[$i]['email'],
             'senha' => $dados_buscar[$i]['senha'],
             'nivel' => $dados_buscar[$i]['nivel'],
                 
           );
      
       }

 if(@count($dados_buscar) > 0){
 	 $result = json_encode(array('retorno'=>'Dados corretos!', 'obj'=>$dados));
 	 echo $result;
 	 
  }else{
  	$result = json_encode(array('retorno'=>'Dados incorretos!'));
 	 echo $result;
  }

 
?>