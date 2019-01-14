import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, Create, LongTextInput, required, minLength, SimpleForm, DeleteButton
} from 'react-admin';

const ListPagination = () => <span></span>;

export const FeatureList = (props) => (
    <List title="Homepage / Features"
          bulkActions={false}
          {...props}
          pagination={<ListPagination/>}
    >
        <Datagrid key="id">
            <TextField source="id"/>
            <TextField source="text"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const FeatureModel = ({ record }) => <span>{`Homepage / ${record.id ? `Feature #${record.id}` : 'New Feature'}`}</span>;

export const FeatureEdit = (props) => {
    return (
        <Edit title={<FeatureModel/>} {...props} >
            <SimpleForm redirect="list">
                <LongTextInput source="text" validate={[ required(), minLength(1) ]}/>
            </SimpleForm>
        </Edit>
    );
};

export const FeatureCreate = (props) => {
    return (
        <Create title={<FeatureModel/>} {...props} >
            <SimpleForm redirect="list">
                <LongTextInput source="text" validate={[ required(), minLength(1) ]}/>
            </SimpleForm>
        </Create>
    );
};
