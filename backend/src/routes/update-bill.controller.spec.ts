import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBillController } from './update-bill.controller';

describe('UpdateBillController', () => {
  let controller: UpdateBillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateBillController],
    }).compile();

    controller = module.get<UpdateBillController>(UpdateBillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
