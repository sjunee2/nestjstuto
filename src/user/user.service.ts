import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    users: string[] = ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10']

    getUsers(): string[] {
        return this.users;
    }

    async addUser(name: string): Promise<string[]> {
        if (!this.users.includes(name)) {
            await this.users.push(name)
        }
        return this.users;
    }

    async deleteUser(name: string): Promise<string[]> {
        if (this.users.includes(name)) {
            await this.users.splice(this.users.indexOf(name), 1)
        }
        return this.users;
    }

    getUserName(index: number): string {
        return this.users[index];
    }
}
