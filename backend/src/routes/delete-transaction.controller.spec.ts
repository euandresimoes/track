import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTransactionController } from './delete-transaction.controller';

describe('DeleteTransactionController', () => {
  let controller: DeleteTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteTransactionController],
    }).compile();

    controller = module.get<DeleteTransactionController>(
      DeleteTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
