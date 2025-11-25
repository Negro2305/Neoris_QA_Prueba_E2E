

# CONCLUSIONES - Ejercicio E2E SauceDemo (Cypress)

## Resumen
Se implementó una prueba E2E que automatiza el flujo de compra en https://www.saucedemo.com:
- Autenticación (standard_user / secret_sauce)
- Agregado de 2 productos al carrito
- Visualización del carrito
- Completar formulario de compra
- Finalizar la compra y validar mensaje "THANK YOU FOR YOUR ORDER"

## Hallazgos
- Cypress permite interacción confiable con los elementos identificados por `data-test` y selectores CSS.
- Capturar logs mediante `cy.task` resultó robusto para generar un `test.log` legible.
- Capturar la consola del navegador con `cy.task('appendBrowserLog', ...)` facilita el diagnóstico de errores JS del lado cliente.

## Recomendaciones
- Integrar estos tests en CI (GitHub Actions / GitLab CI) y almacenar los reportes/mochawesome para auditoría.
- Añadir screenshots y video en ejecuciones fallidas para análisis (Cypress ya puede generar videos/screenshots).
- Ampliar pruebas con casos negativos (credenciales inválidas, datos incompletos en checkout).
- Mantener los selectores estables usando `data-test` o `data-cy`.

## Observaciones finales
- El paquete generado contiene `cypress/logs/test.log` y `cypress/logs/browser.log` con el detalle de la ejecución.
- El reporte HTML (`cypress/reports/*.html`) incluye el resumen de las pruebas para entregar al evaluador.

