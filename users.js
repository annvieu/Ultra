import { Router, DBJson } from '../../core/index.js';

const usersRouter = new Router();

usersRouter.post('/login', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const newUser = JSON.parse(data);

            console.log(newUser);

            const DBUsers = new DBJson('./src/db/users.json');

            const existingUser = DBUsers.getAll().find(user => user.phone === newUser.phone);

            if (existingUser) {
                response.end(JSON.stringify(DBUsers.findById(newUser.phone)));
            } else {
                const success = DBUsers.add(newUser);

                if (success) {
                    response.end(JSON.stringify(DBUsers.findById(newUser.phone)));
                } else {
                    response.end(JSON.stringify({
                        ok:false,
                    }));
                }
            }
        });
});


usersRouter.post('/addCompany', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const requestData = JSON.parse(data);

            console.log(requestData);

            const DBUsers = new DBJson('./src/db/products.json');

            const info = DBUsers.addDataById(requestData);

            response.end(JSON.stringify({
                ok: true,
                info: info,
            }));
        });
});


usersRouter.post('/myCompany', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const requestData = JSON.parse(data);


            console.log(requestData);


            const DBUsers = new DBJson('./src/db/products.json');

            const userData = DBUsers.getAllById(requestData.id);


            response.end(JSON.stringify({
                ok: true,
                info: userData ?? [],
            }));
        });
});

usersRouter.post('/addProduct', (request, response) => {
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const requestData = JSON.parse(data);


            console.log(requestData);


            const DBUsers = new DBJson('./src/db/products.json');

            const userData = DBUsers.addItem(requestData);


            response.end(JSON.stringify({
                ok: userData,
            }));
        });
});

usersRouter.get('/users/infoAll', (request, response) => {
    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const DBUsers = new DBJson('./src/db/users.json');

            const info = DBUsers.getAll();

            response.writeHead(200, {
                'Content-type': 'application/json'
            });

            response.end(JSON.stringify({
                ok: true,
                info: info,
            }));
        });
});


usersRouter.get('/products/infoAll', (request, response) => {
    let data = '';

    request
        .on('data', (chunck) => {
            data += chunck;
        })
        .on('end', () => {
            const DBProducts = new DBJson("./src/db/products.json");

            const dbData = DBProducts.getAll();

            response.writeHead(200, {
                'Content-type': 'application/json'
            });

            response.end(JSON.stringify({
                ok: true,
                info: dbData,
            }));
        });
});




export {
    usersRouter
};