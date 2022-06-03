//prod
const urlOrdersProd = "https://crashprojectapi.azurewebsites.net/Orders";
const urlProductsProd = "https://crashprojectapi.azurewebsites.net/Products";
const urlLogInProd = "https://crashprojectapi.azurewebsites.net/Users/LogIn";
const urlSignUpProd = "https://crashprojectapi.azurewebsites.net/Users/SignUp";

//dev
const urlOrdersDev = "https://localhost:7244/Orders";
const urlProductsDev = "https://localhost:7244/Products";
const urlLogInDev = "https://localhost:7244/Users/LogIn";
const urlSignUpDev = "https://localhost:7244/Users/SignUp";

export async function GetAllProducts(token){
    let request = null;
    let products = null;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json, charset=utf-8');
    headers.append('Authorization', `Bearer ${token}`);

    const options = {
        method: "GET",
        headers: headers
    };

    request = await fetch(urlProductsProd, options);
    products = await request.json();

    return products;
}

export async function GetAllOrdersWithProducts(token){
    let request = null;
    let ordersWithProducts = null;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json, charset=utf-8');
    headers.append('Authorization', `Bearer ${token}`);

    const options = {
        method: "GET",
        headers: headers
    };

    request = await fetch(urlOrdersProd, options);

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

    request = await fetch(urlLogInProd, options);

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

    request = await fetch(urlSignUpProd, options);

    createdUser = await request.json();

    return createdUser;

}

export async function AddOrder(newOrder) {

    const options = {
        method: "POST",
        headers: {
            Accept:"*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newOrder)
    };

    await fetch(urlOrdersProd, options);


}

export async function AddProduct(newProduct) {

    const options = {
        method: "POST",
        headers: {
            Accept:"*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    };

    const response = await fetch(urlProductsProd, options);

    if(response.status == 200) return;

    const responseJson = await response.json();

    return responseJson;

}


export async function UpdateProduct(updatedProduct) {

    const options = {
        method: "PUT",
        headers: {
            Accept:"*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
    };

    await fetch(urlProductsProd, options);


}

export async function DeleteProduct(productId) {

    const options = {
        method: "DELETE",
        headers: {
            Accept:"*/*",
            "Content-Type": "application/json"
        },
    };
    const urlDeleteProduct = `${urlProductsProd}?productId=${productId}`;

    const response = await fetch(urlDeleteProduct, options);
    
    if(response.status == 200) return;
    
    const responseJson = await response.json();
    return responseJson;
}