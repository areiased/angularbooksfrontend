require('@babel/register');
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const fetch = require('node-fetch');

const cachedSearchResult = require('./search.json');

const app = new Koa();
const router = new Router();

router
    .get('/search', async ctx => {
        const { author } = ctx.query;

        let serverData;
        try {
            const data = await fetch(`http://openlibrary.org/search.json?author=${author}`, { timeout: 3000 });
            serverData = await data.json();
        } catch (err) {
            if (author !== 'tolkien') {
                throw new Error('timeout!');
            }
            serverData = cachedSearchResult;
        }
        const data = {
            ...serverData,
            docs: serverData.docs.map(doc => ({ ...doc, id: doc.cover_edition_key })).filter(doc => !!doc.id)
        };
        ctx.body = data;
    })
    .get('/books', async ctx => {
        const { id } = ctx.query;
        const bibKey = `OLID:${id}`;

        const data = await fetch(`http://openlibrary.org/api/books?bibkeys=OLID:${id}&format=json&jscmd=details`, {
            timeout: 10000
        });
        const serverData = await data.json();
        const book = serverData[bibKey];
        ctx.body = { ...book, details: { ...book.details, cover: `http://covers.openlibrary.org/b/OLID/${id}-M.jpg` } };
    });

app.use(cors())
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);
