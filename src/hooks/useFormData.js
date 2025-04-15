import React from 'react'

const useFormData = (initialValues = {}) => {
    const [formData, setFormData] = React.useState(initialValues);
    const handleChange = (e) => {
        const { name, value, files, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : files ? files[0] : value
        }))
    };
    const resetFormData = () => {
        setFormData(initialValues);
    }

    return { formData, handleChange, resetFormData };
}

export default useFormData