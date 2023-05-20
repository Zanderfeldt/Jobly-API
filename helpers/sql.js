const { BadRequestError } = require("../expressError");

/**Helper for making selective query updates
 * 
 * Calling function can use it to make SET clause for an SQL UPDATE query/statement
 * 
 * @param dataToUpdate {Object} {key1: newVal1, field2: newVal2, ...}
 * @param jsToSql {Object} {maps camel-cased JS fields to proper database column name format
 *    like {firstName : "first_name"}}
 * 
 * @returns {Object} {sqlSetCols, dataToUpdate}
 * 
 * @example {firstName: "Alex", age: 28} => 
 *    { setCols: '"first_name"=$1, "age"=$2',
 *      values: ['Alex', 28] }
 */ 

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `${jsToSql[colName] || colName}=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
