import { Injectable } from '@nestjs/common';
import { AccountEntity } from '@src/modules/admin/system/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessEntity } from '@src/modules/admin/system/access/entities/access.entity';
import adminConfig from '@src/config/admin.config';

@Injectable()
export class InitDbService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,
  ) {}

  onModuleInit() {
    console.log('初始化数据库');
    this.initAccount();
    this.initAccess();
  }

  /**
   * @Author: 水痕
   * @Date: 2021-04-05 21:56:38
   * @LastEditors: 水痕
   * @Description: 初始化账号
   * @param {*}
   * @return {*}
   */
  private async initAccount(): Promise<void> {
    const username: string = adminConfig.defaultAccount;
    const password: string = adminConfig.defaultPassword;
    const isExist = await this.accountRepository.findOne({ where: { username } });
    if (!isExist) {
      const account = this.accountRepository.create({ username, password, isSuper: 1 });
      await this.accountRepository.save(account);
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2021-04-05 21:56:56
   * @LastEditors: 水痕
   * @Description: 初始化资源
   * @param {*}
   * @return {*}
   */
  private async initAccess(): Promise<void> {
    const accessList: Record<string, number | string>[] = [
      {
        moduleName: '시스템 관리',
        parentId: 0,
        url: 'system',
        type: 1,
        sort: 6,
      },
      {
        actionName: '계정 관리',
        url: 'system/account',
        parentId: '1',
        type: 2,
        sort: 3,
      },
      {
        actionName: '역할 관리',
        url: 'system/role',
        parentId: '1',
        type: 2,
        sort: 4,
      },
      {
        actionName: '리소스 관리',
        url: 'system/access',
        parentId: '1',
        type: 2,
        sort: 5,
      },
      {
        url: '/api/v1/admin/account',
        parentId: '2',
        type: 3,
        sort: 1,
        apiName: '계정 목록',
        method: 'GET',
      },
      {
        url: '/api/v1/admin/account',
        parentId: '2',
        type: 3,
        sort: 2,
        apiName: '계정 만들기',
        method: 'POST',
      },
      {
        url: '/api/v1/admin/account/*',
        parentId: '2',
        type: 3,
        sort: 3,
        apiName: 'ID로 계정 삭제',
        method: 'DELETE',
      },
      {
        url: '/api/v1/admin/account/*',
        parentId: '2',
        type: 3,
        sort: 4,
        apiName: 'ID에 따라 계정 수정',
        method: 'PATCH',
      },
    ];
    // 데이터가 존재하지 않으면 삽입
    const isExist = await this.accessRepository.count();
    if (!isExist) {
      // 일괄 삽입 데이터
      await this.accessRepository.insert(accessList);
    }
  }
}
