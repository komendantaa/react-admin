import { GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE, DELETE, fetchUtils } from 'react-admin';
import { AppConfig } from './AppConfig';
import { prepareApiModelFunctions, prepareInterfaceModelFunctions } from './models';

const API_URL = AppConfig.apiUrl;
const FILE_TYPE = '[object File]';
const DATE_TYPE = '[object Date]';
const ARRAY_TYPE = '[object Array]';
const OBJECT_TYPE = '[object Object]';

const formList = (resource, json) => {
    if(resource === 'category' || resource === 'parentCategory') {
        let categories = [];
        for(let prop in json.category) {
            categories.push(json.category[ prop ]);
        }

        if(resource === 'category') {
            categories.forEach(el => el.children.forEach(elm => {
                elm.parent = el.name;
                categories.push(elm);
            }));
        }

        return categories.map((item, index) => prepareInterfaceModelFunctions[ resource ](item, index));
    }

    if(!json.itemsData && (resource === 'country' || resource === 'state' || resource === 'degree'
        || resource === 'project' || resource === 'experienceType' || resource === 'skill' || resource === 'industry'
        || resource === 'assessment' || resource === 'report' || resource === 'our-features'
        || resource === 'how-it-work' || resource === 'job-areas' || resource === 'testimonials'
        || resource === 'blogCategory' || resource === 'tag' || resource === 'comment' || resource === 'notification')) {

        return (json && json.length) ? json.map((item, index) => prepareInterfaceModelFunctions[ resource ](item, index)) : [];
    }

    if(resource === 'page') {
        return (json && json.length) ? json.map((item, index) => prepareInterfaceModelFunctions[ resource ](item, index)) : [];
    }

    return (json && json.itemsData.length) ? json.itemsData.map((item, index) => prepareInterfaceModelFunctions[ resource ](item, index)) : [];
};

const prepareApiModel = (resource, data) => prepareApiModelFunctions[ resource ](data);

const prepareInterfaceModel = (resource, data, params) => prepareInterfaceModelFunctions[ resource ](data, params);

