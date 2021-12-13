function getUser(){
    fetch("https://61adc325d228a9001703af29.mockapi.io/users",{
          method:"GET"})
    .then((data)=>data.json())
    .then((users)=>{
      const allUsers=document.querySelector(".users");
      users.forEach((user)=>{
        const userContainer=document.createElement("div");
        userContainer.className="user-container";
        
        userContainer.innerHTML=`
        <p>${user.id}</p>
                 <img  class="user-avatar" src="${user.avatar}" alt="Profile">
       <h4> ${user.name}</h4>
            <p>${new Date(user.createdAt).toDateString()} </p> 
            <button class="edit-button" onclick="edit(${user.id},'${user.name}','${user.avatar}')">edit</button>
            <button class="delete-button" onclick="remove(${user.id})">delete</button>
           
    
        `;
        allUsers.append(userContainer);
      });
                    return users;
    });
    
    }
    getUser();
    
    function remove(userid){
      fetch(`https://61adc325d228a9001703af29.mockapi.io/users/${userid}`,{
          method:"DELETE"})
    .then(data=>data.json())
     .then(user=>console.log(user))
     .then(user=>refreshUser());
    
    }
    
    function   refreshUser()
    {
     document.querySelector(".users") .innerHTML="";
      getUser();  
      console.log('cleared')
    }
    
    
    function addUser()
    {
      const type=document.querySelector(".submit-user").innerText;
    const username=document.querySelector(".add-user-name").value;
    const userprofilepic=document.querySelector(".add-user-pics").value; 
    const submittype=document.querySelector(".submit-user").innerText;
        if(type==="edit user")
      {
         fetch(`https://61adc325d228a9001703af29.mockapi.io/users/${localStorage.getItem('userId')}`,{
          method:"PUT",
     headers:{
       "Content-Type":"application/json"
     },
        body:JSON.stringify({
          name:username,
          avatar:userprofilepic,
          createdAt:new Date().toISOString(),
        })
    })
    .then((data)=>data.json())
        .then((user)=>refreshUser());
      console.log("add user",username,userprofilepic) 
        }
      
      else
        {
           fetch(`https://61adc325d228a9001703af29.mockapi.io/users/`,{
          method:"POST",
     headers:{
       "Content-Type":"application/json"
     },
        body:JSON.stringify({
          name:username,
          avatar:userprofilepic,
          createdAt:new Date().toISOString(),
        })
    })
    .then((data)=>data.json())
        .then((user)=>refreshUser());
      console.log("add user",username,userprofilepic) 
        }
       resetUser();
    }
    // const type=document.querySelector(".submit-user").innerText;
    // const username=document.querySelector(".add-user-name").value;
    // const userprofilepic=document.querySelector(".add-user-pics").value; 
    // const addtype=document.querySelector(".submit-user").innerText;
    // const edittype=document.querySelector(".submit-user").innerText;
    
    //   console.log("the type is",edittype); 
    //   const linkmethod=type==="edit user"?"PUT":"POST";
    // const storage=type==="edit user"?"localStorage.getItem('userId')":"";
    
    //      fetch(`https://61adc325d228a9001703af29.mockapi.io/users/${storage}`,{
    //       method:linkmethod,
    //  headers:{
    //    "Content-Type":"application/json"
    //  },
    //     body:JSON.stringify({
    //       name:username,
    //       avatar:userprofilepic,
    //       createdAt:new Date().toISOString(),
    //     })
    // })
    // .then((data)=>data.json())
    //     .then((user)=>refreshUser());
    //   console.log("add user",username,userprofilepic) 
        
     
    
    function resetUser(){
    document.querySelector(".submit-user").innerText="add user";//not usefulll code
    document.querySelector(".add-user-name").value='';
    document.querySelector(".add-user-pics").value=''; 
    }
    
    function edit(userId,username,userprofilepic)
      {
    document.querySelector(".add-user-name").value=username;
    document.querySelector(".add-user-pics").value=userprofilepic;
    document.querySelector(".submit-user").innerText="edit user";
        localStorage.setItem('userId', userId);
    
      }
    
    
    
    
    
    
      
     
        
          
        
    