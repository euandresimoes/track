import { Module } from '@nestjs/common';
import { CreateBillService } from '../create-bill.service';
import { CreateBillController } from 'src/routes/create-bill.controller';
import { DeleteBillService } from '../delete-bill.service';
import { DeleteBillController } from 'src/routes/delete-bill.controller';
import { FindAllBillsService } from '../find-all-bills.service';
import { FindAllBillsController } from 'src/routes/find-all-bills.controller';
import { UpdateBillController } from 'src/routes/update-bill.controller';
import { UpdateBillService } from '../update-bill.service';

@Module({
  providers: [
    CreateBillService,
    DeleteBillService,
    FindAllBillsService,
    UpdateBillService,
  ],
  controllers: [
    CreateBillController,
    DeleteBillController,
    FindAllBillsController,
    UpdateBillController,
  ],
})
export class BillModule {}
