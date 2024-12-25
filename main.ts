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
import { RedisStore } from 'connect-redis';
import { MenuService } from './src/menu/services';
import { Menu } from './src/menu/controller';
import { Monitor } from './src/monitor/controller';
import { MonitorService } from './src/monitor/services';

// 创建 Redis 客户端
const redisClient = new Redis()

const container = new Container();

const prisma = new PrismaClient();

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

/* 
 系统监控模块
*/

container.bind(Monitor).to(Monitor)
container.bind(MonitorService).to(MonitorService)

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

    // 中间件记录请求和响应日志
    app.use(async (req, res, next) => {
        const start = Date.now();  // 请求开始时间

        // 临时存储响应数据
        let responseData = '';

        // 保存原始响应的 `send` 方法
        const originalSend = res.send;
        res.send = function (data: any) {
            responseData = data;  // 捕获响应内容
            res.send = originalSend;  // 恢复 `send` 方法
            return res.send(data);  // 继续执行原始的 send
        };

        // 继续执行后续中间件和路由
        await next();

        // 计算请求耗时
        const duration = Date.now() - start;
        
        if (req.originalUrl !=='/user/login') {

            // 插入日志记录到数据库
            await prisma.log.create({
                data: {
                    method: req.method,
                    endpoint: req.originalUrl,
                    requestBody: JSON.stringify(req.body),  // 请求体
                    response: responseData,  // 响应内容
                }
            });
            
        }

        console.log(`Logged request to ${req.originalUrl}, method: ${req.method}, duration: ${duration}ms`);
    });

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