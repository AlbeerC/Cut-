// profile_api.js
import { supabase } from "../lib/supabase";

/**
 * Convierte un Data URL (base64) a un Blob
 */
async function dataURLToBlob(dataURL) {
  const response = await fetch(dataURL);
  return await response.blob();
}

/**
 * Sube un avatar a Supabase Storage y retorna la ruta del archivo
 * @param {string} dataURL - Data URL de la imagen (base64)
 * @returns {Promise<string>} Ruta del archivo en storage (sin URL pública)
 */
export async function uploadAvatar(dataURL) {
  try {
    const blob = await dataURLToBlob(dataURL);
    const fileExt = dataURL.split(";")[0].split("/")[1];

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("No hay usuario autenticado");

    // Nombre único para el archivo
    const filePath = `${user.id}-${Date.now()}.${fileExt}`;

    console.log("📤 Subiendo avatar:", filePath);

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, blob, {
        contentType: `image/${fileExt}`,
        upsert: false, // No sobrescribir, crear nuevo archivo
      });

    if (error) throw error;

    console.log("✅ Avatar subido exitosamente:", filePath);
    return filePath;
  } catch (error) {
    console.error("❌ Error uploading avatar:", error);
    throw error;
  }
}

/**
 * Elimina un avatar del Storage
 * IMPORTANTE: filePath debe ser solo el nombre del archivo, NO la URL completa
 * Ejemplo correcto: "abc123-1234567890.jpg"
 * Ejemplo incorrecto: "https://xxx.supabase.co/storage/v1/object/public/avatars/abc123-1234567890.jpg"
 * 
 * @param {string} filePath - Ruta del archivo en storage (solo el nombre, sin URL)
 */
export async function deleteAvatar(filePath) {
  if (!filePath) {
    console.log("⚠️ No hay archivo para eliminar (filePath vacío)");
    return;
  }

  try {
    // Limpiar la ruta si viene con URL completa o prefijos
    let cleanPath = filePath;

    // Si es una URL completa, extraer solo el nombre del archivo
    if (filePath.includes("supabase.co") || filePath.includes("http")) {
      const urlParts = filePath.split("/avatars/");
      if (urlParts.length > 1) {
        cleanPath = urlParts[1];
        console.log("🧹 URL completa detectada, extrayendo path:", cleanPath);
      }
    }

    // Eliminar prefijo "avatars/" si existe
    if (cleanPath.startsWith("avatars/")) {
      cleanPath = cleanPath.replace("avatars/", "");
      console.log("🧹 Prefijo 'avatars/' removido:", cleanPath);
    }

    console.log("🗑️ Intentando eliminar avatar:", cleanPath);

    const { data, error } = await supabase.storage
      .from("avatars")
      .remove([cleanPath]);

    if (error) {
      console.error("❌ Error al eliminar avatar:", error);
      console.error("   Path usado:", cleanPath);
      throw error;
    }

    console.log("✅ Avatar eliminado exitosamente:", cleanPath);
    console.log("   Respuesta de Supabase:", data);
  } catch (error) {
    console.error("❌ Error en deleteAvatar:", error);
    console.error("   filePath recibido:", filePath);
    // No lanzar el error para que no bloquee el flujo
  }
}

/**
 * Obtiene la URL pública de un avatar
 * @param {string} filePath - Ruta del archivo en storage
 * @returns {string|null} URL pública o null
 */
export function getAvatarPublicUrl(filePath) {
  if (!filePath) return null;

  // Si ya es una URL completa, devolverla
  if (filePath.startsWith("http")) {
    return filePath;
  }
  
  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Actualiza el perfil del usuario
 * @param {Object} params
 * @param {string} params.userId - ID del usuario
 * @param {string} params.username - Nombre de usuario
 * @param {string|null} params.avatarUrl - Ruta del avatar en storage (puede ser null)
 */
export async function updateProfile({ userId, username, avatarUrl }) {
  try {
    console.log("💾 Actualizando perfil:", { userId, username, avatarUrl });

    const { data, error } = await supabase
      .from("profiles")
      .update({
        username,
        avatar_url: avatarUrl,
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    console.log("✅ Perfil actualizado en DB:", data);
    return { data, error: null };
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    return { data: null, error };
  }
}