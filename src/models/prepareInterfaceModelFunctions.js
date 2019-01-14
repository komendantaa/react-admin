import {
    prepareAssessmentsInterfaceModel, prepareCategoriesInterfaceModel, prepareCompaniesInterfaceModel,
    prepareCountriesInterfaceModel, prepareDegreeInterfaceModel, prepareExpierenceInterfaceModel,
    prepareIndustriesInterfaceModel, preparePagesInterfaceModel, prepareParentCategoriesInterfaceModel,
    prepareProjectInterfaceModel, prepareReportInterfaceModel, prepareFeatureInterfaceModel,
    prepareSkillsInterfaceModel, prepareStatesInterfaceModel, prepareProfessionalInterfaceModel,
    prepareHowItWorksInterfaceModel, prepareJobAreaInterfaceModel, prepareTagsInterfaceModel,
    prepareAtriclesInterfaceModel, prepareCommentInterfaceModel, prepareBlogCategoriesInterfaceModel,
    prepareTestimonialInterfaceModel, prepareNotificationsInterfaceModel
} from './index';

export const prepareInterfaceModelFunctions = {
    professional: prepareProfessionalInterfaceModel,
    allProfessional: prepareProfessionalInterfaceModel,
    company: prepareCompaniesInterfaceModel,
    allCompany: prepareCompaniesInterfaceModel,
    skill: prepareSkillsInterfaceModel,
    page: preparePagesInterfaceModel,
    industry: prepareIndustriesInterfaceModel,
    category: prepareCategoriesInterfaceModel,
    parentCategory: prepareParentCategoriesInterfaceModel,
    assessment: prepareAssessmentsInterfaceModel,
    country: prepareCountriesInterfaceModel,
    state: prepareStatesInterfaceModel,
    degree: prepareDegreeInterfaceModel,
    experienceType: prepareExpierenceInterfaceModel,
    project: prepareProjectInterfaceModel,
    allProject: prepareProjectInterfaceModel,
    report: prepareReportInterfaceModel,
    'our-features': prepareFeatureInterfaceModel,
    'how-it-work': prepareHowItWorksInterfaceModel,
    'job-areas': prepareJobAreaInterfaceModel,
    testimonials: prepareTestimonialInterfaceModel,
    article: prepareAtriclesInterfaceModel,
    comment: prepareCommentInterfaceModel,
    tag: prepareTagsInterfaceModel,
    blogCategory: prepareBlogCategoriesInterfaceModel,
    notification: prepareNotificationsInterfaceModel
};