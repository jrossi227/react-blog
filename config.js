var port = process.env.PORT || 9080;

var config = {
    port: port,
    baseUrl : "http://localhost:" + port,
    pageTitle: 'React Blog',
    itemsPerPage: 5,
    maxPageButtons: 3
};

module.exports = config;
