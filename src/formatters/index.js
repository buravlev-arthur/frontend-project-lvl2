import toStylish from './stylish.js';
import toPlain from './plain.js';

export default (diff, formatter) => {
  switch (formatter) {
    case 'stylish': return toStylish(diff);
    case 'plain': return toPlain(diff);
    case 'json': return JSON.stringify(diff);
    default: throw new Error(`"${formatter}" is invalid name of formatter. Use: "stylish", "json" or "plain"`);
  }
};
