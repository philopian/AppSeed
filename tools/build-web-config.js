import chalk from 'chalk';
import path from 'path';
import config from '../config';
import fs from 'node-fs-extra';

/*********************************************
 * Webconfig
 *********************************************/
const webConfigFileName = path.join(config.deployRoot, 'Web.config');
const webConfigContents = `<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <system.webServer>
      <rewrite>
           <rules>
                <rule name="DynamicContent">
                     <conditions>
                          <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True" />
                          <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="True" />
                     </conditions>
                     <action type="Rewrite" url="index.html" />
                </rule>
           </rules>
      </rewrite>
   </system.webServer>
  <system.web>
    <compilation debug="false" targetFramework="4.0" />
  </system.web>
 </configuration>`;
fs.writeFile(webConfigFileName, webConfigContents, 'utf8', (err) => {
  if (err) return console.error(err)
  console.log(chalk.green('created IIS webconfig stuff'));
});