import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AuthBackground from '../assets/images/Premium Vector _ The doctor and patient distance consulting of treatment on a smartphone concept_.jpeg';
import Actions from '../redux/actions';
import * as S from '../styles';
import * as T from '../types';


export const SignupAdmin = () => {

    const dispatch = useDispatch()

    const schema = yup.object().shape({
        fullName: yup.string().min(2).required('Full Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(4, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required').nullable(),
        birthDate: yup.date().required('Birth Date is required').nullable(),
        gender: yup.string().oneOf(['male', 'female']).required("Gender is required"),
    });

    const [formData, setFormData] = useState<T.SignUp>({
        email: "", password: "", confirmPassword: "", fullName: "", birthDate: new Date(), gender: "male", phone: ""
    })

    // const [showPassword, setShowPassword] = useState<boolean>(false); 
    let showPassword1 = false
    let showPassword2 = false

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((oldData) => ({ ...oldData, [id]: value }))
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        schema.validate(formData)
            .then(() => {
                dispatch({ type: Actions.SIGNUP, payload: formData })
            })
            .catch(err => {
                toast.error(err.message)

            })
    }


    return (
        <section>
            <S.H1>Sign Up</S.H1>
            <S.CenterFlex>
                <S.HalfImageContainer>
                    <img src={AuthBackground} className='w-full rounded-2xl'></img>
                </S.HalfImageContainer>
                <div className='md:w-[67%] lg:w-[50%] '>
                    <form className='lg:ml-10'>
                        <S.InputField
                            type='email'
                            placeholder='E - mail'
                            id='email'
                            value={formData.email}
                            onChange={handleChange}>
                        </S.InputField>

                        <S.InputField
                            type='text'
                            placeholder='Full Name'
                            id='fullName'
                            value={formData.fullName}
                            onChange={handleChange}>
                        </S.InputField>

                        <S.InputField
                            type="date"
                            id='birthDate'
                            value={(formData.birthDate).toString()}
                            onChange={handleChange}>
                        </S.InputField>

                        <S.InputField
                            type="text"
                            id='phone'
                            value={formData.phone}
                            onChange={handleChange}>
                        </S.InputField>

                        <select id="gender" value={formData.gender} onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <S.InputField
                            type={showPassword1 ? 'text' : 'password'}
                            placeholder='Password'
                            id='password'
                            value={formData.password}
                            onChange={handleChange}>
                        </S.InputField>


                        <S.InputField
                            type={showPassword1 ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            id='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}>
                        </S.InputField>

                        <S.BetweenFlex>
                            <p>Already Have an account <Link to='/signin' className='text-blue-500 hover:text-blue-800'>Signin</Link></p>
                            <p><Link to="/forgotpassword" className='text-blue-500 hover:text-blue-800'>Forgot Password?</Link></p>
                        </S.BetweenFlex>
                        <S.PButton level={1} type='submit' onClick={(e) => handleSubmit(e)}>Sign Up</S.PButton>
                    </form>
                </div>
            </S.CenterFlex>
        </section>
    )
}

export default Signup;