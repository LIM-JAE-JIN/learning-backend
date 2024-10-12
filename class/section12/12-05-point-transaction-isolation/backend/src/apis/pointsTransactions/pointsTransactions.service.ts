import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import {
  IPointsTransactionsServiceCheckDuplication,
  IPointsTransactionsServiceCreate,
  IPointsTransactionsServiceFindOneImpUid,
} from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/user.entity';
import { IamportService } from '../iamport/iamport.service';
@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly iamportService: IamportService,
  ) {}

  findOneByImpUid({
    impUid,
  }: IPointsTransactionsServiceFindOneImpUid): Promise<PointTransaction> {
    return this.pointsTransactionsRepository.findOne({ where: { impUid } });
  }

  async checkDuplication({
    impUid,
  }: IPointsTransactionsServiceCheckDuplication): Promise<void> {
    const result = await this.findOneByImpUid({ impUid });
    if (result) throw new ConflictException('이미 등록된 결제 아이디입니다.');
  }

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction | void> {
    // 결제완료 상태인지 검증
    await this.iamportService.checkPaid({ impUid, amount });

    // 이미 결제됐던 id인지 검증
    this.checkDuplication({ impUid });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // 1, PointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointsTransactionsRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      // 2. 유저의 돈 찾아서 업데이트 하기 -> 숫자일 때 가능 => 숫자가 아니면 (ex, 좌석 등) 직접 lock(service2 참고)
      const id = _user.id;
      await queryRunner.manager.increment(User, { id }, 'point', amount);

      await queryRunner.commitTransaction();

      // 3. 최종결과 브라우저에 돌려주기
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
    } finally {
      // release가 없으면, commit 또는 rollback 후 connection이 끊기지 않아 과부화 (에러 시 자동 끊김)
      await queryRunner.release();
    }
  }
}
