-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` varchar(50) NOT NULL COMMENT '用户id(主键)',
  `user_name` varchar(255) NOT NULL COMMENT '用户名',
  `user_type` int(2) NOT NULL DEFAULT '1' COMMENT '用户类型(1-普通用户, 2-管理员)',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `access_token` varchar(255) DEFAULT '' COMMENT '访问接口使用的token',
  `refresh_token` varchar(255) DEFAULT '' COMMENT 'access_token过期后用于刷续期的token',
  `salt` varchar(255) NOT NULL COMMENT '盐值',
  `cleartext_password` varchar(255) NOT NULL COMMENT '明文密码',
  `email` varchar(255) DEFAULT '' COMMENT '用户邮箱',
  `avatar` varchar(255) DEFAULT '' COMMENT '用户头像',
  `signature` longtext COMMENT '个性签名',
  `login_time` int(2) DEFAULT '0' COMMENT '用户登录错误次数',
  `allow_login_date` datetime COMMENT '允许登录时间',
  `last_login_date` datetime DEFAULT NULL COMMENT '最后登录时间',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `status` int(1) NOT NULL COMMENT '账号状态(0为正常，默认0)',
  PRIMARY KEY (`user_id`) USING BTREE,
  KEY `user_name` (`user_name`,`password`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for sys_class
-- ----------------------------
DROP TABLE IF EXISTS `sys_class`;
CREATE TABLE `sys_class` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id(主键)',
  `class_code` varchar(255) NOT NULL DEFAULT '' COMMENT '分类编号',
  `class_name` varchar(255) NOT NULL COMMENT '分类名称',
  `class_type` int(4) DEFAULT '0' COMMENT '分类类型',
  `class_desc` longtext COMMENT '分类描述',
  `create_date` datetime NOT NULL COMMENT '创建日期',
  PRIMARY KEY (`class_id`) USING BTREE,
  KEY `class_code` (`class_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for sys_tag
-- ----------------------------
DROP TABLE IF EXISTS `sys_tag`;
CREATE TABLE `sys_tag` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标签id(主键)',
  `tag_code` varchar(255) NOT NULL DEFAULT '' COMMENT '标签编号',
  `tag_name` varchar(255) NOT NULL COMMENT '标签名称',
  `class_type` int(11) NOT NULL COMMENT '标签所属分类(分类id)',
  `tag_desc` longtext COMMENT '标签描述',
  `create_date` datetime NOT NULL COMMENT '创建日期',
  PRIMARY KEY (`tag_id`) USING BTREE,
  KEY `tag_code` (`tag_code`) USING BTREE,
  KEY `class_type` (`class_type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `article_id` varchar(50) NOT NULL COMMENT '主键id',
  `article_title` varchar(255) NOT NULL COMMENT '文章标题',
  `article_subtitle` varchar(255) DEFAULT NULL COMMENT '文章副标题',
  `article_keyword` varchar(255) DEFAULT NULL COMMENT '文章关键词',
  `article_info` longtext COMMENT '文章简介',
  `article_content` longtext COMMENT '文章内容',
  `article_cover` varchar(255) DEFAULT NULL COMMENT '文章封面',
  `class_type` varchar(255) DEFAULT NULL COMMENT '所属分类',
  `tag_type` varchar(255) NOT NULL COMMENT '所属标签',
  `is_publish` int(1) NOT NULL DEFAULT '0' COMMENT '是否发布(0-未发布,1-已发布)',
  `hits` int(11) DEFAULT '0' COMMENT '点击数',
  `discuss_num` int(11) DEFAULT '0' COMMENT '评论数',
  `create_user` varchar(50) NOT NULL COMMENT '创建人id',
  `create_username` varchar(255) NOT NULL COMMENT '创建人用户名',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `create_date` datetime NOT NULL COMMENT '创建日期日期',
  `is_delete` int(1) DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  PRIMARY KEY (`article_id`) USING BTREE,
  KEY `create_user` (`create_user`) USING BTREE,
  KEY `is_publish` (`is_publish`) USING BTREE,
  KEY `class_type` (`class_type`) USING BTREE,
  KEY `tag_type` (`tag_type`) USING BTREE,
  KEY `index_query` (`article_title`,`article_keyword`,`article_subtitle`) USING BTREE,
  KEY `article_keyword` (`article_keyword`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(255) NOT NULL COMMENT '用户名',
  `article_id` varchar(50) NOT NULL COMMENT '评论文章id',
  `parent_comment_id` int(11) DEFAULT NULL COMMENT '父级评论id',
  `parent_comment_user_name` varchar(255) DEFAULT '' COMMENT '父级评论用户名',
  `reply_comment_id` int(11) DEFAULT NULL COMMENT '被回复的评论id',
  `reply_comment_user_name` varchar(255) DEFAULT '' COMMENT '被回复的评论用户名',
  `comment_level` tinyint(4) NOT NULL DEFAULT '1' COMMENT '评论等级[ 1 一级评论 默认 ，2 二级评论]',
  `content` longtext COMMENT '评论的内容',
  `praise_num` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态(1-有效,2-未生效)',
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '是否删除(0-未删除,1-已删除)',
  `create_date` datetime NOT NULL COMMENT '创建日期',
  PRIMARY KEY (`comment_id`) USING BTREE,
  KEY `idx_article_id` (`article_id`) USING BTREE,
  KEY `idx_create_date` (`create_date`),
  KEY `idx_is_delete` (`is_delete`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE,
  KEY `index_query` (`article_id`,`is_delete`,`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='文章评论表';
