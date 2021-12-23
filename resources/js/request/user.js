export const set_token = (token) => {
    localStorage.setItem('token', token);
    return token;
}

export const get_token = () => {
    return localStorage.getItem('token');
}

export const remove_token = () => {
    localStorage.removeItem('token');
    return null;
}

export const login = (form_values, callback) => {
    var formData = new FormData();
    formData.append('email', form_values.email);
    formData.append('password', form_values.password);

    axios.post('/api/user/login', formData)
    .then((response) => {
        var data = response.data;
        callback(data);
    })
    .catch(e => {
        var data = e.response.data;
        callback(data)
    })
}

export const info = (callback, logout) => {
    axios.get('/api/user', { headers: {"Authorization" : `Bearer ${get_token()}`} })
    .then((response) => {
        var data = response.data;
        callback(data);
    })
    .catch(e => {
        var status = e.response.status;
        if(status === 401){
            logout();
        }
    })
}

export const list = (form_search = null, callback) => {
    axios.get(`/api/ticket/list`, { headers: {"Authorization" : `Bearer ${get_token()}`} })
    .then((response) => {
        var data = response.data;
        callback(data);
    })
}


export const list_vendas = (callback) => {
    axios.get(`/api/ticket/my_sales`, { headers: {"Authorization" : `Bearer ${get_token()}`} })
    .then((response) => {
        var data = response.data;
        callback(data);
    })
}


export const purchase_ticket = (form_values, callback) => {
    var formData = new FormData();
    formData.append('ticket_id', form_values.id);
    formData.append('quantity', form_values.quantity ? form_values.quantity : 1);

    axios.post('/api/ticket/purchase', formData,  { headers: {"Authorization" : `Bearer ${get_token()}`} })
    .then((response) => {
        var data = response.data;
        callback(data);
    })
    .catch(e => {
        var data = e.response.data;
        callback(data)
    })
}

export const store_user = (form_values, callback) => {
    var formData = new FormData();
    formData.append('full_name', form_values.full_name);
    formData.append('email', form_values.email);
    formData.append('password', form_values.password);

    axios.post('/api/user/store', formData)
    .then((response) => {
        var data = response.data;
        callback(data);
    })
    .catch(e => {
        var data = e.response.data;
        callback(data)
    })
}