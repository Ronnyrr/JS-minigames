import express from 'express';
import swig from 'swig';

const app = express();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', `${__dirname}/../views`);
app.enable('strict routing');
app.disable('x-powered-by');

if (app.settings.env === 'development') {
	swig.setDefaults({ cache: false });
}

app.use(require('serve-static')(`${__dirname}/../public`));


app.get('/', (req, res) => {
	res.render('home', {
		page: req.url,
	});
});

/* app.get('/pattern', (req, res) => {
	res.render('pattern');
}); */

app.get('/response', (req, res) => {
	res.render('response', {
		page: req.url,
	});
});

app.get('/memory', (req, res) => {
	res.render('memory', {
		page: req.url,
	});
});

const port = process.env.PORT || 4321;
app.listen(port, () => console.info(`Listening on port ${port}`));
