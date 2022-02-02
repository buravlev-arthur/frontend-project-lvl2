import _ from 'lodash';

const getDiff = (object1, object2) => {
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));

  const result = keys.map((key) => {
    if (!_.has(object2, key)) {
      return { status: 'removed', key, value: object1[key] };
    }

    if (!_.has(object1, key)) {
      return { status: 'new', key, value: object2[key] };
    }

    if (object1[key] === object2[key]) {
      return { status: 'same', key, value: object1[key] };
    }

    if (!_.isPlainObject(object1[key]) || !_.isPlainObject(object2[key])) {
      const values = { oldValue: object1[key], newValue: object2[key] };
      return { status: 'changed', key, value: values };
    }

    return { status: 'haveChildren', key, value: getDiff(object1[key], object2[key]) };
  });

  return result;
};

export default getDiff;
