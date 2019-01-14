import React from 'react';
import {
    List, Datagrid, TextField, ShowButton, TextInput, Filter, Pagination, BooleanField, Show, ArrayField,
    SimpleShowLayout, ReferenceArrayField, SingleFieldList, ChipField, DateField, FormDataConsumer, RichTextField
} from 'react-admin';

const ProjectFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);

const ListPagination = props => <Pagination rowsPerPageOptions={[ 10 ]} {...props} />;

export const ProjectList = (props) => (
    <List title="Projects"
          bulkActions={false}
          {...props}
          sort={{ field: 'position', order: 'ASC' }}
          filters={<ProjectFilter/>}
          pagination={<ListPagination/>}
    >
        <Datagrid key="id">
            <TextField source="title"/>
            <TextField source="company.name" label='Company Name'/>
            <TextField source="budget"/>
            <BooleanField source="isReviewed"/>
            <TextField source="status.name" label='status'/>
            <ShowButton/>
        </Datagrid>
    </List>
);

const ProjectModel = ({ record }) => <span>{record ? `${record.title} (#${record.slug})` : 'Project'}</span>;

export const ProjectShow = (props) =>
    <Show title={<ProjectModel/>} {...props} >
        <SimpleShowLayout redirect="list">
            {/*<ReferenceField label="Company" source="company.id" reference="company">*/}
            {/*<TextField source="fullName" />*/}
            {/*</ReferenceField>*/}
            <TextField source="company.name" label="Company"/>
            <TextField source="budget" label="Budget, USD"/>
            <ReferenceArrayField label="Categories" source="categories" reference="category" style={{ width: '100%' }}>
                <SingleFieldList>
                    <ChipField source="name"/>
                </SingleFieldList>
            </ReferenceArrayField>
            <DateField source="createdAt"></DateField>
            <FormDataConsumer>
                {({ formData, ...rest }) => !formData.completedAt && <DateField source="completedAt"></DateField>}
            </FormDataConsumer>
            <DateField source="dateFrom"></DateField>
            <DateField source="dateTo"></DateField>
            <RichTextField source="description"></RichTextField>
            <TextField source="experienceLevel" label="Experience Level"/>
            <BooleanField source="isReviewed"/>
            <TextField source="status.name" label='status'/>
            <TextField source="workWeeks" label='workWeeks'/>
            <ReferenceArrayField label="Skills" source="projectSkills" reference="skill" style={{ width: '100%' }}>
                <SingleFieldList>
                    <ChipField source="title"/>
                </SingleFieldList>
            </ReferenceArrayField>
            <ArrayField label="Jobs" source="jobs" style={{ width: '100%' }}>
                <SingleFieldList>
                    <ChipField source="title"/>
                </SingleFieldList>
            </ArrayField>
            <DateField source="updatedAt"></DateField>
        </SimpleShowLayout>
    </Show>
;
