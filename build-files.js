exports.scripts = [
	{
		files: [
			'components/lodash/lodash.js'
		],
		min: true,
		concat: 'scripts/libs.js'
	},
	{
		files: [
			'components/angular/angular.js',
			'components/angular-ui-router/release/angular-ui-router.js',
			'components/angular-sanitize/angular-sanitize.js',
			'components/angular-animate/angular-animate.js',
			'components/angular-local-storage/dist/angular-local-storage.js'
		],
		min: true,
		concat: 'scripts/ng-core.js'
	},
	{
		files: [
			'components/angular-bootstrap/ui-bootstrap.min.js',
			'components/angular-loading-bar/build/loading-bar.min.js',
			'components/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'components/ng-dialog/js/ngDialog.min.js'
		],
		min: true,
		concat: 'scripts/ng-vendor.js'
	},
	{
		files: [
			'app/app.js',
			'app/app.config.js',
			'app/**/*.module.js',
			'app/**/*.config.js',
			'app/**/*.constant.js',
			'app/**/*.service.js',
			'app/**/*.filter.js',
			'app/**/*.directive.js',
			'app/**/*.controller.js',
			'app/**/*.template.js',
			'app/**/*.js'
		],
		min: true,
		concat: 'scripts/app.js'
	}
	//{
	//	files: [
	//		'app/**/*.template.jade'
	//	],
	//	min: true,
	//	templates: true,
	//	concat: 'scripts/templates.js'
	//}

];

exports.styles = [
	{
		files: [
			'components/bootstrap/dist/css/bootstrap.css',
			'components/bootstrap/dist/css/bootstrap.css.map'
		],
		min: true,
		concat: 'styles/bootstrap.css'
	},
	{
		files: [
			'fonts/*.less',
			'app/app.less',
			'styles/*.less'
		],
		min: true,
		concat: 'styles/app.css',
		less: true
	},
	{
		files: [
			'components/bootstrap/fonts/**/*.ttf'
		]
	}
];
