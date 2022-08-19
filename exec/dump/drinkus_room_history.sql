-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: i7b306.p.ssafy.io    Database: drinkus
-- ------------------------------------------------------
-- Server version	5.7.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `room_history`
--

DROP TABLE IF EXISTS `room_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_history` (
  `room_history_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`room_history_id`),
  KEY `FK5s7nb81wsyejhfl9pc9k47t1r` (`room_id`),
  KEY `FK5f4co2fj1hmx3rysh52e4jfvv` (`user_id`),
  CONSTRAINT `FK5f4co2fj1hmx3rysh52e4jfvv` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK5s7nb81wsyejhfl9pc9k47t1r` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_history`
--

LOCK TABLES `room_history` WRITE;
/*!40000 ALTER TABLE `room_history` DISABLE KEYS */;
INSERT INTO `room_history` VALUES (1,'2022-08-10 11:22:27','2022-08-10 11:22:27',1,3),(2,'2022-08-10 11:22:35','2022-08-10 11:22:35',2,3),(3,'2022-08-10 11:22:52','2022-08-10 11:22:52',3,3),(4,'2022-08-10 11:22:59','2022-08-10 11:22:59',4,3),(5,'2022-08-10 11:23:07','2022-08-10 11:23:07',5,3),(6,'2022-08-10 11:23:14','2022-08-10 11:23:14',6,3),(7,'2022-08-10 11:23:21','2022-08-10 11:23:21',7,3),(8,'2022-08-10 21:11:03','2022-08-10 21:11:03',9,2),(9,'2022-08-11 13:19:12','2022-08-11 13:19:12',10,13);
/*!40000 ALTER TABLE `room_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-11 13:54:51
