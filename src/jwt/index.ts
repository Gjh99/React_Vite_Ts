import { injectable } from "inversify";
import jsonwebtoken from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
@injectable()

export class JWT {
    private secret = 'react+ts+ant&*@#$%^&*&node_server'
    private jwtOption = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.secret,
    }

    /* 
        初始化
    */
    public JwtStrategy() {
        const strategy = new Strategy(this.jwtOption,
            (payload, done) => {
                done(null, payload)
            }
        );
        passport.use(strategy)
    }

    /**
     * @returns Passport 中间件
     * 
     */
    public static middleware() {
        return passport.authenticate('jwt', { session: false })
    }

    /**
     * 创建token
     * 
     */
    public createToken(data: object) {
        return jsonwebtoken.sign(data, this.secret, { expiresIn: '7d' }) //设置过期时间
    }

    /**
     * 集成到express
     */
    public init() {
        return passport.initialize();
    }

}