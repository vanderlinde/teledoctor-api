export class DoctorSlugAlreadyExistsError extends Error {
  constructor(slug: string) {
    super(`Slug ${slug} already exists in doctors collection.`);
    this.name = 'DoctorSlugAlreadyExistsError';
  }
}
