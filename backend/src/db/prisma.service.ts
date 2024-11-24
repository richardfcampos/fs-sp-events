import {Global, Injectable, OnModuleInit} from '@nestjs/common';
import {PrismaClient, Prisma} from "@prisma/client";

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            // @ts-ignore
            omit: {
                events: {createdAt: true, updatedAt: true, deletedAt: true},
            },
        });
    }

    async onModuleInit() {
        await this.$connect();
        this.$use(async (params, next) => {
            //all modules names
            const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);
            const modelsWithSoftDelete = modelNames; // Replace with your model names

            if (modelsWithSoftDelete.includes(params.model)) {
                params.args = params.args || {}
                params.args.where = params.args.where || {};

                if (params.action === 'delete') {
                    // Change 'delete' to 'update'
                    params.action = 'update';
                    params.args['data'] = { deletedAt: new Date() };
                }

                if (params.action === 'deleteMany') {
                    // Change 'deleteMany' to 'updateMany'
                    params.action = 'updateMany';
                    if (params.args.data !== undefined) {
                        params.args.data['deletedAt'] = new Date();
                    } else {
                        params.args['data'] = { deletedAt: new Date() };
                    }
                }
                if (params.action === 'findUnique' || params.action === 'findFirst') {
                    // Modify find queries to exclude deleted records
                    params.action = 'findFirst';
                    if (params.args.where.deletedAt === undefined) {
                        params.args.where['deletedAt'] = null;
                    }
                }
                if (params.action === 'findMany') {
                    // Modify findMany queries to exclude deleted records
                    params.args.where['deletedAt'] = null;
                }
            }
            return next(params);
        });
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
