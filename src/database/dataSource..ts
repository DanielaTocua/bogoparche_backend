import { Activity } from "@/entity/Activity"
import { Attendance } from "@/entity/Attendance"
import { Category } from "@/entity/Category"
import { CommentEvent } from "@/entity/CommentEvent"
import { CommentPlan } from "@/entity/CommentPlan"
import { Event } from "@/entity/Event"
import { Favorite } from "@/entity/Favorite"
import { Plan } from "@/entity/Plan"
import { Token } from "@/entity/Token"
import { User } from "@/entity/User"
import { DataSource } from "typeorm"

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT): 8000,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME,
    entities: [
        Activity,
        Attendance,
        Category,
        CommentEvent,
        CommentPlan,
        Event,
        Favorite,
        Plan,
        Token,
        User
    ],
})

export default PostgresDataSource