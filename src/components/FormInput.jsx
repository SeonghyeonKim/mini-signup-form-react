import {useEffect, useRef, useContext} from 'react';
import {FormContext} from '../App';

let ID_REGEX = new RegExp("^[a-z0-9_-]{5,20}$");
let PW_REGEX = new RegExp("^[a-zA-Z0-9]{8,16}$");


const ERROR_MSG = {
  required: '필수 정보입니다.',
  invalidId: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
  invalidPw: '8~16자. 영문 대/소문자, 숫자를 사용하세요.',
  invalidConfirmPw: '비밀번호가 일치하지 않습니다.',
};

const FormInput = ({ id, label, inputProps, errorData, setErrorData }) => {
  const inputRef = useRef(null);
  const {formData, setFormData} = useContext(FormContext);
  
  const checkRegax = (inputId) => {
    let result;
    const value = formData[inputId];
    if(value.length === 0) {
      result = 'required';
    }
    else {
      switch(inputId) {
        case 'id':
          result = ID_REGEX.test(value) ? true : 'invalidId';
          break;
        case 'pw':
          result = PW_REGEX.test(value) ? true : 'invalidPw';
          checkRegax('confirmPw');
          break;
        case 'confirmPw':
          result = formData['pw'] === value ? true : 'invalidConfirmPw';
          break;
        default:
          return ;
      }
    }
    // 심화: react에서는 setState를 비동기적으로 실행 (순차x => 결과값 보장 X)
    // 대신 setState에 함수를 주어 순차적으로 실행하도록함
    setErrorData((prev) => ({...prev, [inputId]: result}));
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
        onChange={(e) => setFormData((prev) => ({...formData, [id]: e.target.value}))}
        onBlur={() => checkRegax(id)}
        {...inputProps}
      />
      <div className="mt-1 mb-3 text-xs text-red-500">
        {errorData[id] !== true ? ERROR_MSG[errorData[id]] : ''}
      </div>
    </div>
  );
}

export default FormInput