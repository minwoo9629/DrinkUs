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
-- Table structure for table `daily_board`
--

DROP TABLE IF EXISTS `daily_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_board` (
  `board_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `board_content` varchar(255) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `creater_id` bigint(20) DEFAULT NULL,
  `modifier_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FKmgwqu45x9wnf8si8f65a3mb0l` (`creater_id`),
  KEY `FKc09jw0obj55tu7rbrj611y9x0` (`modifier_id`),
  CONSTRAINT `FKc09jw0obj55tu7rbrj611y9x0` FOREIGN KEY (`modifier_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKmgwqu45x9wnf8si8f65a3mb0l` FOREIGN KEY (`creater_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_board`
--

LOCK TABLES `daily_board` WRITE;
/*!40000 ALTER TABLE `daily_board` DISABLE KEYS */;
INSERT INTO `daily_board` VALUES (15,'2022-08-11 08:53:05','2022-08-11 11:03:57','수정 글ㄴㅁㅇㄹㄴㅇㄹ',NULL,4,4),(16,'2022-08-11 08:54:20','2022-08-11 08:54:20','댓글댓글1',15,4,4),(21,'2022-08-11 09:51:28','2022-08-11 09:51:28','글글글글',NULL,4,4),(36,'2022-08-11 09:51:42','2022-08-11 09:51:42','댓댓댓댓',21,4,4),(37,'2022-08-11 09:51:58','2022-08-11 09:51:58','댓글댓글댓글1',21,4,4),(46,'2022-08-11 09:52:06','2022-08-11 09:52:06','댓글!',21,4,4),(51,'2022-08-11 10:27:24','2022-08-11 10:27:24','12345',21,4,4);
/*!40000 ALTER TABLE `daily_board` ENABLE KEYS */;
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
