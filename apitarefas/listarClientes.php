<?php 

include_once('conexao.php');

$busca = '%'.$_GET['busca'].'%';
$cpf = $_GET['cpf'];



$query = $pdo->query("SELECT * from clientes where nome LIKE '$busca' and usuario = '$cpf'");

 $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }

   

 		$dados[] = array(
 			'id' => $res[$i]['id'],
 			'nome' => $res[$i]['nome'],
			'doc' => $res[$i]['doc'],
      'telefone' => $res[$i]['telefone'],
      'endereco' => $res[$i]['endereco'],
      'usuario' => $res[$i]['usuario'],
      
            
        
 		);

 		}

        if(count($res) > 0){
                $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
            echo $result;

 ?>