function detectType(data) {
  let type = '';
  const tag = Object.prototype.toString.call(data); // '[object Undefined]'
  const matches = tag.match(/\[object (\S+)\]/);
  if (matches) {
    type = matches[1].toLowerCase();
  }
  const allowedTypes = new Set([
    'number',
    'null',
    'string',
    'undefined',
    'bigint',
    'symbol',
    'boolean',
    'array',
    'arraybuffer',
    'date',
    'function',
    'map',
    'set'
  ]);
  if (allowedTypes.has(type)) {
    return type;
  }
  return 'object';
}