import { Test, TestingModule } from '@nestjs/testing';
import { FindAllBillsController } from './find-all-bills.controller';

describe('FindAllBillsController', () => {
  let controller: FindAllBillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindAllBillsController],
    }).compile();

    controller = module.get<FindAllBillsController>(FindAllBillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
