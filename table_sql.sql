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
