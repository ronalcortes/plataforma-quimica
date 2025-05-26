# Tema Claro - Plataforma Química

## Descripción

Se ha implementado un tema claro moderno y profesional para la Plataforma Química. El tema utiliza una paleta de colores cuidadosamente seleccionada que proporciona excelente legibilidad y una experiencia de usuario agradable.

## Características del Tema

### Colores Principales

- **Fondo Principal**: `#ffffff` (Blanco puro)
- **Texto Principal**: `#1a1a1a` (Negro suave)
- **Color Primario**: `#2563eb` (Azul profesional)
- **Color Secundario**: `#f1f5f9` (Gris claro azulado)

### Paleta Completa

```css
--background: #ffffff
--foreground: #1a1a1a
--card: #ffffff
--card-foreground: #1a1a1a
--primary: #2563eb
--primary-foreground: #ffffff
--secondary: #f1f5f9
--secondary-foreground: #0f172a
--muted: #f8fafc
--muted-foreground: #64748b
--border: #e2e8f0
```

## Archivos Modificados

### 1. `src/app/globals.css`

- Variables CSS para el tema claro
- Estilos base para componentes
- Clases utilitarias para botones y tarjetas

### 2. `src/app/layout.tsx`

- Configuración del idioma en español
- Aplicación del tema claro
- Metadatos actualizados para la plataforma química
- Meta tag para esquema de color claro

### 3. `src/app/page.tsx`

- Página de demostración del tema
- Ejemplos de uso de componentes
- Visualización de la paleta de colores

### 4. `src/app/theme.ts`

- Configuración centralizada del tema
- Utilidades para aplicar colores
- Clases CSS predefinidas

## Cómo Usar el Tema

### Usando Variables CSS

```jsx
<div style={{
  background: 'var(--background)',
  color: 'var(--foreground)'
}}>
  Contenido con tema claro
</div>
```

### Usando Clases CSS Predefinidas

```jsx
import { themeClasses } from './theme';

<div className={themeClasses.card}>
  <button className={themeClasses.button.primary}>
    Botón Primario
  </button>
</div>
```

### Componentes Disponibles

#### Tarjetas

```jsx
<div className="card p-6">
  <h3>Título de la tarjeta</h3>
  <p>Contenido de la tarjeta</p>
</div>
```

#### Botones

```jsx
<button className="button-primary">Botón Primario</button>
<button className="button-secondary">Botón Secundario</button>
```

## Características Técnicas

### Responsive Design

- Grid responsivo con Tailwind CSS
- Adaptación automática a diferentes tamaños de pantalla
- Espaciado consistente en todos los dispositivos

### Accesibilidad

- Contraste adecuado entre texto y fondo
- Colores que cumplen con estándares WCAG
- Transiciones suaves para mejor experiencia

### Performance

- Variables CSS nativas para cambios rápidos
- Transiciones optimizadas
- Carga eficiente de fuentes Google

## Personalización

Para personalizar los colores del tema, modifica las variables en `src/app/globals.css`:

```css
:root {
  --primary: #tu-color-primario;
  --secondary: #tu-color-secundario;
  /* ... otros colores */
}
```

## Próximos Pasos

1. **Modo Oscuro**: Implementar un toggle para alternar entre tema claro y oscuro
2. **Más Componentes**: Crear componentes adicionales como formularios, modales, etc.
3. **Temas Personalizados**: Permitir a los usuarios crear sus propios temas
4. **Animaciones**: Añadir micro-animaciones para mejorar la UX

## Soporte

Para cualquier duda sobre el tema claro, consulta la documentación o revisa los archivos de configuración mencionados arriba.
