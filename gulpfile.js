let gulp = require('gulp'),
    argv = require('minimist'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    pug = require('gulp-pug'),
    file = require('gulp-file'),
    eslint = require('gulp-eslint'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    htmlbeautify = require('gulp-html-beautify'),
    fs = require('fs'),
    concat = require('gulp-concat'),
    dotenv = require('dotenv').config(),
    browserSync = require('browser-sync').create(),
    gulpImagemin = require('gulp-imagemin'),
    gulpHtmlmin = require('gulp-htmlmin'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    gulpZip = require('gulp-zip'); 
    merge = require('merge-stream');
// Set the options for sass compiler 
const SASS_OPTIONS = require('./config/sass-options').default;

// Set the options for HTML Beautify
const HTML_BEAUTIFY_OPTIONS = require('./config/html-beautify-options').default;

// Rules for Eslint
const ESLINT_RULES = require('./config/eslint-rules').default;

let knownOptions = {
    string: ['env', 'port', 'project'],
    default: {
        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || '6969',
        project: process.env.PROJECT_NAME || 'archive'
    }
};

let options = argv(process.argv.slice(2), knownOptions),
    mode = options.env,
    port = options.port,
    project = options.project,
    baseDir = mode === 'development' ? 'dev' : 'build';


// Task for compile & minify the main sass file
gulp.task('sass', function() { 
    var index = gulp.src([
                './src/pugs/css/top.scss'
            ])
            // Compile sass file
            .pipe(sass(SASS_OPTIONS))
            // Autoprefix css for cross browser compatibility
            .pipe(autoprefixer())
            // Minify the css files
            .pipe(gulpif(mode === 'production', csso()))
            // Ouptut css
            .pipe(gulp.dest(`./${baseDir}/css`))
            .pipe(gulpif(mode === 'development', browserSync.stream()));
    var common = gulp.src([
                './src/pugs/category/css/category.scss'
            ])
            // Compile sass file
            .pipe(sass(SASS_OPTIONS))
            // Autoprefix css for cross browser compatibility
            .pipe(autoprefixer())
            // Minify the css files
            .pipe(gulpif(mode === 'production', csso()))
            // Ouptut css
            .pipe(gulp.dest(`./${baseDir}/category/css`))
            .pipe(gulpif(mode === 'development', browserSync.stream()));
    var category = gulp.src([
                './src/pugs/common/css/common.scss'
            ])
            // Compile sass file
            .pipe(sass(SASS_OPTIONS))
            // Autoprefix css for cross browser compatibility
            .pipe(autoprefixer())
            // Minify the css files
            .pipe(gulpif(mode === 'production', csso()))
            // Ouptut css
            .pipe(gulp.dest(`./${baseDir}/common/css`))
            .pipe(gulpif(mode === 'development', browserSync.stream()));
    var detail = gulp.src([
                './src/pugs/detail/css/detail.scss'
            ])
            // Compile sass file
            .pipe(sass(SASS_OPTIONS))
            // Autoprefix css for cross browser compatibility
            .pipe(autoprefixer())
            // Minify the css files
            .pipe(gulpif(mode === 'production', csso()))
            // Ouptut css
            .pipe(gulp.dest(`./${baseDir}/detail/css`))
            .pipe(gulpif(mode === 'development', browserSync.stream()));
    return merge(index, common, category,detail)
}); 
// Task for compress & minify the image files
gulp.task('imgs', function() {
    var index =  gulp.src([
            './src/pugs/images/*'
        ])
        // Compress & minify the image files
        .pipe(gulpif(mode === 'production', gulpImagemin([
            gulpImagemin.gifsicle(),
            gulpImagemin.jpegtran(),
            gulpImagemin.optipng(),
            gulpImagemin.svgo(),
            imageminPngquant(),
            imageminJpegRecompress(),
        ])))
        // Ouptut css
        .pipe(gulp.dest(`./${baseDir}/images`))
        .pipe(gulpif(mode === 'development', browserSync.stream()));

    var common =  gulp.src([
            './src/pugs/common/images/*'
        ])
        // Compress & minify the image files
        .pipe(gulpif(mode === 'production', gulpImagemin([
            gulpImagemin.gifsicle(),
            gulpImagemin.jpegtran(),
            gulpImagemin.optipng(),
            gulpImagemin.svgo(),
            imageminPngquant(),
            imageminJpegRecompress(),
        ])))
        // Ouptut css
        .pipe(gulp.dest(`./${baseDir}/common/images`))
        .pipe(gulpif(mode === 'development', browserSync.stream()));
    var category =  gulp.src([
            './src/pugs/category/images/*'
        ])
        // Compress & minify the image files
        .pipe(gulpif(mode === 'production', gulpImagemin([
            gulpImagemin.gifsicle(),
            gulpImagemin.jpegtran(),
            gulpImagemin.optipng(),
            gulpImagemin.svgo(),
            imageminPngquant(),
            imageminJpegRecompress(),
        ])))
        // Ouptut css
        .pipe(gulp.dest(`./${baseDir}/category/images`))
        .pipe(gulpif(mode === 'development', browserSync.stream()));
    var detail =  gulp.src([
            './src/pugs/detail/images/*'
        ])
        // Compress & minify the image files
        .pipe(gulpif(mode === 'production', gulpImagemin([
            gulpImagemin.gifsicle(),
            gulpImagemin.jpegtran(),
            gulpImagemin.optipng(),
            gulpImagemin.svgo(),
            imageminPngquant(),
            imageminJpegRecompress(),
        ])))
        // Ouptut css
        .pipe(gulp.dest(`./${baseDir}/detail/images`))
        .pipe(gulpif(mode === 'development', browserSync.stream()));
    var products =  gulp.src([
            './src/pugs/products/*'
        ])
        // Compress & minify the image files
        .pipe(gulpif(mode === 'production', gulpImagemin([
            gulpImagemin.gifsicle(),
            gulpImagemin.jpegtran(),
            gulpImagemin.optipng(),
            gulpImagemin.svgo(),
            imageminPngquant(),
            imageminJpegRecompress(),
        ])))
        // Ouptut css
        .pipe(gulp.dest(`./${baseDir}/products`))
        .pipe(gulpif(mode === 'development', browserSync.stream()));
    return merge(index,common,category,detail,products)
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() { 
    return gulp.src([ 
            './src/pugs/common/js/*.js'
        ])
        // Output js
        .pipe(gulp.dest(`./${baseDir}/common/js`));
});

// Check javascript syntax with ESLint
gulp.task('eslint', function() {
    return gulp.src(['./src/scripts/**/*'])
        .pipe(eslint({
            parserOptions: {
                ecmaVersion: 6,
                sourceType: 'module'
            },
            rules: ESLINT_RULES,
            globals: [
                'jQuery',
                '$'
            ],
            envs: [
                'browser'
            ]
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('pug', function() {
   
    var index = gulp.src('./src/pugs/*.pug')
                // Compile pug file
                .pipe(pug({
                    pretty: true
                }))
                .pipe(htmlbeautify(HTML_BEAUTIFY_OPTIONS))
                .pipe(gulp.dest(`./${baseDir}`));
    var category = gulp.src('./src/pugs/category/*.pug')
                // Compile pug file
                .pipe(pug({
                    pretty: true
                }))
                .pipe(htmlbeautify(HTML_BEAUTIFY_OPTIONS))
                .pipe(gulp.dest(`./${baseDir}/category`));
    var detail = gulp.src('./src/pugs/detail/*.pug')
                // Compile pug file
                .pipe(pug({
                    pretty: true
                }))
                .pipe(htmlbeautify(HTML_BEAUTIFY_OPTIONS))
                .pipe(gulp.dest(`./${baseDir}/detail`));
    return merge(index, category, detail)
});
 
// Prepare build - Task copy the assets folder to build 
gulp.task('cp-assets-folder', function() {
    return gulp.src([
            './src/pugs/common/images/*'
        ])
        .pipe(gulp.dest(`./${baseDir}/common/images`));
});


// Prepare build - Create a now.json file
gulp.task('cr-now-json', function() {
    // Throw error if no .env file
    if (!fs.existsSync('./.env'))
        throw new Error(`\x1b[31mFailed to generate now.json file! Missing\x1b[0m \x1b[33m.env\x1b[0m \x1b[31mfile! Create a\x1b[0m \x1b[33m.env\x1b[0m \x1b[31mfile first from the sample file\x1b[0m \x1b[33m.env.sample\x1b[0m`);

    // Throw error if no PROJECT_NAME or PROJECT_VERSION value
    if (!process.env.PROJECT_NAME || !process.env.PROJECT_VERSION)
        throw new Error(`\x1b[31mFailed to generate now.json file! Missing\x1b[0m \x1b[33mPROJECT_NAME\x1b[0m \x1b[31mor\x1b[0m \x1b[33mPROJECT_VERSION\x1b[0m \x1b[31mvalue in\x1b[0m \x1b[33m.env\x1b[0m \x1b[31mfile!\x1b[0m`);

    // Throw error if the PROJECT_NAME value is same as .env.sample template name
    if (process.env.PROJECT_NAME === 'Namtech Pug Sass Kit')
        throw new Error(`\x1b[31mFailed to generate now.json file! Must modify the\x1b[0m \x1b[33mPROJECT_NAME\x1b[0m \x1b[31mvalue before continue!\x1b[0m `);

    let fileName = 'now.json';
    let contents = `
{
    "name": "${process.env.PROJECT_NAME}",
    "version": ${process.env.PROJECT_VERSION}
}
`;

    return file(
        fileName,
        contents, { src: true }
    ).pipe(gulp.dest('./build'));
});

const basicTasks = [
    'sass',
    'eslint',
    'js',
    'pug',
    'imgs',
    'cp-assets-folder'
];

// Task export - `gulp export` into terminal for exporting the project
gulp.task('export', gulp.series(
    gulp.series(...basicTasks),
    async function() {
        let date = new Date();
        let d = date.getDate().toString();
        let m = (date.getMonth() + 1).toString();
        let y = date.getFullYear().toString();
        let h = date.getHours().toString();
        let mi = date.getMinutes().toString();
        let stringDate = `${d.length > 1 ? '' : '0'}${d}${m.length > 1 ? '' : '0'}${m}${y}_${h.length > 1 ? '' : '0'}${h}${mi.length > 1 ? '' : '0'}${mi}`;
        return gulp.src(`./${baseDir}/**/*`)
            .pipe(gulpZip(`${project.replace(/ /gi, '_').toLowerCase()}-${stringDate}.zip`))
            .pipe(gulp.dest('./exported'));
    }
));

// Task build - `gulp build` into terminal for building the project
gulp.task('build', gulp.series(
    gulp.series(...basicTasks),
    // 'cr-now-json'
));

// Task serve - type `gulp serve` into terminal for watching the project
gulp.task('serve', gulp.series(...basicTasks, function() {
    browserSync.init({
        server: `./${baseDir}`,
        port: port
    }); 
    gulp.watch('./src/pugs/**/*', gulp.series('sass')); 
    gulp.watch(['./src/pugs/common/*'], gulp.series('eslint','js')); 
    gulp.watch('./src/pugs/**/*', gulp.series('pug'));  
    gulp.watch('./src/pugs/*', gulp.series('imgs'));  
    gulp.watch(['/src/pugs/common/images/*'], gulp.series('cp-assets-folder')); 
    gulp.watch('./dev/**/*').on('change', browserSync.reload);
    
}));

// Default task - run the `gulp serve` when type only `gulp`
gulp.task('default', gulp.series('serve'));