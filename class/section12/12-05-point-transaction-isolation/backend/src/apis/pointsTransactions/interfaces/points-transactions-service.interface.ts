import { IAuthUser } from 'src/commons/interfaces/context';

export interface IPointsTransactionsServiceFindOneImpUid {
  impUid: string;
}

export interface IPointsTransactionsServiceCheckDuplication {
  impUid: string;
}

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}
