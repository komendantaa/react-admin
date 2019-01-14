import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'react-admin';
import Menu from './custom-components/Menu';
import CustomAppBar from './custom-components/AppBar';

const theme = {
    palette: {
        secondary: {
            main: '#00ad85',
            contrastText: '#fff',
        },
    }
};

const MyLayout = (props) => <Layout
    {...props}
    menu={Menu}
    appBar={CustomAppBar}
/>;

export default connect(state => ({ theme }), {})(MyLayout);
