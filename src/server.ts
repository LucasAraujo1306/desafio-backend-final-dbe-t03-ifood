import app from './app';

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}\nhttp://localhost:${port}\npress CTRL+C to stop server`);
});
