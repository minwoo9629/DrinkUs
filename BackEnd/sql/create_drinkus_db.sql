DROP DATABASE IF EXISTS drinkus;
CREATE DATABASE drinkus;
use drinkus;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`user_no`	bigint	NOT NULL	COMMENT '회원 번호',
	`user_email`	varchar(50)	NOT NULL	COMMENT '회원 이메일',
	`user_pw`	varchar(255)	NOT NULL	COMMENT '회원 비밀번호',
	`user_name`	varchar(20)	NOT NULL	COMMENT '회원 이름',
	`user_nickname`	varchar(40)	NOT NULL	COMMENT '회원 닉네임',
	`user_popularity`	int	NOT NULL	DEFAULT 0	COMMENT '회원 인기도',
	`user_popularity_limit`	int	NOT NULL	DEFAULT 5	COMMENT '하루 인기도 횟수 제한',
	`user_birthday`	DATE	NOT NULL	COMMENT '회원 생년월일',
	`created_date`	DATETIME	NULL	COMMENT '회원 가입일',
	`user_delete_date`	DATETIME	NULL	COMMENT '회원 탈퇴일',
	`user_deleted`	tinyint	NOT NULL	DEFAULT 0	COMMENT '회원 탈퇴 여부',
	`user_role`	varchar(40)	NOT NULL	DEFAULT 'BASIC'	COMMENT '회원 역할',
	`user_img`	varchar(255)	NULL	COMMENT '회원 프로필 이미지',
	`user_provider`	varchar(40)	NULL	COMMENT '회원 프로바이더',
	`user_provider_id`	varchar(255)	NULL	COMMENT '회원 프로바이더 아이디',
	`user_point`	bigint	NOT NULL	DEFAULT 0	COMMENT '회원 포인트'
);

DROP TABLE IF EXISTS `drink_limit`;

CREATE TABLE `drink_limit` (
	`drink_no`	bigint	NOT NULL	COMMENT '주량 번호',
	`user_no`	bigint	NOT NULL	COMMENT '회원 번호',
	`drink_name`	varchar(20)	NOT NULL	COMMENT '주류명',
	`drink_amount`	int	NOT NULL	COMMENT '주량'
);

DROP TABLE IF EXISTS `interest`;

CREATE TABLE `interest` (
	`interest_no`	bigint	NOT NULL	COMMENT '관심사 번호',
	`user_no`	bigint	NOT NULL	COMMENT '유저',
	`interest_type`	varchar(10)	NOT NULL	COMMENT '관심사 종류'
);

DROP TABLE IF EXISTS `board`;

CREATE TABLE `board` (
	`board_no`	bigint	NOT NULL	COMMENT '글번호',
	`creater_no`	bigint	NOT NULL	COMMENT '작성자',
	`modifier_no`	bigint	NOT NULL	COMMENT '수정자',
	`created_date`	DATETIME	NULL	COMMENT '작성일',
	`modified_date`	DATETIME	NULL	COMMENT '수정일',
	`board_title`	varchar(50)	NOT NULL	COMMENT '제목',
	`board_content`	text	NOT NULL	COMMENT '내용',
	`board_header`	varchar(20)	NOT NULL	COMMENT '말머리'
);

DROP TABLE IF EXISTS `board_calendar`;

CREATE TABLE `board_calendar` (
	`calendar_no`	bigint	NOT NULL	COMMENT '일정게시판 번호',
	`user_no`	bigint	NOT NULL	COMMENT '등록자 번호',
	`calendar_modifier_no`	bigint	NOT NULL	COMMENT '수정자 번호',
	`created_date`	DATETIME	NULL	COMMENT '등록일자',
	`modified_date`	DATETIME	NULL	COMMENT '수정일자',
	`calendar_title`	varchar(40)	NOT NULL	COMMENT '제목',
	`calendar_content`	text	NOT NULL	COMMENT '내용',
	`calendar_datetime`	DATETIME	NOT NULL	COMMENT '예약일자'
);

DROP TABLE IF EXISTS `comment_calendar`;

