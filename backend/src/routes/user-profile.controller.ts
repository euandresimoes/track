import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/models/api-response.model';
import { UserProfileService } from 'src/services/user-profile.service';
import { User } from 'src/utils/decorators/user.decorator';
import { JwtGuard } from 'src/utils/jwt/jwt.guard';

@Controller('v1/user/profile')
@ApiTags('User')
export class UserProfileController {
  constructor(private readonly service: UserProfileService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('access-token')
  async profile(@User('id') userId: number | string): Promise<ApiResponse> {
    return this.service.execute(userId);
  }
}
