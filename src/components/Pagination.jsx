var React = require('react/addons');
var config = require('../../config');
var Link = require('react-router').Link;

var Pagination = React.createClass({

    /**
     *
     * numberOfPages{this.getNumberOfPages()}
     * maxButtons={5}
     * activePage={this.state.pageNum}
     * onSelect={this.handleSelect}
     *
     */


    itemsPerPage: config.itemsPerPage,

    contextTypes: {
        router: React.PropTypes.func
    },

    componentWillMount: function() {

    },

    componentDidMount : function() {

    },

    componentWillUnmount : function() {

    },

    _renderPageLinks: function() {
        var numberOfPages = this.props.numberOfPages;

        var links = [];
        var active = '';
        for(var i=1; i<=numberOfPages; i++) {
            active = '';
            if(i == this.props.activePage) {
                active = 'active';
            }

            links.push(
                <li className={active} key={i}>
                    <Link to={'/page/' + i} role="button">{i}</Link>
                </li>);
        }

        return links;
    },

    render : function() {

        return (
            <ul className="pagination-container pagination">
                <li className={this.props.activePage == 1 ? 'disabled' : ''}>
                    <Link role="button" to={'/page/1'}>
                        <span aria-label="First">«</span>
                    </Link>
                </li>
                <li className={this.props.activePage == 1 ? 'disabled' : ''}>
                    <Link role="button" to={'/page/' +(this.props.activePage - 1)}>
                        <span aria-label="Previous">‹</span>
                    </Link>
                </li>
                {this._renderPageLinks()}
                <li className={this.props.activePage == this.props.numberOfPages ? 'disabled' : ''}>
                    <Link role="button" to={'/page/' + (this.props.activePage + 1)}>
                        <span aria-label="Next">›</span>
                    </Link>
                </li>
                <li className={this.props.activePage == this.props.numberOfPages ? 'disabled' : ''}>
                    <Link role="button" to={'/page/' +this.props.numberOfPages}>
                        <span aria-label="Last">»</span>
                    </Link>
                </li>
            </ul>
        )
    }
});

module.exports = Pagination;