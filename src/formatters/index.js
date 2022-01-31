import toStylish from './stylish.js';
import toPlain from './plain.js';
import toJSON from './json.js';

export default (diff, formater) => {
  switch (formater) {
    case 'stylish': return toStylish(diff);
    case 'plain': return toPlain(diff);
    case 'json': return toJSON(diff);
    default: throw new Error('Invalid --format option. Use: "stylish", "json" or "plain"');
  }
};
