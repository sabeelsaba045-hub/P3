// data/users.js
export const user_standard = {
  username: 'standard_user',
  password: 'secret_sauce', // הסיסמה הציבורית של SauceDemo
};

// data/users.js
export const users = {
  positive: [
    { name: 'standard_user',             username: 'standard_user',             password: 'secret_sauce' },
    { name: 'problem_user',              username: 'problem_user',              password: 'secret_sauce' },
    { name: 'performance_glitch_user',   username: 'performance_glitch_user',   password: 'secret_sauce' },
    { name: 'error_user',                username: 'error_user',                password: 'secret_sauce' },
    { name: 'visual_user',               username: 'visual_user',               password: 'secret_sauce' },
  ],
  negative: {
    locked:        { username: 'locked_out_user',  password: 'secret_sauce' },
    goodUserBadPw: { username: 'standard_user',    password: 'WRONG' },
    badUserGoodPw: { username: 'no_such_user',     password: 'secret_sauce' },
    badUserBadPw:  { username: 'no_such_user',     password: 'WRONG' },
    emptyUser:     { username: '',                 password: 'secret_sauce' },
    emptyPw:       { username: 'standard_user',    password: '' },
    emptyBoth:     { username: '',                 password: '' },
  }
};