import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InjectParamIntoDto = createParamDecorator(
  (data: { param: string; dtoKey: string }, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const dto = request.body;
    dto[data.dtoKey] = request.params[data.param];
    return dto?.[data.dtoKey];
  },
);
