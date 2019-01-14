import React from 'react';
import { Admin, Resource } from 'react-admin';

import authProvider from './authProvider';
import dataProvider from './dataProvider';

import Layout from './Layout';
import Login from './custom-components/Login'

import {
    ProfessionalList, ProfessionalEdit, ProfessionalShow, CompanyList, CompanyEdit, CompanyShow, SkillList, SkillEdit,
    SkillCreate, IndustryList, IndustryEdit, IndustryCreate, CategoryList, CategoryEdit, CategoryCreate, AssessmentList,
    AssessmentEdit, AssessmentCreate, AssessmentShow, ProjectList, ProjectShow, JobAreaList, JobAreaEdit, JobAreaCreate,
    FeatureList, FeatureEdit, FeatureCreate, ReportList, PagesList, PagesEdit, PagesCreate, HowItWorksList,
    HowItWorksCreate, HowItWorksEdit, ArticleCreate, ArticleEdit, ArticleList, BlogCategoryCreate, BlogCategoryEdit,
    BlogCategoryList, TagCreate, TagEdit, TagList, CommentCreate, CommentEdit, CommentList, TestimonialList,
    TestimonialCreate, TestimonialEdit, ArticleShow, NotificationList
} from './sections';
import notifications from './notifications/notificationsReducer';

const App = () => (
    <Admin
        title="Admin panel"
        appLayout={Layout}
        loginPage={Login}
        authProvider={authProvider}
        dataProvider={dataProvider}
        customReducers={{ notifications }}
    >
        <Resource
            name="company"
            list={CompanyList}
            edit={CompanyEdit}
            show={CompanyShow}
        />
        <Resource
            name="professional"
            list={ProfessionalList}
            edit={ProfessionalEdit}
            show={ProfessionalShow}
        />
        <Resource
            name="skill"
            list={SkillList}
            edit={SkillEdit}
            create={SkillCreate}
        />
        <Resource
            name="industry"
            list={IndustryList}
            edit={IndustryEdit}
            create={IndustryCreate}
        />
        <Resource
            name="category"
            list={CategoryList}
            edit={CategoryEdit}
            create={CategoryCreate}
        />
        <Resource
            name="assessment"
            list={AssessmentList}
            // edit={AssessmentEdit}
            show={AssessmentShow}
            create={AssessmentCreate}
        />
        <Resource
            name="project"
            list={ProjectList}
            show={ProjectShow}
        />
        <Resource
            name="report"
            list={ReportList}
        />
        <Resource
            name="page"
            list={PagesList}
            edit={PagesEdit}
            create={PagesCreate}
        />
        <Resource
            name="job-areas"
            list={JobAreaList}
            edit={JobAreaEdit}
            create={JobAreaCreate}
        />
        <Resource
            name="our-features"
            list={FeatureList}
            edit={FeatureEdit}
            create={FeatureCreate}
        />
        <Resource
            name="how-it-work"
            list={HowItWorksList}
            edit={HowItWorksEdit}
            create={HowItWorksCreate}
        />
        <Resource
            name="testimonials"
            list={TestimonialList}
            edit={TestimonialEdit}
            create={TestimonialCreate}
        />
        <Resource
            name="article"
            list={ArticleList}
            edit={ArticleEdit}
            show={ArticleShow}
            create={ArticleCreate}
        />
        <Resource
            name="blogCategory"
            list={BlogCategoryList}
            edit={BlogCategoryEdit}
            create={BlogCategoryCreate}
        />
        <Resource
            name="tag"
            list={TagList}
            edit={TagEdit}
            create={TagCreate}
        />
        <Resource
            name="comment"
            list={CommentList}
            edit={CommentEdit}
            create={CommentCreate}
        />
        <Resource
            name="notification"
            list={NotificationList}
        />
        <Resource name="country"/>
        <Resource name="state"/>
        <Resource name="degree"/>
        <Resource name="experienceType"/>
        <Resource name="parentCategory"/>
        <Resource name="allProject"/>
        <Resource name="allProfessional"/>
        <Resource name="allCompany"/>
    </Admin>
);

export default App;
