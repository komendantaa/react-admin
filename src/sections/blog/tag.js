import React from 'react';
import {
    List, Datagrid, TextField, DeleteButton, minLength, maxLength,
    Create, Edit, SimpleForm, LongTextInput, EditButton
} from 'react-admin';

export const TagList = (props) => (
    <List title="Tags" bulkActions={false} {...props} sort={{ field: 'title', order: 'ASC' }}>
        <Datagrid>
            <TextField source="title"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const TagModel = ({ record }) => <span>Tag - {record ? `"${record.title}"` : ''}</span>;

export const TagEdit = (props) => (
    <Edit title={<TagModel/>} {...props}>
        <SimpleForm redirect="list">
            <LongTextInput source="title" validate={[ minLength(1), maxLength(100) ]}/>
        </SimpleForm>
    </Edit>
);

export const TagCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <LongTextInput source="title" validate={[ minLength(1), maxLength(100) ]}/>
        </SimpleForm>
    </Create>
);
