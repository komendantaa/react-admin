import React from 'react';
import {
    List, Datagrid, TextField, EditButton, DeleteButton, Edit, Create, SimpleForm, LongTextInput, ImageInput,
    ImageField, ReferenceArrayInput, required, minLength, BooleanInput, DateField, RichTextField, ChipField,
    BooleanField, AutocompleteArrayInput, ShowButton, Show, Tab, ReferenceArrayField, SingleFieldList,
    TabbedShowLayout
} from 'react-admin';
import TagQuickCreateButton from '../../custom-components/TagQuickCreateButton';
import CategoryQuickCreateButton from '../../custom-components/CategoryQuickCreateButton';

export const ArticleList = (props) => (
    <List title="Articles" bulkActions={false} {...props} sort={{ field: 'position', order: 'ASC' }}>
        <Datagrid key="id">
            <DateField source="updatedAt"/>
            <TextField source="title"/>
            <BooleanField source="active"/>
            <EditButton/>
            <ShowButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const ArticleModel = ({ record }) => <span>{`Article - ${record ? record.title : ''}`}</span>;

const ModifiedAutocompleteArrayInput = props => {
    if(!props.input.value) {
        props.input.value = [];
    } else if(props.input.value) {
        props.input.value = [ ...new Set(props.input.value.map(el => el.id || el)) ];
    }

    return <AutocompleteArrayInput {...props}/>;
};

const standardTextValidation = [ required(), minLength(1) ];

export const ArticleEdit = (props) =>
    <Edit title={<ArticleModel/>} {...props}>
        <SimpleForm redirect="list">
            <ImageField source="image.file" title="image.name"/>
            <ImageInput source="newImage" accept="image/*" multiple>
                <ImageField source="file" title="name"/>
            </ImageInput>
            <ReferenceArrayInput source="category" label="Categories" reference="blogCategory" {...props}>
                <ModifiedAutocompleteArrayInput optionText="title" {...props}/>
            </ReferenceArrayInput>
            <CategoryQuickCreateButton/>
            <LongTextInput source="title" validate={standardTextValidation}/>
            <LongTextInput source="headText" validate={standardTextValidation}/>
            <LongTextInput source="body" validate={standardTextValidation}/>
            <ReferenceArrayInput source="tags" label="Tags" reference="tag" perPage={100}>
                <ModifiedAutocompleteArrayInput optionText="title" optionValue="id"/>
            </ReferenceArrayInput>
            <TagQuickCreateButton/>
            <BooleanInput source="active"/>
        </SimpleForm>
    </Edit>
;

export const ArticleCreate = (props) =>
    <Create title="New Article" {...props}>
        <SimpleForm redirect="list">
            <ImageInput source="newImage" accept="image/*" validate={[ required() ]} label="Image">
                <ImageField source="file" title="name" validate={[ required('Please add image') ]}/>
            </ImageInput>
            <ReferenceArrayInput source="category" label="Categories" reference="blogCategory">
                <ModifiedAutocompleteArrayInput optionText="title" optionValue="id"/>
            </ReferenceArrayInput>
            <CategoryQuickCreateButton/>
            <LongTextInput source="title" validate={standardTextValidation}/>
            <LongTextInput source="headText" validate={standardTextValidation}/>
            <LongTextInput source="body" validate={standardTextValidation}/>
            <ReferenceArrayInput source="tags" label="Tags" reference="tag" perPage={100}>
                <ModifiedAutocompleteArrayInput optionText="title" optionValue="id"/>
            </ReferenceArrayInput>
            <TagQuickCreateButton/>
            <BooleanInput source="active" defaultValue={true}/>
        </SimpleForm>
    </Create>
;

export const ArticleShow = (props) =>
    <Show title={<ArticleModel/>} {...props}>
        <TabbedShowLayout redirect="list">
            <Tab label="summary">
                <ImageField source="image.file" title="image.name"/>
                <ReferenceArrayField source="category" label="Categories" reference="blogCategory">
                    <SingleFieldList>
                        <ChipField source="title"/>
                    </SingleFieldList>
                </ReferenceArrayField>
                <RichTextField source="title"/>
                <RichTextField source="headText"/>
                <RichTextField source="body" style={{ width: '100%' }}/>
                <ReferenceArrayField source="tags" label="Tags" reference="tag">
                    <SingleFieldList>
                        <ChipField source="title" style={{ width: 'auto' }}/>
                    </SingleFieldList>
                </ReferenceArrayField>
                <BooleanField source="active"/>
            </Tab>
            <Tab label="Comments" style={{ display: 'flex' }}>
                <ReferenceArrayField source="comments" reference="comment" label="" >
                    <Datagrid>
                        <BooleanField source="active"/>
                        <TextField source="text"/>
                        <TextField source="preparedName" label="Author"/>
                        <DateField source="createdAt" label="Date"/>
                        <EditButton/>
                    </Datagrid>
                </ReferenceArrayField>
            </Tab>
        </TabbedShowLayout>
    </Show>
;
