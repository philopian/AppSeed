// $ nodemon src/learn-node-exports.js --exec ./node_modules/.bin/babel-node --presets envD


// import messages from './messages';
// console.log('[call SimpleMessage]', messages.SimpleMessage);
// console.log('[call AnotherSimpleMessage]', messages.AnotherSimpleMessage);



import { SimpleMessage, AnotherSimpleMessage, PrintYourName } from './messages';
console.log('[call SimpleMessage]', SimpleMessage);
console.log('[call AnotherSimpleMessage]', AnotherSimpleMessage);
console.log('[]', PrintYourName('Phil'));