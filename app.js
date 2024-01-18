
const sql = require('mssql');
 
// SQL Server配置信息
const config = {
    user: 'start_test', // 输入你的用户名
    password: '123456', // 输入你的密码
    server: '127.0.0.1', // 输入服务器地址或IP地址
    port:1433,
    database: 'test', // 输入要连接的数据库名称
    encrypt: false, 
    trustServerCertificate: true
};
 
async function connectToSqlServer() {
    try {
        await sql.connect(config);
        
        const result = await new Promise((resolve, reject) => {
            const request = new sql.Request();
            
            // 编写你想要执行的SQL语句
            request.query("SELECT * FROM [guest].[person]", (err, res) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(res.recordsets[0]);
                }
            });
        });
        
        console.log(result); // 打印结果集
        
        sql.close(); // 关闭与数据库的连接
    } catch (error) {
        console.error(error);
    }
}
 
connectToSqlServer();