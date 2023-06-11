import './App.css'
import Form from './components/Form'
import Footer from './components/Footer'
import FontControlBox from './components/FontControlBox'
import Modal from './components/Modal'
import { createContext, useRef, useState } from 'react'

const initialFormData = {
    id: '',
    pw: '',
    confirmPw: '',
}

export const FormContext = createContext({
    formData: initialFormData,
    setFormData: () => {},
});

function App() {
    const [formData, setFormData] = useState(initialFormData);
    const modalRef = useRef(null);

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            <section className="form-wrapper">
                <Form modalRef={modalRef} />
                <Footer />
            </section>
            <FontControlBox />
            <Modal ref={modalRef} />
        </FormContext.Provider>
    )
}

export default App
