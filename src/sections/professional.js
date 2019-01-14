import React from 'react';
import {
    List, Datagrid, TextField, EditButton, DisabledInput, Edit, TabbedForm, TextInput, BooleanInput, FormTab,
    LongTextInput, ImageInput, ImageField, Filter, FileInput, FileField, required, minLength, ArrayInput,
    SimpleFormIterator, DateInput, SelectInput, BooleanField, Pagination, Show, RichTextField, ShowButton,
    TabbedShowLayout, Tab, ArrayField, DateField, ChipField, SingleFieldList, ReferenceInput, ReferenceArrayInput,
    SelectArrayInput, ReferenceArrayField, ReferenceField, maxLength
} from 'react-admin';
import EditToolbar from '../custom-components/EditTollbarSaveOnly';

const ProfessionalFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Keyword" source="user" alwaysOn/>
        <TextInput label="Location" source="location" alwaysOn/>
    </Filter>
);

const ListPagination = props => <Pagination rowsPerPageOptions={[ 10 ]} {...props} />;

export const ProfessionalList = (props) => (
    <List title="Professionals"
          bulkActions={false}
          {...props}
          sort={{ field: 'firstName', order: 'ASC' }}
          filters={<ProfessionalFilter/>}
          pagination={<ListPagination/>}
    >
        <Datagrid key="id">
            <TextField source="firstName"/>
            <TextField source="lastName"/>
            <TextField source="location.city" label="Location"/>
            <BooleanField source="isPublic" label="Is public"/>
            <BooleanField source="isActive" label="Is active"/>
            <ShowButton/>
            <EditButton/>
        </Datagrid>
    </List>
);

const ProfessionalModel = ({ record }) => {
    return (
        <span>
            {record ? `${record.firstName} ${record.lastName} (#${record.id})` : 'Professional'}
        </span>
    );
};

