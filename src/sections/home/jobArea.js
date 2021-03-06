import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, Create, LongTextInput, required, minLength, SimpleForm,
    ImageField, ImageInput, DeleteButton
} from 'react-admin';

const ListPagination = () => <span></span>;

export const JobAreaList = (props) => (
    <List title="Homepage / Job Areas"
          bulkActions={false}
          pagination={<ListPagination/>}
          {...props}
    >
        <Datagrid key="id">
            <TextField source="id"/>
            <ImageField source="image.file" title="image.name" className="imgSmall" label="Image"/>
            <TextField source="title"/>
            <TextField source="text"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const JobAreaModel = ({ record }) =>
    <span>{`Homepage / ${record.id ? `Job Area #${record.id}` : 'New Job Area'}`}</span>;

export const JobAreaEdit = (props) => {
    return (
        <Edit title={<JobAreaModel/>} {...props} >
            <SimpleForm redirect="list">
                <ImageField source="image.file" title="image.name" label="Image"/>
                <ImageInput source="newImage" accept="image/*">
                    <ImageField source="file" title="name"/>
                </ImageInput>
                <LongTextInput source="title" validate={[ required(), minLength(1) ]}/>
                <LongTextInput source="text" validate={[ required(), minLength(1) ]}/>
            </SimpleForm>
        </Edit>
    );
};

export const JobAreaCreate = (props) => {
    return (
        <Create title={<JobAreaModel/>} {...props} >
            <SimpleForm redirect="list">
                <ImageInput source="newImage" accept="image/*">
                    <ImageField source="file" title="name"/>
                </ImageInput>
                <LongTextInput source="title" validate={[ required(), minLength(1) ]}/>
                <LongTextInput source="text" validate={[ required(), minLength(1) ]}/>
            </SimpleForm>
        </Create>
    );
};
