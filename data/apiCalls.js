const urlOrders = "https://localhost:7244/Orders";
const urlLogIn = "https://localhost:7244/Users/LogIn";
const urlSignUp = "https://localhost:7244/Users/SignUp";

export async function GetAllOrdersWithProducts(token){
    let request = null;
    let ordersWithProducts = null;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json, charset=utf-8');
    headers.append('Authorization', `Bearer ${token}`);

    const options = {
        method: "GEt",
        headers: headers
    };

    request = await fetch(urlOrders, options);

    ordersWithProducts = await request.json();

    return ordersWithProducts;
}

export async function LogIn(inputs) {
    let request = null;
    let foundUser = null;

    const options = {
        method: "POST",
        headers: {
            Accept:"*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
    };

    request = await fetch(urlLogIn, options);

    foundUser = await request.json();

    return foundUser;

}

export async function SignUp(inputs) {
    let request = null;
    let createdUser = null;

    const options = {
        method: "POST",
        headers: {
            Accept:"*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
    };

    request = await fetch(urlSignUp, options);

    createdUser = await request.json();

    return createdUser;

}