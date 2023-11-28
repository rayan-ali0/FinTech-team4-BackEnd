export const createUserName = (email) =>{
    const emailArray = email.split('@');
    let  username = emailArray[0];

    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    
    return username + result;
}

