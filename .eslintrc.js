module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "mocha":true
    },
    "extends": "eslint:recommended",
    "parser":"babel-eslint",
    "parserOptions":{
        "ecmaVersion":6,
        "sourceTYpe":"script"
    },

    "rules": {
        //"off"关掉规则,"warn"允许写但是会警告,"error"不允许写
        "no-console":["error",{
            "allow":["warn","error","info"]//允许console.warn等
        }],
        "indent": [
            "error",
            "0"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};