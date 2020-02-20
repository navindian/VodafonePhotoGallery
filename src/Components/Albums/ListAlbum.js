import React from 'react'
import { connect } from 'react-redux'
import { albumsList } from '../../Redux/Actions/albumsList'
import Album from './Album'
import Loader from '../Common/Loader'
import Pagination from '../Common/Pagination'

class ListAlbum extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: true,
            currentAlbums: [],
            currentPage: null,
            totalPages: null
        }
    }

    componentDidMount() {        
        this.props.albumsList().then(() => {
            this.setState({loader: false})
        }).catch((err) => {
            console.log(err)
            this.setState({loader: false})
        });
    }

    onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentAlbums = this.props.albums.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentAlbums, totalPages });
    };

    render() {
        const {
            currentAlbums
          } = this.state;
        var totalAlbums = this.props.albums;

        return (
            <div>
                {totalAlbums !== undefined && totalAlbums.length > 0 ?
                    <div>
                        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                            <div className="d-flex flex-row py-4 align-items-center">
                                <Pagination
                                    totalRecords={totalAlbums.length}
                                    pageLimit={23}
                                    pageNeighbours={1}
                                    onPageChanged={this.onPageChanged}
                                />
                            </div>
                        </div>
                        {currentAlbums.map(albums => (
                            <Album key={albums.id} albums={albums} />
                        ))}
                    </div>
                       :
                    <Loader /> 
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        albums: state.albums
    }
}


export default connect(mapStateToProps, {albumsList})(ListAlbum)