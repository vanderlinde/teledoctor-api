import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorSlugAlreadyExistsError } from '../erros';
import { NotFoundError } from 'src/common/errors';

@Injectable()
export class AdminDoctorsService {
  constructor(private prismaService: PrismaService) {}
  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.prismaService.doctor.findFirst({
      where: { slug: createDoctorDto.slug },
    });
    if (doctor) {
      throw new DoctorSlugAlreadyExistsError(createDoctorDto.slug);
    }
    return this.prismaService.doctor.create({
      data: createDoctorDto,
    });
  }

  findAll() {
    return this.prismaService.doctor.findMany();
  }

  async findOne(slug: string) {
    const doctor = await this.prismaService.doctor.findFirst({
      where: {
        slug,
      },
    });

    if (!doctor) {
      throw new NotFoundError('doctor', slug, 'slug');
    }

    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    let doctor = await this.prismaService.doctor.findFirst({
      where: {
        slug: updateDoctorDto.slug,
      },
    });

    if (doctor && doctor.id !== id) {
      throw new DoctorSlugAlreadyExistsError(updateDoctorDto.slug);
    }

    doctor =
      doctor && doctor.id === id
        ? doctor
        : await this.prismaService.doctor.findFirst({
            where: {
              id,
            },
          });

    if (!doctor) {
      throw new NotFoundError('doctor', id);
    }

    return this.prismaService.doctor.update({
      where: {
        id,
      },
      data: updateDoctorDto,
    });
  }

  async remove(id: string) {
    const doctor = await this.prismaService.doctor.findFirst({
      where: {
        id,
      },
    });

    if (!doctor) {
      throw new NotFoundError('doctor', id);
    }

    return this.prismaService.doctor.delete({
      where: {
        id,
      },
    });
  }
}
