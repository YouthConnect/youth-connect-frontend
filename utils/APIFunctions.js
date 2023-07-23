'use strict';

// General API functions that the server currently supports
// Use these functions anywhere in the front end to do things



export const createRoom = async payload => {
  const method = 'POST';
  const url = 'https://youth-connect-server.onrender.com/api/v1/rooms';
  const action = 'CREATING ROOM';
  let headers = new Headers();
  const body = {
    name: payload.name,
    users: payload.users,
    description: payload.description,
    minimumAge: payload.minimumAge,
    maxAge: payload.maxAge,
  };
  // Basic auth only
  // let user = base64.encode(`${username}:${password}`);
  // Bearer auth only
  headers.set('Authorization', `Bearer ${user.token}`);
  // all posts and puts and delete
  headers.set('Content-Type', 'application/json');
  let newRoom
  try {
    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Data from create room', data)
        return data
      })
    
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  // ...
};

export const getRooms = async () => {
  const method = 'GET';
  const url = 'https://youth-connect-server.onrender.com/api/v1/rooms';
  const action = 'GETTING ROOMS';
  let headers = new Headers();
  const body = {};
  // Basic auth only
  // let user = base64.encode(`${username}:${password}`);
  // Bearer auth only
  headers.set('Authorization', `Bearer ${user.token}`);
  // all posts and puts and delete
  headers.set('Content-Type', 'application/json');
  try {
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then(res => res.json())
      .then(data => {
        //-----
      })
      
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  // ...
};

  
  


export const deleteRoom = async payload => {
  const method = 'DELETE';
  const url = `https://youth-connect-server.onrender.com/api/v1/rooms/${id}`;
  const action = 'DELETING ROOM';
  let headers = new Headers();
  const body = {};
  // Basic auth only
  // let user = base64.encode(`${username}:${password}`);
  // Bearer auth only
  headers.set('Authorization', `Bearer ${user.token}`);
  // all posts and puts and delete
  headers.set('Content-Type', 'application/json');
  try {
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then(res => res.json())
      .then(data => {
        //-----
      })
      
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  // ...
};


export const deleteMessage = async (id) => {
  const method = "DELETE";
  const url = `https://youth-connect-server.onrender.com/api/v1/messages/${id}`;
  const action = "DELETING MESSAGE";
  let headers = new Headers();
  const body = {};
  // Basic auth only
  // let user = base64.encode(`${username}:${password}`);
  // Bearer auth only
  headers.set("Authorization", `Bearer ${user.token}`);
  // all posts and puts and delete
  headers.set('Content-Type', 'application/json');
  try {
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        //-----
      })
      
  } catch (error) {
    console.log("ERROR ", action, ":", error);
  }
  // ...
};

export const updateRoom = async payload => {
  const method = 'PUT';
  const url = `https://youth-connect-server.onrender.com/api/v1/rooms/${payload.room}`;
  const action = 'UPDATING ROOM';
  let headers = new Headers();
  const body = {
    name: payload.room,
    users: payload.users,
    description: payload.description,
    minimumAge: payload.minimumAge,
    maxAge: payload.maxAge,
  };
  // Basic auth only
  // let user = base64.encode(`${username}:${password}`);
  // Bearer auth only
  headers.set('Authorization', `Bearer ${user.token}`);
  // all posts and puts and delete
  headers.set('Content-Type', 'application/json');
  try {
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then(res => res.json())
      .then(data => {
        return data
      })
    
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  // ...
};

export const createUser = async payload => {
  console.log('create user payload', payload);
  const method = 'POST';
  const url = 'https://youth-connect-server.onrender.com/signup';
  const action = 'CREATING USER';
  let headers = new Headers();
  const body = {
    username: payload.username,
    password: payload.password,
    DOB: payload.DOB,
  };
  // Basic auth only
  // let user = base64.encode(`${username}:${password}`);
  // Bearer auth only
  // headers.set("Authorization", `Bearer ${user.token}`);
  // all posts and puts and delete
  headers.set('Content-Type', 'application/json');
  let newUser
  try {
    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        newUser = data.user;
        console.log(newUser);
      })
    
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  return newUser
};

export const getUsers = async payload => {
  const method = 'GET';
  const url = 'https://youth-connect-server.onrender.com/api/v1/users';
  const action = 'GETTING USERS';
  let headers = new Headers();
  const body = {};
  // Basic auth only
  // let user = base64.encode(`${username}:${password}`);
  // Bearer auth only
  headers.set('Authorization', `Bearer ${user.token}`);
  // all posts and puts and delete
  headers.set('Content-Type', 'application/json');
  try {
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then(res => res.json())
      .then(data => {
        //-----
      })
      
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  // ...
};

module.exports = {
  createRoom,
  createUser,
  getUsers,
  getRooms,
  deleteRoom,
  deleteMessage,
  updateRoom,
  getUsers,
};
