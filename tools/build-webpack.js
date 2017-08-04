import webpack from 'webpack';
import config from '../config';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';
import ora from 'ora';

process.env.NODE_ENV = 'production';

var spinner = ora(chalk.blue('Generationg minified bundle for production ')).start();
webpack(webpackConfig).run((err, stats) => {
  spinner.stop();
  if (err) {
    console.log(chalk.red(err));
    return 1;
  }
  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`Webpack stats: ${stats}`);
  console.log(chalk.green(`Your app has been built for production and written to ./${config.distFileName}`));
  return 0;
});