import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, Create, TextInput, Filter,
    required, minLength, maxLength, Pagination, SimpleForm
} from 'react-admin';
import EditToolbar from '../custom-components/EditTollbarSaveOnly';

const SkillFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);

const ListPagination = props => <Pagination rowsPerPageOptions={[ 10 ]} {...props} />;

export const SkillList = (props) => (
    <List title="Skills"
          bulkActions={false}
          {...props}
          filters={<SkillFilter/>}
          pagination={<ListPagination/>}
    >
        <Datagrid key="id">
            <TextField source="title"/>
            <EditButton/>
        </Datagrid>
    </List>
);

const SkillModel = ({ record }) => <span>{record.id ? `Skill #${record.id}` : 'New Skill'}</span>;

export const SkillEdit = (props) => {
    return (
        <Edit title={<SkillModel/>} {...props} >
            <SimpleForm redirect="list" toolbar={<EditToolbar/>}>
                <TextInput source="title" validate={[ required(), minLength(1), maxLength(100) ]}/>
            </SimpleForm>
        </Edit>
    );
};

export const SkillCreate = (props) => {
    return (
        <Create title={<SkillModel/>} {...props} >
            <SimpleForm redirect="list">
                <TextInput source="title" validate={[ required(), minLength(1), maxLength(100) ]}/>
            </SimpleForm>
        </Create>
    );
};
