let API_ENDPOINT = "https://localhost:7040/"

export const postRequest = async (path, body) => {
    console.log("body: ", body)
    return await request(path, "POST", body)
}
export const getRequest = async (path, body) => {
    return await request(path, "GET", body)
}
export const putRequest = async (path, body) => {
    return await request(path, "PUT", body)
}
export const patchRequest = async (path, body) => {
    return await request(path, "PATCH", body)
}
export const deleteRequest = async (path, body) => {
    return await request(path, "DELETE", body)
}


const request = async (path, method, body) => {
    console.log("Path: ", path);
    const token = localStorage.getItem("userToken");
    var responseFn;
    await fetch(API_ENDPOINT + path, {
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method,
        body: JSON.stringify(body),
    }).then(async (response) => {
        console.log("Response: ", response);
        if (method !== "PUT")
            await response.json().then(data => {
                console.log("ResponseJson: ", data);
                if (response.ok) {
                    responseFn = { isError: false, data: data }

                    return { isError: false, data: data }
                } else {
                    responseFn = { isError: true, errorMsg: data }
                    return { isError: true, errorMsg: data }
                }


            }).catch(err => {
                console.log("Error while JSON! ", err)
                responseFn = { isError: true, errorMsg: err }
                return { isError: true, errorMsg: err }
            })


    }).catch(error => {
        console.log("error!! ", error);
        responseFn = { isError: true, errorMsg: error }
        return { isError: true, errorMsg: error }
    })
    return responseFn;
}