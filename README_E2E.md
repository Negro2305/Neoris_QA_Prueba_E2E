# Ejercicio E2E - SauceDemo (Cypress)

## Requisitos
- Node.js >= 16.x
- npm
- Chrome (para ejecutar headless en chrome) o puedes usar Electron por defecto

## Estructura del proyecto
- `cypress/e2e/saucedemo.cy.js` - Test principal E2E
- `cypress/fixtures/user.json` - Credenciales
- `cypress/support/commands.js` - Comandos personalizados
- `cypress/config.js` - Configuración de cy (si aplica)
- `cypress/logs/` - Carpeta donde se generan `test.log` y `browser.log`
- `cypress/reports/` - Reportes mochawesome HTML

## Instalación y ejecución

1. Instalar dependencias:
```bash
npm install
