import {useEffect, useRef, useContext} from 'react';
import {FormContext} from '../App';

let ID_REGEX = new RegExp("^[a-z0-9_-]{5,20}$");
let PW_REGEX = new RegExp("^[a-zA-Z0-9]{8,16}$");

const FormInput = ({ id, label, inputProps }) => {
  const inputRef = useRef(null);
  const {formData, setFormData} = useContext(FormContext);

  const checkRegax = () => {
    const value = formData[id];
    if(value.length === 0) {
      return 'required';
    }
    else {
      switch(id) {
        case 'id':
          return ID_REGEX.test(value) ? true : 'invalidId';
        case 'pw':
          return PW_REGEX.test(value) ? true : 'invalidPw';
        case 'confirmPw':
          return formData['pw'] === value ? true : 'invalidPwCheck';
      }
    }
  }

  useEffect(() => {
    if(id === 'id') {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className="shadow border rounded w-full py-2 px-3 text-gray-700"
        ref={inputRef}
        value={formData[id]}
        onChange={(e) => setFormData({...formData, [id]: e.target.value})}
        onBlur={checkRegax}
        {...inputProps}
      />
      <div
        className="mt-1 mb-3 text-xs text-red-500"
      ></div>
     </div>
  );
}

export default FormInput