-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2024 a las 03:42:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `renting_cars`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquileres`
--

CREATE TABLE `alquileres` (
  `id_alquiler` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_modelo` int(11) NOT NULL,
  `fecha_recogida` date NOT NULL,
  `fecha_entrega` date NOT NULL,
  `facturacion` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alquileres`
--

INSERT INTO `alquileres` (`id_alquiler`, `id_cliente`, `id_modelo`, `fecha_recogida`, `fecha_entrega`, `facturacion`) VALUES
(1, 1, 1, '2024-03-12', '2024-03-15', 196),
(2, 1, 2, '2024-03-01', '2024-03-25', 1378),
(3, 1, 3, '2024-03-05', '2024-03-15', 2992),
(4, 1, 2, '2024-03-01', '2024-03-30', 1590),
(5, 6, 4, '0000-00-00', '0000-00-00', 624),
(6, 6, 1, '0000-00-00', '0000-00-00', 98),
(7, 6, 3, '2024-06-17', '2024-06-20', 561),
(8, 6, 8, '2024-06-14', '2024-06-15', 45),
(9, 5, 5, '2024-06-23', '2024-06-25', 212);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `tel` varchar(12) NOT NULL,
  `email` varchar(100) NOT NULL,
  `poblacio` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellido`, `dni`, `tel`, `email`, `poblacio`, `password`) VALUES
(1, 'Luciano', 'Pavarotti', '123456789', '123456789', 'luciano@pavarotti.it', 'Modena', 'Luciano'),
(2, 'Maria', 'Callas', '456789123', '456789123', 'maria@callas.us', 'Paris', 'Maria'),
(3, 'Josep', 'Carreras', '789456123', '789456123', 'josep@carreras.cat', 'Barcelona', 'Josep'),
(4, 'Montserrat', 'Caballé', '321654987', '321654987', 'montserrat@caballe.cat', 'Barcelona', 'Montserrat'),
(5, 'Juan', 'Perez', '123432112', '678912344', 'juan@gmail.com', 'Barcelona', 'astuto'),
(6, 'Goku', 'Son', '777777777', '645654345', 'goku@gmail.com', 'Ciudad del este', 'esferas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelos`
--

CREATE TABLE `modelos` (
  `id_modelo` int(11) NOT NULL,
  `nombre_modelo` varchar(50) NOT NULL,
  `unidades_totales` int(2) NOT NULL,
  `unidades_alquiladas` int(2) NOT NULL,
  `personas` int(2) NOT NULL,
  `puertas` int(1) NOT NULL,
  `cambio` varchar(20) NOT NULL,
  `maletas` int(1) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `precioDia` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modelos`
--

INSERT INTO `modelos` (`id_modelo`, `nombre_modelo`, `unidades_totales`, `unidades_alquiladas`, `personas`, `puertas`, `cambio`, `maletas`, `tipo`, `precioDia`) VALUES
(1, 'Fiat Panda', 5, 1, 4, 5, 'manual', 2, 'coche', 49),
(2, 'Nissan Micra', 4, 0, 4, 5, 'manual', 2, 'coche', 53),
(3, 'Nissan X-trail Auto', 1, 1, 5, 5, 'manual', 2, 'coche', 187),
(4, 'Jeep Wrangler', 5, 1, 4, 3, 'manual', 2, 'coche', 104),
(5, 'Opel ZafiraSG', 2, 1, 7, 5, 'manual', 4, 'coche', 106),
(6, 'Piaggio Vespa 125 LX', 3, 0, 2, 0, 'auto', 0, 'moto', 29),
(8, 'Piaggio Beverly 300cc', 3, 1, 2, 0, 'auto', 0, 'moto', 45),
(9, 'Nissan Primastar', 3, 1, 9, 5, 'manual', 5, 'furgoneta', 147),
(11, 'Chevrolet Aveo 1.4 FULL', 1, 0, 4, 5, 'manual', 2, 'coche', 85),
(12, 'Renault clio 2', 5, 2, 5, 4, 'manual', 3, 'coche', 63),
(13, 'La morenita 3', 1, 0, 30, 3, 'manual', 50, 'barco', 550),
(14, 'Xiaomi pro 4', 10, 5, 1, 0, 'automatico', 0, 'patinete', 20),
(15, 'Xiaomi pro 5', 20, 5, 1, 0, 'automatico', 0, 'patinete', 25);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquileres`
--
ALTER TABLE `alquileres`
  ADD PRIMARY KEY (`id_alquiler`),
  ADD KEY `id_vehiculo_index` (`id_modelo`),
  ADD KEY `id_cliente_index` (`id_cliente`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `modelos`
--
ALTER TABLE `modelos`
  ADD PRIMARY KEY (`id_modelo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquileres`
--
ALTER TABLE `alquileres`
  MODIFY `id_alquiler` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `modelos`
--
ALTER TABLE `modelos`
  MODIFY `id_modelo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquileres`
--
ALTER TABLE `alquileres`
  ADD CONSTRAINT `alquileres_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `alquileres_ibfk_2` FOREIGN KEY (`id_modelo`) REFERENCES `modelos` (`id_modelo`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
