import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, Create, TextInput, SelectInput, required, minLength, maxLength,
    SimpleForm, ReferenceInput, FormDataConsumer
} from 'react-admin';
import EditToolbar from '../custom-components/EditTollbarSaveOnly';

const ListPagination = () => <span></span>;

export const CategoryList = (props) => (
    <List title="Categories"
          bulkActions={false}
          {...props}
          pagination={<ListPagination/>}
    >
        <Datagrid key="id">
            <TextField source="id"/>
            <TextField source="name"/>
            <TextField source="parent"/>
            <EditButton/>
        </Datagrid>
    </List>
);

const CategoryModel = ({ record }) =>
    <span>{record.id ? `Category ${record.name} (#${record.id})` : 'New Skill'}</span>;

export const CategoryEdit = (props) => {
    return (
        <Edit title={<CategoryModel/>} {...props} >
            <SimpleForm redirect="list" toolbar={<EditToolbar/>}>
                <FormDataConsumer>
                    {({ formData, ...rest }) => !formData.disabled &&
                        <ReferenceInput label="Parent category" source="parentCategoryId"
                                        reference="parentCategory" {...rest} validate={[ required() ]}>
                            <SelectInput optionText="name"/>
                        </ReferenceInput>
                    }
                </FormDataConsumer>

                <TextInput source="name" style={{ width: '50%' }}
                           validate={[ required(), minLength(1), maxLength(100) ]}/>
            </SimpleForm>
        </Edit>
    )
};

export const CategoryCreate = (props) => {
    return (
        <Create title={<CategoryModel/>} {...props} >
            <SimpleForm redirect="list">
                <ReferenceInput label="Parent category" source="parentCategoryId" reference="parentCategory"
                                validate={[ required() ]}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <TextInput source="name" validate={[ required(), minLength(1), maxLength(100) ]}/>
            </SimpleForm>
        </Create>
    );
};
