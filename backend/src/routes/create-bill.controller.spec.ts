import { Test, TestingModule } from '@nestjs/testing';
import { CreateBillController } from './create-bill.controller';

describe('CreateBillController', () => {
  let controller: CreateBillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateBillController],
    }).compile();

    controller = module.get<CreateBillController>(CreateBillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
