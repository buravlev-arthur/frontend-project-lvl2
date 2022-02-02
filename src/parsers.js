import yaml from 'js-yaml';

export default (data, path) => {
  const format = path.slice(-4, -3) === '.' ? path.slice(-3) : path.slice(-4);

  switch (format) {
    case 'json': return JSON.parse(data);
    case 'yaml': return yaml.load(data) ?? {};
    case 'yml': return yaml.load(data) ?? {};
    default: return null;
  }
};
