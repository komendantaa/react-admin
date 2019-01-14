import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, Create, LongTextInput, required, minLength, SimpleForm,
    ImageField, ImageInput, DeleteButton
} from 'react-admin';

const ListPagination = () => <span></span>;

export const HowItWorksList = (props) => (
    <List title="Homepage / How It Works"
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

const HowItWorksModel = ({ record }) =>
    <span>{`Homepage / ${record.id ? `How It Works #${record.id}` : 'New How It Works'}`}</span>;

export const HowItWorksEdit = (props) => {
    return (
        <Edit title={<HowItWorksModel/>} {...props} >
            <SimpleForm redirect="list">
                <ImageField source="image.file" title="image.name"/>
                <ImageInput source="newImage" accept="image/*">
                    <ImageField source="file" title="name"/>
                </ImageInput>
                <LongTextInput source="title" validate={[ required(), minLength(1) ]}/>
                <LongTextInput source="text" validate={[ required(), minLength(1) ]}/>
            </SimpleForm>
        </Edit>
    );
};

export const HowItWorksCreate = (props) => {
    return (
        <Create title={<HowItWorksModel/>} {...props} >
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
