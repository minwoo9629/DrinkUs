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
-- Table structure for table `calendar_board`
--

DROP TABLE IF EXISTS `calendar_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar_board` (
  `calendar_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `ages_20` varchar(255) DEFAULT NULL,
  `ages_30` varchar(255) DEFAULT NULL,
  `ages_40` varchar(255) DEFAULT NULL,
  `ages_50` varchar(255) DEFAULT NULL,
  `ages_60` varchar(255) DEFAULT NULL,
  `ages_70` varchar(255) DEFAULT NULL,
  `calendar_content` varchar(255) DEFAULT NULL,
  `calendar_datetime` datetime DEFAULT NULL,
  `people_limit` int(11) DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `creater_id` bigint(20) DEFAULT NULL,
  `modifier_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`calendar_id`),
  KEY `FKrgrb2ijxksmkun20rl7iai7pf` (`creater_id`),
  KEY `FK2h5jojp0s9pjig6g90mqcvyg1` (`modifier_id`),
  CONSTRAINT `FK2h5jojp0s9pjig6g90mqcvyg1` FOREIGN KEY (`modifier_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKrgrb2ijxksmkun20rl7iai7pf` FOREIGN KEY (`creater_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar_board`
--

LOCK TABLES `calendar_board` WRITE;
/*!40000 ALTER TABLE `calendar_board` DISABLE KEYS */;
INSERT INTO `calendar_board` VALUES (3,'2022-08-10 22:08:19','2022-08-10 22:08:19','Y','Y','N','N','N','N','내일 축구 보실분?','2022-08-11 20:30:00',5,'펍',2,2),(4,'2022-08-10 22:24:15','2022-08-10 22:24:15','N','N','N','N','Y','N','밥묵자','2022-09-30 22:30:00',2,'술집',2,2),(5,'2022-08-10 22:25:02','2022-08-10 22:51:30','N','N','Y','N','Y','N','수정한 방입니다.','2022-09-22 09:30:00',3,'칵테일바',2,2),(6,'2022-08-11 01:41:46','2022-08-11 01:41:46','N','N','N','N','N','N','수석입학한 솜이불의 방','2022-09-11 22:10:00',2,'술집',3,3),(8,'2022-08-11 09:16:17','2022-08-11 09:16:17','Y','Y','N','N','N','N','수정하기','2022-08-12 22:30:00',2,'펍',3,3),(10,'2022-08-11 12:50:03','2022-08-11 12:50:03','N','N','N','N','N','N','ㅇㅇㅇ','2022-08-12 22:30:00',2,'술집',3,3);
/*!40000 ALTER TABLE `calendar_board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-11 13:54:53
