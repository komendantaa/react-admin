import React from 'react';
import {
    List, Datagrid, TextField, TextInput, Filter, ReferenceField, BooleanInput, SelectInput, Pagination, ArrayField,
    ReferenceInput, AutocompleteInput, DateInput, DateField, downloadCSV
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import { AppConfig } from '../AppConfig';
import { unparse as convertToCSV } from 'papaparse/papaparse.min';

const exporter = reports => {
    const modificatedReports = [];
    reports.forEach(report => {
        const { professional, company } = report;
        const subReports = professional ? professional : company;
        subReports.forEach((prof, i) => {
            prof.projectName = report.projectName;
            prof.category = prof.categoryId === 1 ? 'Accounting' : (prof.categoryId === 2 ? 'Finance' : 'Technology');
            prof.total = i < subReports.length - 1 ? '' : report.total;
            const tmpDate = new Date(prof.date);
            prof.date = `${tmpDate.getMonth() + 1}/${tmpDate.getDate()}/${tmpDate.getFullYear()}`;
            modificatedReports.push(prof);
        });
    });

    const csv = convertToCSV({
        data: modificatedReports,
        fields: ['projectName', 'category', companyReport ? 'professionalName' : 'companyName', 'hours', 'date', 'amount', 'total']
    });
    downloadCSV(csv, 'report');
};

let companyReport = null;

const ReportFilter = (props) => {
    companyReport = props.filterValues.companyReport;
    return <Filter {...props}>
        <BooleanInput label="Company Report" source="companyReport" className="full" alwaysOn/>
        <DateInput label="Date From" source="dateFrom" alwaysOn />
        <DateInput label="Date To" source="dateTo" alwaysOn/>
        <ReferenceInput label="Project" source="project" reference="allProject">
            <AutocompleteInput optionText="title"/>
        </ReferenceInput>
        <ReferenceInput label="Category" source="category" reference="parentCategory">
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label={companyReport ? "Professional" : "Company"}
                        source={companyReport ? "professional" : "company"}
                        reference={companyReport ? "allProfessional" : "allCompany"}>
            <AutocompleteInput optionText={companyReport ? "fullName" : "companyName"}/>
        </ReferenceInput>
        <TextInput label={`Amount ${companyReport ? 'Spent' : 'Earned'}`} source="amount"/>
    </Filter>
};

const ListPagination = props => <Pagination rowsPerPageOptions={[ 10 ]} {...props} />;

const styles = theme => ({
    project: { verticalAlign: 'top', paddingTop: '20px!important' },
    totalHeader: { fontWeight: '600' },
    totalCell: { verticalAlign: 'bottom', paddingBottom: '15px!important' },
    totalBold: { fontWeight: '600' },
});

const CustomURL = ({ type, record }) => {
    let id, name;
    if(type === 'project') {
        id = record.projectId;
        name = record.projectName;
    } else if(type === 'company') {
        id = record.company;
        name = record.companyName;
    } else {
        id = record.professional;
        name = record.professionalName;
    }
    return <a href={`${AppConfig.adminUrl}/#/${type}/${id}/show`}>
        {name}
    </a>
};

CustomURL.defaultProps = {
    addLabel: true,
    label: 'Name'
};

const ReportList = ({ classes, ...props }) => {
    if(!companyReport) companyReport = props.location.search.includes('companyReport%22%3Atrue');

    return (
        <List title="Company Reports"
              perPage={10}
              bulkActions={false}
              {...props}
              exporter={exporter}
              filters={<ReportFilter/>}
              filterDefaultValues={{
                  dateFrom: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`,
                  dateTo: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
              }}
              pagination={<ListPagination/>}
        >
            <Datagrid key="id">
                <CustomURL type="project" {...props} />
                <ArrayField source={companyReport ? 'company' : 'professional'} label=''>
                    <Datagrid>
                        <ReferenceField label="Category" source="categoryId" reference="category" linkType={false}>
                            <TextField source="name"/>
                        </ReferenceField>
                        <CustomURL type={companyReport ? 'professional' : 'company'} {...props}/>
                        <TextField source="hours"/>
                        <DateField source="date" locales="en-EN"/>
                        <TextField source="amount" label={`Amount ${companyReport ? 'Spent' : 'Earned'}`}/>

                    </Datagrid>
                </ArrayField>
                <TextField source="total"
                           headerClassName={classes.totalHeader}
                           cellClassName={classes.totalCell}
                           className={classes.totalBold}/>
            </Datagrid>
        </List>
    )
};

export default withStyles(styles)(ReportList);
