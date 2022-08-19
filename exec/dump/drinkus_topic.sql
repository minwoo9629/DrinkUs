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
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `topic_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `topic_content` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`topic_id`),
  KEY `FK8n7r9utm8sjpdfstb4wcqd7qj` (`category_id`),
  CONSTRAINT `FK8n7r9utm8sjpdfstb4wcqd7qj` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (1,'저녁 뭐 먹었나요?',NULL),(2,'mbti가 뭔가요?',NULL),(3,'순대에 소금vs막장vs초장',NULL),(4,'민초vs반민초',NULL),(5,'콩국수에 설탕vs소금',NULL),(6,'볶음밥에 계란국vs짬뽕국',NULL),(7,'탕수육 부먹vs찍먹',NULL),(8,'회사 부장님을 욕해봅시다 (또는 회사에서 화난일이 있으셨나요 이야기하면서 툴툴털어봅시다)',NULL),(9,'이 세상 누구든 초대할 수 있다면, 저녁 식사에 누굴 초대하시겠어요?',NULL),(10,'내일 아침에 일어났을 때 하나의 능력을 얻을 수 있다면 뭘 얻고 싶나요?',NULL),(11,'육체건강 vs 마음건강',NULL),(12,'평생 치킨, 떡볶이만 먹기 vs 평생 치킨, 떡볶이 못 먹기',NULL),(13,'미래로 가기 vs 과거로 가기',NULL),(14,'똥 안 먹었는데 똥 먹었다고 소문나기(뉴스에 나옴) vs 진짜 똥 먹었는데 아무도 모르기',NULL),(15,'털 엄청 많기 vs 털 하나도 없기',NULL),(16,'트름할때 방구소리 vs 방구 뀔 때 트름소리',NULL),(17,'요즘 날씨 어때요?',NULL),(18,'오늘 뉴스 보셨나요?',NULL),(19,'좋아하는 장소가 있다면 소개해주세요',NULL),(20,'최근 갔던 여행에 대해서 이야기해주세요',NULL),(21,'전공이나 하고 있는 일에 대해서 말해주세요',NULL),(22,'응원하는 스포츠팀이 어디인가요?',1),(23,'최근 흥미로운 스포츠 소식이 있나요?',1),(24,'좋아하는 스포츠의 최고 스타는 누구라고 생각하시나요?',1),(25,'요즘 건강을 위해 하는 운동이 있으신가요?',1),(26,'가장 좋아하는 운동에 대해 이야기해주세요',1),(27,'카타르 월드컵 어떻게 생각해요?',1),(28,'좋아하는 축구구단이있나요?',1),(29,'좋아하는 야구 선수는?',1),(30,'계절 스포츠 중에 뭘 제일 좋아하나요?',1),(31,'당신이 선수가 될 수 있다면 어떤 종목의 선수가 되고 싶은가요?',1),(32,'경기 관람하기 vs 직접 즐기기',1),(33,'(야구를 좋아한다면) 24실점하고 한 경기 지기 vs 각각 8실점으로 세 경기 지기',1),(34,'가지고 있는 유니폼 자랑해 주세요',1),(35,'자신의 노래방18번 노래 말씀해주세요',2),(36,'어떤 노래 장르 좋아하세요?',2),(37,'가장 기억에 남는 콘서트는 무엇인가요?',2),(38,'즉석 콘서트! 대화주제 선택한 분께서 좋아하는 노래 한곡 불러주세요~!',2),(39,'좋아하는 가수 혹은 음악가는 누구인가요?',2),(40,'당신의 하루를 기분 좋게 해주는 음악은 무엇인가요?',2),(41,'연주할 수 있는 악기는 무엇인가요?',2),(42,'가장 재밌게 본 음악 프로그램이 무엇인가요?',2),(43,' 작사가 되기 vs 작곡가 되기',2),(44,'집에서 음악 들을 때 이어폰 vs 스피커',2),(45,'음악을 골라 듣는 편인가요, 무작위로 듣는 편인가요?',2),(46,'가사와 멜로디 중 어떤 쪽을 더 중요시 여기나요?',2),(47,'좋아하는 음악 계속 듣기 vs 새로운 음악 알아가기',2),(48,'당신의 롤 티어가 뭔가요?',3),(49,'좋아하는 유튜버는 누구인가요?',3),(50,'응원하는 LCK 팀은 어디인가요?',3),(51,'어렸을 때 오락실 게임 해본 적 있어요?',3),(52,'당신의 인생 게임은?',3),(53,'어떤 종류의 게임을 즐기시나요? (콘솔or온라인or보드게임)',3),(54,'혼자 게임하기 vs 지인, 친구들과 함께 하기',3),(55,'피씨방에서 게임하기 vs 집에서 게임하기 (장비는 같다고 가정)',3),(56,'자신의 인생영화를 말해봅시다',4),(57,'최근 핫한 연예계 이슈는 무엇이 있나요?',4),(58,'좋았던 공연이 있다면 이야기해주세요',4),(59,'최근 읽었던 책 중에 기억에 남는 것이 있나요?',4),(60,'좋아하는 식당 혹은 카페에 대해서 소개해주세요',4),(61,'마지막으로 본 영화는 무엇인가요',4),(62,'가장 최근에 간 콘서트나 뮤지컬은 무엇인가요?',4),(63,'지막으로 혼자 노래 불러본 적은 언제인가요? 누군가에게 불러준 적은?',4),(64,'생중계를 해주는 공연이 있다고 할 때, 공연을 맨 뒷자리에서라도 본다 vs 집에서 편안하게 본다',4),(65,'불편한 사람과 좋아하는 공연 보기 vs 좋아하는 사람과 재미없는 공연 보기',4),(66,'영화관에서 영화 보기 vs 집에서 영화 보기',4),(67,'전시 보기 vs 체험관 가기',4),(68,'도서관에서 책 빌려 읽기 vs 서점에서 사서 읽기',4),(69,'관심있는 주식종목이 있나요?',5),(70,'어린 시절에 당신은 어땠나요? 이야기해주세요',5),(71,'키우고 있는 동물에 대해서 얘기해주세요. 없다면 좋아하는 동물은 무엇인가요?',5),(72,'좋아하는 요리, 혹은 자주 해먹는 요리가 있나요? 이야기해주세요',5),(73,'최근 있었던 흥미로운 일에 대해서 이야기해주세요',5),(74,'당신이 살고 지역은 어디이고 어떤 곳인가요?',5),(75,'당신의 최애 화장품은?',5),(76,'당신의 최애 맥주를 추천해주세요',5);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-11 13:54:54
