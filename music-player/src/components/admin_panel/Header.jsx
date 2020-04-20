import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { HeaderAdmin, Global2 } from '../../assets/styles/adminpanel';
import '../../assets/css/Global.css';
import w_wave from '../../assets/images/white_wave.png';
import Auth from './Auth'

const Header = ({ history }) => {

    const handleSignOut = () => {
        Auth.logout();
        history.push('/panel')
    }

    let content = (
        <React.Fragment>
            <Global2 />
            <HeaderAdmin>
                <div>
                    <div>
                        <img src={w_wave} alt="" />
                        <span> wavy. </span>
                    </div>
                    <navbar>
                        <NavLink className='admin-nav' to="/admin/artists"> Artists</NavLink>
                        <NavLink className='admin-nav' to="/admin/albums"> Albums </NavLink>
                        <NavLink className='admin-nav' to="/admin/songs"> Songs </NavLink>
                        <button onClick={handleSignOut}> SIGN OUT </button>
                    </navbar>
                </div>
            </HeaderAdmin>
        </React.Fragment>

    );
    return content;
}

export default withRouter(Header);