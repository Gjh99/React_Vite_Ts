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

const container = new Container();
/**
 * jwt模块
 * 
 */

container.bind(JWT).to(JWT)

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

/* 
 工具箱模块
*/

container.bind(ToolBox).to(ToolBox)
container.bind(ToolBoxService).to(ToolBoxService)

/**
 * prisma依赖注入
 */
container.bind<PrismaClient>('PrismaClient').toFactory(()=>{
    return () =>{
        return new PrismaClient()
    }
})
container.bind(PrismaDB).toSelf()


const server = new InversifyExpressServer(container);
server.setConfig((app) =>{
    //解析json数据
    app.use(express.json())
})

const app = server.build();

app.listen(3000, ()=>{
    console.log("服务端口3000启动");
})