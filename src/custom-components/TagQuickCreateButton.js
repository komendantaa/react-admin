import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import {
    fetchEnd, fetchStart, required, showNotification, Button, SaveButton, SimpleForm, TextInput, CREATE, REDUX_FORM_NAME
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import dataProvider from '../dataProvider';

class TagQuickCreateButton extends Component {
    state = {
        error: false,
        showDialog: false
    };

    handleClick = () => {
        this.setState({ showDialog: true })
    };

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleSaveClick = () => {
        const { submit } = this.props;
        submit('tag-quick-create');
    };

    handleSubmit = values => {
        const { change, fetchStart, fetchEnd, showNotification } = this.props;
        fetchStart();

        dataProvider(CREATE, 'tag', { data: values })
            .then(({ data }) => {
                change(REDUX_FORM_NAME, 'tag_id', data.id);
                this.setState({ showDialog: false });
            })
            .catch(error => {
                showNotification(error.message, 'error')
            })
            .finally(() => {
                fetchEnd()
            });
    };

    render() {
        const { showDialog } = this.state;
        const { isSubmitting } = this.props;

        return (
            <Fragment>
                <Button onClick={this.handleClick} className="customBtn">
                    <Fragment><IconContentAdd/> Create tag</Fragment>
                </Button>
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={this.handleCloseClick}
                    aria-label="Create tag"
                >
                    <DialogTitle>Create tag</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            form="tag-quick-create"
                            resource="tag"
                            onSubmit={this.handleSubmit}
                            toolbar={null}
                        >
                            <TextInput source="title" validate={required()}/>
                        </SimpleForm>
                    </DialogContent>
                    <DialogActions>
                        <SaveButton
                            saving={isSubmitting}
                            onClick={this.handleSaveClick}
                        />
                        <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
                            <IconCancel/>
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isSubmitting: isSubmitting('tag-quick-create')(state)
});

const mapDispatchToProps = {
    change,
    fetchEnd,
    fetchStart,
    showNotification,
    submit
};

export default connect(mapStateToProps, mapDispatchToProps)(
    TagQuickCreateButton
);