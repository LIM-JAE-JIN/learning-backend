import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTransactionsService } from './pointsTransactions.service';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class PointsTransactionsResolver {
  constructor(
    private readonly pointsTransactionsService: PointsTransactionsService,
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ): Promise<PointTransaction | void> {
    const user = context.req.user;
    return this.pointsTransactionsService.createForPayment({
      impUid,
      amount,
      user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => PointTransaction)
  cancelPointTransaction(
    @Args('impUid') impUid: string,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    this.pointsTransactionsService.cancel({ impUid, user });
  }
}
