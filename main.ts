import 'reflect-metadata'; //装饰器基础
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import { User } from './src/user/controller';
import { UserService } from './src/user/services';
import express from "express";
import { PrismaClient } from '@prisma/client'
import { PrismaDB } from './src/db';
import { ToolBox } from './src/toolBox/controller';
import { ToolBoxService } from './src/toolBox/services';
import { JWT } from './src/jwt';
import { Role } from './src/role/controller';
import { RoleService } from './src/role/services';
import passport from "passport";
import { Dict } from './src/dict/controller';
import { DictService } from './src/dict/services';
import { Captcha } from './src/captcha/controller';
import { CaptchaService } from './src/captcha/services';
import session from 'express-session';
import Redis from 'ioredis';
import {RedisStore} from 'connect-redis';
import { MenuService } from './src/menu/services';
import { Menu } from './src/menu/controller';

 // 创建 Redis 客户端
const redisClient = new Redis()

const container = new Container();
/**
 * jwt模块
 * 
 */

container.bind(JWT).to(JWT)

/**
 * 验证码模块
 */
container.bind(Captcha).to(Captcha)
container.bind(CaptchaService).to(CaptchaService)


/* 
 user模块
*/
container.bind(User).to(User)
container.bind(UserService).to(UserService)

/* 
 role模块
*/
container.bind(Role).to(Role)
container.bind(RoleService).to(RoleService)

/**
 * menu模块
 */
container.bind(Menu).to(Menu)
container.bind(MenuService).to(MenuService)


/**
 * 字典模块
 */
container.bind(Dict).to(Dict)
container.bind(DictService).to(DictService)

/* 
 工具箱模块
*/

container.bind(ToolBox).to(ToolBox)
container.bind(ToolBoxService).to(ToolBoxService)

/**
 * prisma依赖注入
 */
container.bind<PrismaClient>('PrismaClient').toFactory(() => {
    return () => {
        return new PrismaClient()
    }
})
container.bind(PrismaDB).toSelf()

// 初始化JWT策略
const jwtService = container.get(JWT);
jwtService.JwtStrategy();  // 调用JwtStrategy注册JWT策略


const server = new InversifyExpressServer(container);
server.setConfig((app) => {
    //解析json数据
    app.use(express.json())

    // 初始化session 
    app.use(
        session({
        secret: 'node_service_123456', // 设置用于签名会话ID的密钥 
        resave: false, // 是否强制保存会话即使未修改 
        saveUninitialized: true, // 是否将未初始化的会话存储 
        cookie: { maxAge: 60000 }, // 会话有效期 
        store: new RedisStore({ client: redisClient }), 
    }));

    // 初始化passport
    app.use(passport.initialize());
})

const app = server.build();

app.listen(3000, () => {
    console.log("服务端口3000启动");
})