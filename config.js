var port = process.env.PORT || window.baseUrl || 9080;
var host = window.location.hostname || "localhost";
var protocol = window.location.protocol || "http:";

var config = {
    port: port,
    baseUrl : protocol + "//" + host + ":" + port,
    pageTitle: 'React Blog',
    itemsPerPage: 5,
    maxPageButtons: 3
};

module.exports = config;
