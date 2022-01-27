import yaml from 'js-yaml';

const isJSON = (path) => path.includes('.json');

const isYAML = (path) => path.includes('.yaml') || path.includes('.yml');

export default (file, path) => {
  if (isJSON(path)) {
    return JSON.parse(file);
  }

  if (isYAML(path)) {
    return yaml.load(file) ?? {};
  }

  return null;
};
