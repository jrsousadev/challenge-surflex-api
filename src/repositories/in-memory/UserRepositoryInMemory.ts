import { v4 as uuidv4 } from "uuid";
import { cryptedPassword } from "../../services/password/cryptedPassword";

interface IUser {
  id: string;
  name: string;
  password: string;
  created_at: Date;
}

interface ICreateUser {
  name: string;
  password: string;
}

interface IGetUser {
  id?: string;
  name?: string;
}

export class UserRepositoryInMemory {
  users: IUser[] = [];

  async create({ name, password }: ICreateUser) {
    const userCreated = {
      id: uuidv4(),
      name,
      password: await cryptedPassword(password),
      created_at: new Date(),
    };

    this.users.push(userCreated);

    return userCreated;
  }

  async getOne({ id, name }: IGetUser) {
    if (id) {
      const user = this.users.find((user) => String(user.id) === String(id));
      return user ?? null;
    }

    const user = this.users.find((user) => user.name === name);
    return user ?? null;
  }
}
