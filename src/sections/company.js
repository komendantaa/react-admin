import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, Create, TabbedForm, TextInput, BooleanInput, FormTab, LongTextInput,
    ImageInput, ImageField, required, minLength, maxLength, ArrayInput, SimpleFormIterator, DisabledInput, Filter,
    Pagination, BooleanField, ReferenceInput, SelectInput, ArrayField, Tab, ReferenceField, ShowButton, Show,
    TabbedShowLayout, RichTextField
} from 'react-admin';
import EditToolbar from '../custom-components/EditTollbarSaveOnly';

const CompanyFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Keyword" source="company" alwaysOn/>
        <TextInput label="Location" source="location" alwaysOn/>
    </Filter>
);

const ListPagination = props => <Pagination rowsPerPageOptions={[ 10 ]} {...props} />;

export const CompanyList = (props) => (
    <List title="Companies"
          bulkActions={false}
          {...props}
          sort={{ field: 'position', order: 'ASC' }}
          filters={<CompanyFilter/>}
          pagination={<ListPagination/>}
    >
        <Datagrid key="id">
            <TextField source="companyName"/>
            <TextField source="firstName"/>
            <TextField source="lastName"/>
            <BooleanField source="isActive"/>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

const CompanyModel = ({ record }) => <span>{record ? `${record.companyName} (#${record.id})` : 'Company'}</span>;

export const CompanyEdit = (props) => {
    return (
        <Edit title={<CompanyModel/>} {...props}>
            <TabbedForm redirect="list" toolbar={<EditToolbar/>}>
                <FormTab label="summary">
                    <ImageField source="avatar.file" title="avatar.name"/>
                    <BooleanInput source="isActive" label="Profile is active"/>
                    <TextInput source="companyName"/>
                    <TextInput source="firstName" validate={[ required(), minLength(3), maxLength(100) ]}/>
                    <TextInput source="lastName" validate={[ required(), minLength(3), maxLength(100) ]}/>
                    <TextInput source="email" validate={[ required(), minLength(3), maxLength(50) ]}/>
                    <TextInput source="jobPosition" validate={[ maxLength(50) ]}/>
                    <LongTextInput source="shortDescription" validate={[ maxLength(500) ]}/>
                    <ImageInput source="newAvatar" accept="image/*">
                        <ImageField source="file" title="name"/>
                    </ImageInput>
                </FormTab>
                <FormTab label="location">
                    <ReferenceInput label="Country" source="country" reference="country">
                        <SelectInput optionText="name"/>
                    </ReferenceInput>
                    <ReferenceInput label="State" source="state" reference="state">
                        <SelectInput optionText="name"/>
                    </ReferenceInput>
                    <TextInput source="location.city" label="City"/>
                    <TextInput source="location.zipCode" label="ZIP"/>
                    <BooleanInput source="isConfidentialLocation" label="Location is confidential"/>
                </FormTab>
                <FormTab label="projects">
                    <ArrayInput source="projects" style={{ width: '100%' }}>
                        <SimpleFormIterator disableAdd disableRemove>
                            <DisabledInput source="title" label="Project title"/>
                            <DisabledInput source="description" label="Project description"/>
                            <ArrayInput label="Categories" source="category" style={{ width: '100%' }}>
                                <SimpleFormIterator disableAdd disableRemove>
                                    <DisabledInput source="name" label="Main category"/>
                                    <ArrayInput label="Subcategories" source="children" style={{ width: '100%' }}>
                                        <SimpleFormIterator disableAdd disableRemove>
                                            <DisabledInput source="name" label="Subcategory"/>
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </SimpleFormIterator>
                            </ArrayInput>
                            <ArrayInput label="Jobs" source="jobs" style={{ width: '100%' }}>
                                <SimpleFormIterator disableAdd disableRemove>
                                    <DisabledInput source="title" label="Title"/>
                                    <DisabledInput source="hoursPerWeek" label="Hours per week"/>
                                    <DisabledInput source="hourlyPay" label="Hourly rate"/>
                                    <DisabledInput source="type" label="Type"/>
                                    <DisabledInput source="locked" label="Locked"/>
                                    <DisabledInput source="hourlyRateLocked" label="Hourly rate locked"/>
                                </SimpleFormIterator>
                            </ArrayInput>
                            <DisabledInput source="experienceLevel" label="Experience level"/>
                            <DisabledInput source="budget" label="Budget"/>
                            <DisabledInput source="status.name" label="Status"/>
                            <DisabledInput source="dateFrom" label="From"/>
                            <DisabledInput source="dateTo" label="To"/>
                            <DisabledInput source="completedAt" label="Completed at"/>
                            <DisabledInput source="createdAt" label="Created"/>
                            <DisabledInput source="updatedAt" label="Updated"/>

                            {/*<ArrayInput source="projectSkills" style={{width:'100%'}} >*/}
                            {/*<SimpleFormIterator disableAdd disableRemove >*/}
                            {/*<DisabledInput source="title" label="title" />*/}
                            {/*</SimpleFormIterator>*/}
                            {/*</ArrayInput>*/}

                            <DisabledInput source="workWeeks" label="Work weeks"/>

                            <DisabledInput source="company.location.country.name" label="Country"/>
                            <DisabledInput source="company.location.country.shortName" label="Country (short)"/>
                            <DisabledInput source="company.location.state.name" label="State"/>
                            <DisabledInput source="company.location.state.shortName" label="State (short)"/>
                            <DisabledInput source="company.location.city" label="City"/>
                            <DisabledInput source="company.location.zipCode" label="ZIP"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export const CompanyShow = (props) => {
    return (
        <Show title={<CompanyModel/>} {...props}>
            <TabbedShowLayout redirect="list" toolbar={<EditToolbar/>}>
                <Tab label="summary">
                    <ImageField source="avatar.file" title="avatar.name"/>
                    <BooleanField source="isPublic" label="Profile is public"/>
                    <BooleanField source="isActive" label="Profile is active"/>
                    <TextField source="companyName"/>
                    <TextField source="firstName" validate={[ required(), minLength(3), maxLength(100) ]}/>
                    <TextField source="lastName" validate={[ required(), minLength(3), maxLength(100) ]}/>
                    <TextField source="email" validate={[ required(), minLength(3), maxLength(50) ]}/>
                    <TextField source="jobPosition" validate={[ maxLength(50) ]}/>
                    <RichTextField source="shortDescription" validate={[ maxLength(100) ]}/>
                </Tab>
                <Tab label="location">
                    <ReferenceField label="Country" source="country" reference="country" linkType={false}>
                        <TextField source="name"/>
                    </ReferenceField>
                    <ReferenceField label="State" source="state" reference="state" linkType={false}>
                        <TextField source="name"/>
                    </ReferenceField>
                    <TextField source="location.city" label="City"/>
                    <TextField source="location.zipCode" label="ZIP"/>
                    <BooleanField source="isConfidentialLocation" label="Location is confidential"/>
                </Tab>
                <Tab label="projects">
                    <ArrayField source="projects" style={{ width: '100%' }}>
                        <Datagrid disableAdd disableRemove>
                            <TextField source="title" label="Project title"/>
                            <TextField source="description" label="Project description"/>
                            <ArrayField label="Categories" source="category" style={{ width: '100%' }}>
                                <Datagrid disableAdd disableRemove>
                                    <TextField source="name" label="Main category"/>
                                    <ArrayField label="Subcategories" source="children" style={{ width: '100%' }}>
                                        <Datagrid disableAdd disableRemove>
                                            <TextField source="name" label="Subcategory"/>
                                        </Datagrid>
                                    </ArrayField>
                                </Datagrid>
                            </ArrayField>
                            <ArrayField label="Jobs" source="jobs" style={{ width: '100%' }}>
                                <Datagrid disableAdd disableRemove>
                                    <TextField source="title" label="Title"/>
                                    <TextField source="hoursPerWeek" label="Hours per week"/>
                                    <TextField source="hourlyPay" label="Hourly rate"/>
                                    <TextField source="type" label="Type"/>
                                    <TextField source="locked" label="Locked"/>
                                    <TextField source="hourlyRateLocked" label="Hourly rate locked"/>
                                </Datagrid>
                            </ArrayField>
                            <TextField source="experienceLevel" label="Experience level"/>
                            <TextField source="budget" label="Budget"/>
                            <TextField source="status.name" label="Status"/>
                            <TextField source="dateFrom" label="From"/>
                            <TextField source="dateTo" label="To"/>
                            <TextField source="completedAt" label="Completed at"/>
                            <TextField source="createdAt" label="Created"/>
                            <TextField source="updatedAt" label="Updated"/>

                            {/*<ArrayField source="projectSkills" style={{width:'100%'}} >*/}
                            {/*<Datagrid disableAdd disableRemove >*/}
                            {/*<TextField source="title" label="title" />*/}
                            {/*</SimpleFormIterator>*/}
                            {/*</ArrayInput>*/}

                            <TextField source="workWeeks" label="Work weeks"/>

                            <TextField source="company.location.country.name" label="Country"/>
                            <TextField source="company.location.country.shortName" label="Country (short)"/>
                            <TextField source="company.location.state.name" label="State"/>
                            <TextField source="company.location.state.shortName" label="State (short)"/>
                            <TextField source="company.location.city" label="City"/>
                            <TextField source="company.location.zipCode" label="ZIP"/>
                        </Datagrid>
                    </ArrayField>
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
};

export const CompanyCreate = (props) =>
    <Create {...props}>
        {/*<SimpleForm redirect="list">*/}
        {/*<ReferenceArrayInput source="categories" label="Categories" reference="category">*/}
        {/*<SelectArrayInput optionText="title" />*/}
        {/*</ReferenceArrayInput>*/}
        {/*<LongTextInput source="title"*/}
        {/*validate={[required(), minLength(3), maxLength(100)]} />*/}
        {/*<RichTextInput source="description"*/}
        {/*toolbar={AppConfig.wysiwygOptions}*/}
        {/*validate={[minLength(5)]}*/}
        {/*/>*/}
        {/*<ImageInput source="image" accept="image/*" multiple>*/}
        {/*<ImageField source="file" title="name" />*/}
        {/*</ImageInput>*/}
        {/*<ReferenceArrayInput source="tags" label="Tags" reference="allTags" perPage={100} >*/}
        {/*<SelectArrayInput optionText="title" />*/}
        {/*</ReferenceArrayInput>*/}
        {/*</SimpleForm>*/}
    </Create>
;