import webpack from 'webpack';
import config from '../config';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';
import { Spinner } from 'cli-spinner';


var spinner = new Spinner('processing.. %s');
spinner.setSpinnerString(20);
console.log(chalk.blue('Generationg minified bundle for production '));
spinner.start();

process.env.NODE_ENV = 'production';
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