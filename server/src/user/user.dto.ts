import { IsNotEmpty, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class UserDto {
    // @Transform(user => {
    //     console.log('user', user);
    //     user.value.trim()})
    @IsString()
    @IsNotEmpty({message:'账号不能为空'})
    user_name: string;

    @IsString()
    @IsNotEmpty({message:'密码不能为空'})
    password: string;
}

export class LoginUserDto {
    @IsString()
    @IsNotEmpty({message:'账号不能为空'})
    user_name: string;

    @IsString()
    @IsNotEmpty({message:'密码不能为空'})
    password: string;

    @IsString()
    @IsNotEmpty({message:'角色不能为空'})
    roleId: Number;

}