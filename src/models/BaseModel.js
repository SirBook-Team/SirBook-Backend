import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config()
const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL || 'http://localhost:2000/api';

const BaseModel = class {
    async validate() {
        return true;
    }

    static async construct(params, validate = true) {       
        const obj = new this();
        Object.assign(obj, params);
        
        if (validate) {
            try {
                await obj.validate();
            } catch (error) {
                throw new Error(`Error creating ${this.name.toLowerCase()}: ${error.message}`);
            }
        }
        return obj;
    }

    static async getDb(data) {
        const objName = this.name.toLowerCase();
        
        try {
            const response = await axios.get(`${PYTHON_SERVER_URL}/${objName}`, {
                params: data,
                timeout: 5000
            });
            if (response.status !== 200) {
                throw new Error(`Error getting ${objName}: ${response.data}`);
            }
            return response;
        } catch (error) {
            throw new Error(`Error getting ${objName}: ${error.message}`);
        }
    }

    static async get(data) {
        const objName = this.constructor.name.toLowerCase();
        
        try {
            const response = await this.getDb(data);
            return response;
        } catch (error) {
            throw new Error(`Error getting ${objName}: ${error.message}`);
        }
    }

    static async getIdDB(data) {
        const objName = this.name.toLowerCase();

        try {
            const response = await axios.get(`${PYTHON_SERVER_URL}/${objName}/${data.id}`, { timeout: 5000 });
            if (response.status !== 200) {
                throw new Error(`Error getting ${objName}: ${response.data}`);
            }
            return response;
        } catch (error) {
            throw new Error(`Error getting ${objName}: ${error.message}`);
        }
    }

    static async getById(id) {
        const objName = this.constructor.name.toLowerCase();
        
        try {
            const response = await this.getIdDB({ id });
            if (response.data.length === 0) {
                return null;
            }
            const obj = await this.construct(response.data, false);
            return obj;
        } catch (error) {
            throw new Error(`Error getting ${objName}: ${error.message}`);
        }
    }

    static async findAll(data) {
        const list = [];
        const objName = this.constructor.name.toLowerCase();
        
        try {
            const response = await this.get(data);

            await response.data.forEach(async (item) => {
                const obj = await this.construct(item);
                list.push(obj);
            });
            
            return list;
        } catch (error) {
            throw new Error(`Error getting ${objName}: ${error.message}`);
        }
    }
    
    static async findOne(data) {
        const objName = this.constructor.name.toLowerCase();
        
        try {
            const response = await this.get(data);
            if (response.data.length === 0) {
                return null;
            }
            const obj = await this.construct(response.data[0], false);
            return obj;
        } catch (error) {
            throw new Error(`Error getting ${objName}: ${error.message}`);
        }
    }

    async createDb() {
        const objName = this.constructor.name.toLowerCase();
        
        try {
            const response = await axios.post(`${PYTHON_SERVER_URL}/${objName}`, this, { timeout: 5000 });
            
            if (response.status !== 200) {
                throw new Error(`Error creating ${objName}: ${response.data}`);
            }
            return response;
        } catch (error) {
            throw new Error(`Error creating ${objName}: ${error.message}`);
        }
    }

    async create() {
        const objName = this.constructor.name.toLowerCase();
        
        try {
            const response = await this.createDb();
            if (response.status !== 200) {
                throw new Error(`Error creating ${objName}`);
            }
            
            return response;
        } catch (error) {
            throw new Error(`Error creating ${objName}: ${error.message}`);
        }
    }

    static async createObject(params) {
        const objName = this.constructor.name.toLowerCase();
        const obj = await this.construct(params);
        
        try {
            const response = await obj.create();
            const newObj = await this.construct(response.data, false);
            console.log(newObj, "123123");
            return newObj;
        } catch (error) {
            throw new Error(`Error creating ${objName}: ${error.message}`);
        }
    }

    async updateDb() {
        const objName = this.constructor.name.toLowerCase();
        
        try {
            const response = await axios.put(`${PYTHON_SERVER_URL}/${objName}/${this.id}`, this, { timeout: 5000 });
            if (response.status !== 200) {
                throw new Error(`Error updating ${objName}: ${response.data}`);
            }
            return response;
        } catch (error) {
            throw new Error(`Error updating ${objName}: ${error.message}`);
        }
    }

    async update() {
        const objName = this.constructor.name.toLowerCase();
        
        try {
            const response = await this.updateDb();
            return response;
        } catch (error) {
            throw new Error(`Error updating ${objName}: ${error.message}`);
        }
    }

    async deleteDb() {
        const objName = this.constructor.name.toLowerCase();
        
        try {
            const response = await axios.delete(`${PYTHON_SERVER_URL}/${objName}/${this.id}`, { timeout: 5000 });
            if (response.status !== 200) {
                throw new Error(`Error deleting ${objName}: ${response.data}`);
            }
            return response;
        } catch (error) {
            throw new Error(`Error deleting ${objName}: ${error.message}`);
        }
    }

    async delete() {
        const objName = this.constructor.name.toLowerCase();
        
        try {
            const response = await this.deleteDb();
            return response;
        } catch (error) {
            throw new Error(`Error deleting ${objName}: ${error.message}`);
        }
    }
}

export default BaseModel;
