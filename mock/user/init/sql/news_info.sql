CREATE TABLE   IF NOT EXISTS  `news_info` (
  `news_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `imageurls` varchar(255) DEFAULT NULL,
  `site` varchar(20) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `modified_time` varchar(20) DEFAULT NULL,
  `like` int(255) DEFAULT NULL,
  `abs` varchar(20) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `comments_id` varchar(255) DEFAULT NULL,
  `category_id` int(255) DEFAULT NULL,
  PRIMARY KEY (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `news_info` set title='zhangrui', url='www.baidu.com', site='123456';
