import style from './style.module.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import axios from 'axios';

export default function Emailform(){

   const {register, handleSubmit, formState: { errors }, trigger} = useForm();
   const [userinfo, userinfoset] = useState();
   
   const onsubmit = async (data)=>{
     userinfoset(data)
    //  console.log(data)
    await axios.post("http://localhost:4000/reguser",{data}).then(response =>{
          console.log(response);
     })
   };
    return(
        <div className={style.container}>
            <pre>{JSON.stringify(userinfo)}</pre>

            <form onSubmit={handleSubmit(onsubmit)}>
                <h1>Register form</h1>
                <div className="divider"></div>
                <div className={style.row}>
                <div className={style.field}>
                    <label className={style.label}>Username</label>
                    <input className={`${errors.username && style.inputerror}`} type="text" name="username" placeholder="username" {...register('username', { required: "username required" })}></input>
                    <div className={style.error}>{errors.username?.message}</div>
                </div>
                
                <div className={style.field}>
                    <label className={style.label}>email</label>
                    <input className={`${errors.email && style.inputerror}`} type="text" name="email" placeholder="email" {...register('email', { required: "email is required", pattern:{value: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gm, message:"not valid email"} })} onKeyUp={()=>{trigger("email")}}></input>
                    <div className={style.error} >{errors.email?.message}</div>
                </div>
                
                <div className={style.field}>
                    <label className={style.label}>password</label>
                    <input type="password" name="password" placeholder="password"  {...register('password', { required: "password is required",minLength:{value:5,message:"min lenght required"},maxLength:{value:10, message:"max length is below 10"} })}></input>
                    <div className={style.error}>{errors.password?.message}</div>
                </div>
                <button className={style.submit}>Submit</button>
                </div>
            </form>
        </div>
    )
}