const del = require('del');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const eslint = require('gulp-eslint7');
const terser = require('gulp-terser');

const tsProject = ts.createProject('tsconfig.json');

const paths = {
  bin: 'bin',
  src: 'src',
  typings: 'typings'
};

const terserFiles = {
  dest: paths.bin,
  src: paths.bin + '/**/*.js'
};

gulp.task('clean', () => del([ paths.bin, paths.typings ]));

gulp.task('lint', () => {
  return gulp.src(paths.src + '/**/*.ts')
    .pipe(eslint())
    .pipe(eslint.formatEach())
		.pipe(eslint.failOnError())
});

gulp.task('ts', () => {
  const res = tsProject.src()
    .pipe(tsProject());

  res.js.pipe(gulp.dest(paths.bin));

  return res.dts.pipe(gulp.dest(paths.typings));
});

gulp.task('terser', () => {
  return gulp.src(terserFiles.src)
    .pipe(terser({
      toplevel: true,
      output: {
        beautify: true,
        comments: false,
        ecma: 8,
        indent_level: 2,
        max_line_len: 120
      }
    }))
    .pipe(gulp.dest(terserFiles.dest));
});

const commonTasks = [ 'lint', 'clean', 'ts' ];

function watch () {
  gulp.watch(paths.src, gulp.series('ts'));
}

gulp.task('default', gulp.series(...commonTasks, 'terser'));
gulp.task('watch', gulp.series(watch));
gulp.task('build', gulp.series(...commonTasks));
