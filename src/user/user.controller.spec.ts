import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './data/user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true
        }),
        TypeOrmModule.forFeature([User])
      ],
      providers: [UserService],
      controllers: [UserController]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  it('deve criar um novo usuário', async () => {

    const user = {
      age: 25,
      name: 'Jackson',
      email: 'ja@gmail.com',
      password: 'lal'
    }

    const newUser = await controller.createUser(user)

    expect(newUser).toHaveProperty('id', 1)
    expect(newUser).toHaveProperty('name', 'Jackson')
    expect(newUser).toHaveProperty('age', 25)
    expect(newUser).toHaveProperty('email', 'ja@gmail.com')
    expect(newUser).toHaveProperty('password', 'lal')
  })

  // it('deve impedir cadastro de usuários com email duplicado', async () => {
    
  //   expect(async () => {
      
  //     await controller.createUser({
  //       age: 25,
  //       name: 'Luiz',
  //       email: 'ja@gmail.com',
  //       password: 'lal'
  //     })
  //     await controller.createUser({
  //       age: 25,
  //       name: 'Douglas',
  //       email: 'ja@gmail.com',
  //       password: 'lal'
  //     })
  //   }).toThrow(new QueryFailedError().message)
  // })

  it('deve listar os usuários do banco de dados', async () => {
    await controller.createUser({
      age: 25,
      name: 'Luiz',
      email: 'ja@gmail.com',
      password: 'lal'
    })
    await controller.createUser({
      age: 25,
      name: 'Douglas',
      email: 'ja2@gmail.com',
      password: 'lal'
    })

    const users = await controller.getUsers()

    expect(users).toHaveLength(2)
    expect(users).toEqual([
      {
        id: 1,
        age: 25,
        name: 'Luiz',
        email: 'ja@gmail.com',
      },
      {
        id: 2,
        age: 25,
        name: 'Douglas',
        email: 'ja2@gmail.com',
      }
    ])
  })
});
