import _ from 'lodash';

const isPrimalType = (data) => !_.isPlainObject(data) && !_.isArray(data);

export default isPrimalType;