const convertRESTRequestToHTTP = (type, resource, params) => {
    const { queryParameters } = fetchUtils;
    const options = { method: 'POST' };
    options.headers = new Headers({});
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    let url = '';
    let query;
    switch(type) {
        case GET_LIST:
            if(resource === 'professional' || resource === 'allProfessional') {
                let body = {};
                if(resource === 'allProfessional') {
                    body.name = !params.filter.q || params.filter.q.length < 3 ? '-------' : params.filter.q;
                } else {
                    if(params.filter && params.filter.location) body.location = params.filter.location;
                    if(params.filter && params.filter.user) body.keywords = [ params.filter.user ];
                    if(params.filter && params.filter.q) body.name = params.filter.q;
                }
                options.body = createFormData(body);
                url = `${API_URL}/search/professionals${params.pagination && !params.filter.q ? `?page=${params.pagination.page}` : ''}`;
                break;
            }

            if(resource === 'company' || resource === 'allCompany') {
                let body = {};
                if(resource === 'allCompany') {
                    body.name = !params.filter.q || params.filter.q.length < 3 ? '-------' : params.filter.q;
                } else {
                    if(params.filter.location) body.location = params.filter.location;
                    if(params.filter.keyword) body.keywords = [ params.filter.company ];
                    if(params.filter && params.filter.company) body.name = params.filter.company;
                }
                options.body = createFormData(body);
                url = `${API_URL}/search/company?page=${params.pagination.page || 1}`;
                break;
            }

            if(resource === 'skill') {
                let body = { q: params.filter.q, isPaginated: params.pagination.perPage === 10 };
                options.body = createFormData(body);
                url = `${API_URL}/search/skills?page=${params.pagination.page || 1}`;
                break;
            }

            if(resource === 'project' || resource === 'allProject') {
                let body = {
                    keywords: resource === 'project' ? [ params.filter.q ] :
                        [ !params.filter.q || params.filter.q.length < 3 ? '-------' : params.filter.q ]
                };
                options.body = createFormData(body);
                url = `${API_URL}/search/projects?page=${params.pagination.page || 1}`;
                break;
            }

            if(resource === 'page') {
                options.method = 'GET';
                url = `${API_URL}/static-page/`;
                break;
            }

            if(resource === 'industry') {
                let body = { q: params.filter.q, isPaginated: params.pagination.perPage === 10 };
                options.body = createFormData(body);
                url = `${API_URL}/search/industries?page=${params.pagination.page || 1}`;
                break;
            }

            if(resource === 'category' || resource === 'parentCategory') {
                options.method = 'GET';
                url = `${API_URL}/category/list`;
                break;
            }

            if(resource === 'assessment') {
                options.method = 'GET';
                url = `${API_URL}/assessment/`;
                break;
            }

            if(resource === 'report') {
                let body = {};
                if(params.filter.companyReport && params.filter.professional) body.userId = params.filter.professional;
                if(!params.filter.companyReport && params.filter.company) body.userId = params.filter.company;
                if(params.filter.category) body.parentCategories = [params.filter.category];
                if(params.filter.project) body.projectSlug = params.filter.project;
                if(params.filter.amount) body.minAmount = params.filter.amount;
                body.dateFrom = params.filter.dateFrom || '2018-01-01';
                body.dateTo = params.filter.dateTo || `${new Date().getFullYear() + 1000}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
                options.body = createFormData(body);
                url = `${API_URL}/payment/report?page=${params.pagination.page}&companyReport=${!!params.filter.companyReport}`;
                break;
            }

            if(resource === 'blogCategory' || resource === 'tag' || resource === 'comment' || resource === 'article') {
                if(resource === 'blogCategory') resource = 'category';
                options.method = 'GET';
                let query = '';
                if(resource === 'article') query = '?active=false';
                if(params.filter.q) query = `${query.length ? '&' : '?'}query=${params.filter.q}`;
                if(params.sort.field === 'createdAt') query += `${query.length ? '&' : '?'}sortBy=${params.sort.order}`;
                if(params.pagination.page) query += `${query.length ? '&' : '?'}page=${params.pagination.page}`;
                url = `${API_URL}/blog/${resource}/get/all${query}`;
                break;
            }

            if(resource === 'our-features' || resource === 'how-it-work' || resource === 'job-areas' || resource === 'testimonials') {
                options.method = 'GET';
                url = `${API_URL}/homepage/${resource}/all`;
                break;
            }

            if(resource === 'country' || resource === 'state' || resource === 'degree' || resource === 'experienceType') {
                options.method = 'GET';
                url = `${API_URL}/combo/${resource}`;
                break;
            }

            if(resource === 'notification') {
                options.method = 'GET';
                url = `${API_URL}/notifications/`;
                break;
            }

            url = `${API_URL}/search/showAll/${params.pagination.page || 1}`;
            break;

        case GET_ONE:
            options.method = 'GET';
            if(resource === 'professional' || resource === 'company') {
                url = `${API_URL}/admin/${resource}/${params.id}/getProfile`;
                break;
            }
            if(resource === 'project') {
                url = `${API_URL}/project/${params.id}`;
                break;
            }
            if(resource === 'page') {
                url = `${API_URL}/static-page/${params.id}`;
                break;
            }

            if(resource === 'our-features' || resource === 'how-it-work' || resource === 'job-areas' || resource === 'testimonials') {
                options.method = 'GET';
                url = `${API_URL}/homepage/${resource}/${params.id}`;
                break;
            }

            if(resource === 'blogCategory' || resource === 'tag') {
                if(resource === 'blogCategory') resource = 'category';
                options.method = 'GET';
                url = `${API_URL}/blog/${resource}/get/${params.id}`;
                break;
            }

            if(resource === 'comment') {
                options.method = 'GET';
                url = `${API_URL}/blog/${resource}/${params.id}`;
                break;
            }

            if(resource === 'article') {
                options.method = 'GET';
                url = `${API_URL}/blog/${resource}/${params.id}`;
                break;
            }

            url = `${API_URL}/${resource}/${params.id}`;
            break;

        case GET_MANY:
            if(resource === 'professional' || resource === 'allProfessional') {
                let body = {};
                options.body = createFormData(body);
                url = `${API_URL}/search/professionals`;
                break;
            }

            if(resource === 'company' || resource === 'allCompany') {
                let body = {};
                options.body = createFormData(body);
                url = `${API_URL}/search/company`;
                break;
            }

            if(resource === 'skill') {
                let body = { q: '', isPaginated: false };
                options.body = createFormData(body);
                url = `${API_URL}/search/skills`;
                break;
            }

            if(resource === 'project' || resource === 'allProject') {
                let body = {};
                options.body = createFormData(body);
                url = `${API_URL}/search/projects?page=1`;
                break;
            }

            if(resource === 'industry') {
                let body = { q: '', isPaginated: false };
                options.body = createFormData(body);
                url = `${API_URL}/search/industries`;
                break;
            }

            if(resource === 'category' || resource === 'parentCategory') {
                options.method = 'GET';
                url = `${API_URL}/category/list`;
                break;
            }

            if(resource === 'page') {
                options.method = 'GET';
                url = `${API_URL}/static-page/`;
                break;
            }

            if(resource === 'country' || resource === 'state' || resource === 'degree' || resource === 'experienceType') {
                options.method = 'GET';
                url = `${API_URL}/combo/${resource}`;
                break;
            }

            if(resource === 'tag' || resource === 'blogCategory' || resource === 'comment') {
                if(resource === 'blogCategory') resource = 'category';
                options.method = 'GET';
                let query = '';
                if(params.ids.length) query = `?ids=${params.ids}`;
                if(resource === 'comment') query += `${query.length ? '&' : '?'}&sortBy=DESC`;
                url = `${API_URL}/blog/${resource}/get/all${query}`;
                break;
            }

            if(resource === 'article') {
                options.method = 'GET';
                url = `${API_URL}/blog/${resource}/get/all?active=false${params.ids.length ? `&ids=${params.ids}` : ''}`;
                break;
            }

            url = `${API_URL}/${resource}/showAll`;
            break;

        case GET_MANY_REFERENCE:
            const { page, perPage } = params.pagination;
            let { field, order } = params.sort;
            order = order === 'DESC' ? '-' : '';
            let filterObj = {};
            filterObj[ params.target ] = params.id;
            query = {
                sort: order + field,
                max_results: perPage,
                page: page,
                where: JSON.stringify(filterObj),
            };
            url = `${API_URL}/${resource}?${queryParameters(query)}`;
            break;

        case UPDATE:
            options.method = 'POST';
            options.headers.set('X-HTTP-METHOD-OVERRIDE', 'PATCH');
            params.data = prepareApiModel(resource, params.data);
            if(resource === 'professional' || resource === 'company') {
                options.body = createFormData(params.data);
                url = `${API_URL}/admin/${resource}/${params.id}/editProfile`;
                break;
            }
            if(resource === 'category') {
                options.body = createFormData(params.data);
                url = `${API_URL}/admin/category/edit/${params.id}`;
                break;
            }
            if(resource === 'skill' || resource === 'industry') {
                options.body = createFormData(params.data);
                url = `${API_URL}/${resource}/edit/${params.id}`;
                break;
            }
            if(resource === 'our-features' || resource === 'how-it-work' || resource === 'job-areas'
                || resource === 'testimonials') {
                options.body = createFormData(params.data);
                url = `${API_URL}/homepage/${resource}/update/${params.id}`;
                break;
            }
            if(resource === 'article' || resource === 'blogCategory' || resource === 'tag' || resource === 'comment') {
                if(resource === 'blogCategory') resource = 'category';
                options.body = createFormData(params.data);
                url = `${API_URL}/blog/${resource}/${params.id}/edit`;
                break;
            }
            if(resource === 'page') {
                options.body = createFormData(params.data);
                url = `${API_URL}/static-page/${params.id}`;
                break;
            }

            options.headers.set('Accept', 'application/json');
            options.body = JSON.stringify(params.data);
            url = `${API_URL}/${resource}/edit/${params.id}`;
            break;
        case CREATE:
            options.method = 'POST';
            params.data = prepareApiModel(resource, params.data);

            if(resource === 'skill' || resource === 'industry') {
                options.body = createFormData(params.data);
                url = `${API_URL}/${resource}/add`;
                break;
            }
            if(resource === 'page') {
                options.body = createFormData(params.data);
                url = `${API_URL}/static-page/`;
                break;
            }
            if(resource === 'category') {
                options.body = createFormData(params.data);
                url = `${API_URL}/admin/category/add`;
                break;
            }
            if(resource === 'assessment') {
                options.body = createFormData(params.data);
                url = `${API_URL}/assessment/`;
                break;
            }
            if(resource === 'our-features' || resource === 'how-it-work' || resource === 'job-areas'
                || resource === 'testimonials') {
                options.body = createFormData(params.data);
                url = `${API_URL}/homepage/${resource}`;
                break;
            }
            if(resource === 'article' || resource === 'blogCategory' || resource === 'tag' || resource === 'comment') {
                if(resource === 'blogCategory') resource = 'category';
                options.body = createFormData(params.data);
                url = `${API_URL}/blog/${resource}/new`;
                break;
            }

            options.headers.set('Accept', 'application/json');
            options.body = JSON.stringify(params.data);
            url = `${API_URL}/${resource}/create`;
            break;
        case DELETE:
            options.headers.set('Accept', 'application/json');
            options.method = 'DELETE';

            url = `${API_URL}/${resource}/delete/${params.id}`;
            if(resource === 'page') {
                url = `${API_URL}/static-page/${params.id}`;
                break;
            }
            if(resource === 'our-features' || resource === 'how-it-work' || resource === 'job-areas'
                || resource === 'testimonials') {
                url = `${API_URL}/homepage/${resource}/${params.id}`;
                break;
            }
            if(resource === 'article' || resource === 'blogCategory' || resource === 'tag' || resource === 'comment') {
                if(resource === 'blogCategory') resource = 'category';
                url = `${API_URL}/blog/${resource}/${params.id}`;
                break;
            }
            if(resource === 'notification') {
                url = `${API_URL}/notifications/${params.id}`;
                break;
            }
            break;
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
};

function createFormData(object, form, namespace) {
    const formData = form || new FormData();
    for(let property in object) {
        if(!object.hasOwnProperty(property) || typeof object[ property ] === 'undefined') {
            continue;
        }
        const formKey = namespace ? `${namespace}[${property}]` : property;
        if(isDateType(object[ property ])) {
            formData.append(formKey, object[ property ].toISOString());
        } else if(isFileType(object[ property ])) {
            formData.append(formKey, object[ property ]);
        } else if(isObjectType(object[ property ]) && object[ property ].hasOwnProperty('file') && property === 'avatarFileName') {
            formData.append('avatarFileName', object[ property ].rawFile);
        } else if(isObjectType(object[ property ]) && object[ property ].hasOwnProperty('file') && property === 'resumeFileName') {
            formData.append('resumeFileName', object[ property ].rawFile);
        } else if(isObjectType(object[ property ]) && object[ property ].hasOwnProperty('file') && property === 'image') {
            formData.append('image', object[ property ].rawFile);
        } else if(isObjectType(object[ property ]) && object[ property ].hasOwnProperty('file') && property === 'userPhoto') {
            formData.append('userPhoto', object[ property ].rawFile);
        } else if(isObjectType(object[ property ]) || isArrayType(object[ property ])) {
            createFormData(object[ property ], formData, formKey);
        } else {
            formData.append(formKey, object[ property ]);
        }
    }

    return formData;
}

function getObjectType(obj) {
    return Object.prototype.toString.call(obj);
}

function isObjectType(obj) {
    return getObjectType(obj) === OBJECT_TYPE;
}

function isArrayType(obj) {
    return getObjectType(obj) === ARRAY_TYPE;
}

function isFileType(obj) {
    return getObjectType(obj) === FILE_TYPE;
}

function isDateType(obj) {
    return getObjectType(obj) === DATE_TYPE;
}

const convertHTTPResponseToREST = (response, type, resource, params) => {
    let { json } = response;
    switch(type) {
        case GET_LIST:
            if(resource === 'category' || resource === 'parentCategory') {
                return {
                    data: formList(resource, json),
                    total: resource === 'parentCategory' ? json.category.length :
                        json.category[ 1 ].children.length + json.category[ 2 ].children.length +
                        json.category[ 3 ].children.length + json.category.length
                };
            }

            if(!json.itemsData && (resource === 'country' || resource === 'state' || resource === 'degree'
                || resource === 'project' || resource === 'allProject' || resource === 'experienceType'
                || resource === 'skill' || resource === 'industry' || resource === 'assessment' || resource === 'report'
                || resource === 'our-features' || resource === 'testimonials' || resource === 'job-areas'
                || resource === 'blogCategory' || resource === 'tag' || resource === 'comment'
                || resource === 'how-it-work' || resource === 'notification')) {

                return {
                    data: formList(resource, json),
                    total: json.length
                };
            }

            if(resource === 'page') {
                return {
                    data: formList(resource, json),
                    total: json.length
                };
            }

            return {
                data: formList(resource, json),
                total: json.paginationData.totalCount
            };

        case GET_ONE:
            return { data: prepareInterfaceModel(resource, json, params) };
        case GET_MANY:
            return { data: formList(resource, json) };
        case GET_MANY_REFERENCE:
            return { data: formList(resource, json) };
        case CREATE:
        case UPDATE:
            return { data: { ...params.data, id: json && json._id ? json._id : '', response: json } };
        case DELETE:
            return { data: { id: params.id } };
        default:
            return { data: json ? json : '' };
    }
};

export default async function(type, resource, params) {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);

    return fetchJson(url, options)
        .then(response => {
            return convertHTTPResponseToREST(response, type, resource, params);
        })
        .catch((error) => {
            if(resource === 'skill' || resource === 'industry' || resource === 'blogCategory' || resource === 'tag') {
                return Promise.reject({ message: error.body.errors.children.title.errors[ 0 ], status: error.status });
            }

            return Promise.reject(error);
        });
};
