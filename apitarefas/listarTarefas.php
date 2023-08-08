<?php 

include_once('conexao.php');

$busca = $_GET['busca'];
$cpf = $_GET['cpf'];

if($busca == ''){
  $busca = date('Y-m-d');
}

$query = $pdo->query("SELECT * from tarefas where data = '$busca' and cpf = '$cpf'");

 $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }

    $data = implode('/', array_reverse(explode('-', $res[$i]['data'])));

    $cor = '';
    if($res[$i]['status'] == ''){
      $cor = '#e5705c';
    }else{
      $cor = '#29a137';
    }

 		$dados[] = array(
 			'id' => $res[$i]['id'],
 			'titulo' => $res[$i]['titulo'],
			'descricao' => $res[$i]['descricao'],
      'data' => $data,
      'hora' => $res[$i]['hora'],
      'status' => $res[$i]['status'],
      'cor' => $cor
            
        
 		);

 		}

        if(count($res) > 0){
                $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
            echo $result;

 ?>