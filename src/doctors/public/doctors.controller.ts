import { Controller, Get, Param, Query } from '@nestjs/common';
import { DoctorQueryDto } from './dto/doctor-query.dto';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll(@Query() queryDto: DoctorQueryDto) {
    return this.doctorsService.findAll(queryDto);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.doctorsService.findOne(slug);
  }
}
