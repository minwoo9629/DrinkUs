-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: i7b306.p.ssafy.io    Database: drinkus
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `toast`
--

DROP TABLE IF EXISTS `toast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `toast` (
  `toast_id` bigint NOT NULL AUTO_INCREMENT,
  `toast_content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`toast_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `toast`
--

LOCK TABLES `toast` WRITE;
/*!40000 ALTER TABLE `toast` DISABLE KEYS */;
INSERT INTO `toast` VALUES (1,'건배건배~~!'),(2,'청춘은 바로 지금!'),(3,'이멤버 리멤버~~!'),(4,'부어라 마셔라!'),(5,'마숑~ 드숑~'),(6,'단무지 (단순 무식하게 지금을즐기자!)'),(7,'뚝배기 (뚝심있게 배짱있게 기운차게~!)'),(8,'당신멋져 (당당하게 살자, 신나게 살자, 멋지게 살자, 져주며 살자!)'),(9,'짠~~'),(10,'박카스 (박력있고 카리스마있고 스피드하게!)'),(11,'술잔은 비우고 마음은 채우고~!'),(12,'마시고 취하자~~!!'),(13,'마무리 (마음먹은대로 무엇이든 이뤄내자)'),(14,'만나서 반갑습니다!'),(15,'너뭐돼 (너무 고생했고, 뭐가 걱정이고! 되겠지! 마시자~)'),(16,'가보자고~!');
/*!40000 ALTER TABLE `toast` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 11:58:46
