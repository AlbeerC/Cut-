# 🗄️ Database Structure — Cut!

La base de datos está diseñada para manejar:

- Autenticación (manejada por **Supabase Auth**)
- Perfiles de usuario
- Historial de puntos
- Partidas de juegos
- Rondas dentro de cada partida

---

## 1. **Users & Profiles**

Supabase crea automáticamente los usuarios en `auth.users`.  
A partir de ese evento, se genera un perfil interno en la tabla `profiles`.

### 🧱 **Tables**

| Table           | Purpose                                                                 |
|-----------------|-------------------------------------------------------------------------|
| **profiles**     | Información pública del usuario: username, avatar, puntos              |
| **points_history** | Registro de cada movimiento de puntos: motivo, delta, fecha           |

### 🔗 **Relations**

- profiles.id → foreign key → auth.users.id
- points_history.user_id → references profiles.id


### ⚙️ **Triggers**

Cuando se crea un usuario en `auth.users`, un trigger crea un registro en `profiles` automáticamente, usando el email como username por defecto.

---

## 2. **Game System**

Cada juego que juega un usuario se registra en la tabla `games`.  
Cada partida contiene múltiples rondas guardadas en `game_rounds`.

### 🧱 **Tables**

| Table            | Purpose                                                                |
|------------------|------------------------------------------------------------------------|
| **games**         | Cada partida individual: tipo, user, score final, tiempos             |
| **game_rounds**   | Cada decisión dentro del juego (películas usadas, resultado, ronda)   |

### 🔗 **Relations**

- games.user_id → references profiles.id
- game_rounds.game_id → references games.id


Esto permite:

- reconstruir una partida completa,
- calcular estadísticas,
- crear torneos,
- generar historiales del usuario, etc.

---

## 📊 **Diagram**

```mermaid
auth.users
│
▼
profiles ───┬──────────▶ points_history
│
▼
games ─────▶ game_rounds
```