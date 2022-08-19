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
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `report_completed` varchar(255) DEFAULT NULL,
  `report_reason` varchar(255) DEFAULT NULL,
  `report_result` varchar(255) DEFAULT NULL,
  `report_type` varchar(255) DEFAULT NULL,
  `from_user_id` bigint(20) DEFAULT NULL,
  `to_user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `FKgdpunfbbja6w83c5gtw4t509p` (`from_user_id`),
  KEY `FKfhtp7bfefc7turbgm07soc3cu` (`to_user_id`),
  CONSTRAINT `FKfhtp7bfefc7turbgm07soc3cu` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKgdpunfbbja6w83c5gtw4t509p` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (2,'2022-08-10 11:20:21','2022-08-10 11:20:21','N','기타 사유로 신고합니다',NULL,'기타',2,3),(3,'2022-08-10 11:21:36','2022-08-10 11:21:36','N','qewr',NULL,'기타',4,4),(4,'2022-08-10 11:22:21','2022-08-10 11:22:21','N','qewr',NULL,'기타',4,3),(6,'2022-08-10 11:24:03','2022-08-10 11:24:03','N','기타 사유로 신고합니다',NULL,'기타',2,4),(16,'2022-08-10 13:11:37','2022-08-10 13:11:37','N','qwerdfdf',NULL,'',4,1),(17,'2022-08-11 04:12:15','2022-08-11 04:12:15','N','',NULL,'',4,7);
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-11 13:54:52
