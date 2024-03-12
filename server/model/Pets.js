const pool = require("../config/dbConnection")
//Class to handle Pets table and perform CRUD operations
class Pet{
    constructor(Name,type,breed,testResult, userId){
        this.Name = Name;
        this.type = type;
        this.breed = breed;
        this.result = testResult;
        this.userId = userId
    }

    async save() {
        let sql =  `INSERT INTO pets SET?`
        let petDetails = { Name: this.Name, Type: this.type, Breed : this.breed, Test_Results:this.result, User_Id:this.userId }
        return await pool.query(sql,[petDetails], (err)=>{
            if (err) throw err
        })
    }

    static async getAllPets(userId){
        let sql =   "SELECT * FROM pets WHERE User_Id = ?"
        const [response] = await pool.execute(sql,[userId], (err)=>{
            if(err) throw err
        })
        return response
    }

    static async deletePet(Id){
        let sql =   "DELETE FROM pets WHERE id = ?"
        const [response] = await pool.execute(sql,[Id], (err)=>{
            if(err) throw err
        })
        return response
    }

    static async deleteAllPets(userId){
        let sql =   "DELETE FROM pets WHERE User_Id = ?"
        const [response] = await pool.execute(sql,[userId], (err)=>{
            if(err) throw err
        })
        return response
    }

     async updatePet(Id){
        let sql = `UPDATE pets SET  Name = ?, Type = ?, Breed = ? WHERE id = ?`
        const [response] = await pool.execute(sql,[this.Name,this.type,this.breed,Id], (err)=>{
            if(err) throw err
        })
        return response
    }



}

module.exports = Pet