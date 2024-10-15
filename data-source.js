const  { DataSource } =  require("typeorm")
const User = require("./src/entity/User")

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ajd",
    password: "40304030",
    database: "casbin_db",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})

module.exports = { AppDataSource }