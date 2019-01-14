import React  from 'react';
import {
    List, Datagrid, TextField, DeleteButton, DisabledInput, ReferenceField, Create, SimpleForm, LongTextInput,
    BooleanInput, Edit, required, minLength, BooleanField, EditButton, ReferenceInput, SelectInput, DateField
} from 'react-admin';

export const CommentList = (props) => (
    <List title="Comment" bulkActions={false} {...props} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid>
            <DateField source="createdAt"/>
            <ReferenceField source="articleId" reference="article" linkType="show">
                <TextField source="title"/>
            </ReferenceField>
            <TextField source="text"/>
            <BooleanField source="active"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const CommentModel = ({ record }) => <span>Commented by {record ? `"${record.preparedName}"` : ''}</span>;

export const CommentEdit = (props) => (
    <Edit title={<CommentModel/>} {...props}>
        <SimpleForm redirect="list">
            <ReferenceField source="articleId" reference="article" linkType="show">
                <TextField source="title"/>
            </ReferenceField>
            <DisabledInput source="preparedName" label="Name"/>
            <LongTextInput source="text" validate={[ required(), minLength(0) ]}/>
            <BooleanInput label="active" source="active"/>
        </SimpleForm>
    </Edit>
);

export const CommentCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <LongTextInput source="text" validate={[ required(), minLength(0) ]}/>
            <BooleanInput label="active" source="active"/>
            <ReferenceInput source="articleIdTest" label="Article" reference="article" validate={[required()]}>
                <SelectInput optionText="title"/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
