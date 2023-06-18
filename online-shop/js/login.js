  const formLogin = document.getElementById('form-log');
 

  const userLogin =async function(data) {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json",/*'x-access-token':localStorage.getItem("token") */},
      body: JSON.stringify(data),
    });
    const json = await response.json();
    localStorage.setItem("token",JSON.stringify(json.token));
    console.log(`Welcome ${json.first_name} ${json.last_name}`); 
  }
  formLogin.addEventListener('click',(e)=>{
    e.preventDefault();
    const usernameLog = document.getElementById("username-log").value;
    const passwordLog = document.getElementById("pass-log").value;
    const data = { email: usernameLog, password: passwordLog };
    userLogin(data);

  })

  /* 
  
  console.log(json)
  
  
};*/




