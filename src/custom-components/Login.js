import React, { Component } from 'react';
import { Notification, userLogin } from 'react-admin';
import { propTypes, reduxForm, Field } from 'redux-form';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/LockOutline';

const styles = theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#00ad85',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: '#00ad85',
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[ 500 ],
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
});

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({
                         meta: { touched, error } = {},
                         input: { ...inputProps },
                         ...props
                     }) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

class Login extends Component {
    login = auth =>
        this.props.userLogin(
            auth,
            this.props.location.state
                ? this.props.location.state.nextPathname
                : '/'
        );

    render() {
        const { classes, handleSubmit, isLoading, translate } = this.props;
        return (
            <div className={classes.main}>
                <Card className={classes.card}>
                    <div className={classes.avatar}>
                        <Avatar className={classes.icon}>
                            <LockIcon/>
                        </Avatar>
                    </div>
                    <form onSubmit={handleSubmit(this.login)}>
                        <div className={classes.form}>
                            <div className={classes.input}>
                                <Field
                                    name="username"
                                    component={renderInput}
                                    label="username"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className={classes.input}>
                                <Field
                                    name="password"
                                    component={renderInput}
                                    label="password"
                                    type="password"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <CardActions className={classes.actions}>
                            <Button
                                variant="raised"
                                type="submit"
                                disabled={isLoading}
                                className={classes.button}
                                fullWidth
                            >
                                {isLoading && (
                                    <CircularProgress size={25} thickness={2}/>
                                )}
                                {'submit'}
                            </Button>
                        </CardActions>
                    </form>
                </Card>
                <Notification/>
            </div>
        );
    }
}

Login.propTypes = {
    ...propTypes,
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    previousRoute: PropTypes.string,
    userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });

const enhance = compose(
    reduxForm({
        form: 'signIn',
        validate: (values, props) => {
            const errors = {};
            if(!values.username) {
                errors.username = 'Username is required';
            }
            if(!values.password) {
                errors.password = 'Password is required';
            }
            return errors;
        },
    }),
    connect(mapStateToProps, { userLogin }),
    withStyles(styles)
);

export default enhance(Login);
