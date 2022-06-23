require("dotenv").config();
const { poolPromise } = require("./config/database");

(async () => {
    try {
        await poolPromise;
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();