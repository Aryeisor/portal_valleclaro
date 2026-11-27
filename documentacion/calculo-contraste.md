# Cálculo del contraste de color

Relación de contraste de los colores del Portal de la Alcaldía de Valleclaro, calculada con la fórmula de WCAG 2.1 (criterios 1.4.3 Contraste mínimo y 1.4.11 Contraste de componentes no textuales). Los colores salen de [antes/css/estilos.css](../antes/css/estilos.css) y de [despues/css/base.css](../despues/css/base.css), [despues/css/componentes.css](../despues/css/componentes.css) y [despues/css/formularios.css](../despues/css/formularios.css).

## 1. Fórmula

**Paso 1. Pasar cada canal (R, G, B) de 0–255 a 0–1:**

  s = valor / 255

**Paso 2. Linealizar cada canal:**

  si s ≤ 0.03928 → c = s / 12.92
  si s > 0.03928 → c = ((s + 0.055) / 1.055)^2.4

**Paso 3. Luminancia relativa:**

  L = 0.2126 · R + 0.7152 · G + 0.0722 · B  (con R, G y B ya linealizados)

**Paso 4. Relación de contraste** (L1 = luminancia del color más claro, L2 = la del más oscuro):

  relación = (L1 + 0.05) / (L2 + 0.05)

Va de 1:1 (mismo color) a 21:1 (negro sobre blanco).

**Mínimos de WCAG 2.1 AA:**

| Elemento | Mínimo |
|---|---|
| Texto normal | 4.5:1 |
| Texto grande (24 px o más, o 18.66 px o más en negrita) | 3:1 |
| Componentes de interfaz y gráficos: bordes de campos, indicadores de foco y de estado | 3:1 |
| Decoración pura (separadores) | Sin mínimo |

## 2. Cálculo paso a paso

### #AAAAAA sobre #FFFFFF (texto general de la versión antes, E04)

| Paso | #AAAAAA | #FFFFFF |
|---|---|---|
| Valor de cada canal (R = G = B) | 170 | 255 |
| 1. s = valor / 255 | 170 / 255 = 0.666667 | 255 / 255 = 1 |
| 2. Linealizar (s > 0.03928) | ((0.666667 + 0.055) / 1.055)^2.4 = 0.684044^2.4 = **0.401978** | ((1 + 0.055) / 1.055)^2.4 = **1** |
| 3. L (gris: los tres canales son iguales y 0.2126 + 0.7152 + 0.0722 = 1) | 0.401978 | 1 |

Relación = (1 + 0.05) / (0.401978 + 0.05) = 1.05 / 0.451978 = **2.32:1**

**No cumple:** está por debajo de 4.5:1 para texto normal y hasta de 3:1 para texto grande.

### #1A1A1A sobre #FFFFFF (texto general de la versión después, E04 corregido)

| Paso | #1A1A1A | #FFFFFF |
|---|---|---|
| Valor de cada canal (R = G = B) | 26 | 255 |
| 1. s = valor / 255 | 26 / 255 = 0.101961 | 1 |
| 2. Linealizar (s > 0.03928) | ((0.101961 + 0.055) / 1.055)^2.4 = 0.148778^2.4 = **0.010330** | 1 |
| 3. L | 0.010330 | 1 |

Relación = (1 + 0.05) / (0.010330 + 0.05) = 1.05 / 0.060330 = **17.40:1**

**Cumple** AA (4.5:1) y AAA (7:1).

### Cómo calculamos el resto de los pares

Los demás pares se calcularon con la misma fórmula en este script de Python. Las aserciones comprueban los extremos: negro sobre blanco da 21:1 y un color sobre sí mismo da 1:1.

```python
def canal(c8):
    c = c8 / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

def luminancia(hx):
    r, g, b = (int(hx.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
    return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)

def relacion(a, b):
    l1, l2 = sorted((luminancia(a), luminancia(b)), reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)

assert abs(relacion('#000000', '#FFFFFF') - 21) < 1e-9
assert relacion('#FFFFFF', '#FFFFFF') == 1
```

Los resultados se pueden comprobar par por par en el WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/).

## 3. Todos los pares de colores del CSS de `despues/`

### 3.1 Texto

