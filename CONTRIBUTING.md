# Contribuyendo al Homepage Configuration Builder

¡Gracias por tu interés en contribuir al Homepage Configuration Builder! Este documento te guiará a través del proceso de contribución.

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/homepage-config-generator.git
cd homepage-config-generator
```

### 2. Configuración del Entorno

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

### 3. Crear una Rama

```bash
# Crear una nueva rama para tu feature
git checkout -b feature/nueva-funcionalidad
```

### 4. Hacer Cambios

- Escribe código limpio y bien documentado
- Sigue las convenciones de naming existentes
- Agrega tests si es apropiado
- Actualiza la documentación si es necesario

### 5. Commit y Push

```bash
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar nueva funcionalidad X"

# Push a tu fork
git push origin feature/nueva-funcionalidad
```

### 6. Crear Pull Request

- Ve a GitHub y crea un Pull Request
- Describe claramente los cambios realizados
- Referencias issues relacionados si existen

## 📋 Convenciones de Código

### Naming Conventions

- **Componentes**: PascalCase (`IconSelector.js`)
- **Variables**: camelCase (`iconLibraries`)
- **Constantes**: UPPER_SNAKE_CASE (`ICON_LIBRARIES`)
- **Archivos CSS**: kebab-case (`icon-selector.css`)

### Estructura de Componentes

```javascript
// Imports
import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  // styles
`;

// Main component
const ComponentName = ({ prop1, prop2 }) => {
  // hooks
  // state
  // effects
  // handlers
  
  return (
    <Container>
      {/* JSX */}
    </Container>
  );
};

export default ComponentName;
```

### Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` para nuevas funcionalidades
- `fix:` para corrección de bugs
- `docs:` para cambios en documentación
- `style:` para cambios de formato/estilo
- `refactor:` para refactoring de código
- `test:` para agregar o modificar tests
- `chore:` para tareas de mantenimiento

## 🐛 Reportar Bugs

Cuando reportes un bug, incluye:

1. **Descripción clara** del problema
2. **Pasos para reproducir** el error
3. **Comportamiento esperado** vs actual
4. **Screenshots** si aplica
5. **Información del entorno** (OS, navegador, versión)

## 💡 Sugerir Funcionalidades

Para sugerir nuevas funcionalidades:

1. Revisa issues existentes para evitar duplicados
2. Describe claramente el problema que resuelve
3. Explica la solución propuesta
4. Considera alternativas
5. Piensa en el impacto en usuarios existentes

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Verificar coverage
npm test -- --coverage
```

## 📖 Documentación

Al agregar nuevas funcionalidades:

- Actualiza el README.md si es necesario
- Agrega comentarios JSDoc para funciones complejas
- Documenta props de componentes
- Actualiza ejemplos si aplica

## 🎨 Estilo y UI

- Usa el sistema de temas existente
- Mantén consistencia visual
- Considera accesibilidad (a11y)
- Prueba en modo claro y oscuro
- Asegúrate que sea responsive

## 🔧 Debugging

### Herramientas Útiles

- React DevTools
- Redux DevTools (si aplicable)
- Lighthouse para performance
- axe-core para accesibilidad

### Logs

```javascript
// Usa console.log con moderación
console.log('Debug info:', data);

// Prefer conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Dev info:', data);
}
```

## 📝 Code Review

Durante el code review, verificamos:

- **Funcionalidad**: ¿El código hace lo que debe?
- **Legibilidad**: ¿Es fácil de entender?
- **Performance**: ¿Hay optimizaciones obvias?
- **Seguridad**: ¿Hay vulnerabilidades potenciales?
- **Tests**: ¿Están cubiertos los casos importantes?
- **Documentación**: ¿Está actualizada?

## 🏷️ Releases

El proceso de release incluye:

1. Update version en package.json
2. Update CHANGELOG.md
3. Create release tag
4. Deploy a production

## 📚 Recursos Útiles

- [React Documentation](https://reactjs.org/docs)
- [styled-components](https://styled-components.com/)
- [dnd kit](https://dndkit.com/)
- [Homepage Documentation](https://gethomepage.dev/)

## 🤝 Código de Conducta

- Sé respetuoso y profesional
- Acepta feedback constructivo
- Ayuda a otros contributors
- Mantén un ambiente inclusivo

## ❓ ¿Necesitas Ayuda?

- Abre un issue con la etiqueta `question`
- Revisa issues existentes
- Consulta la documentación
- Contáctanos a través de GitHub Discussions

---

¡Gracias por contribuir al Homepage Configuration Builder! 🎉