import { Test, TestingModule } from '@nestjs/testing';
import { FindAllTransactionsController } from './find-all-transactions.controller';

describe('FindAllTransactionsController', () => {
  let controller: FindAllTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindAllTransactionsController],
    }).compile();

    controller = module.get<FindAllTransactionsController>(FindAllTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
