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
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `ages_20` varchar(255) DEFAULT NULL,
  `ages_30` varchar(255) DEFAULT NULL,
  `ages_40` varchar(255) DEFAULT NULL,
  `ages_50` varchar(255) DEFAULT NULL,
  `ages_60` varchar(255) DEFAULT NULL,
  `ages_70` varchar(255) DEFAULT NULL,
  `people_limit` int(11) DEFAULT NULL,
  `place_theme` varchar(255) DEFAULT NULL,
  `room_name` varchar(255) DEFAULT NULL,
  `room_pw` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `user_admin_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `FKllkgnps1iryk3347aokxwbxxm` (`category_id`),
  KEY `FKl2fd2h5tylr88j60v8k0l6no4` (`user_admin_id`),
  CONSTRAINT `FKl2fd2h5tylr88j60v8k0l6no4` FOREIGN KEY (`user_admin_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKllkgnps1iryk3347aokxwbxxm` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'2022-08-10 11:22:27','2022-08-10 11:22:27','Y','Y','N','N','N','N',4,'펍','방','$2a$10$5KKhLYV15KMD/E9WrhZxq.0fCLruuhBv2plpje/W6QvKq1Diflrty',1,3),(2,'2022-08-10 11:22:35','2022-08-10 11:22:35','N','N','N','N','N','N',2,'술집','관심사 없는 방','$2a$10$K6XXkCgX0SBgv2koNRGC8u5A8H3j5ypAddFxOxEcsvaLpr9c/kGje',NULL,3),(3,'2022-08-10 11:22:52','2022-08-10 11:22:52','N','N','N','N','N','N',2,'펍','스포츠 방','$2a$10$6CbVBm9ZUvXysfHFcNjsqO7Gaf.kFyl8FAsGxchMj5Otd56QCCI.2',1,3),(4,'2022-08-10 11:22:59','2022-08-10 11:22:59','N','N','N','N','N','N',2,'술집','음악 방','$2a$10$rEttUcHTzcudfp5g587YSO/LLyAzqw4R8BWbNuCBk8TtJkcAAgWyq',2,3),(5,'2022-08-10 11:23:07','2022-08-10 11:23:07','N','N','N','N','N','N',2,'술집','게임/오락 방','$2a$10$AVSHMVSiIrS70MzrKcrLjefNvbc52RZTeOrN0An9SE1uPNWIdXMzu',3,3),(6,'2022-08-10 11:23:14','2022-08-10 11:23:14','N','N','N','N','N','N',2,'술집','문화 방','$2a$10$ERO9GGWeWt7F1L5RuI2nee1mA3uyAYILBc.I9rzW6zfEoP1dUBnty',4,3),(7,'2022-08-10 11:23:21','2022-08-10 11:23:21','N','N','N','N','N','N',2,'술집','기타 방','$2a$10$Fqqu1zM5j0lOIYHvELl1L.IOFun85BTI2NEpzBXkYub2JJXdZRHxG',5,3),(8,'2022-08-10 11:24:21','2022-08-10 11:24:21','Y','N','N','N','N','N',2,'술집','한잔 하실분?','$2a$10$Fqqu1zM5j0lOIYHvELl1L.IOFun85BTI2NEpzBXkYub2JJXdZRHxG',5,3),(9,'2022-08-10 21:11:03','2022-08-10 21:11:03','Y','Y','N','N','N','N',3,'펍','집이 침수되었어요...','$2a$10$lxG3PUPcgHvkP5iIn1MV3ujAskuzcxh/aauI/KtFdla1b1diL7fau',3,2),(10,'2022-08-11 13:19:12','2022-08-11 13:19:12','N','N','Y','N','N','N',2,'칵테일바','드링커스 테스트 room 1','$2a$10$QnLYNwOBIfH47hrCifboZ.Ij8e8WWEaE3CnAbboDEb2NH4PgVSabW',3,13);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-11 13:54:50
