import React from 'react'
import { connect } from 'react-redux'
import { photosList } from '../../Redux/Actions/photosList'
import { albumsList } from '../../Redux/Actions/albumsList'
import Loader from '../Common/Loader'
import Pagination from '../Common//Pagination'
import PhotoCard from './PhotoCard'

class ListPhoto extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: true,
            currentPhotos: [],
            currentPage: null,
            totalPages: null
        }
    }

    componentDidMount() {
        this.props.photosList().then(() => {
            this.setState({loader: false})
        }).catch((err) => {
            console.log(err)
            this.setState({loader: false})
        });
        
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
        const currentPhotos = this.props.photos.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentPhotos, totalPages });
    };

    render() {
        const {
            currentPhotos
          } = this.state;
        var totalPhotos = this.props.photos;

        return (
            <div>
                {totalPhotos !== undefined && totalPhotos.length > 0 ?
                    <div>
                        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                            <div className="d-flex flex-row py-4 align-items-center">
                                <Pagination
                                    totalRecords={totalPhotos.length}
                                    pageLimit={21}
                                    pageNeighbours={1}
                                    onPageChanged={this.onPageChanged}
                                />
                            </div>
                        </div>
                        {currentPhotos.map(photos => (
                            <PhotoCard key={photos.id} photos={photos} />
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
        photos: state.photos,
        albums: state.albums
    }
}


export default connect(mapStateToProps, {photosList,albumsList})(ListPhoto)