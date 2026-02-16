import { createUser, verifyToken } from '@/lib/api/endpoints'
import { STORAGE_KEYS } from '@/lib/utils/constants'

/**
 * Persiste la session utilisateur dans le localStorage
 */
function persistSession({ private_token, handle, display_name }) {
  localStorage.setItem(STORAGE_KEYS.PRIVATE_TOKEN, private_token)
  localStorage.setItem(STORAGE_KEYS.USER_HANDLE, handle)
  localStorage.setItem(STORAGE_KEYS.DISPLAY_NAME, display_name)
}

/**
 * Supprime la session du localStorage
 */
function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.PRIVATE_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USER_HANDLE)
  localStorage.removeItem(STORAGE_KEYS.DISPLAY_NAME)
}

/**
 * Lit la session courante depuis le localStorage
 * @returns {{ private_token: string|null, handle: string|null, display_name: string|null }}
 */
function getStoredSession() {
  if (typeof window === 'undefined') return { private_token: null, handle: null, display_name: null }
  return {
    private_token: localStorage.getItem(STORAGE_KEYS.PRIVATE_TOKEN),
    handle: localStorage.getItem(STORAGE_KEYS.USER_HANDLE),
    display_name: localStorage.getItem(STORAGE_KEYS.DISPLAY_NAME),
  }
}

/**
 * Crée un nouveau profil et persiste la session
 * @param {{ display_name: string }} data
 * @returns {Promise<{ user: Object, private_token: string, inboxUrl: string }>}
 */
async function register(data) {
  const response = await createUser(data)

  // Le controller Laravel retourne : { data: UserResource, success, private_token, warning }
  const { data: user, private_token } = response

  persistSession({
    private_token,
    handle: user.handle,
    display_name: user.display_name,
  })

  return {
    user,
    private_token,
    inboxUrl: `/inbox/${private_token}`,
  }
}

/**
 * Restaure la session depuis un token (login)
 * @param {string} token
 * @returns {Promise<{ user: Object, unread_count: number }>}
 */
async function loginWithToken(token) {
  const response = await verifyToken(token)

  const { data: user, unread_count } = response

  // Rafraîchir le localStorage avec les données à jour
  persistSession({
    private_token: token,
    handle: user.handle,
    display_name: user.display_name,
  })

  return { user, unread_count }
}

/**
 * Déconnexion locale (ne révoque pas le token côté serveur)
 */
function logout() {
  clearSession()
}

export const authService = {
  register,
  loginWithToken,
  logout,
  getStoredSession,
  persistSession,
  clearSession,
}

export default authService;