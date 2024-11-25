import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from 'src/db/prisma.service';

export function IsUnique(
  model: string,
  field: string,
  exceptField?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, field, exceptField],
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [model, field, exceptField] = args.constraints;

          const prismaModel = model as keyof typeof PrismaService;

          const exceptValue = exceptField
            ? (args.object as any)[exceptField]
            : undefined;

          const whereClause: any = {
            [field]: value,
          };

          if (exceptField) {
            whereClause.NOT = { [exceptField]: +exceptValue };
          }

          // Construindo a consulta
          const count = await new PrismaService()[prismaModel].count({
            where: whereClause,
          });

          return count === 0;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Esse campo não pode ser duplicado';
        },
      },
      async: true,
    });
  };
}
