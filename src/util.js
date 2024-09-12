export const tryParseFloat = _makeTryParse(parseFloat)

export const tryParseInt = _makeTryParse(parseInt)

/**
 * @param {(value: string) => number} parse
 * @return {(errMsg: string) => (val: string) => number}
 */
function _makeTryParse(parse) {
  return (errMsg) => (value) => {
    const num = parse(value)
    if (Number.isNaN(num)) {
      throw new Error(errMsg.replaceAll('{value}', value))
    }
    return num
  }
}
