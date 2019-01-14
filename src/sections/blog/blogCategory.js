import React from 'react';
import {
    List, Datagrid, TextField, DeleteButton, EditButton,
    Edit, Create, SimpleForm, LongTextInput,
    required, minLength, maxLength
} from 'react-admin';

export const BlogCategoryList = (props) =>
    <List title="Categories" bulkActions={false} {...props} sort={{ field: 'title', order: 'ASC' }}>
        <Datagrid>
            <TextField source="title"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
;

const BlogCategoryTitle = ({ record }) => <span>Category {record ? `"${record.title}"` : ''}</span>;

export const BlogCategoryEdit = (props) => (
    <Edit title={<BlogCategoryTitle/>} {...props}>
        <SimpleForm redirect="list">
            <LongTextInput source="title" validate={[ required(), minLength(1), maxLength(100) ]}/>
        </SimpleForm>
    </Edit>
);

export const BlogCategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <LongTextInput source="title" validate={[ required(), minLength(1), maxLength(100) ]}/>
        </SimpleForm>
    </Create>
);
