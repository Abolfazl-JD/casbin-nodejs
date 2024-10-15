const { newEnforcer } = require("casbin");
const  PostgresAdapter = require("casbin-pg-adapter").default;

let enforcer;

async function initCasbin(){
    console.log("**************************************",)
    const adapter = await PostgresAdapter.newAdapter({
        connectionString: "postgresql://ajd:40304030@localhost:5432/casbin_db"
    }); 

    enforcer = await newEnforcer('src/model.conf', adapter);

    await enforcer.loadPolicy()
    const policies = await enforcer.getPolicy()

    if(!policies.length) {
        const addAdminRead = await enforcer.addPolicy('admin', 'articles', 'read');
        console.log("Admin read policy added:", addAdminRead);

        const addAdminWrite = await enforcer.addPolicy('admin', 'articles', 'write');
        console.log("Admin write policy added:", addAdminWrite);

        const addUserRead = await enforcer.addPolicy('user', 'articles', 'read');
        console.log("User read policy added:", addUserRead);

        const addUserMediaRead = await enforcer.addPolicy('user', 'media', 'read');
        console.log("User media read policy added:", addUserMediaRead);

        console.log("policies after adding : ", await enforcer.getPolicy())
    }
}

async function checkAccess(role, resource, action) {
    console.log("enforcing: ", role, resource, action)
    return enforcer.enforce(role, resource, action)
}

module.exports = { checkAccess, initCasbin }