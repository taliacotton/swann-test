const fs = require("fs");
const glob = require("glob");
const YAMLJS = require("yaml-js");
const YAML = require('json-to-pretty-yaml');
// const extendify = require('extendify');
// "_data/*.yaml"
glob("_data/2557-pentagram-2021-01-21.yaml", function (er, files) {
   const contents = files.map((f) => {
      const id = f.split('-')[0].split('/')[1];
      const data = YAMLJS.load(fs.readFileSync(f).toString());
      
     
      data['lots'].forEach(lot => {
         fs.existsSync(`_lots/${id}`) || fs.mkdirSync(`_lots/${id}`);
         fs.writeFile(`_lots/${id}/${lot["LOT"]}.md`, '---\n'+YAML.stringify(lot)+'\n---', (err) => {
            if (err)
               console.log(err);
            else {
               console.log(`${lot["LOT"]} -- File written successfully`);
            }
         });
      });

   });

});