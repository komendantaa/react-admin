import {
    prepareAssessmentsApiModel, prepareCategoriesApiModel, prepareCompaniesApiModel, prepareFeatureApiModel,
    prepareIndustriesApiModel, preparePagesApiModel, prepareSkillsApiModel, prepareProfessionalApiModel,
    prepareHowItWorksApiModel, prepareJobAreaApiModel, prepareAtriclesApiModel, prepareBlogCategoriesApiModel,
    prepareCommentApiModel, prepareTagsApiModel, prepareTestimonialApiModel
} from './index';

export const prepareApiModelFunctions = {
    professional: prepareProfessionalApiModel,
    company: prepareCompaniesApiModel,
    skill: prepareSkillsApiModel,
    page: preparePagesApiModel,
    industry: prepareIndustriesApiModel,
    category: prepareCategoriesApiModel,
    assessment: prepareAssessmentsApiModel,
    'our-features': prepareFeatureApiModel,
    'how-it-work': prepareHowItWorksApiModel,
    'job-areas': prepareJobAreaApiModel,
    testimonials: prepareTestimonialApiModel,
    article: prepareAtriclesApiModel,
    comment: prepareCommentApiModel,
    tag: prepareTagsApiModel,
    blogCategory: prepareBlogCategoriesApiModel
};