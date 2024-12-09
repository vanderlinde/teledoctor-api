import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AdminDoctorsService } from './admin-doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UserRoles } from 'src/auth/roles/roles';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Roles(UserRoles.Admin)
@UseGuards(AuthGuard, RolesGuard)
@Controller('admin/doctors')
export class AdminDoctorsController {
  constructor(private readonly AdminDoctorsService: AdminDoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.AdminDoctorsService.create(createDoctorDto);
  }

  @Get()
  findAll() {
    return this.AdminDoctorsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.AdminDoctorsService.findOne(id);
  // }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.AdminDoctorsService.findOne(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.AdminDoctorsService.update(id, updateDoctorDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.AdminDoctorsService.remove(id);
  }
}
