import { Module, OnModuleInit } from '@nestjs/common';
import { AdminDoctorsService } from './admin/admin-doctors.service';
import { AdminDoctorsController } from './admin/admin-doctors.controller';
import { DoctorsController } from './public/doctors.controller';
import { DoctorsService } from './public/doctors.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AdminDoctorsController, DoctorsController],
  providers: [AdminDoctorsService, DoctorsService],
})
export class DoctorsModule implements OnModuleInit {
  constructor(
    private prismaService: PrismaService,
    private adminDoctorsService: AdminDoctorsService,
  ) {}
  async onModuleInit() {
    const doctors = new Array(10).fill(0).map((_, index) => index + 1);

    await this.prismaService.doctor.deleteMany();

    for (const doctorIndex of doctors) {
      await this.adminDoctorsService.create({
        name: `Dr. Doctor ${doctorIndex}`,
        slug: `dr-doctor-${doctorIndex}`,
        position: `Pediatra ${doctorIndex}`,
        about: `Description for Dr. Doctor ${doctorIndex} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        phone: '(66) 99999-9999',
        image: 'https://avatars.githubusercontent.com/u/66015748?v=4',
      });
    }
  }
}