| # | Texto | Fondo | Relación | Mínimo | ¿Cumple? | Dónde se usa |
|---|---|---|---|---|---|---|
| 1 | `#1A1A1A` texto | `#FFFFFF` fondo | **17.40:1** | 4.5 | Sí | Texto general, campos del formulario, aviso de sesión |
| 2 | `#1F4E79` primario | `#FFFFFF` | **8.66:1** | 4.5 | Sí | Títulos, enlaces, «Saltar al contenido», botones secundarios, submenú, botón del banner, `legend`, `caption` |
| 3 | `#173B5C` primario oscuro | `#FFFFFF` | **11.56:1** | 4.5 | Sí | Enlaces al pasar el mouse |
| 4 | `#4A4A4A` texto suave | `#FFFFFF` | **8.86:1** | 4.5 | Sí | Ayudas de los campos, «(obligatorio)», contador, fecha de las tarjetas |
| 5 | `#4A4A4A` | `#F4F7FA` fondo suave | **8.24:1** | 4.5 | Sí | Teléfono y horario en la barra superior |
| 6 | `#1A1A1A` | `#F4F7FA` | **16.19:1** | 4.5 | Sí | Canales de atención, filas pares de la tabla, recuadro de costo y tiempo |
| 7 | `#1F4E79` | `#F4F7FA` | **8.06:1** | 4.5 | Sí | Preguntas del acordeón, enlaces en filas pares de la tabla |
| 8 | `#FFFFFF` | `#1F4E79` | **8.66:1** | 4.5 | Sí | Encabezado, botones principales, encabezado de la tabla, banner, botón de preferencia activo |
| 9 | `#E8F0F8` | `#1F4E79` | **7.53:1** | 4.5 | Sí | Lema del encabezado |
| 10 | `#FFFFFF` | `#173B5C` | **11.56:1** | 4.5 | Sí | Menú principal, pie de página, botones al pasar el mouse |
| 11 | `#E8F0F8` | `#173B5C` | **10.05:1** | 4.5 | Sí | Enlaces del pie al pasar el mouse |
| 12 | `#F9A825` amarillo | `#1F4E79` | **4.40:1** | 3 (texto grande) | Sí | «10 % de descuento» en el título del banner: `h2` en negrita de 24 px en celular y 36 px en pantallas anchas. **No cumpliría como texto normal (4.5)** |
| 13 | `#1F4E79` | `#E3EDF6` primario claro | **7.31:1** | 4.5 | Sí | Submenú y acordeón al pasar el mouse, ícono de accesos rápidos |
| 14 | `#173B5C` | `#E3EDF6` | **9.75:1** | 4.5 | Sí | Botón secundario y botón del banner al pasar el mouse |
| 15 | `#1A1A1A` | `#E3EDF6` | **14.68:1** | 4.5 | Sí | Mensaje «La sesión expiró» |
| 16 | `#2E7D32` verde | `#FFFFFF` | **5.13:1** | 4.5 | Sí | Color secundario |
| 17 | `#2E7D32` | `#F4F7FA` | **4.77:1** | 4.5 | Sí | «Gratuito» y «Hasta 10 días hábiles» en el recuadro de costo y tiempo |
| 18 | `#2E7D32` | `#F1F8F1` | **4.75:1** | 4.5 | Sí | Título «Tu solicitud fue radicada» |
| 19 | `#1A1A1A` | `#F1F8F1` | **16.11:1** | 4.5 | Sí | Texto de la confirmación del PQRS |
| 20 | `#B00020` rojo de error | `#FFFFFF` | **7.33:1** | 4.5 | Sí | Mensaje de error junto a cada campo |
| 21 | `#B00020` | `#FDF2F4` | **6.69:1** | 4.5 | Sí | Título y enlaces del resumen de errores |
| 22 | `#1A1A1A` | `#FDF2F4` | **15.90:1** | 4.5 | Sí | Texto dentro del resumen de errores |
| 23 | `#FFFFFF` | `#B71C1C` | **6.57:1** | 4.5 | Sí | Etiqueta «Impuestos» (14 px en negrita) |
| 24 | `#FFFFFF` | `#2E7D32` | **5.13:1** | 4.5 | Sí | Etiqueta «Salud» |
| 25 | `#FFFFFF` | `#A84300` | **6.06:1** | 4.5 | Sí | Etiqueta «Obras» |
| 26 | `#FFFFFF` | `#1565C0` | **5.75:1** | 4.5 | Sí | Etiqueta «Empleo» |
| 27 | `#FFFFFF` | `#6A1B9A` | **9.39:1** | 4.5 | Sí | Etiqueta «Cultura» |
| 28 | `#FFFFFF` | `#5D4037` | **9.32:1** | 4.5 | Sí | Etiqueta «Servicios» |

### 3.2 Modo de alto contraste (`html.alto-contraste`, en `base.css`)

