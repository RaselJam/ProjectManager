# ProjectManager RPC API
To manage the the  Work flow of  building and maintaining a(or multiple at same time) software Project(s), and how team members divide the work to do ,  and track the jobs done so far

**Note**
`It will have It cliente-Side in a seprated Repositoy.`



# Usage
 ### 1) clone the Repository , install node packages and veryfy routes locally 
 
 ``` 
//on local
git clone https://github.com/RaselJam/projectManager.git
cd 
npm install
npm run start
```

Open your local browser and verify the projectManager is working by accessing:     
`http://localhost:3000/`
It must return a Json with all Endpoints available , as Doc to use the API

<a href="https://ibb.co/TYbBHS5"><img src="https://i.ibb.co/PF9Z5n8/api.png" alt="api" border="0"></a>

### 2) create a `.env` file in root .you need to make a local or remote MongoDb cluster. and add the Connection String to `.env` file. in following keys:

CONNECTION_URL=here goes your Connection URL

you also need to provide any random String with the following key :

SESS_SECRET=any String to use in  session config

#### feel free to fork and extend
