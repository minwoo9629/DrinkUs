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
-- Table structure for table `user_sub_category`
--

DROP TABLE IF EXISTS `user_sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_sub_category` (
  `user_subcategory_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subcategory_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`user_subcategory_id`),
  KEY `FKcb47rdsdk2fnr1aau9ufok322` (`subcategory_id`),
  KEY `FKl7mcgfjg3ed8asx4j4ihjm1wp` (`user_id`),
  CONSTRAINT `FKcb47rdsdk2fnr1aau9ufok322` FOREIGN KEY (`subcategory_id`) REFERENCES `sub_category` (`subcategory_id`),
  CONSTRAINT `FKl7mcgfjg3ed8asx4j4ihjm1wp` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sub_category`
--

LOCK TABLES `user_sub_category` WRITE;
/*!40000 ALTER TABLE `user_sub_category` DISABLE KEYS */;
INSERT INTO `user_sub_category` VALUES (2,10,6),(4,7,3),(10,1,6),(12,23,3),(13,3,4),(14,6,4),(15,22,3),(16,27,3),(17,1,2),(18,2,2),(19,9,2),(20,8,2),(21,14,2),(22,19,6),(23,24,3),(26,3,3),(29,6,3),(32,19,3),(33,25,3),(34,26,3),(39,11,3),(47,20,3),(48,29,3),(49,30,3),(50,15,3),(51,12,3),(56,2,3),(57,1,3),(58,18,3),(59,17,3),(60,16,3),(61,9,3),(62,13,3),(63,14,3),(64,10,3),(65,8,3),(66,4,3),(67,5,3);
/*!40000 ALTER TABLE `user_sub_category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-11 13:54:49