CREATE TABLE `comment_calendar` (
	`comment_calendar_no`	bigint	NOT NULL	COMMENT '댓글 번호',
	`calendar_no`	bigint	NOT NULL	COMMENT '일정게시판 번호',
	`comment_calendar_writer`	bigint	NOT NULL	COMMENT '댓글 등록자 번호',
	`comment_calendar_modifier`	bigint	NOT NULL	COMMENT '댓글 수정자 번호',
	`created_date`	DATETIME	NULL	COMMENT '댓글 등록일자',
	`modified_date`	DATETIME	NULL	COMMENT '댓글 수정일자',
	`comment_content`	varchar(200)	NOT NULL	COMMENT '댓글 내용'
);

DROP TABLE IF EXISTS `alarm`;

CREATE TABLE `alarm` (
	`alarm_no`	bigint	NOT NULL	COMMENT '알람 번호',
	`user_no`	bigint	NOT NULL	COMMENT '대상 유저',
	`alarm_content`	VARCHAR(200)	NOT NULL	COMMENT '알람 내용',
	`created_date`	DATETIME	NULL	COMMENT '알람 일시'
);

DROP TABLE IF EXISTS `user_calendar`;

CREATE TABLE `user_calendar` (
	`user_no`	bigint	NOT NULL	COMMENT '회원 번호',
	`calendar_no`	bigint	NOT NULL	COMMENT '일정게시판 번호'
);

DROP TABLE IF EXISTS `report_history`;

CREATE TABLE `report_history` (
	`report_no`	bigint	NOT NULL	COMMENT '신고기록 번호',
	`from_user_no`	bigint	NOT NULL	COMMENT '신고자',
	`to_user_no`	bigint	NOT NULL	COMMENT '신고대상',
	`report_reason`	varchar(300)	NULL	COMMENT '신고 사유',
	`created_date`	DATETIME	NULL	COMMENT '신고 일시',
	`report_completed`	tinyint	NOT NULL	DEFAULT 0	COMMENT '처리 여부',
	`report_result`	varchar(100)	NULL	COMMENT '처리 결과'
);

DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
	`room_no`	bigint	NOT NULL	COMMENT '방 번호',
	`room_admin`	bigint	NOT NULL	COMMENT '방장',
	`filter_place`	varchar(50)	NULL	COMMENT '장소',
	`filter_age_min`	int	NULL	COMMENT '최소나이',
	`filter_age_max`	int	NULL	COMMENT '최대나이',
	`room_pwd`	varchar(50)	NULL	COMMENT '비밀번호',
	`is_active`	tinyint	NOT NULL	DEFAULT true	COMMENT '활성화 여부',
	`created_date`	DATETIME	NULL	COMMENT '활성화 시간',
	`modified_date`	DATETIME	NULL	COMMENT '비활성화 시간'
);

DROP TABLE IF EXISTS `board_comment`;

CREATE TABLE `board_comment` (
	`comment_board_no`	bigint	NOT NULL	COMMENT '댓글 번호',
	`board_no`	bigint	NOT NULL	COMMENT '글번호',
	`creater_no`	bigint	NOT NULL	COMMENT '작성자',
	`modifier_no`	bigint	NOT NULL	COMMENT '수정자',
	`created_date`	DATETIME	NULL	COMMENT '작성일',
	`modified_date`	DATETIME	NULL	COMMENT '수정일',
	`comment_content`	varchar(100)	NOT NULL	COMMENT '댓글 내용'
);

DROP TABLE IF EXISTS `room_participant`;

CREATE TABLE `room_participant` (
	`room_no`	bigint	NOT NULL	COMMENT '방 번호',
	`user_no`	bigint	NOT NULL	COMMENT '회원 번호'
);

DROP TABLE IF EXISTS `room_history`;

