REPORTER = spec

build:
	@./node_modules/.bin/grunt

production:
	@npm install
	rm -rf dist public
	@./node_modules/.bin/grunt prod
	@./node_modules/.bin/babel -d dist/server ./server
	@./node_modules/.bin/babel -d dist/react ./react
	cp -r cluster.js index.js package.json public dist
	cp -r server/views dist/server/
	cp -r node_modules dist

watch:
	@./node_modules/.bin/grunt watch

hint:
	@./node_modules/.bin/grunt hint

locales:
	@./node_modules/.bin/grunt locales

test: hint
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui bdd

install:
	npm install

run:
	nodemon dev.js | ./node_modules/.bin/bunyan -o short

clean:
	rm -r ./node_modules ./public ./dist

.PHONY: build production watch test hint locales install update clean
