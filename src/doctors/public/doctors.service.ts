import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors';

@Injectable()
export class DoctorsService {
  constructor(private prismaService: PrismaService) {}
  findAll(dto: { name?: string; page?: number; limit?: number }) {
    const { name, page = 1, limit = 15 } = dto;
    return this.prismaService.doctor.findMany({
      ...(name && {
        where: {
          name: {
            contains: name,
          },
        },
      }),
      skip: (page - 1) * limit,
      take: limit,
    });
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
}
