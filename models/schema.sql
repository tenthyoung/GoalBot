DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;


### Schema
CREATE DATABASE BrainFood_db;
USE BrainFood_db;

CREATE TABLE quotes
(
	id int NOT NULL AUTO_INCREMENT,
	author varchar(255) NOT NULL,
	quote TEXT NOT NULL,
	PRIMARY KEY (id)
);

USE BrainFood_db;
CREATE TABLE avatar
(
	id int NOT NULL AUTO_INCREMENT,
	avatarName  varchar(255) NOT NULL,
    points varchar(255) Not Null, 
	avatarImage blob not null,
	PRIMARY KEY (id)
);

select * from avatar;
