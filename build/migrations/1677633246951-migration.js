"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration1677633246951 = void 0;
class migration1677633246951 {
    constructor() {
        this.name = 'migration1677633246951';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "currency" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "symbol" varchar(20) NOT NULL,
                "decimals" integer NOT NULL,
                "contract" varchar(100) NOT NULL,
                "url" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "transaction" (
                "id" varchar(100) PRIMARY KEY NOT NULL,
                "wallet" varchar(100) NOT NULL,
                "date" datetime NOT NULL,
                "description" varchar NOT NULL,
                "from" varchar(100) NOT NULL,
                "to" varchar(100) NOT NULL,
                "amount" integer NOT NULL,
                "currencyId" integer
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)
        `);
        await queryRunner.query(`
            CREATE TABLE "wallet" (
                "id" varchar(100) PRIMARY KEY NOT NULL,
                "balance" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_transaction" (
                "id" varchar(100) PRIMARY KEY NOT NULL,
                "wallet" varchar(100) NOT NULL,
                "date" datetime NOT NULL,
                "description" varchar NOT NULL,
                "from" varchar(100) NOT NULL,
                "to" varchar(100) NOT NULL,
                "amount" integer NOT NULL,
                "currencyId" integer,
                CONSTRAINT "FK_a6eb26abbedbeaeb81ff45c5490" FOREIGN KEY ("currencyId") REFERENCES "currency" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_transaction"(
                    "id",
                    "wallet",
                    "date",
                    "description",
                    "from",
                    "to",
                    "amount",
                    "currencyId"
                )
            SELECT "id",
                "wallet",
                "date",
                "description",
                "from",
                "to",
                "amount",
                "currencyId"
            FROM "transaction"
        `);
        await queryRunner.query(`
            DROP TABLE "transaction"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_transaction"
                RENAME TO "transaction"
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "transaction"
                RENAME TO "temporary_transaction"
        `);
        await queryRunner.query(`
            CREATE TABLE "transaction" (
                "id" varchar(100) PRIMARY KEY NOT NULL,
                "wallet" varchar(100) NOT NULL,
                "date" datetime NOT NULL,
                "description" varchar NOT NULL,
                "from" varchar(100) NOT NULL,
                "to" varchar(100) NOT NULL,
                "amount" integer NOT NULL,
                "currencyId" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "transaction"(
                    "id",
                    "wallet",
                    "date",
                    "description",
                    "from",
                    "to",
                    "amount",
                    "currencyId"
                )
            SELECT "id",
                "wallet",
                "date",
                "description",
                "from",
                "to",
                "amount",
                "currencyId"
            FROM "temporary_transaction"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_transaction"
        `);
        await queryRunner.query(`
            DROP TABLE "wallet"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "transaction"
        `);
        await queryRunner.query(`
            DROP TABLE "currency"
        `);
    }
}
exports.migration1677633246951 = migration1677633246951;
//# sourceMappingURL=1677633246951-migration.js.map