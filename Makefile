build:
	npm run build

watch:
	npm run watch

test: lint
	npm test

production:
	@npm install
	rm -rf dist public
	@./node_modules/.bin/grunt prod
	@./node_modules/.bin/babel -d dist/server ./server
	@./node_modules/.bin/babel -d dist/react ./react
	cp -r cluster.js index.js package.json public dist
	cp -r server/views dist/server/
	cp -r node_modules dist

install:
	npm install

update:
	npm update

run:
	npm run nodemon

lint:
	npm run lint

clean:
	rm -r ./node_modules ./public

.PHONY: build watch install update run lint test clean
