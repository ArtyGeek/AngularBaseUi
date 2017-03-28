'use strict';

var gulp = require('gulp'),
	less = require('gulp-less'),
	jade = require('gulp-jade'),
	plumber = require('gulp-plumber'),
	del = require('del'),
	run = require('run-sequence'),
	path = require('path'),
	_ = require('lodash'),
	glob = require('glob'),
	es = require('event-stream'),
	filter = require('gulp-filter'),
	html2js = require('gulp-ng-html2js'),
	concat = require('gulp-concat'),
	annotate = require('gulp-ng-annotate'),
	uglifycss = require('gulp-uglifycss'),
	uglify = require('gulp-uglify');


var files = require('./build-files.js');

var config = {
	sources: {
		index: './src/index.jade',
		jade: './src/app/**/*.jade',
		assets: './src/assets/**/*',
		fonts: './src/fonts/**/*',
		styles: './src/**/*.less',
		scripts: './src/app/**/*.js'
	},
	paths: {
		src: 'src',
		build: 'build'
	}
};


/**
 * Private help functions
 *
 * */
function src(conf){
	var _files = conf.files.map(function(f){
		return path.join(config.paths.src, f);
	});

	return gulp.src(_files, { base: config.paths.src }).pipe(plumber());
}

function dest(conf, stream) {
	var destPath = path.join(config.paths.build, conf.out || '');
	return stream.pipe(gulp.dest(destPath));
}

function getModuleName(file) {
	var pathParts, index, moduleName;
	pathParts = file.path.split('/');
	index = _.findLastIndex(pathParts, function (item) { return item === 'app';	});
	moduleName = _.join(_.slice(pathParts, index, pathParts.length - 1), '.');

	return moduleName.replace(/_[a-z]/g, function (match) {
		return match.replace('_', '');
	});
}

/**
 * Develop tasks
 * Run `gulp build` for only build application
 * Run `gulp live` for build and watch files changing
 * Create js and css files with structure like a src directory
 *
 * */


/**
 * @description
 * Task `clean`. For remove build folder
 *
 * */
gulp.task('clean', function () {
	return del(config.paths.build);
});

/**
 * @description
 * Task `scripts`.
 * Get all scripts from build-files.js file configuration and create new js files in build folder
 *
 * */
gulp.task('scripts', function() {
	return es.merge(files.scripts.map(function (conf) {
		return dest(conf, src(conf));
	}));
});

/**
 * @description
 * Task `styles`.
 * Get all styles from build-files.js file configuration and create new css (compile less) files in build folder
 *
 * */
gulp.task('styles', function () {
	return es.merge(files.styles.map(function (conf) {
		var stream = src(conf);

		if (conf.less) {
			stream = stream.pipe(less());
		}

		return dest(conf, stream);
	}));
});

/**
 * @description
 * Task `views`.
 * Get all jade files from src folder compile html, then create templateCache files in build folder
 *
 * */
gulp.task('views', function() {
	return gulp.src(config.sources.jade, { base: config.paths.src })
		.pipe(jade())
		.pipe(html2js({
			moduleName: getModuleName
		}))
		.pipe(gulp.dest(config.paths.build))
});

/**
 * @description
 * Task `assets`.
 * Get all files from assets folder and move to build folder
 *
 * */
gulp.task('assets', function() {
	return gulp.src(config.sources.assets, { base: config.paths.src })
		.pipe(gulp.dest(config.paths.build))
});

/**
 * @description
 * Task `fonts`.
 * Get all font files from fonts folder and move to build folder
 *
 * */
gulp.task('fonts', function() {
	return gulp.src(config.sources.fonts, { base: config.paths.src })
		.pipe(gulp.dest(config.paths.build))
});

/**
 * @description
 * Task `index`.
 * Get add js and css files to index.jade and compile to html
 *
 * */
gulp.task('index', function () {
	function extFilter(ext) {
		return function (name) {
			return ext === path.extname(name);
		};
	}

	function listFiles(source) {
		var res = source.map(function (conf) {
			return conf.files.map(function (pattern) {
				pattern = pattern.replace(/\.(less)$/, '.css');

				return glob.sync(pattern, { cwd: config.paths.build });
			});
		});

		return _.uniq(_.flattenDeep(res, true));
	}

	var _scripts = listFiles(files.scripts)
		.filter(extFilter('.js'));

	var _styles = listFiles(files.styles)
		.filter(extFilter('.css'));

	return gulp.src(config.sources.index)
		.pipe(jade({
			pretty: true,
			locals: {
				production: false,
				scripts: _scripts,
				styles: _styles
			}
		}))
		.pipe(gulp.dest(config.paths.build));
});

/**
 * @description
 * Task `watch`.
 * Watch all files in src folder (less, js, jade)
 *
 * */
gulp.task('watch', function () {
	gulp.watch(config.sources.index, ['index']);
	gulp.watch(config.sources.jade, ['views']);
	gulp.watch(config.sources.styles, ['styles']);
	gulp.watch(config.sources.scripts, ['scripts']);
});

gulp.task('build', function(next) {
	return run('clean', ['styles', 'scripts', 'views', 'assets', 'fonts'], 'index', next);
});

gulp.task('live', function(next){
	return run('build', 'watch', next);
});

/**
 * !!! IN WORK !!!
 * Production tasks
 * Run `gulp build-production`
 * Create minified js and css files
 *
 * */

gulp.task('production-scripts', function() {
	return es.merge(files.scripts.map(function (conf) {
		var stream = src(conf)

		if (conf.templates) {
			stream = stream.pipe(jade())
				.pipe(html2js({
					moduleName: getModuleName
				}));
		}

		stream = stream.pipe(concat(conf.concat));

		if (conf.min) {
			stream = stream
				.pipe(annotate())
				.pipe(uglify());
		}

		return dest(conf, stream);
	}));
});

gulp.task('production-styles', function () {
	return es.merge(files.styles.map(function (conf) {
		var stream = src(conf);

		if (conf.less) {
			stream = stream.pipe(less());
		}

		stream = stream.pipe(concat(conf.concat));

		if (conf.min) {
			stream = stream.pipe(uglifycss());
		}

		return dest(conf, stream);
	}));
});

gulp.task('production-index', function () {
	function extFilter(ext) {
		return function (name) {
			return ext === path.extname(name);
		};
	}

	function listFiles(source) {
		var res = source.map(function (conf) {
			return glob.sync(conf.concat, { cwd: config.paths.build });
		});

		return _.uniq(_.flatten(res, true));
	}

	var _scripts = listFiles(files.scripts)
		.filter(extFilter('.js'));

	var _styles = listFiles(files.styles)
		.filter(extFilter('.css'));

	return gulp.src(config.sources.index)
		.pipe(jade({
			pretty: true,
			locals: {
				production: false,
				scripts: _scripts,
				styles: _styles
			}
		}))
		.pipe(gulp.dest(config.paths.build));
});

gulp.task('build-production', function(next) {
	return run('clean', ['production-styles', 'production-scripts', 'assets', 'fonts'], 'production-index', next);
});
