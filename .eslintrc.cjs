module.exports = {
  extends: ['@dcl/eslint-config/dapps'],
  parserOptions: {
    project: ["tsconfig.json", "test/tsconfig.json"]
  }
}
