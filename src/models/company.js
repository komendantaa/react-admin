import { AppConfig } from '../AppConfig';

export const prepareCompaniesApiModel = company => {
    let model = {};
    if(company.newAvatar) model.avatarFileName = company.newAvatar;
    if(company.firstName) model.firstName = company.firstName;
    if(company.lastName) model.lastName = company.lastName;
    if(company.companyName) model.companyName = company.companyName;
    if(company.email) model.email = company.email;
    if(company.jobPosition) model.jobPosition = company.jobPosition;
    model.isConfidentialLocation = company.isConfidentialLocation;
    model.isPublic = company.isPublic;
    model.isActive = company.isActive;
    if(company.country) model.country = company.country;
    if(company.state) model.state = company.state;
    if(company.location && company.location.city) model.city = company.location.city;
    if(company.location && company.location.zipCode) model.zipCode = company.location.zipCode;
    if(company.shortDescription) model.shortDescription = company.shortDescription;

    return model;
};

export const prepareCompaniesInterfaceModel = company => {
    let model = {};
    if(company.avatar) {
        model.avatar = { file: AppConfig.imgUrl + company.avatar, name: 'avatar' };
    } else {
        model.avatar = company.avatarUrl ? { file: AppConfig.imgUrl + company.avatarUrl, name: 'avatar' } : '';
    }
    model.firstName = company.firstName;
    model.lastName = company.lastName;
    model.id = company.id;
    model.companyName = company.companyName;
    model.newAvatar = '';
    model.email = company.email;
    model.jobPosition = company.jobPosition;
    model.isConfidentialLocation = company.isConfidentialLocation;
    model.isPublic = company.isPublic;
    model.isActive = company.isActive;
    model.country = company.location.country.id;
    model.state = company.location.state.id;
    model.location = company.location;
    model.shortDescription = company.shortDescription;
    model.slug = company.slug;
    model.projects = company.projects ? company.projects : [];
    return model;
};