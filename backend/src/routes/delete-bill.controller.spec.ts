import { Test, TestingModule } from '@nestjs/testing';
import { DeleteBillController } from './delete-bill.controller';

describe('DeleteBillController', () => {
  let controller: DeleteBillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteBillController],
    }).compile();

    controller = module.get<DeleteBillController>(DeleteBillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
