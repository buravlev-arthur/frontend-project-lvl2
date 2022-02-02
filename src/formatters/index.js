import toStylish from './stylish.js';
import toPlain from './plain.js';

export default (diff, formater) => {
  switch (formater) {
    case 'stylish': return toStylish(diff);
    case 'plain': return toPlain(diff);
    case 'json': return JSON.stringify(diff);
    default: throw new Error(`Invalid --format option "${formater}". Use: "stylish", "json" or "plain"`);
  }
};
