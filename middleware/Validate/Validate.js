function validateNumber(value) {
  return !isNaN(parseInt(value, 10));
}

function validateString(value, maxLength, minLength) {
  return (
    typeof value === 'string' &&
    new RegExp(`^.{${minLength || 0},${maxLength || ''}}`, 'g').test(value)
  );
}

function validateEmail(value) {
  return new RegExp(/^(.+)@(.+){2,}\.(.+){2,}$/g).test(value);
}

function isValueValid(value, options) {
  if (!value) return false;
  if (!options) return new Error('Invalid options');

  const { type, maxLength, minLength } = options;

  switch (type) {
    case 'number':
      return validateNumber(value);
    case 'string':
      return validateString(value, maxLength, minLength);
    case 'email':
      return validateEmail(value);
    default:
      return false;
  }
}

function validate(fields = []) {
  if (fields.length === 0) return true;

  const fieldValidations = fields.map(f => {
    const { value, ...options } = f;
    return isValueValid(value, options);
  });

  return fieldValidations.reduce((acc, curr) => curr && acc, true);
}

module.exports = validate;
