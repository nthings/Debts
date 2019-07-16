-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.1.36-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando datos para la tabla debts.debts: ~28 rows (aproximadamente)
/*!40000 ALTER TABLE `debts` DISABLE KEYS */;
INSERT INTO `debts` (`id`, `date`, `description`, `custom_description`, `amount`, `monthly_instalment`, `current_monthly_instalment`, `recurrent`, `payed`, `date_payed`, `createdAt`, `updatedAt`, `deletedAt`, `ownerId`, `periodId`) VALUES
	(1, '2019-07-16 00:29:32', 'test', NULL, '10000', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:29:32', '2019-07-16 00:29:32', '2019-07-16 00:31:20', 1, 1),
	(2, '2019-06-07 05:00:36', 'WALMART VENTA EN LIN 2   NWM 97(007:018) ', NULL, '438.28', 18, 7, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 4, 1),
	(3, '2019-06-08 05:00:36', 'COMISION ANUAL TITULAR                   ', NULL, '1046', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 1, 1),
	(4, '2019-06-13 05:00:36', 'RAPPI E COM              TRA 150604TW1MX ', NULL, '259', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 1, 1),
	(5, '2019-06-14 05:00:36', 'WWW ODM COM MX CIB        OME56(004:006) ', NULL, '510.33', 6, 4, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 2, 1),
	(6, '2019-06-14 05:00:36', 'MERCADO PAGO 1            MER99(005:018) ', NULL, '602.61', 18, 5, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 1, 1),
	(7, '2019-06-13 05:00:36', 'WWW ODM COM MX CIB        OME56(001:003) ', NULL, '721.33', 3, 1, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 3, 1),
	(8, '2019-06-11 05:00:36', 'VIVAAEROBUS              ANA 05(006:006) ', NULL, '1093.57', 6, 6, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 3, 1),
	(9, '2019-06-14 05:00:36', 'ADYENMX*EVANDTI I        EVA 1101215N0MX ', NULL, '8510', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 2, 1),
	(10, '2019-06-16 05:00:36', 'WWW ODM COM MX CIB        OME56(001:003) ', NULL, '721.33', 3, 1, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 3, 1),
	(11, '2019-06-16 05:00:36', 'O DE M GOMEZ PALACIO     OME 561118AA8MX ', NULL, '750', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 3, 1),
	(12, '2019-06-18 05:00:36', 'VIVA AEROBUS CIB          ANA050518RL1MX ', 'Vuelo Mario competencia', '2651.59', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 3, 1),
	(13, '2019-06-20 05:00:36', 'MERCADO PAGO 1            MER99(001:018) ', 'Estudio Regalo', '263.06', 18, 1, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 4, 1),
	(14, '2019-06-21 05:00:36', 'CAMZNRETAILMXINSTALLME   ANE 14(003:006) ', 'Regalo Reloj', '540.82', 6, 3, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 3, 1),
	(15, '2019-06-21 05:00:36', 'PAYPAL ITUNESCOM/BILL    OPM 150323DI1   ', 'Youtube Premium', '155', NULL, NULL, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 1, 1),
	(16, '2019-06-21 05:00:36', 'PAYPAL *PPCINEPOLIS      OPM 150323DI1MX ', NULL, '174', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 1, 1),
	(17, '2019-06-22 05:00:36', 'Uber BV                  Vorden       NL ', 'alitas', '398', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 1, 1),
	(18, '2019-06-22 05:00:36', 'MERCADO PAGO 1            MER991006JMAMX ', 'Disco duro xbox', '500', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 2, 1),
	(19, '2019-06-24 05:00:36', 'AEROMEXICO H2H CIB        AME88(015:018) ', 'Vuelos cancun', '630.67', 18, 15, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 3, 1),
	(20, '2019-06-24 05:00:36', 'FTTH MEXICO AXTEL CR     FME 1712225M6   ', 'Internet', '509', NULL, NULL, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 1, 1),
	(21, '2019-06-24 05:00:36', 'NR FINANCE MEXICO        NFM 0307091L9MX ', 'pago carro', '10575', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 2, 1),
	(22, '2019-06-25 05:00:36', '**AEROMEXICO                   (004:006) ', NULL, '768.5', 6, 4, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 3, 1),
	(23, '2019-06-27 05:00:36', 'MERCADO PAGO 1            MER99(005:018) ', 'celular', '277.72', 18, 5, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 2, 1),
	(24, '2019-06-27 05:00:36', 'VOLARIS ECOM MXN         CVA 04(004:006) ', 'vuelo norma', '932.5', 6, 4, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 3, 1),
	(25, '2019-06-30 05:00:36', 'AEROMEXICO               AME 88(002:006) ', 'VUELO PAGADO', '1064.83', 6, 2, 1, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, NULL, 1),
	(26, '2019-07-05 05:00:36', 'IVA COMISION ANUAL                       ', NULL, '167.36', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:50:43', '2019-07-16 00:50:43', NULL, 1, 1),
	(27, '2019-06-14 05:00:00', 'Boletos Guns', NULL, '1610', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:52:37', '2019-07-16 00:52:37', NULL, 1, 1),
	(28, '2019-06-14 05:00:00', 'Boleto Guns', NULL, '2127.5', NULL, NULL, NULL, NULL, NULL, '2019-07-16 00:53:44', '2019-07-16 00:53:44', NULL, 2, 1);
/*!40000 ALTER TABLE `debts` ENABLE KEYS */;

-- Volcando datos para la tabla debts.people: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` (`id`, `name`, `color`, `email`, `password`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Mauricio Martinez', '#000000', 'n_othing@hotmail.com', 'pbkdf2(1000,20,sha512)$9560770fef0d4788$9dbf894fa3ed8b105cc10071fc95a4b1bd4024e5', '2019-07-16 00:29:32', '2019-07-16 00:29:32', NULL),
	(2, 'Jazon', '#c81f1f', 'test@mail.com', 'pbkdf2(1000,20,sha512)$1209b1fc32a34c9b$d4bf841d82c81490dfa65d5292fbc85bc9a7ea66', '2019-07-16 00:30:29', '2019-07-16 00:30:29', NULL),
	(3, 'Irma Sanchez', '#cd09eb', 'test@mail.com', 'pbkdf2(1000,20,sha512)$63a67a09a4ba49ac$765baaae6b915e35fb52a37518e86d9e20e17e46', '2019-07-16 00:30:49', '2019-07-16 00:30:49', NULL),
	(4, 'Beatriz Margarita', '#002aff', 'test@mail.com', 'pbkdf2(1000,20,sha512)$660d22e91ba5466a$f2ca8a84dae3861f176b38c6b890f40bffa7eaef', '2019-07-16 00:31:10', '2019-07-16 00:31:10', NULL);
/*!40000 ALTER TABLE `people` ENABLE KEYS */;

-- Volcando datos para la tabla debts.periods: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `periods` DISABLE KEYS */;
INSERT INTO `periods` (`id`, `start_date`, `end_date`, `amount_no_interests`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, '2019-06-06 05:00:00', '2019-07-05 05:00:00', 29421, '2019-07-16 00:29:32', '2019-07-16 00:30:01', NULL);
/*!40000 ALTER TABLE `periods` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
