var fs = require('fs');

module.exports.read = function(file = "config.json") 
{
    try 
    {       
        let fileContent = fs.readFileSync(file, "utf8");
        let data = JSON.parse(fileContent);
        return data;
    } 
    catch (error) 
    {
        console.error(error);
        throw error;
    }
}
module.exports.write = function(file = "config.json", content) 
{
    try 
    {       
        let data = JSON.stringify(content);
        fs.writeFileSync(file,  data)
    } 
    catch (error) 
    {
        console.error(error);
        throw error;
    }
}

