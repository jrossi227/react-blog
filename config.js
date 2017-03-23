var port = process.env.PORT || 9080;

if (typeof window !== 'undefined') {
	port = window.location.port;
}

var config = {
    port: port,
    baseUrl : typeof window !== 'undefined' ? window.location.origin : "http://localhost:" + port,
    pageTitle: 'React Blog',
    itemsPerPage: 5,
    maxPageButtons: 3,
    googleAnalyticsId: ''
};

module.exports = config;
