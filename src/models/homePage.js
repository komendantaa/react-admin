import { AppConfig } from '../AppConfig';

export const prepareFeatureApiModel = feature => {
    let model = {};
    model.text = feature.text;
    return model;
};

export const prepareFeatureInterfaceModel = feature => {
    let model = {};
    model.id = feature.id;
    model.text = feature.text;
    return model;
};

export const prepareHowItWorksApiModel = el => {
    let model = {};
    model.title = el.title;
    model.text = el.text;
    if(el.newImage) model.image = el.newImage;
    return model;
};

export const prepareHowItWorksInterfaceModel = el => {
    let model = {};
    model.id = el.id;
    model.title = el.title;
    model.text = el.text;
    model.image = el.image ? { file: AppConfig.imgUrl + '/' + el.image, name: 'image' } : '';
    model.newImage = '';
    return model;
};

export const prepareJobAreaApiModel = el => {
    let model = {};
    model.title = el.title;
    model.text = el.text;
    if(el.newImage) model.image = el.newImage;
    return model;
};

export const prepareJobAreaInterfaceModel = el => {
    let model = {};
    model.id = el.id;
    model.title = el.title;
    model.text = el.text;
    model.image = el.image ? { file: AppConfig.imgUrl + '/' + el.image, name: 'image' } : '';
    model.newImage = '';
    return model;
};

export const prepareTestimonialApiModel = testimonial => {
    let model = {};
    model.userName = testimonial.userName;
    model.rate = testimonial.rate;
    model.experience = testimonial.experience;
    model.industries = testimonial.industries;
    model.text = testimonial.text;
    if(testimonial.newUserPhoto) model.userPhoto = testimonial.newUserPhoto;
    return model;
};

export const prepareTestimonialInterfaceModel = testimonial => {
    let model = {};
    model.id = testimonial.id;
    model.userName = testimonial.userName;
    model.rate = testimonial.rate;
    model.experience = testimonial.experience;
    model.industries = testimonial.industries;
    model.text = testimonial.text;
    model.userPhoto = testimonial.userPhoto ? {
        file: AppConfig.imgUrl + '/' + testimonial.userPhoto,
        name: 'image'
    } : '';
    model.newUserPhoto = '';
    return model;
};