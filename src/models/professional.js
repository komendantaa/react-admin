import { AppConfig } from '../AppConfig';

export const prepareProfessionalApiModel = user => {
    let model = {};
    if(user.newAvatar) model.avatarFileName = user.newAvatar;
    if(user.newResume) model.resumeFileName = user.newResume;
    model.isPublic = user.isPublic;
    model.isActive = user.isActive;
    if(user.firstName) model.firstName = user.firstName;
    if(user.lastName) model.lastName = user.lastName;
    if(user.email) model.email = user.email;
    if(user.hourRate) model.hourRate = user.hourRate;
    if(user.shortDescription) model.shortDescription = user.shortDescription;
    model.isConfidentialLocation = user.isConfidentialLocation;
    if(user.location && user.location.country && user.location.country.id) model.country = user.location.country.id;
    if(user.location && user.location.state && user.location.state.id) model.state = user.location.state.id;
    if(user.location && user.location.city) model.city = user.location.city;
    if(user.location && user.location.zipCode) model.zipCode = user.location.zipCode;

    if(user.educations.length) {
        let updatedEducations = [];
        user.educations.forEach(el => {
            let education = {};
            education.institutionName = el.institutionName || '';
            education.major = el.major;
            education.degree = el.degree.id;
            education.gradYear = el.gradYear;
            updatedEducations.push(education);
        });
        model.educations = updatedEducations;
    }

    if(user.certifications.length) {
        user.certifications.forEach(el => delete el.id);
        model.certifications = user.certifications;
    }

    if(user.skills.length) {
        model.skills = user.skills;
    }

    if(user.workIndustries.length) {
        model.workIndustries = user.workIndustries;
    }

    if(user.experiences.length) {
        let experiencesArr = [];
        user.experiences.forEach(el => {
            let experience = {};
            experience.companyName = el.companyName || '';
            experience.jobTitle = el.jobTitle || '';
            experience.experienceType = el.experienceType.id;
            experience.dateFrom = el.dateFrom;
            experience.dateTo = el.dateTo;
            experience.role = el.role;
            experience.isCurrent = el.isCurrent;
            experiencesArr.push(experience);
        });
        model.workExperiences = experiencesArr;
    }

    return model;
};

export const prepareProfessionalInterfaceModel = user => {
    let model = {};
    model.avatar = user.avatar ? { file: AppConfig.imgUrl + user.avatar, name: 'avatar' } : '';
    model.newAvatar = '';
    model.newResume = '';
    model.firstName = user.firstName;
    model.lastName = user.lastName ? user.lastName : '';
    model.fullName = `${user.firstName} ${model.lastName}`;
    model.name = [ { firstName: user.firstName, lastName: model.lastName } ];
    model.id = user.id;
    model.assessments = user.assessments;
    model.certifications = user.certifications;
    model.educations = user.educations;
    model.email = user.email;
    model.experiences = user.experiences;
    model.hourRate = user.hourRate;
    model.isConfidentialLocation = user.isConfidentialLocation;
    model.isPublic = user.isPublic;
    model.isActive = user.isActive;
    model.location = user.location;
    model.projects = user.projects;
    if(model.projects.length) model.projects.forEach(el => el.id = el.slug);
    model.resume = user.resume ? { file: AppConfig.imgUrl + user.resume, name: 'resume' } : '';
    model.reviews = user.reviews.rate + ' / ' + user.reviews.amount;
    model.shortDescription = user.shortDescription;
    model.slug = user.slug;

    model.skills = [];
    user.skills.forEach(el => model.skills.push(el.id));

    model.workIndustries = [];
    user.industries.forEach(el => model.workIndustries.push(el.id));

    return model;
};