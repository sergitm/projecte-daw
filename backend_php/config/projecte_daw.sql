-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-06-2023 a las 21:03:57
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `projecte_daw`
--

DROP DATABASE IF EXISTS `projecte_daw`;

CREATE DATABASE IF NOT EXISTS `projecte_daw`;

USE `projecte_daw`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositius`
--

DROP TABLE IF EXISTS `dispositius`;
CREATE TABLE IF NOT EXISTS `dispositius` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `tipus` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `estat` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `espais`
--

DROP TABLE IF EXISTS `espais`;
CREATE TABLE IF NOT EXISTS `espais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `espais`
--

INSERT INTO `espais` (`id`, `nom`) VALUES
(1, 'Biblioteca'),
(2, 'Departament de informÃ tica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `espai_dispositiu`
--

DROP TABLE IF EXISTS `espai_dispositiu`;
CREATE TABLE IF NOT EXISTS `espai_dispositiu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_espai` int(11) NOT NULL,
  `id_dispositiu` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_dispositiu` (`id_dispositiu`),
  KEY `fk_id_espai_dispositiu` (`id_espai`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `espai_persona`
--

DROP TABLE IF EXISTS `espai_persona`;
CREATE TABLE IF NOT EXISTS `espai_persona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_espai` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_espai` (`id_espai`),
  KEY `fk_id_persona` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona_dispositiu`
--

DROP TABLE IF EXISTS `persona_dispositiu`;
CREATE TABLE IF NOT EXISTS `persona_dispositiu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_persona` int(11) NOT NULL,
  `id_dispositiu` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_dispositiu_persona` (`id_dispositiu`),
  KEY `fk_id_persona_dispositiu` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persones`
--

DROP TABLE IF EXISTS `persones`;
CREATE TABLE IF NOT EXISTS `persones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_cognoms` varchar(254) COLLATE latin1_spanish_ci NOT NULL,
  `usuari` varchar(254) COLLATE latin1_spanish_ci NOT NULL,
  `etapa` varchar(254) COLLATE latin1_spanish_ci NOT NULL,
  `curs` varchar(1) COLLATE latin1_spanish_ci NOT NULL,
  `grup` varchar(1) COLLATE latin1_spanish_ci DEFAULT NULL,
  `categoria` enum('professor','alumne') COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_usuari` (`usuari`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` varchar(128) COLLATE latin1_spanish_ci NOT NULL,
  `email` varchar(254) COLLATE latin1_spanish_ci NOT NULL,
  `nom` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `cognoms` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `username` varchar(20) COLLATE latin1_spanish_ci NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `access_token` varchar(254) COLLATE latin1_spanish_ci NOT NULL,
  `token_type` varchar(15) COLLATE latin1_spanish_ci NOT NULL,
  `refresh_token` varchar(254) COLLATE latin1_spanish_ci DEFAULT NULL,
  `expires_in` int(11) NOT NULL,
  `expires_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `espai_dispositiu`
--
ALTER TABLE `espai_dispositiu`
  ADD CONSTRAINT `fk_id_dispositiu` FOREIGN KEY (`id_dispositiu`) REFERENCES `dispositius` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_id_espai_dispositiu` FOREIGN KEY (`id_espai`) REFERENCES `espais` (`id`);

--
-- Filtros para la tabla `espai_persona`
--
ALTER TABLE `espai_persona`
  ADD CONSTRAINT `fk_id_espai` FOREIGN KEY (`id_espai`) REFERENCES `espais` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_id_persona` FOREIGN KEY (`id_persona`) REFERENCES `persones` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `persona_dispositiu`
--
ALTER TABLE `persona_dispositiu`
  ADD CONSTRAINT `fk_id_dispositiu_persona` FOREIGN KEY (`id_dispositiu`) REFERENCES `dispositius` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_id_persona_dispositiu` FOREIGN KEY (`id_persona`) REFERENCES `persones` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
