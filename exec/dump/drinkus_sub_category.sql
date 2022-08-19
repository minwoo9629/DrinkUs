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
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_category` (
  `subcategory_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sub_category_name` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`subcategory_id`),
  KEY `FKl65dyy5me2ypoyj8ou1hnt64e` (`category_id`),
  CONSTRAINT `FKl65dyy5me2ypoyj8ou1hnt64e` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_category`
--

LOCK TABLES `sub_category` WRITE;
/*!40000 ALTER TABLE `sub_category` DISABLE KEYS */;
INSERT INTO `sub_category` VALUES (1,'야구',1),(2,'배드민턴',1),(3,'트레이닝',1),(4,'배구',1),(5,'e-sports',1),(6,'축구',1),(7,'농구',1),(8,'POP',2),(9,'KPOP',2),(10,'JPOP',2),(11,'인디',2),(12,'트로트',2),(13,'락',2),(14,'재즈',2),(15,'밴드',2),(16,'롤',3),(17,'메이플',3),(18,'카트라이더',3),(19,'배그',3),(20,'스타',3),(21,'그 외',3),(22,'전시',4),(23,'뮤지컬',4),(24,'콘서트',4),(25,'영화',4),(26,'만화&애니',4),(27,'연극',4),(28,'뷰티',5),(29,'육아',5),(30,'공부',5),(31,'코딩',5),(32,'주식',5),(33,'코인',5),(34,'시사',5);
/*!40000 ALTER TABLE `sub_category` ENABLE KEYS */;
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
