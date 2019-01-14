import React from 'react';
import { Toolbar, SaveButton } from 'react-admin';

const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton/>
    </Toolbar>
);

export default EditToolbar;