module.exports = 

  files:
    javascripts: 
      joinTo: 'app.js' 
    stylesheets: joinTo: 'app.css'

  plugins:
    babel:
      plugins: ['syntax-object-rest-spread']
      presets: ['env', 'react']

  overrides: 
    production: 
      optimize: true
      sourceMaps: false
      plugins: 
        autoReload: enabled: false

  notifications: false