CREATE TABLE `room_history` (
	`history_no`	bigint	NOT NULL	COMMENT '히스토리 번호',
	`user_no`	bigint	NOT NULL	COMMENT '회원 번호',
	`room_no`	bigint	NOT NULL	COMMENT '방 번호',
	`created_date`	DATETIME	NULL	COMMENT '참가 시간',
	`modified_date`	DATETIME	NULL	COMMENT '퇴장 시간'
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_no`
);

ALTER TABLE `drink_limit` ADD CONSTRAINT `PK_DRINK_LIMIT` PRIMARY KEY (
	`drink_no`
);

ALTER TABLE `interest` ADD CONSTRAINT `PK_INTEREST` PRIMARY KEY (
	`interest_no`
);

ALTER TABLE `board` ADD CONSTRAINT `PK_BOARD` PRIMARY KEY (
	`board_no`
);

ALTER TABLE `board_calendar` ADD CONSTRAINT `PK_BOARD_CALENDAR` PRIMARY KEY (
	`calendar_no`
);

ALTER TABLE `comment_calendar` ADD CONSTRAINT `PK_COMMENT_CALENDAR` PRIMARY KEY (
	`comment_calendar_no`
);

ALTER TABLE `alarm` ADD CONSTRAINT `PK_ALARM` PRIMARY KEY (
	`alarm_no`
);

ALTER TABLE `user_calendar` ADD CONSTRAINT `PK_USER_CALENDAR` PRIMARY KEY (
	`user_no`,
	`calendar_no`
);

ALTER TABLE `report_history` ADD CONSTRAINT `PK_REPORT_HISTORY` PRIMARY KEY (
	`report_no`
);

ALTER TABLE `room` ADD CONSTRAINT `PK_ROOM` PRIMARY KEY (
	`room_no`
);

ALTER TABLE `board_comment` ADD CONSTRAINT `PK_BOARD_COMMENT` PRIMARY KEY (
	`comment_board_no`
);

ALTER TABLE `room_participant` ADD CONSTRAINT `PK_ROOM_PARTICIPANT` PRIMARY KEY (
	`room_no`
);

ALTER TABLE `room_history` ADD CONSTRAINT `PK_ROOM_HISTORY` PRIMARY KEY (
	`history_no`
);

ALTER TABLE `drink_limit` ADD CONSTRAINT `FK_user_TO_drink_limit_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `interest` ADD CONSTRAINT `FK_user_TO_interest_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `board` ADD CONSTRAINT `FK_user_TO_board_1` FOREIGN KEY (
	`creater_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `board` ADD CONSTRAINT `FK_user_TO_board_2` FOREIGN KEY (
	`modifier_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `board_calendar` ADD CONSTRAINT `FK_user_TO_board_calendar_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `board_calendar` ADD CONSTRAINT `FK_user_TO_board_calendar_2` FOREIGN KEY (
	`calendar_modifier_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `comment_calendar` ADD CONSTRAINT `FK_board_calendar_TO_comment_calendar_1` FOREIGN KEY (
	`calendar_no`
)
REFERENCES `board_calendar` (
	`calendar_no`
);

ALTER TABLE `comment_calendar` ADD CONSTRAINT `FK_user_TO_comment_calendar_1` FOREIGN KEY (
	`comment_calendar_writer`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `comment_calendar` ADD CONSTRAINT `FK_user_TO_comment_calendar_2` FOREIGN KEY (
	`comment_calendar_modifier`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `alarm` ADD CONSTRAINT `FK_user_TO_alarm_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `user_calendar` ADD CONSTRAINT `FK_user_TO_user_calendar_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `user_calendar` ADD CONSTRAINT `FK_board_calendar_TO_user_calendar_1` FOREIGN KEY (
	`calendar_no`
)
REFERENCES `board_calendar` (
	`calendar_no`
);

ALTER TABLE `report_history` ADD CONSTRAINT `FK_user_TO_report_history_1` FOREIGN KEY (
	`from_user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `report_history` ADD CONSTRAINT `FK_user_TO_report_history_2` FOREIGN KEY (
	`to_user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `room` ADD CONSTRAINT `FK_user_TO_room_1` FOREIGN KEY (
	`room_admin`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `board_comment` ADD CONSTRAINT `FK_board_TO_board_comment_1` FOREIGN KEY (
	`board_no`
)
REFERENCES `board` (
	`board_no`
);

ALTER TABLE `board_comment` ADD CONSTRAINT `FK_user_TO_board_comment_1` FOREIGN KEY (
	`creater_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `board_comment` ADD CONSTRAINT `FK_user_TO_board_comment_2` FOREIGN KEY (
	`modifier_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `room_participant` ADD CONSTRAINT `FK_room_TO_room_participant_1` FOREIGN KEY (
	`room_no`
)
REFERENCES `room` (
	`room_no`
);

ALTER TABLE `room_participant` ADD CONSTRAINT `FK_user_TO_room_participant_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `room_history` ADD CONSTRAINT `FK_user_TO_room_history_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `room_history` ADD CONSTRAINT `FK_room_TO_room_history_1` FOREIGN KEY (
	`room_no`
)
REFERENCES `room` (
	`room_no`
);

