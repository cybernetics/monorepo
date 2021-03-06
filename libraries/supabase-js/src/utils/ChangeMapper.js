// # Lifted from epgsql (src/epgsql_binary.erl), this module licensed under
// # 3-clause BSD found here: https://raw.githubusercontent.com/epgsql/epgsql/devel/LICENSE

/**
 * Takes an array of columns and an object of string values then converts each string value
 * to its mapped type
 * @param {{name: String, type: String}[]} columns
 * @param {Object} records
 * @param {Object} options The map of various options that can be applied to the mapper
 * @param {Array} options.skipTypes The array of types that should not be converted
 * 
 * @example
 * convertChangeData([{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age:'33'}, {})
 * //=>
 * { first_name: 'Paul', age: 33 }
 */
export const convertChangeData = (columns, records, options = {}) => {
    let result = {}
    let skipTypes = typeof options.skipTypes !== 'undefined' ? options.skipTypes : []
    Object.entries(records).map(([key, value]) => {
      result[key] = convertColumn(key, columns, records, skipTypes)
    })
    return result
  }
  
  /**
   * Converts the value of an individual column
   * @param {String} columnName The column that you want to convert
   * @param {{name: String, type: String}[]} columns All of the columns
   * @param {Object} records The map of string values
   * @param {Array} skipTypes An array of types that should not be converted
   * @return {object} Useless information
   * 
   * @example
   * convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], ['Paul', '33'], [])
   * //=>
   * 33
   * 
   * @example
   * convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], ['Paul', '33'], ['int4'])
   * //=>
   * "33"
   */
  export const convertColumn = (columnName, columns, records, skipTypes) => {
    let column = columns.find(x => x.name == columnName)
    if(skipTypes.includes(column.type)) return noop(records[columnName])
    else return convertCell(column.type, records[columnName])
  }
  
  /**
   * If the value of the cell is `null`, returns null.
   * Otherwise converts the string value to the correct type.
   * @param {String} type A postgres column type
   * @param {String} stringValue The cell value
   * 
   * @example
   * convertCell('bool', 'true')
   * //=>
   * true
   * 
   * @example
   * convertCell('int8', '10')
   * //=>
   * 10
   */
  export const convertCell = (type, stringValue) => {
    try {
      if (stringValue === null) return null
  
      // If not null, convert to correct type.
      switch (type) {
        case 'bool':
          return toBoolean(stringValue)
        case 'bpchar':
          return noop(stringValue)
        case 'bytea':
          return noop(stringValue)
        case 'char':
          return noop(stringValue)
        case 'cidr':
          return noop(stringValue)
        case 'date':
          return noop(stringValue) // To allow users to cast it based on Timezone
          return toDate(stringValue)
        case 'daterange':
          return toDateRange(stringValue)
        case 'float4':
          return toFloat(stringValue)
        case 'float8':
          return toFloat(stringValue)
        case 'geometry':
          return noop(stringValue)
        case 'hstore':
          return noop(stringValue)
        case 'inet':
          return noop(stringValue)
        case 'int2':
          return toInt(stringValue)
        case 'int4':
          return toInt(stringValue)
        case 'int4range':
          return toIntRange(stringValue)
        case 'int8':
          return toInt(stringValue)
        case 'int8range':
          return toIntRange(stringValue)
        case 'interval':
          return noop(stringValue)
        case 'json':
          return toJson(stringValue)
        case 'jsonb':
          return toJson(stringValue)
        case 'macaddr':
          return noop(stringValue)
        case 'macaddr8':
          return noop(stringValue)
        case 'point':
          return noop(stringValue)
        case 'text':
          return noop(stringValue)
        case 'time':
          return noop(stringValue)
        case 'timestamp':
          return noop(stringValue) // To allow users to cast it based on Timezone
          return toDate(stringValue)
        case 'timestamptz':
          return noop(stringValue) // To allow users to cast it based on Timezone
          return toDate(stringValue)
        case 'timetz':
          return noop(stringValue)
        case 'tsrange':
          return noop(stringValue)
        case 'tstzrange':
          return noop(stringValue)
        case 'uuid':
          return noop(stringValue)
        case 'varchar':
          return noop(stringValue)
        default:
          // Unhandled and custom types will always return as strings
          return noop(stringValue)
      }
    } catch (error) {
      console.log(`Could not convert cell of type ${type} and value ${stringValue}`)
      return stringValue
    }
  }
  
  /**
   * Passes back the raw string value
   */
  const noop = stringValue => {
    return stringValue
  }
  const toBoolean = stringValue => {
    switch (stringValue) {
      case 't':
        return true
      case 'f':
        return false
      default:
        return null
    }
  }
  const toDate = stringValue => {
    return new Date(stringValue)
  }
  const toDateRange = stringValue => {
    let arr = JSON.parse(stringValue)
    return [new Date(arr[0]), new Date(arr[1])]
  }
  const toFloat = stringValue => {
    return parseFloat(stringValue)
  }
  const toInt = stringValue => {
    return parseInt(stringValue)
  }
  const toIntRange = stringValue => {
    let arr = JSON.parse(stringValue)
    return [parseInt(arr[0]), parseInt(arr[1])]
  }
  const toJson = stringValue => {
    return JSON.parse(stringValue)
  }