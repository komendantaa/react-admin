import React from 'react';
import {
    List, Datagrid, TextField, EditButton, Edit, Create, LongTextInput, required, minLength, SimpleForm,
    ImageField, ImageInput, TextInput, NumberInput, minValue, DeleteButton, maxValue
} from 'react-admin';

const ListPagination = () => <span></span>;

export const TestimonialList = (props) => (
    <List title="Homepage / Job Areas"
          bulkActions={false}
          pagination={<ListPagination/>}
          {...props}
    >
        <Datagrid key="id">
            <TextField source="userName"/>
            <TextField source="text"/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const TestimonialModel = ({ record }) =>
    <span>{`Homepage / ${record.id ? `Testimonial #${record.id}` : 'New Testimonial'}`}</span>;

const message = 'From 1 to 5';

export const TestimonialEdit = (props) => {
    return (
        <Edit title={<TestimonialModel/>} {...props} >
            <SimpleForm redirect="list">
                <TextInput source="userName"/>
                <ImageField source="userPhoto.file" title="userPhoto.name" label="Photo"/>
                <ImageInput source="newUserPhoto" accept="image/*">
                    <ImageField source="file" title="name"/>
                </ImageInput>
                <NumberInput source="rate" validate={[ required(), minValue(1, message), maxValue(5, message) ]}/>
                <LongTextInput source="experience" validate={[ required(), minLength(1) ]}/>
                <LongTextInput source="industries" validate={[ required(), minLength(1) ]}/>
                <LongTextInput source="text" validate={[ required(), minLength(1) ]}/>
            </SimpleForm>
        </Edit>
    );
};

export const TestimonialCreate = (props) => {
    return (
        <Create title={<TestimonialModel/>} {...props} >
            <SimpleForm redirect="list">
                <TextInput source="userName"/>
                <ImageInput source="newUserPhoto" accept="image/*">
                    <ImageField source="file" title="name"/>
                </ImageInput>
                <NumberInput source="rate" validate={[ required(), minValue(1, message), maxValue(5, message) ]}/>
                <LongTextInput source="experience" validate={[ required(), minLength(1) ]}/>
                <LongTextInput source="industries" validate={[ required(), minLength(1) ]}/>
                <LongTextInput source="text" validate={[ required(), minLength(1) ]}/>
            </SimpleForm>
        </Create>
    );
};
