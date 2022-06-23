const axios = require("axios");
const crypto = require("crypto");
const generalService = require("./generalService");

const callApi = async (endpoint, commonParams = {}, params = {}, method = "get", body = {}, type = "test") => {
    let url = `https://partner.${type === "production" ? "" : "test-stable"}.shopeemobile.com`;
    const timestamp = generalService.getTimestamp();

    // Will attach to all requests
    commonParams.partner_id = +process.env.PARTNER_ID;
    commonParams.timestamp = timestamp;
    // sign also needs to be included in params
    const sign = generateSign(endpoint, commonParams);
    params.sign = sign;

    // query string will be attached to url regardless of request method
    const allParams = Object.assign(commonParams, params);
    const queryString = new URLSearchParams(allParams).toString();
    url += `${endpoint}?${queryString}`;

    const axiosData = { method, url };
    if (method === "post") {
        axiosData.data = body;
    }

    try {
        const response = await axios(axiosData);
        return response.data;
    } catch (error) {
        // Errors maybe API errors which will be handled by error handler
        // Sometimes errors are request specific those will be sent back to caller
        handleApiError(error);
    }
};

const generateBaseString = (endpoint, commonParams) => {
    const { partner_id, timestamp, ...params } = commonParams;
    let string = partner_id + endpoint + timestamp;
    for (let [_key, value] of Object.entries(params)) {
        string += value;
    }
    return string;
};

const generateSign = (endpoint, commonParams) => {
    const baseString = generateBaseString(endpoint, commonParams);
    const sign = crypto.createHmac("sha256", process.env.APP_KEY).update(baseString).digest("hex");
    return sign;
};

const handleApiError = error => console.error(error);

module.exports = {
    callApi
};