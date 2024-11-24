import {Global, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {PrismaClient, Prisma} from "@prisma/client";

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger(PrismaService.name);
    private readonly maxRetries = 5;
    private readonly retryDelay = 3000; // in milliseconds

    constructor() {
        super({
            // @ts-ignore
            omit: {
                events: {createdAt: true, updatedAt: true, deletedAt: true},
            },
        });
    }

    async onModuleInit() {
        await this.connectWithRetry();
    }

    async init() {
        await this.$connect();
        this.$use(async (params, next) => {
            const modelsWithSoftDelete = Prisma.dmmf.datamodel.models.map((model) => model.name);
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

    private async connectWithRetry(retries = 0): Promise<void> {
        try {
            await this.init();
            this.logger.log('Successfully connected to the database.');
        } catch (error) {
            this.logger.error(`Database connection failed (attempt ${retries + 1}): ${error.message}`);
            if (retries < this.maxRetries) {
                this.logger.log(`Retrying to connect in ${this.retryDelay / 1000} seconds...`);
                await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
                await this.connectWithRetry(retries + 1);
            } else {
                this.logger.error('Max retries reached. Could not connect to the database.');
                process.exit(1); // Exit the application
            }
        }
    }

}
