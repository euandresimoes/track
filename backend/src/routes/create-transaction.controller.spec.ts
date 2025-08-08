import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionController } from './create-transaction.controller';

describe('CreateTransactionController', () => {
  let controller: CreateTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateTransactionController],
    }).compile();

    controller = module.get<CreateTransactionController>(
      CreateTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
