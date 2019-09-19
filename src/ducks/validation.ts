import * as Yup from 'yup';

export const validation = Yup.object().shape({
    url: Yup.string()
        .required('Upload photo'),
    title: Yup.string()
        .min(2, 'Title is too smal')
        .max(20, 'Title is to long')
        .required('Title is required'),
    tooltip: Yup.object().shape({
        color: Yup.string()
            .required('Choose color'),
        position: Yup.string()
            .required('Choose position')
    })
});