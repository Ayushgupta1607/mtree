
export const validate = (schema, property = 'body') => {
    return (req, res, next) => {
      let validateData = { ...req[property] };
      const { error, value } = schema.validate(validateData);
      const valid = error == null;
  
      if (valid) {
        req.validData = value;
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
        res.status(422).json({ status: 0, data: null, msg: message });
      }
    };
  };