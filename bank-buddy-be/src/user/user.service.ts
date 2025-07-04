import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

type StaticUser = {
  id: string;
  username: string;
  password: string;
  email: string;
  type: string;
};

@Injectable()
export class UserService {
  // constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private users: StaticUser[] = [];

  create(createUserDto: CreateUserDto) {
    // return this.userModel.create(createUserDto);
    const user: StaticUser = {
      id: Math.random().toString(36).substring(2, 10),
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email,
      type: createUserDto.type || 'member',
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    // return this.userModel.find();
     return this.users.map(({ password, ...rest }) => rest);
  }

  findOne(id: string) {
    // return this.userModel.findById(id);
  const user = this.users.find(u => u.id === id);
  if (!user) throw new NotFoundException('User not found');

  const { password, ...rest } = user;
  return rest;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    // if (!updated) throw new NotFoundException('User not found');
    // return updated;
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
    };

    return this.users[index];
  }

  async delete(id: string) {
    // const deleted = await this.userModel.findByIdAndDelete(id);
    // if (!deleted) throw new NotFoundException('User not found');
    // return deleted;
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');

    const deleted = this.users[index];
    this.users.splice(index, 1);
    return deleted;
  }
}
