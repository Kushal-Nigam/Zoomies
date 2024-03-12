const pool = require("../config/dbConnection")
//Class to handle Users table and perform CRUD operations
class User{
    constructor(firstName,lastName,email,hashedPassword){
        this.First_Name = firstName;
        this.Last_Name = lastName;
        this.email = email;
        this.password  = hashedPassword
    }

    async save() {
        let sql =  `INSERT INTO users SET?`
        let userDetails = { First_Name: this.First_Name, Last_Name: this.Last_Name, password: this.password, email:this.email }
        return await pool.query(sql,[userDetails], (err)=>{
            if (err) throw err
        })
    }
    

    async updateUser(Id) {
        let sql = `UPDATE users SET First_Name = ?, Last_Name = ?, email = ? WHERE id = ?`
        const [response] =  await pool.query(sql,[this.First_Name,this.Last_Name,this.email, Id], (err)=>{
            if (err) throw err
        })
        return response
    }

   static async deleteUser(Id) {
        let sql = "DELETE FROM users WHERE id = ?"
        const [response] =  await pool.query(sql,[Id], (err)=>{
            if (err) throw err
        })
        return response
    }

    static async checkDuplicate(email){
        let sql =   "SELECT * FROM users WHERE email = ?"
        const [duplicate] = await pool.execute(sql,[email], (err)=>{
            if(err) throw err
        })
        if(duplicate[0]){
            return true;
        }else{
            return false;
        }
    }

    static async findUser(email){
        let sql = "SELECT * FROM users WHERE email = ?"
        const [response] = await pool.execute(sql,[email], (err)=>{
            if(err) throw err
        })
        return response[0]
    }

    static async addToken(email,refreshToken,timeStamp){
        let sql = `UPDATE users SET refreshToken = ?, Valid_Until = ? WHERE email = ?`
        const [response] = await pool.execute(sql,[refreshToken,timeStamp,email], (err)=>{
            if(err) throw err
        })
        return response
    }

    static async findToken(refreshToken){
        let sql = 'SELECT * FROM users WHERE refreshToken = ?'
        const[response] = await pool.execute(sql, [refreshToken], (err)=>{
            if(err) throw err
        })
        return response[0]
    }
}

module.exports = User