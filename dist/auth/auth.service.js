"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        const salt = await bcrypt.genSalt(saltOrRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    async generateToken(payload) {
        const access_token = await this.jwtService.signAsync(payload);
        return access_token;
    }
    async register(registerUserDto) {
        const checkUser = await this.usersRepository.findOne({ where: { email: registerUserDto.email } });
        if (checkUser) {
            throw new common_1.HttpException("user already exists", common_1.HttpStatus.CONFLICT);
        }
        const newPassword = await this.hashPassword(registerUserDto.password);
        return await this.usersRepository.save({ ...registerUserDto, password: newPassword });
    }
    async login(loginUserDto) {
        const user = await this.usersRepository.findOne({
            where: { email: loginUserDto.email }
        });
        if (!user) {
            throw new common_1.HttpException("User or password is incorrect", common_1.HttpStatus.UNAUTHORIZED);
        }
        ;
        const checkPassword = bcrypt.compareSync(loginUserDto.password, user.password);
        if (!checkPassword) {
            throw new common_1.HttpException("User or password is incorrect", common_1.HttpStatus.UNAUTHORIZED);
        }
        ;
        const payload = { id: user.id, email: user.email, role: user.role };
        return this.generateToken(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map