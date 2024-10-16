import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import {
  IPointsTransactionsServiceCancel,
  IPointsTransactionsServiceCheckAlreadyCanceled,
  IPointsTransactionsServiceCheckCancelablePoint,
  IPointsTransactionsServiceCheckDuplication,
  IPointsTransactionsServiceCreate,
  IPointsTransactionsServiceCreateForPayment,
  IPointsTransactionsServiceFindByImpUidAndUser,
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
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // 1, PointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status,
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

  async createForPayment({
    impUid,
    amount,
    user,
  }: IPointsTransactionsServiceCreateForPayment): Promise<PointTransaction | void> {
    // 결제완료 상태인지 검증
    await this.iamportService.checkPaid({ impUid, amount });

    // 이미 결제됐던 id인지 검증
    this.checkDuplication({ impUid });

    return this.create({ impUid, amount, user });
  }

  findByImpUidandUser({
    impUid,
    user,
  }: IPointsTransactionsServiceFindByImpUidAndUser): Promise<
    PointTransaction[]
  > {
    return this.pointsTransactionsRepository.find({
      where: { impUid, user: { id: user.id } },
      relations: ['user'],
    });
  }

  checkAlreadyCanceled({
    pointTransactions,
  }: IPointsTransactionsServiceCheckAlreadyCanceled): void {
    const canceledPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    );
    if (canceledPointTransactions.length)
      throw new ConflictException('이미 취소된 결제입니다.');
  }

  checkHasCancelablePoint({
    pointTransactions,
  }: IPointsTransactionsServiceCheckCancelablePoint): void {
    const paidPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    );
    if (!paidPointTransactions.length)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');
    const userPoint = paidPointTransactions[0].user.point;
    const amount = paidPointTransactions[0].amount;
    if (amount > userPoint)
      throw new UnprocessableEntityException('보유하신 포인트가 부족합니다.');
  }

  async cancel({
    impUid,
    user,
  }: IPointsTransactionsServiceCancel): Promise<PointTransaction> {
    const pointTransactions = await this.findByImpUidandUser({ impUid, user }); // 결제내역 조회
    this.checkAlreadyCanceled({ pointTransactions }); // 이미 취소된 id인지 검증
    this.checkHasCancelablePoint({ pointTransactions }); // 포인트가 취소하기에 충분히 있는지 검증

    // 결제 취소
    const canceledAmount = await this.iamportService.cancel({ impUid });

    // 취소된 결과 등록
    return this.create({
      impUid,
      amount: -canceledAmount,
      user,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
  }
}
