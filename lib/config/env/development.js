'use strict';

module.exports = {
  env: 'development',
	'Dashboard': {
		'syncRate': 60000
	},
  "repos": [
		{"repoInfo": {"name": "testRepo1","location": "C:/d/git/testRepo1.git" }},
		{"repoInfo": {"name": "testRepo2","location": "C:/d/git/testRepo2.git" }}
	],
	"monitURL": "http://12.68.145.165:8080",
	"unitPath": './HostFiles',
	"scriptPath": 'C:\\d\\CubixxAdmin\\ScriptFiles',
	"userPath": './Users.txt'
};