'use strict';

// General API functions that the server currently supports
// Use these functions anywhere in the front end to do things

const createRoom = async payload => {
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
      .catch(err => console.error(err));
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  // ...
};

const getRooms = async () => {
  const method = 'GET';
  const url = 'https://youth-connect-server.onrender.com/api/v1/rooms';
  const action = 'GETTING ROOMS';
  let headers = new Headers();
  const body = {};
  // Basic auth only
  // let user = base64.encode(`${username}:${password}`);
  // Bearer auth only
  headers.set('Authorization', `Bearer ${user.token}`);
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
      .catch(err => console.error(err));
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  // ...
};

const deleteRoom = async payload => {
  const method = 'DELETE';
  const url = `https://youth-connect-server.onrender.com/api/v1/rooms/${id}`;
  const action = 'DELETING ROOM';
  let headers = new Headers();
  const body = {};
  // Basic auth only
  // let user = base64.encode(`${username}:${password}`);
  // Bearer auth only
  headers.set('Authorization', `Bearer ${user.token}`);
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
      .catch(err => console.error(err));
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  // ...
};

const updateRoom = async payload => {
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
      .catch(err => console.error(err));
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  // ...
};

const createUser = async payload => {
  const method = 'POST';
  const url = 'https://youth-connect-server.onrender.com/api/v1/users';
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
      .catch(err => console.error(err));
  } catch (error) {
    console.log('ERROR ', action, ':', error);
  }
  // ...
};

const getUsers = async payload => {
  const method = 'GET';
  const url = 'https://youth-connect-server.onrender.com/api/v1/users';
  const action = 'GETTING USERS';
  let headers = new Headers();
  const body = {};
  // Basic auth only
  // let user = base64.encode(`${username}:${password}`);
  // Bearer auth only
  headers.set('Authorization', `Bearer ${user.token}`);
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
      .catch(err => console.error(err));
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
  updateRoom,
  getUsers,
};
