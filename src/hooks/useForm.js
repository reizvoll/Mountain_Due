import { useState } from 'react'

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues)

  /* 입력 값 변경 */
  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value })

  /* 선택 값 변경 */
  const handleSelect = ({ name, selected }) =>
    setValues({ ...values, [name]: selected })

  /* 선택 값 여러 개 변경 */
  const handleMultiple = (datas) => {
    const obj = {}

    for (let { name, selected } of datas) {
      obj[name] = selected
    }

    setValues({ ...values, ...obj })
  }

  /* 값 초기화 */
  const handleReset = () => setValues(initialValues)

  return {
    values,
    handleChange,
    handleSelect,
    handleMultiple,
    handleReset,
  }
}

export default useForm
