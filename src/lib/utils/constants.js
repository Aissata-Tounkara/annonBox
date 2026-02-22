/**
 * Constantes utilisées par l'application AnonBox.
 * Ce fichier reste volontairement compact: uniquement les valeurs utiles.
 */

// API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// localStorage
export const STORAGE_KEYS = {
  PRIVATE_TOKEN: "anonbox_private_token",
  USER_HANDLE: "anonbox_user_handle",
  DISPLAY_NAME: "anonbox_display_name",
};

// Limites de validation
export const LIMITS = {
  MESSAGE_MAX_LENGTH: 1000,
  DISPLAY_NAME_MIN_LENGTH: 2,
};

// Délais UI (ms)
export const TIMEOUTS = {
  COPY_FEEDBACK: 2000,
};

// Statuts message/inbox
export const MESSAGE_STATUS = {
  ALL: "all",
  UNREAD: "unread",
};

// Routes
export const ROUTES = {
  HOME: "/",
  SAVE: "/save",
  INBOX: (token) => `/inbox/${token}`,
  PUBLIC_PROFILE: (handle) => `/u/${handle}`,
};

// Messages centralisés (principalement pour apiClient)
export const MESSAGES = {
  ERROR: {
    NETWORK: "Erreur de connexion. Vérifiez votre connexion internet.",
    SERVER: "Erreur serveur. Veuillez réessayer plus tard.",
    UNAUTHORIZED: "Token invalide ou expiré. Veuillez créer un nouveau compte.",
    FORBIDDEN: "Vous n'avez pas accès à cette ressource.",
    VALIDATION: "Les données saisies sont invalides.",
    NOT_FOUND: "Ressource introuvable.",
    RATE_LIMIT: "Trop de requêtes. Veuillez patienter quelques instants.",
    DOWNLOAD_FAILED: "Échec du téléchargement du fichier.",
    PROFILE_NOT_FOUND: "Ce profil n'existe pas.",
    MESSAGE_TOO_LONG: `Le message ne peut pas dépasser ${LIMITS.MESSAGE_MAX_LENGTH} caractères.`,
    MESSAGE_TOO_SHORT: "Le message ne peut pas être vide.",
  },
};
