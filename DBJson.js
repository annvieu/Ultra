import { readFileSync, writeFileSync } from 'node:fs';

export class DBJson {
    constructor (path) {
        this.path = path;
    }

    // Получение всех записей
    getAll () {
        return JSON.parse(readFileSync(this.path, 'utf-8'));
    }

    // Найти запись по id
    findById (phone) {
        const data = this.getAll();

        return data.find(item => item.phone === phone);
    }

    getAllById(id) {
        const data = this.getAll();

        console.log(data);

        const info = data[id];

        console.log(info);

        if (info === undefined) {
            return [];
        }

        return info.comps;
    }

    addDataById(info) {
        const data = this.getAll();

        const user = data[info.id];

        if (user === undefined) {
            const id = generateRandomNumber();
            data[info.id] = {
            id: info.id,
            comps: [
                {
                    orgName: info.orgName,
                    address: info.address,
                    description: info.description,
                    orgType: info.orgType,
                    category: info.category,
                    id: id,
                }
            ]
            };

            writeFileSync(this.path, JSON.stringify(data));

            return id;
        } else {
            const id = generateRandomNumber();
            const company = {
                orgName: info.orgName,
                address: info.address,
                description: info.description,
                orgType: info.orgType,
                category: info.category,
                id: id,
            };
            data[info.id].comps.push(company);

            writeFileSync(this.path, JSON.stringify(data));

            return id;
        }
    }

    addItem(info) {
        const data = this.getAll();

        data[parseInt(info.userId)].comps[0].product = {
            name: info.name,
            price: info.price,
            weight: info.weight,
            description: info.description,
        };

        writeFileSync(this.path, JSON.stringify(data));

        return true;
    }

    // Добавить запись
    add (payload) {

        const id = generateRandomNumber();

        payload.id = id;

        const data = this.getAll();

        data.push(payload);

        writeFileSync(this.path, JSON.stringify(data));

        return true;
    }



    // Удалить запись
    deleteById (id) {
        const data = this.getAll();

        const hasItem = data.find(item => item.id === id);

        if (hasItem) {
            const newData = data.filter(item => item.id !== id);

            writeFileSync(this.path, JSON.stringify(newData));

            return true;
        } else {
            return false;
        }
    }

    // Обновить запись
    updateById (id, payload) {
        const data = this.getAll();

        const item = data.find(item => item.id === id);
        const itemIndex = data.findIndex(item => item.id === id);

        if (item) {
            const updatedItem = {
                ...item,
                ...payload
            };

            data[itemIndex] = updatedItem;

            writeFileSync(this.path, JSON.stringify(data));

            return true;
        } else {
            return false;
        }
    }
}


function generateRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}

