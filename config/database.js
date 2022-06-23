const sql = require("mssql");

// SQL configurations
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        enableArithAbort: true,
        cryptoCredentialsDetails: {
            minVersion: "TLSv1",
        },
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
};

const poolPromise = new sql.ConnectionPool(sqlConfig)
    .connect()
    .then(pool => {
        console.log(`Connected to database: ${process.env.DB_NAME} on server: ${process.env.DB_SERVER}`);
        return pool;
    })
    .catch(error => {
        throw error;
    });

module.exports = { sql, poolPromise };