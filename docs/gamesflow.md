# 🗄️ Base de Datos y Flujo de Puntos

## 1️⃣ Tablas principales

| Tabla           | Propósito                                                     | Clave primaria / foránea              |
|-----------------|---------------------------------------------------------------|---------------------------------------|
| profiles        | Información del usuario: username, avatar, puntos acumulados  | id (FK → auth.users.id)               |
| points_history  | Registro de todos los cambios de puntos                        | id (PK), user_id (FK → profiles.id)   |
| games           | Cada partida jugada por un usuario                             | id (PK), user_id (FK → profiles.id)   |
| game_rounds     | Cada decisión o intento dentro de una partida (si aplica)     | id (PK), game_id (FK → games.id)      |

---

## 2️⃣ Flujo general de datos

1. Usuario se registra o inicia sesión  
   → se crea un registro en `auth.users`

2. Trigger en `auth.users`  
   → crea automáticamente un perfil en `profiles`
   - `username` por defecto = email antes de `@`
   - `avatar_url` = imagen de OAuth (si aplica)

3. Inicio de partida  
   → se crea una fila en `games`

4. Rondas de la partida (si aplica)  
   → se crean filas en `game_rounds`

5. Finalización de partida  
   - Se calculan puntos según reglas del juego  
   - Se inserta registro en `points_history`  
   - Se actualiza `profiles.points` sumando los puntos de la partida

---

## 3️⃣ Ejemplo: Batalla de Películas (Versus)

**Usuario:** `cinefan22`

### Paso 1: Crear partida

**games**

| id  | user_id | tipo   | fecha_inicio       | fecha_fin |
|-----|---------|--------|--------------------|-----------|
| 101 | 1       | versus | 2026-01-15 10:00   | null      |

---

### Paso 2: Registrar rondas (opcional)

**game_rounds**

| id | game_id | pelicula_elegida | opciones |
|----|---------|------------------|----------|
| 1  | 101     | Inception        | [...]    |
| 2  | 101     | Titanic          | [...]    |

---

### Paso 3: Guardar puntos

- Partida completa: **+50 pts**
- Bonus elecciones: **2 × 10 pts = 20 pts**
- **Total: 70 pts**

**points_history**

| id | user_id | delta | reason                     | created_at        |
|----|---------|-------|----------------------------|-------------------|
| 1  | 1       | 70    | Batalla de Películas #101  | 2026-01-15 10:15  |

---

### Paso 4: Actualizar puntos totales

**profiles**

| id | username  | points |
|----|-----------|--------|
| 1  | cinefan22 | 1550   |

---

## 4️⃣ Ejemplo: Quién la dirigió

- Cada respuesta correcta → una fila en `game_rounds`
- Bonus por racha → suma registrada en `points_history`
- `profiles.points` se actualiza **al final de la partida**

---

## 5️⃣ Diagrama conceptual

    auth.users
         │
         ▼
    profiles ───┬──────────▶ points_history
         │
         ▼
        games ─────▶ game_rounds


**Relaciones clave:**

- `profiles` → información del usuario y puntos acumulados
- `points_history` → histórico de cambios de puntos
- `games` → resumen de cada partida
- `game_rounds` → detalle de cada ronda (si aplica)

> Nota: juegos como **Versus** pueden no generar `game_rounds` si no es necesario guardar elecciones.

---

## 6️⃣ Buenas prácticas

- **Índices:** indexar columnas usadas en filtros frecuentes (`user_id`, `game_id`)
- **Paginación:** para historial de partidas o rondas
- **Evitar duplicados innecesarios:** guardar solo lo que se necesita
- **Archivado / purga de datos antiguos:** opcional si se generan millones de filas
