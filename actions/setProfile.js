export async function VerifyLogin(inputs){
    if(inputs.username == 'Moi' && inputs.login == 'Pierre')
    return await true;

    return await false;
}