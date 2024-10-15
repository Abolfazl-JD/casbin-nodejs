const { checkAccess } = require('./casbin.js');

function getActionFromMethod(method) {
  switch (method) {
    case 'GET':
      return 'read';
    case 'POST':
      return 'write';
    case 'PUT':
    case 'PATCH':
      return 'update';
    case 'DELETE':
      return 'delete';
    default:
      return 'unknown';
  }
}
async function casbinMiddleware(req, res, next) {
  console.log("request headers are : ", req.headers)
  const userRole = req.headers.role;
  const resource = req.path.split('/')[2]; 
  console.log("resource is : ", resource)
  const method = req.method.toUpperCase();
  const action = getActionFromMethod(method)

  console.log('action is : ', action)

  const allowed = await checkAccess(userRole, resource, action);

  if (allowed) {
    next();
  } else {
    res.status(403).send('Access Denied');
  }
}

module.exports = casbinMiddleware;