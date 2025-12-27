# Guía de Commits para Level-Up Gamer

## Estructura de Commits
```
tipo(alcance): descripción breve

Descripción detallada del cambio (opcional)

- Lista de cambios específicos
- Si es necesario
```

## Tipos de Commits

### 🎨 **feat**: Nueva funcionalidad
```bash
git commit -m "feat(productos): agregar filtro por categoría"
git commit -m "feat(admin): implementar dashboard con estadísticas"
git commit -m "feat(validaciones): crear sistema de validación de formularios"
```

### 🐛 **fix**: Corrección de errores
```bash
git commit -m "fix(navegación): corregir enlaces rotos en menú admin"
git commit -m "fix(responsive): ajustar diseño en dispositivos móviles"
git commit -m "fix(validaciones): corregir validación de email"
```

### 📝 **docs**: Documentación
```bash
git commit -m "docs(readme): agregar instrucciones de instalación"
git commit -m "docs(ers): crear especificación de requisitos v1"
git commit -m "docs(commits): agregar guía de commits"
```

### 🎨 **style**: Formato y estilo
```bash
git commit -m "style(css): mejorar colores del tema gaming"
git commit -m "style(html): mejorar estructura semántica"
git commit -m "style(js): formatear código JavaScript"
```

### ♻️ **refactor**: Refactorización
```bash
git commit -m "refactor(js): modularizar funciones de validación"
git commit -m "refactor(css): reorganizar estilos por componentes"
git commit -m "refactor(html): optimizar estructura de páginas"
```

### ⚡ **perf**: Mejoras de rendimiento
```bash
git commit -m "perf(imágenes): optimizar tamaño de imágenes"
git commit -m "perf(js): reducir tiempo de carga de scripts"
git commit -m "perf(css): minificar archivos de estilos"
```

### ✅ **test**: Pruebas
```bash
git commit -m "test(validaciones): agregar pruebas de formularios"
git commit -m "test(responsive): verificar diseño en diferentes dispositivos"
git commit -m "test(navegación): probar todos los enlaces"
```

### 🔧 **chore**: Tareas de mantenimiento
```bash
git commit -m "chore(deps): actualizar dependencias"
git commit -m "chore(git): configurar .gitignore"
git commit -m "chore(estructura): reorganizar carpetas del proyecto"
```

## Ejemplos de Commits Descriptivos

### ✅ **Buenos ejemplos:**
```bash
git commit -m "feat(admin): agregar gestión de usuarios con CRUD completo"
git commit -m "fix(productos): corregir filtro de búsqueda que no funcionaba"
git commit -m "style(hero): mejorar diseño de sección principal con gradientes"
git commit -m "feat(validaciones): implementar validación en tiempo real para formularios"
git commit -m "docs(ers): completar especificación de requisitos del software"
```

### ❌ **Malos ejemplos:**
```bash
git commit -m "cambios"
git commit -m "fix"
git commit -m "actualizar"
git commit -m "WIP"
git commit -m "asdf"
```

## Distribución de Tareas del Equipo

### 👨‍💻 **Desarrollador 1 - Frontend Base**
```bash
git commit -m "feat(html): crear estructura base de todas las páginas"
git commit -m "feat(navegación): implementar menú responsive"
git commit -m "feat(footer): agregar footer informativo en todas las páginas"
git commit -m "fix(html): corregir etiquetas semánticas HTML5"
```

### 👩‍💻 **Desarrollador 2 - Estilos y Diseño**
```bash
git commit -m "feat(css): crear tema gaming con colores y tipografías"
git commit -m "feat(responsive): implementar diseño adaptable a móviles"
git commit -m "feat(componentes): crear componentes reutilizables de Bootstrap"
git commit -m "style(admin): diseñar interfaz del panel administrativo"
```

### 👨‍💻 **Desarrollador 3 - JavaScript y Funcionalidad**
```bash
git commit -m "feat(js): implementar gestión de productos con filtros"
git commit -m "feat(carrito): crear funcionalidad de carrito de compras"
git commit -m "feat(validaciones): agregar validaciones robustas a formularios"
git commit -m "feat(admin): desarrollar panel administrativo con estadísticas"
```

## Flujo de Trabajo Recomendado

### 1. **Antes de hacer commit:**
```bash
# Verificar cambios
git status
git diff

# Agregar archivos específicos
git add archivo.html
git add carpeta/

# O agregar todos los cambios
git add .
```

### 2. **Hacer commit:**
```bash
git commit -m "tipo(alcance): descripción clara y concisa"
```

### 3. **Subir cambios:**
```bash
git push origin main
```

## Comandos Útiles

### Ver historial de commits:
```bash
git log --oneline
git log --graph --pretty=format:'%h -%d %s (%cr) <%an>'
```

### Ver cambios en un commit específico:
```bash
git show <hash-del-commit>
```

### Deshacer último commit (manteniendo cambios):
```bash
git reset --soft HEAD~1
```

### Ver diferencias antes de commit:
```bash
git diff --cached
```

## Checklist Pre-Commit

- [ ] ¿El mensaje del commit es claro y descriptivo?
- [ ] ¿Los cambios están relacionados entre sí?
- [ ] ¿Se han probado los cambios localmente?
- [ ] ¿Se han agregado solo los archivos necesarios?
- [ ] ¿El código sigue las convenciones del proyecto?

---


