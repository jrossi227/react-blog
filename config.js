var port = process.env.PORT || 9080;
var host = "localhost";
var protocol = "http:";

if (typeof window !== 'undefined') {
	host = window.location.hostname;
	protocol = window.location.protocol;
	port = window.location.port;
}

var config = {
    port: port,
    baseUrl : protocol + "//" + host + (port != "" ? (":" + port) ? ""),
    pageTitle: 'React Blog',
    itemsPerPage: 5,
    maxPageButtons: 3
};

module.exports = config;