| # | Texto | Fondo | Relación | ¿Cumple? | Dónde se usa |
|---|---|---|---|---|---|
| 29 | `#FFFFFF` | `#000000` | **21.00:1** | Sí | Todo el texto |
| 30 | `#FFEB3B` | `#000000` | **17.20:1** | Sí | Enlaces, títulos, botones |
| 31 | `#000000` | `#FFEB3B` | **17.20:1** | Sí | Botón «Alto contraste» activo |
| 32 | `#FF9E9E` | `#000000` | **10.64:1** | Sí | Mensajes de error |
| 33 | `#CCCCCC` | `#000000` | **13.08:1** | Sí | Texto de ejemplo (placeholder) |

### 3.3 Componentes no textuales (mínimo 3:1)

| # | Color | Contra | Relación | ¿Cumple? | Dónde se usa |
|---|---|---|---|---|---|
| 34 | `#6B7785` borde | `#FFFFFF` | **4.56:1** | Sí | Bordes de campos, grupos, acordeón y submenú |
| 35 | `#6B7785` | `#F4F7FA` | **4.24:1** | Sí | Mismo borde junto a fondo suave |
| 36 | `#1F4E79` | `#FFFFFF` | **8.66:1** | Sí | Borde de botones, de preferencias y del aviso de sesión |
| 37 | `#B00020` | `#FFFFFF` | **7.33:1** | Sí | Borde de 3 px de campos con error |
| 38 | `#2E7D32` | `#FFFFFF` | **5.13:1** | Sí | Borde de la confirmación y franja de los trámites |
| 39 | `#F9A825` foco | `#173B5C` | **5.87:1** | Sí | Foco y marca de página actual sobre el menú y el pie |
| 40 | `#F9A825` foco | `#FFFFFF` | **1.97:1** | Solo, no | Contorno amarillo del foco sobre fondo blanco (ver la nota 2) |
| 41 | `#1A1A1A` sombra del foco | `#FFFFFF` | **17.40:1** | Sí | Sombra oscura de 6 px que acompaña al contorno amarillo |
| 42 | `#F9A825` | `#1A1A1A` | **8.83:1** | Sí | Contorno amarillo contra su propia sombra oscura |
| 43 | `#D5DDE5` | `#FFFFFF` | 1.37:1 | No aplica | Separadores decorativos (`--color-borde-suave`) |
| 44 | `#4F6D8A` | `#173B5C` | 2.14:1 | No aplica | Línea decorativa sobre el aviso del pie |

## 4. Observaciones

1. **Todos los pares de texto cumplen AA**, incluidos los del modo de alto contraste. El más justo es el amarillo del banner (4.40:1), que cumple solo porque es texto grande en negrita. Si algún día se usa ese amarillo en texto normal, no cumpliría.
2. **Foco sobre blanco:** el contorno amarillo por sí solo da 1.97:1 contra el blanco. El indicador cumple porque va acompañado de una sombra `#1A1A1A` de 6 px (17.40:1 contra el blanco). Sobre el azul del menú y del pie, el amarillo cumple solo (5.87:1).
3. **Comentarios del CSS que no coinciden del todo con el cálculo:** `base.css` dice que todas las combinaciones del alto contraste «superan 15:1», pero `#FF9E9E` da 10.64:1 y `#CCCCCC` 13.08:1. Igual cumplen AA y AAA. El «17:1» de `#1A1A1A` es 17.40:1, redondeado hacia abajo.

## 5. Comparación con los colores de `antes/` que no cumplían (E04 y E16)

| Texto | Fondo | Relación | ¿Cumple 4.5? | Dónde estaba en `antes/` | Reemplazo en `despues/` |
|---|---|---|---|---|---|
| `#AAAAAA` | `#FFFFFF` | 2.32:1 | No | Texto general y barra superior | `#1A1A1A` (17.40:1) y `#4A4A4A` (8.86:1) |
| `#4FC3F7` | `#FFFFFF` | 2.00:1 | No | Enlaces, sin subrayar | `#1F4E79` (8.66:1), subrayados |
| `#AAAAAA` | `#F4F4F4` | 2.11:1 | No | Texto del pie (12 px) | `#FFFFFF` sobre `#173B5C` (11.56:1), 15 px |
| `#888888` | `#F4F4F4` | 3.22:1 | No | Títulos del pie | `#FFFFFF` sobre `#173B5C` (11.56:1) |
| `#E53935` | `#FFFFFF` | 4.23:1 | No | Texto «obligatorio» en rojo | `#4A4A4A` (8.86:1) y la palabra «(obligatorio)» |
| `#E53935` | `#FDECEA` | 3.70:1 | No | Mensaje «Formulario inválido» | `#B00020` sobre `#FDF2F4` (6.69:1) |
| `#DDDDDD` | `#FFFFFF` | 1.36:1 | No (3:1, borde) | Borde de los campos | `#6B7785` (4.56:1) |