export const ProfessionalEdit = (props) => {
    return (
        <Edit title={<ProfessionalModel/>} {...props} >
            <TabbedForm redirect="list" toolbar={<EditToolbar/>}>
                <FormTab label="summary" style={{ display: 'flex' }}>
                    <ImageField source="avatar.file" title="avatar.name"/>
                    <BooleanInput source="isPublic" label="Profile is public"/>
                    <BooleanInput source="isActive" label="Profile is active"/>
                    <TextInput source="firstName" validate={[ required(), minLength(3) ]}/>
                    <TextInput source="lastName" validate={[ required(), minLength(3) ]}/>
                    <TextInput source="email" validate={[ required(), minLength(3) ]}/>
                    <DisabledInput source="reviews" label="Rate / Amount"/>
                    <TextInput source="hourRate" validate={[ required() ]}/>
                    <LongTextInput source="shortDescription" validate={[ required(), minLength(3), maxLength(500) ]}/>
                </FormTab>

                <FormTab label="location" style={{ display: 'flex' }}>
                    <ReferenceInput label="Country" source="location.country.id" reference="country">
                        <SelectInput optionText="name"/>
                    </ReferenceInput>
                    <ReferenceInput label="State" source="location.state.id" reference="state">
                        <SelectInput optionText="name"/>
                    </ReferenceInput>
                    <TextInput source="location.city" label="City"/>
                    <TextInput source="location.zipCode" label="ZIP"/>
                    <BooleanInput source="isConfidentialLocation" label="Location is confidential"/>
                </FormTab>

                <FormTab label="education">
                    <ArrayInput source="educations" style={{ width: '100%' }}>
                        <SimpleFormIterator>
                            <ReferenceInput label="Degree name" source="degree.id" reference="degree">
                                <SelectInput optionText="name"/>
                            </ReferenceInput>
                            <TextInput source="institutionName" label="Institution Name"/>
                            <TextInput source="major" label="Major"/>
                            <DateInput source="gradYear" label="Graduation year"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>

                <FormTab label="certifications">

                    {/*<FormTab label="assessments & certifications">*/}
                    {/*<ArrayInput source="assessments" style={{width:'100%'}} >*/}
                    {/*<SimpleFormIterator disableAdd disableRemove>*/}
                    {/*<DisabledInput source="title" label="Title" style={{display:'inline-block'}}/>*/}
                    {/*<DisabledInput source="score" label="Score" style={{display:'inline-block'}}/>*/}
                    {/*</SimpleFormIterator>*/}
                    {/*</ArrayInput>*/}

                    <ArrayInput source="certifications" style={{ width: '100%' }}>
                        <SimpleFormIterator>
                            <DateInput source="dateFrom" label="From"/>
                            <DateInput source="dateTo" label="To"/>
                            <TextInput source="title" label="Title"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>

                <FormTab label="experience">
                    <ArrayInput source="experiences" style={{ width: '100%' }}>
                        <SimpleFormIterator>
                            <TextInput source="companyName" label="Company name"/>
                            <TextInput source="role" label="Role"/>
                            <DateInput source="dateFrom" label="From"/>
                            <DateInput source="dateTo" label="To"/>
                            <TextInput source="description" label="Description"/>
                            <ReferenceInput label="Experience type" source="experienceType.id"
                                            reference="experienceType">
                                <SelectInput optionText="name"/>
                            </ReferenceInput>
                            <BooleanInput source="isCurrent" label="Is current"/>
                            <TextInput source="jobTitle" label="Job title"/>
                        </SimpleFormIterator>
                    </ArrayInput>

                    <ReferenceArrayInput label="Work Industries" source="workIndustries" reference="industry"
                                         style={{ width: '100%' }}>
                        <SelectArrayInput optionText="title">
                            <ChipField source="title"/>
                        </SelectArrayInput>
                    </ReferenceArrayInput>

                    <ReferenceArrayInput label="Skills" source="skills" reference="skill" style={{ width: '100%' }}>
                        <SelectArrayInput optionText="title">
                            <ChipField source="title"/>
                        </SelectArrayInput>
                    </ReferenceArrayInput>
                </FormTab>

                <FormTab label="projects">
                    <ArrayInput source="projects" style={{ width: '100%' }}>
                        <SimpleFormIterator disableAdd disableRemove>
                            <DisabledInput source="title" label="Project title"/>
                            <DisabledInput source="status.name" label="Project status"/>
                            <DisabledInput source="company.name" label="Company"/>
                            <DisabledInput source="company.location.country.name" label="Country"/>
                            <DisabledInput source="company.location.country.shortName" label="Country (short)"/>
                            <DisabledInput source="company.location.state.name" label="State"/>
                            <DisabledInput source="company.location.state.shortName" label="State (short)"/>
                            <DisabledInput source="company.location.city" label="City"/>
                            <DisabledInput source="company.location.zipCode" label="ZIP"/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </FormTab>

                <FormTab label="files">
                    <ImageField source="avatar.file" title="avatar.name"/>

                    <ImageInput source="newAvatar" accept="image/*">
                        <ImageField source="file" title="name"/>
                    </ImageInput>
                    <FileField source="resume.file" title="resume.name"/>

                    <FileInput source="newResume" accept="application/pdf">
                        <FileField source="file" title="name"/>
                    </FileInput>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export const ProfessionalShow = (props) => {
    return (
        <Show title={<ProfessionalModel/>} {...props} >
            <TabbedShowLayout redirect="list">
                <Tab label="summary" style={{ display: 'flex' }}>
                    <ImageField source="avatar.file" title="avatar.name"/>
                    <BooleanField source="isPublic" label="Profile is public"/>
                    <BooleanField source="isActive" label="Profile is active"/>
                    <TextField source="firstName" validate={[ required(), minLength(3) ]}/>
                    <TextField source="lastName" validate={[ required(), minLength(3) ]}/>
                    <TextField source="email" validate={[ required(), minLength(3) ]}/>
                    <TextField source="reviews" label="Rate / Amount"/>
                    <TextField source="hourRate" validate={[ required() ]}/>
                    <RichTextField source="shortDescription" validate={[ required(), minLength(3) ]}/>
                </Tab>

                <Tab label="location" style={{ display: 'flex' }}>
                    <ReferenceField label="Country" source="location.country.id" reference="country" linkType={false}>
                        <TextField source="name"/>
                    </ReferenceField>
                    <ReferenceField label="State" source="location.state.id" reference="state" linkType={false}>
                        <TextField source="name"/>
                    </ReferenceField>
                    <TextField source="location.city" label="City"/>
                    <TextField source="location.zipCode" label="ZIP"/>
                    <BooleanField source="isConfidentialLocation" label="Location is confidential"/>
                </Tab>

                <Tab label="education">
                    <ArrayField source="educations" style={{ width: '100%' }}>
                        <Datagrid>
                            <ReferenceField label="Degree name" source="degree.id" reference="degree" linkType={false}>
                                <TextField source="name"/>
                            </ReferenceField>
                            <TextField source="degree.shortName" label="Degree Short Name"/>
                            <TextField source="institutionName" label="Institution Name"/>
                            <TextField source="major" label="Major"/>
                            <DateField source="gradYear" label="Graduation year"/>
                        </Datagrid>
                    </ArrayField>
                </Tab>

                <Tab label="assessments & certifications">
                    <ArrayField source="assessments" style={{ width: '100%' }}>
                        <Datagrid>
                            <TextField source="title" label="Title" style={{ display: 'inline-block' }}/>
                            <TextField source="score" label="Score" style={{ display: 'inline-block' }}/>
                        </Datagrid>
                    </ArrayField>

                    <ArrayField source="certifications" style={{ width: '100%' }}>
                        <Datagrid>
                            <DateField source="dateFrom" label="From"/>
                            <DateField source="dateTo" label="To"/>
                            <TextField source="title" label="Title"/>
                        </Datagrid>
                    </ArrayField>
                </Tab>

                <Tab label="experience">
                    <ArrayField source="experiences" style={{ width: '100%' }}>
                        <Datagrid>
                            <TextField source="companyName" label="Company name"/>
                            <TextField source="role" label="Role"/>
                            <DateField source="dateFrom" label="From"/>
                            <DateField source="dateTo" label="To"/>
                            <TextField source="description" label="Description"/>
                            <ReferenceField label="Experience type" source="experienceType.id"
                                            reference="experienceType" linkType={false}>
                                <TextField source="name"/>
                            </ReferenceField>
                            <BooleanField source="isCurrent" label="Is current"/>
                            <TextField source="jobTitle" label="Job title"/>
                        </Datagrid>
                    </ArrayField>

                    <ReferenceArrayField label="Work Industries" source="workIndustries" reference="industry"
                                         style={{ width: '100%' }}>
                        <SingleFieldList>
                            <ChipField source="title"/>
                        </SingleFieldList>
                    </ReferenceArrayField>

                    <ReferenceArrayField label="Skills" source="skills" reference="skill" style={{ width: '100%' }}>
                        <SingleFieldList>
                            <ChipField source="title"/>
                        </SingleFieldList>
                    </ReferenceArrayField>
                </Tab>

                <Tab label="projects">
                    <ArrayField source="projects" style={{ width: '100%' }}>
                        <Datagrid>
                            {/*<ReferenceField label="Project title" source="slug" reference="project" linkType="show">*/}
                            {/*<TextField source="title"/>*/}
                            {/*</ReferenceField>*/}
                            <TextField source="title" label="Project title"/>
                            <TextField source="status.name" label="Project status"/>
                            <TextField source="company.name" label="Company"/>
                            <TextField source="company.location.country.name" label="Country"/>
                            <TextField source="company.location.country.shortName" label="Country (short)"/>
                            <TextField source="company.location.state.name" label="State"/>
                            <TextField source="company.location.state.shortName" label="State (short)"/>
                            <TextField source="company.location.city" label="City"/>
                            <TextField source="company.location.zipCode" label="ZIP"/>
                        </Datagrid>
                    </ArrayField>
                </Tab>

                <Tab label="files">
                    <ImageField source="avatar.file" title="avatar.name"/>
                    <FileField source="resume.file" title="resume.name"/>
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
};
