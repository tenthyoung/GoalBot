DROP DATABASE IF EXISTS goalBotDB;
CREATE database goalBotDB;

USE goalBotDB;

CREATE TABLE user (
user_id INT NOT NULL AUTO_INCREMENT,
userName VARCHAR(100) NOT NULL,
password VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
Avatar  LONGBLOB NOT NULL, 
PRIMARY KEY (user_id)
);



CREATE TABLE goal(
   goal_id int not null auto_increment primary key,
   createDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   endDate datetime NOT NULL,
   ms1 varchar(355) not null,
   ms2 varchar(355) not null,
   ms3 varchar(355) not null,
   ms4 varchar(355) not null,
   ms5 varchar(355) not null,
   user_id int not null,
   FOREIGN KEY fk_user(user_id)
   REFERENCES user(user_id)
   ON UPDATE CASCADE
   ON DELETE RESTRICT
)ENGINE=InnoDB;