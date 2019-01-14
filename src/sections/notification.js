import React from 'react';
import {
    List, Datagrid, TextField, DeleteButton, DateField
} from 'react-admin';

const ListPagination = () => <span></span>;

export const NotificationList = (props) => (
    <List title="Notifications"
          bulkActions={false}
          {...props}
          pagination={<ListPagination/>}
          sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid>
            <TextField source="text"/>
            <DateField showTime source="createdAt"/>
            <DeleteButton/>
        </Datagrid>
    </List>
);
