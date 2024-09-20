// Personal Information

//password to text and text to password
const inputBoxes = document.querySelectorAll(".password-field")
inputBoxes.forEach((inputBox) =>{
    inputBox.addEventListener("click",(event) => {
        if(event.target.innerHTML === "show"){
            event.target.innerHTML = "hide"
            inputBox.children[1].type = "text"
        }
        else{
            event.target.innerHTML = "show"
            inputBox.children[1].type = "password"
        }
    })
})

const personalInformationFormContainer = document.querySelector(".personal-inforamtion-form")
const profileInformationFormContainer = document.querySelector(".profile-information-form")



const personalInfo = {
    userFullName:"",userEmail:"",userUserName:"",userPassword:"",userGender :"",
    userDateOfBirth:"",userBio:"",userAvatar:""
}

//checking fullname
const namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
const usernamePattern = /^[a-zA-Z0-9._]{3,16}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const personalInfoForm = document.querySelector(".personal-inforamation")
personalInfoForm.addEventListener("submit",(event) => {
    event.preventDefault()
    // console.log(event)
    const fullName = event.target[1];
    const email = event.target[2];
    const userName = event.target[3];
    const password = event.target[4];
    const confirmPassword = event.target[5]
    //Validate Fullname
    if(!namePattern.test(fullName.value)){
        document.querySelector(".full-name-error-message").innerHTML = "Invalid FullName";
        fullName.style.border = `2px solid red`
        fullName.style.color = "red"
        return;
    }
    personalInfo.userFullName = fullName.value;
    //Validate Username
    if(!usernamePattern.test(userName.value)){
        document.querySelector(".user-name-error-message").innerHTML = "Invalid Username";
        userName.style.border = `2px solid red`
        userName.style.color = "red"
        return;
    }
    personalInfo.userUserName = userName.value
    //Validate Password
    if(!passwordPattern.test(password.value)){
        document.querySelector(".password-error-message").innerHTML = "Invalid Password";
        password.style.border = `2px solid red`
        password.style.color = "red"
        return;
    }
    //Validate Confirm Password
    if(!password.value === confirmPassword.value){
        document.querySelector(".confirm-password-error-message").innerHTML = "Unmatched Password";
        confirmPassword.style.border = `2px solid red`
        confirmPassword.style.color = "red"
        return;
    }
    personalInfo.userPassword = password.value
    //Validate Email
    if(!emailPattern.test(email.value)){
        document.querySelector(".email-error-message").innerHTML = "Invalid Email";
        confirmPassword.style.border = `2px solid red`
        confirmPassword.style.color = "red"
        return;
    }
    personalInfo.userEmail = email.value
    // forms control
    personalInformationFormContainer.style.display = "none";
    profileInformationFormContainer.style.display = "flex"
    personalInfoForm.reset()
})

const profileInformationForm = document.querySelector(".profile-information")
profileInformationForm.addEventListener("submit",(evnet) => {
    evnet.preventDefault()
    console.log(event.target)
    const genders = document.querySelectorAll('input[name="gender"]');
    const Gender = Array.from(genders).filter((gender) => gender.checked);
    let realGender;
    if(!Gender.length > 0){
        console.log("not Selected")
        document.querySelector(".gender-error-message").innerHTML = "Please Select A Gender"
        return
    }
    else{
        realGender = Gender[0].value
        document.querySelector(".gender-error-message").innerHTML = ""
        personalInfo.userGender = realGender
    }
    
    const birthDate = event.target[4].value;
    const dateOfBirth = new Date(birthDate)
    const now = new Date()
    if(dateOfBirth > now){
        document.querySelector(".birth-date-error-message").innerHTML = "You Are Not From Future"
        return
    }
    else if(!birthDate){
        document.querySelector(".birth-date-error-message").innerHTML = "Please Select A Date"
        return
    }
    else{
        document.querySelector(".birth-date-error-message").innerHTML = ""
        personalInfo.userDateOfBirth = dateOfBirth
    }
    const bio = event.target[5].value;
    if(!bio){
        document.querySelector(".bio-error-message").innerHTML = "Your Bio Can't Be empty"
        return
    }
    else{
        document.querySelector(".bio-error-message").innerHTML = ""
    }
    personalInfo.userBio = bio
    const avatar = event.target[6].files[0];
    if(!avatar){
        document.querySelector(".avatar-error-message").innerHTML = "Please Select A Profile Picture"
        return
    }
    else{
        document.querySelector(".avatar-error-message").innerHTML = ""
        console.log(avatar.name)
    }
    personalInfo.userAvatar=avatar
    profileInformationForm.reset()
    console.log(personalInfo)
})