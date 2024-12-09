import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { DoctorSlugAlreadyExistsError } from "../erros";

@Catch(DoctorSlugAlreadyExistsError)
export class DoctorSlugAlreadyExistsErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(409).json({
      statusCode: 409,
      message: exception.message,
    });
  }
}