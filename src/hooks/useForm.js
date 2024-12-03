import { useState } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    /* 입력 값 변경 */
    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    /* 선택 값 변경 */
    const handleSelect = ({ name, selected }) => setValues({ ...values, [name]: selected });

    /* 값 초기화 */
    const handleReset = () => setValues(initialValues);

    return {
        values,
        handleChange,
        handleSelect,
        handleReset
    };
};

export default useForm;
