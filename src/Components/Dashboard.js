import React, { Fragment } from 'react'
import Footer from './Common/Footer'
import { connect } from 'react-redux'
import { usersList } from '../Redux/Actions/usersList'

import classes from '../css/Common.module.css'
import ListAlbum from './Albums/ListAlbum'
import Loader from '../Components/Common/Loader.js';

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: true
        }
    }

    componentDidMount() {
        this.props.usersList().then(() => {
            this.setState({loader: false})
        }).catch((err) => {
            console.log(err)
            this.setState({loader: false})
        });
    }

    render() {
        return (
            <Fragment>
                <div className={classes.listWrapper}>
                    {this.state.loader ? <Loader /> : <ListAlbum />}
                </div>
                <Footer />
            </Fragment>
        )
    }
}

export default connect(null, {usersList})(Dashboard)