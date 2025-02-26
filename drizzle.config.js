/** @type { import ("drizzle-kit").Config} */
export default{
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials: {
        url:'postgresql://neondb_owner:npg_eLyHTYhqc41g@ep-late-frost-a8q99elu-pooler.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require'
    
    }
};
