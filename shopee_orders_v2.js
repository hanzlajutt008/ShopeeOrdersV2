require("dotenv").config();
const { poolPromise } = require("./config/database");
const { callApi } = require("./services/ApiService");

(async () => {
    try {
        await poolPromise;

        // get orders list
        const data = await callApi("/api/v2/order/get_order_list", {
            access_token: "6d5a78435a42474c7579764d564a426a", shop_id: +process.env.SHOP_ID
        }, {
            time_range_field: "create_time",
            time_from: 1654868014,
            time_to: 1655991214,
            page_size: 100
        });
        // get token
        // const data = await callApi("/api/v2/auth/token/get", {}, {}, "post", { code: "52774c744847536a58724b596e79424d", shop_id: +process.env.SHOP_ID, partner_id: +process.env.PARTNER_ID })
        console.log(data);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();