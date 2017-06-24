const val = require('validate.js')

val.validators.string = function(value) {
  if (value === undefined) {
    return undefined
  } else {
    if (val.isString(value)) {
      return undefined
    } else {
      return 'must be a string.'
    }
  }
}
module.exports = val

module.exports.constraints = {}
module.exports.constraints.updateAccount = {
  name: {
    string: true,
    length: {
      maximum: 3000
    }
  },
  url: {
    string: true,
    length: {
      maximum: 3000
    }
  },
  username: {
    string: true,
    length: {
      maximum: 3000
    }
  },
  notes: {
    string: true,
    length: {
      maximum: 3000
    }
  },
  password: {
    string: true,
    length: {
      maximum: 3000
    }
  },
  change_password: {
    string: true,
    length: {
      maximum: 3000
    }
  },
  'form_entry.username': {
    string: true,
    length: {
      maximum: 3000
    }
  },
  'form_entry.password': {
    string: true,
    length: {
      maximum: 3000
    }
  },
  access_requires_password: {
    string: true,
    length: {
      maximum: 500
    }
  },
  autofill: {
    string: true,
    length: {
      maximum: 500
    }
  }
}
module.exports.constraints.newAccount = {
  name: {
    string: true,
    presence: true,
    length: {
      maximum: 3000
    }
  },
  url: {
    string: true,
    presence: true,
    length: {
      maximum: 3000
    }
  },
  username: {
    string: true,
    presence: true,
    length: {
      maximum: 3000
    }
  },
  notes: {
    string: true,
    presence: true,
    length: {
      maximum: 3000
    }
  },
  password: {
    string: true,
    presence: true,
    length: {
      maximum: 3000
    }
  },
  change_password: {
    string: true,
    presence: true,
    length: {
      maximum: 3000
    }
  },
  'form_entry.username': {
    string: true,
    presence: true,
    length: {
      maximum: 3000
    }
  },
  'form_entry.password': {
    string: true,
    presence: true,
    length: {
      maximum: 3000
    }
  },
  access_requires_password: {
    string: true,
    presence: true,
    length: {
      maximum: 500
    }
  },
  autofill: {
    string: true,
    presence: true,
    length: {
      maximum: 500
    }
  }
}
