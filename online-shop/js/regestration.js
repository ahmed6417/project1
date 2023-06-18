/*class User {
    id;
    first_name;
    last_name;
    email;
    password;
    token;
    constructor(firstName, lastName, email, password) {
      this.first_name = firstName;
      this.last_name = lastName;
      this.email = email;
      this.password = password;
    }
  }*/
  
  const form = document.getElementById('form');
  
  const userRegestration=async function (data) {
    const response = await fetch("http://localhost:5000/api/users/register", {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    result= await response.json();
    console.log(result);
    //localStorage.setItem('token',JSON.stringify(result.token));
  };
  form.addEventListener('submit', e => {
      e.preventDefault();
      const fname = document.getElementById('fname').value;
      const lname = document.getElementById('lname').value;
      const email = document.getElementById('Email').value;
      const password = document.getElementById('pass').value;
      let data={
        "first_name":fname,
        "last_name":lname,
        "email":email,
        "password":password,
      }
      userRegestration(data);
  }
      
  );

  

  
  