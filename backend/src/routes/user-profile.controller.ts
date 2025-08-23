import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserProfileService } from 'src/functions/user-profile.service';
import { ApiResponse } from 'src/models/api-response.model';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtGuard } from 'src/utils/jwt/jwt.guard';

@Controller('v1/user/profile')
export class UserProfileController {
  constructor(private readonly service: UserProfileService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async profile(@User('id') user_id: number | string): Promise<ApiResponse> {
    return this.service.execute(user_id);
  }
}
