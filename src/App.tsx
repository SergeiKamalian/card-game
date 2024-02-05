import * as Yup from 'yup'
import './App.css';
import { FormField, Registration, Theme } from './libs';
import { Form, Formik } from 'formik';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
});

function App() {

  return (
    <Theme>
      <div className="App">
        <Registration />
      </div>
    </Theme>
  );
}

export default App;
