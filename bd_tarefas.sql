-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05-Ago-2020 às 03:31
-- Versão do servidor: 10.4.11-MariaDB
-- versão do PHP: 7.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bd_tarefas`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `doc` varchar(20) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `usuario` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `doc`, `telefone`, `endereco`, `usuario`) VALUES
(1, 'Marcelo Santos', '111.222.333-55', '(31) 97527-5087', 'Rua B, Numero 150', '000.000.000-00'),
(2, 'Pedro Campos11', '123.332.456-88', '3333-3333', 'Rua C', '000.000.000-00'),
(3, 'Camila Silva', '123.332.456-82', '3333-3344', 'Rua Campos', '000.000.000-00'),
(4, 'Camila Campos', '123.332.456-41', '3333-3344', 'Rua Campos Silva', '000.000.000-00'),
(5, 'Batista silva', '123.332.456-43', '3333-3344', 'Rua Campos Silva', '000.000.000-00'),
(6, 'Batista silva 2', '123.332.456-72', '3333-3344', 'Rua Campos Silva', '000.000.000-00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(35) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tarefas`
--

INSERT INTO `tarefas` (`id`, `titulo`, `descricao`, `data`, `hora`, `cpf`, `status`) VALUES
(4, 'Ir ao Banco', 'Verificar abertura de Conta', '2020-08-04', '12:15:00', '000.000.000-00', 'concluida'),
(5, 'Ir ao Cartorio', 'Verificar documentos do imvel', '0000-00-00', '00:00:00', '000.000.000-00', ''),
(7, 'aaaaa', 'aaa', '2020-08-05', '15:58:00', '000.000.000-00', ''),
(8, 'Abrir conta no Banco Bradesco', 'Marcado com a gerente', '2020-08-04', '17:15:00', '111.111.111.11', ''),
(9, 'Ir visitar Cliente', 'Cliente Pedro', '2020-08-04', '20:26:00', '000.000.000-00', 'concluida'),
(10, 'Visitar Cliente', 'Marcos', '2020-08-04', '01:26:00', '000.000.000-00', 'concluida'),
(12, 'Reunio da Empresa', 'Tratar de sociedade na empresa', '2020-08-04', '07:15:00', '000.000.000-00', 'concluida');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(20) NOT NULL,
  `nivel` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `cpf`, `email`, `senha`, `nivel`) VALUES
(1, 'Hugo Vasconcelos', '000.000.000-00', 'contato@hotmail.com', '123', 'admin'),
(2, 'Corretor Teste', '111.111.111.11', 'corretor@hotmail.com', '123', 'corretor');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
