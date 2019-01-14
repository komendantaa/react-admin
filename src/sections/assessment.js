import React from 'react';
import {
    List, Datagrid, TextField, EditButton, ShowButton, Edit, Create, TextInput, Filter, RichTextField, ArrayInput,
    required, minLength, maxLength, Pagination, SimpleForm, Show, ArrayField, LongTextInput, SimpleShowLayout,
    ReferenceManyField, SingleFieldList, ChipField, BooleanField, ReferenceInput, SelectInput, SimpleFormIterator,
    BooleanInput, NumberInput, FormDataConsumer
} from 'react-admin';
import EditToolbar from '../custom-components/EditTollbarSaveOnly';

const AssessmentFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
    </Filter>
);

const ListPagination = props => <Pagination rowsPerPageOptions={[ 10 ]} {...props} />;

export const AssessmentList = (props) => (
    <List title="Assessments"
          bulkActions={false}
          {...props}
          filters={<AssessmentFilter/>}
          pagination={<ListPagination/>}
    >
        <Datagrid key="id">
            <TextField source="title"/>
            <TextField source="category"/>
            <ShowButton/>
            {/*<EditButton />*/}
        </Datagrid>
    </List>
);

const AssessmentModel = ({ record }) => <span>{record.id ? `Assessment #${record.id}` : 'New Assessment'}</span>;

export const AssessmentShow = (props) => {
    return (
        <Show title={<AssessmentModel/>} {...props} >
            <SimpleShowLayout redirect="list">
                <TextField source="title"/>
                <TextField source="category"/>
                <RichTextField source="description"/>
                <TextField source="label"/>
                <TextField source="timeLimit"/>
                <ArrayField source="questions">
                    <Datagrid>
                        <TextField source="text" label="Question"/>
                        <ArrayField source="answers">
                            <Datagrid>
                                <BooleanField source="correct" label="Is Correct"/>
                                <TextField source="title" label="Variants"/>
                            </Datagrid>
                        </ArrayField>
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
};

// export const AssessmentEdit = (props) => {
//     return (
//         <Edit title={<AssessmentModel />} {...props} >
//             <SimpleForm redirect="list" toolbar={<EditToolbar />} >
//                 <LongTextInput source="title" validate={[required(), minLength(1), maxLength(1000)]} />
//                 <ReferenceInput source="categoryId" reference="parentCategory">
//                     <SelectInput optionText="name" />
//                 </ReferenceInput>
//                 <LongTextInput source="description" validate={[required(), minLength(1), maxLength(100)]} />
//                 <TextInput source="label"  validate={[required(), minLength(1), maxLength(100)]} />
//                 <NumberInput source="timeLimit" validate={[required(), minLength(1), maxLength(100)]} />
//                 <ArrayInput source="questions" style={{width:'100%'}}>
//                     <SimpleFormIterator>
//                         <LongTextInput source="text" label="Question" validate={[required(), minLength(1), maxLength(1000)]} />
//                         <ArrayInput source="answers" label="Answers" style={{width:'100%'}} >
//                             <SimpleFormIterator style={{display:'flex'}}>
//                                 <LongTextInput source="title" label="Variant"
//                                            style={{display:'inline-block', width:'100%'}}
//                                            validate={[required(), minLength(1), maxLength(100)]} />
//                                 <BooleanInput source="correct" label="Is Correct" style={{display:'inline-block'}} />
//                             </SimpleFormIterator>
//                         </ArrayInput>
//                     </SimpleFormIterator>
//                 </ArrayInput>
//             </SimpleForm>
//         </Edit>
//     );
// };

export const AssessmentCreate = (props) => {
    return (
        <Create title={<AssessmentModel/>} {...props} >
            <SimpleForm redirect="list">
                <LongTextInput source="title" validate={[ required(), minLength(1), maxLength(1000) ]}/>
                <ReferenceInput source="categoryId" reference="parentCategory" validate={[ required() ]}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <LongTextInput source="description" validate={[ required(), minLength(1), maxLength(100) ]}/>
                <TextInput source="label" validate={[ required(), minLength(1), maxLength(100) ]}/>
                <NumberInput source="timeLimit" validate={[ required(), minLength(1), maxLength(100) ]}/>
                <ArrayInput source="questions" style={{ width: '100%' }} validate={required()}>
                    <SimpleFormIterator>
                        <LongTextInput source="text" label="Question"
                                       validate={[ required(), minLength(1), maxLength(1000) ]}/>
                        <ArrayInput source="answers" label="Answers" style={{ width: '100%' }} validate={required()}>
                            <SimpleFormIterator style={{ display: 'flex' }}>
                                <LongTextInput source="title" label="Variant"
                                               style={{ display: 'inline-block', width: '100%' }}
                                               validate={[ required(), minLength(1), maxLength(100) ]}/>
                                <BooleanInput source="correct" label="Is Correct" style={{ display: 'inline-block' }}/>
                            </SimpleFormIterator>
                        </ArrayInput>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
};
