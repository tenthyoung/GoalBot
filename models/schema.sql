CREATE DATABASE goalBotDB;
use goalBotDB;

create table user(
    id int not null auto_increment,
    userName varCHAR(100) not null,
    pwd VARCHAR(100) not null,
    avatar LONGBLOB,
    primary key(id)
)