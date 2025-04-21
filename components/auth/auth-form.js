import { useRef, useState } from "react";

async function createUser(email,password){
  const response =  await fetch('/api/auth/signup',{
        method:'POST',
        body:JSON.stringify({email,password}),
        headers:{
            'Content-type':'application/json'
        }

    
    });
    const data=await response.json();
    if(!response.ok){
        throw new Error(data.message || 'something went wrong!')
    }
    return data;
    createUser();
}

function AuthForm(){

    const emailInputRef=useRef();
    const passwordInputRef=useRef();

    const [isLogin,setIsLogin]=useState(true)

    function switchAuthModalHandler(){
        setIsLogin((prevState)=> !prevState)
    }

  async  function submitHandler(event){
        event.prventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;




        if(isLogin){
            //log user in
        }else{
            try{
            const result =   await createUser(enteredEmail,enteredPassword)
            console.log(result)
        }catch(error){
            console.log(error)
        }
    }
    }
    return(
        <section>
            <h1>{isLogin ?'Login':'Sign up'}</h1>

            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Your Email</label>
                    <input type='email' id ='email' required ref={emailInputRef} />
                </div>

                <div>
                    <label htmlFor="password">Your Password</label>
                    <input type='password' id ='password' required ref={passwordInutRef}/>
                </div>

                <div>
                <button type='button'>{isLogin ?'Login':'Create account'}</button>
                <button onClick={switchAuthModalHandler}>{isLogin ? 'create new account':'Login with existing account'}</button>
            </div>
            </form>
        </section>
    )

}
export default AuthForm;