import React from 'react';
import {
    List, Datagrid, TextField, EditButton, DeleteButton, Edit, Create, BooleanField,
    BooleanInput, SimpleForm, LongTextInput, UrlField, required, minLength,
    maxLength
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

import { AppConfig } from '../AppConfig';

export const PagesList = (props) => {
    return (
        <List
            title="Static pages"
            bulkActions={false}
            {...props}>
            <Datagrid key="id">
                <TextField source="headline"/>
                <BooleanField label="Is page active?" source="active"/>
                <UrlField source="slug" target="_blank"/>
                <EditButton/>
                <DeleteButton/>
            </Datagrid>
        </List>
    );
};

const PagesModel = ({ record }) => {
    return (
        <span>
            Pages - {record ? `${record.headline}` : ''}
        </span>
    );
};


export const PagesEdit = (props) => {
    return (
        <Edit title={<PagesModel/>} {...props}>
            <SimpleForm redirect="list">
                <LongTextInput source="headline"
                               validate={[ required(), minLength(3), maxLength(100) ]}/>
                <LongTextInput source="subhead"
                               validate={[ required(), minLength(3), maxLength(500) ]}/>
                <BooleanInput label="Is Page Active" source="active"/>
                <RichTextInput source="body"
                               toolbar={AppConfig.wysiwygOptions}
                               validate={[ required(), minLength(5) ]}/>
            </SimpleForm>
        </Edit>
    );
};

export const PagesCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm redirect="list">
                <LongTextInput source="headline"
                               validate={[ required(), minLength(3), maxLength(100) ]}/>
                <LongTextInput source="subhead"
                               validate={[ required(), minLength(3), maxLength(500) ]}/>
                <BooleanInput label="Is Page Active" source="active"/>
                <RichTextInput source="body"
                               toolbar={AppConfig.wysiwygOptions}
                               validate={[ minLength(5) ]}/>
            </SimpleForm>
        </Create>
    );
};
