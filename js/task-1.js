'use strict';

const user = {
  name: 'Mango',
  age: 20,
  hobby: 'html',
  premium: true,
};

user.mood = 'happy';

user.hobby = 'skydiving';

user.premium = false;

const showObject = function (obj) {
  const keys = Object.keys(obj);
  
  for (const key of keys) {
    console.log(`${key}:${obj[key]}`);
  }
}

showObject(user);