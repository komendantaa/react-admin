import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';
import { toggleSidebar as toggleSidebarAction } from 'ra-core';
import { LoadingIndicator, UserMenu, Headroom } from 'ra-ui-materialui';
import Badge from '@material-ui/core/Badge';
import { MenuItemLink } from 'react-admin';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { sendToken } from '../authProvider';
import { getAllNotifications } from '../push-notification';
import firebase from 'firebase/app';
import '@firebase/messaging';
import { notificationReceived as notificationReceivedAction } from '../notifications/notificationsAction';
import { AppConfig } from '../AppConfig';

const styles = theme => ({
    toolbar: {
        paddingRight: 24,
    },
    menuButton: {
        marginLeft: '0.5em',
        marginRight: '0.5em',
    },
    menuButtonIconClosed: {
        transition: theme.transitions.create([ 'transform' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(0deg)',
    },
    menuButtonIconOpen: {
        transition: theme.transitions.create([ 'transform' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(180deg)',
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    badge_hidden: {
        display: 'none',
    },
    badge_nothidden: {},
});


class AppBar extends Component {
    updateCounter = (notifications) => this.setState(state => ({
        notifications
    }));

    constructor(props) {
        super(props);
        this.state = { notifications: 0 };
        this.updateCounter = this.updateCounter.bind(this);
    }

    componentWillMount() {
        const { notificationReceived } = this.props;
        let messaging = null;
        let counterRepeater = this.updateCounter;
        getAllNotifications().then(counter => {
            this.updateCounter(counter);
            notificationReceived(counter);
        });

        setTimeout(() => {
            (async() => {
                try {
                    messaging = firebase.messaging();
                    if(!localStorage.getItem('pushToken')) {
                        await messaging.requestPermission();
                        const pushToken = await messaging.getToken();
                        sendToken(pushToken);
                    }

                    messaging.onMessageInternal(function(payload) {
                        getAllNotifications().then(counter => {
                            counterRepeater(counter);
                            notificationReceived(counter);
                        });
                    })

                } catch(e) {
                    if(localStorage.getItem('token')) {
                        const options = {};
                        options.method = 'GET';
                        options.headers = new Headers({});
                        options.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

                        return fetch(`${AppConfig.apiUrl}/currentUserId`, options)
                            .then(response => {
                                if(response.status < 200 || response.status >= 300) {
                                    return Promise.reject({ message: 'Non authorized', status: response.status })
                                }
                                let intervalId = setInterval(() => getAllNotifications().then(this.updateCounter), 10000);
                                this.setState({ intervalId: intervalId })
                            })
                    }
                }
            })();
        }, 5000);
    }

    componentWillUnmount() {
        if(this.state && this.state.intervalId) clearInterval(this.state.intervalId);
    }

    render() {
        const {
            children,
            classes,
            className,
            logout,
            open,
            title,
            toggleSidebar,
            userMenu,
            width,
            notifications
        } = this.props;

        return (
            <Headroom>
                <MuiAppBar
                    className={className}
                    color="secondary"
                    position="static"

                >
                    <Toolbar
                        disableGutters
                        variant={width === 'xs' ? 'regular' : 'dense'}
                        className={classes.toolbar}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleSidebar}
                            className={classNames(classes.menuButton)}
                        >
                            <MenuIcon
                                classes={{
                                    root: open
                                        ? classes.menuButtonIconOpen
                                        : classes.menuButtonIconClosed,
                                }}
                            />
                        </IconButton>
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.title}
                            id="react-admin-title"
                        />
                        <IconButton
                            color="inherit"
                            aria-label="open notifications"
                            className="notification"
                        >
                            <MenuItemLink to="/notification" style={{ position: 'absolute', zIndex: '100' }}/>
                            {this.state.notifications ?
                                <Badge badgeContent={this.state.notifications} color="primary" visible="false">
                                    <NotificationsIcon/>
                                </Badge> :
                                <NotificationsIcon/>
                            }
                        </IconButton>
                        <LoadingIndicator/>
                        {cloneElement(userMenu, { logout })}
                    </Toolbar>
                </MuiAppBar>
            </Headroom>
        );
    };
}

AppBar.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    logout: PropTypes.element,
    open: PropTypes.bool,
    title: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ])
        .isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    userMenu: PropTypes.node,
    width: PropTypes.string,
};

AppBar.defaultProps = {
    userMenu: <UserMenu/>,
    notificationReceived: PropTypes.func,
    notifications: PropTypes.number,
};

const enhance = compose(
    connect(
        state => ({
            locale: state.i18n.locale, // force redraw on locale change
            notifications: state.notifications
        }),
        {
            toggleSidebar: toggleSidebarAction,
            notificationReceived: notificationReceivedAction,

        },
    ),
    withStyles(styles),
    withWidth()
);

export default enhance(AppBar);
