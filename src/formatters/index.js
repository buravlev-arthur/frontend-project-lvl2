import toStylish from './stylish.js';
import toPlain from './plain.js';

export default (diff, formater) => {
  switch (formater) {
    case 'stylish': return toStylish(diff);
    case 'plain': return toPlain(diff);
    default: return diff;
  }
};
