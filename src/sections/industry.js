import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, Create, TextInput, Filter,
    required, minLength, maxLength, Pagination, SimpleForm
} from 'react-admin';
import EditToolbar from '../custom-components/EditTollbarSaveOnly';

const IndustryFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);

const ListPagination = props => <Pagination rowsPerPageOptions={[ 10 ]} {...props} />;

export const IndustryList = (props) => (
    <List title="Industries"
          bulkActions={false}
          {...props}
          filters={<IndustryFilter/>}
          pagination={<ListPagination/>}
    >
        <Datagrid key="id">
            <TextField source="title"/>
            <EditButton/>
        </Datagrid>
    </List>
);

const IndustryModel = ({ record }) => <span>{record.id ? `Industry #${record.id}` : 'New Industry'}</span>;

export const IndustryEdit = (props) => {
    return (
        <Edit title={<IndustryModel/>} {...props} >
            <SimpleForm toolbar={<EditToolbar/>}>
                <TextInput source="title" validate={[ required(), minLength(1), maxLength(100) ]}/>
            </SimpleForm>
        </Edit>
    );
};

export const IndustryCreate = (props) => {
    return (
        <Create title={<IndustryModel/>} {...props} >
            <SimpleForm redirect="list">
                <TextInput source="title" validate={[ required(), minLength(1), maxLength(100) ]}/>
            </SimpleForm>
        </Create>
    );
};
