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

function isValidValue(value, type) {
  if (type !== 'array' && typeof value !== type) {
    return false;
  } else if (
    type === 'array' &&
    (typeof value !== 'object' || !Array.isArray(value))
  ) {
    return false;
  } else {
    switch (typeof value) {
      case 'string': {
        return value !== '';
      }

      case 'number': {
        return !isNaN(value);
      }

      case 'object': {
        if (Array.isArray(value)) {
          return value.length !== 0;
        } else {
          return Object.keys(value).length !== 0;
        }
      }

      default:
        return true;
    }
  }
}

function isValueValid(value, options) {
  if (!options) return new Error('Invalid options');

  const { type, maxLength, minLength } = options;

  if (isValidValue(value, type)) {
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
  } else {
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
