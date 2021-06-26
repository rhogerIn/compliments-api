import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompliments1624494247157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_sender",
                        type: "uuid"
                    },
                    {
                        name: "user_receiver",
                        type: "uuid"
                    },
                    {
                        name: "tag_id",
                        type: "uuid"
                    },
                    {
                        name: "message",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FK_userSender_compliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_sender"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FK_userReceiver_compliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_receiver"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FK_tagId_compliments",
                        referencedTableName: "tags",
                        referencedColumnNames: ["id"],
                        columnNames: ["tag_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )

/*
        Este bloco é uma 2º forma de criação de chave estrangeira pelo TYPEORM
        A diferença para a implementada no código é que se por acaso utilizarmos
        o "typeorm migration:revert" as chaves não serão afetadas.

        await queryRunner.createForeignKey(
            "compliments",
            new TableForeignKey({
                name: "FK_userSender_compliments",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_sender"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        ) */
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments")
    }

}
