/**
 * Constantes de l'application AnonBox
 */

// ========================================
// CONFIGURATION API
// ========================================

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AnonBox'

// ========================================
// STORAGE KEYS (localStorage)
// ========================================

export const STORAGE_KEYS = {
  PRIVATE_TOKEN: 'anonbox_private_token',
  USER_HANDLE: 'anonbox_user_handle',
  DISPLAY_NAME: 'anonbox_display_name',
  LAST_MESSAGE_SENT: 'anonbox_last_message_sent', // Pour rate limiting
}

// ========================================
// LIMITES DE CONTENU
// ========================================

export const LIMITS = {
  MESSAGE_MAX_LENGTH: 1000,
  MESSAGE_MIN_LENGTH: 1,
  PROMPT_MAX_LENGTH: 200,
  PROMPT_MIN_LENGTH: 5,
  DISPLAY_NAME_MAX_LENGTH: 50,
  DISPLAY_NAME_MIN_LENGTH: 2,
}

// ========================================
// RATE LIMITING (Client-side)
// ========================================

export const RATE_LIMIT = {
  MESSAGES_PER_WINDOW: 3, // 3 messages max
  WINDOW_DURATION: 60000, // 1 minute (en millisecondes)
  PROMPTS_PER_WINDOW: 5, // 5 prompts max
}

// ========================================
// ROUTES DE L'APPLICATION
// ========================================

export const ROUTES = {
  HOME: '/',
  CREATE: '/create',
  INBOX: (token) => `/inbox/${token}`,
  PUBLIC_PROFILE: (handle) => `/u/${handle}`,
  PUBLIC_PROMPT: (handle, promptId) => `/u/${handle}?q=${promptId}`,
}

// ========================================
// MESSAGES D'ERREUR
// ========================================

export const MESSAGES = {
  ERROR: {
    // Erreurs réseau
    NETWORK: 'Erreur de connexion. Vérifiez votre connexion internet.',
    SERVER: 'Erreur serveur. Veuillez réessayer plus tard.',

    // Erreurs d'authentification
    UNAUTHORIZED: 'Token invalide ou expiré. Veuillez créer un nouveau compte.',
    FORBIDDEN: "Vous n'avez pas accès à cette ressource.",

    // Erreurs de validation
    VALIDATION: 'Les données saisies sont invalides.',
    NOT_FOUND: 'Ressource introuvable.',

    // Erreurs de rate limiting
    RATE_LIMIT: 'Trop de requêtes. Veuillez patienter quelques instants.',

    // Erreurs de téléchargement
    DOWNLOAD_FAILED: 'Échec du téléchargement du fichier.',

    // Erreurs métier
    PROFILE_NOT_FOUND: "Ce profil n'existe pas.",
    MESSAGE_TOO_LONG: `Le message ne peut pas dépasser ${LIMITS.MESSAGE_MAX_LENGTH} caractères.`,
    MESSAGE_TOO_SHORT: 'Le message ne peut pas être vide.',
    PROMPT_TOO_LONG: `La question ne peut pas dépasser ${LIMITS.PROMPT_MAX_LENGTH} caractères.`,
    PROMPT_TOO_SHORT: `La question doit contenir au moins ${LIMITS.PROMPT_MIN_LENGTH} caractères.`,
    DISPLAY_NAME_INVALID: 'Le nom ne peut contenir que des lettres et des chiffres.',
  },

  SUCCESS: {
    // Succès création
    PROFILE_CREATED: '🎉 Votre profil a été créé avec succès !',
    PROMPT_CREATED: '✅ Question créée avec succès !',
    MESSAGE_SENT: '🎉 Message envoyé avec succès !',

    // Succès modification
    MESSAGE_DELETED: '🗑️ Message supprimé.',
    PROMPT_DELETED: '🗑️ Question supprimée.',
    MESSAGE_MARKED_READ: '✓ Marqué comme lu.',
    RESPONSE_SAVED: '✅ Réponse enregistrée !',

    // Succès partage
    LINK_COPIED: '📋 Lien copié dans le presse-papier !',
    CARD_DOWNLOADED: '📥 Image téléchargée !',

    // Succès régénération
    TOKEN_REGENERATED: '🔄 Nouveau lien généré avec succès !',
  },

  INFO: {
    // Informations
    EMPTY_INBOX: "Vous n'avez aucun message pour le moment.",
    NO_PROMPTS: "Vous n'avez pas encore créé de questions.",
    LOADING: 'Chargement...',
  },

  WARNING: {
    // Avertissements
    TOKEN_WARNING:
      '⚠️ ATTENTION : Sauvegardez votre lien privé ! Sans lui, vous perdrez définitivement accès à vos messages.',
    DELETE_CONFIRM: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
    REGENERATE_TOKEN_WARNING:
      '⚠️ Votre ancien lien ne fonctionnera plus. Êtes-vous sûr ?',
  },
}

// ========================================
// PARTAGE SOCIAL
// ========================================

export const SHARE_MESSAGES = {
  INSTAGRAM:
    '📸 Image enregistrée ! Poste-la en story Instagram et colle ton lien en légende pour recevoir de nouveaux messages.',
  WHATSAPP:
    '💬 Image enregistrée ! Partage-la en statut WhatsApp et colle ton lien pour recevoir des messages anonymes.',
  FACEBOOK:
    '👍 Image enregistrée ! Poste-la sur Facebook et ajoute ton lien pour recevoir des messages.',
}

// ========================================
// FORMATS DE DATES
// ========================================

export const DATE_FORMATS = {
  FULL: 'dd/MM/yyyy HH:mm',
  SHORT: 'dd/MM/yyyy',
  TIME: 'HH:mm',
  RELATIVE: 'relative', // "il y a 5 min"
}

// ========================================
// STATUTS DES MESSAGES
// ========================================

export const MESSAGE_STATUS = {
  UNREAD: 'unread',
  READ: 'read',
  ALL: 'all',
}

// ========================================
// FILTRES DE L'INBOX
// ========================================

export const INBOX_FILTERS = {
  ALL: { value: 'all', label: 'Tous les messages' },
  UNREAD: { value: 'unread', label: 'Non lus' },
  READ: { value: 'read', label: 'Lus' },
}

// ========================================
// THÈME ET COULEURS
// ========================================

export const THEME = {
  PRIMARY: '#FF5A5F', // Rose/Rouge AnonBox
  SECONDARY: '#667eea', // Violet
  SUCCESS: '#10b981',
  ERROR: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#3b82f6',
}

// ========================================
// CARD GENERATOR
// ========================================

export const CARD_CONFIG = {
  WIDTH: 1080, // Format Instagram Story
  HEIGHT: 1920,
  FORMAT: 'PNG',
  QUALITY: 0.95,
}

// ========================================
// REGEX DE VALIDATION
// ========================================

export const REGEX = {
  DISPLAY_NAME: /^[a-zA-Z0-9\s]+$/, // Lettres, chiffres, espaces
  HANDLE: /^[a-z0-9-]+$/, // Minuscules, chiffres, tirets
}

// ========================================
// TIMEOUTS
// ========================================

export const TIMEOUTS = {
  API_REQUEST: 10000, // 10 secondes
  TOAST_DURATION: 3000, // 3 secondes
  COPY_FEEDBACK: 2000, // 2 secondes
  DEBOUNCE_SEARCH: 300, // 300ms
}

// ========================================
// PAGINATION (pour futurs besoins)
// ========================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
}

// ========================================
// FEATURE FLAGS (pour activer/désactiver des features)
// ========================================

export const FEATURES = {
  ENABLE_SHARE_TRACKING: true,
  ENABLE_ANALYTICS: false, // À activer en production
  ENABLE_DEBUG_MODE: process.env.NODE_ENV === 'development',
}

// ========================================
// META TAGS (pour SEO)
// ========================================

export const META = {
  DEFAULT_TITLE: 'AnonBox - Messages anonymes',
  DEFAULT_DESCRIPTION:
    'Recevez des avis honnêtes, des confessions et des questions brûlantes de vos amis. 100% anonyme et sécurisé.',
  DEFAULT_OG_IMAGE: '/images/og-image.png',
  TWITTER_HANDLE: '@anonbox',
}

// ========================================
// VALIDATION DES CONSTANTES
// ========================================

// Vérifier que les variables d'environnement critiques sont définies
if (typeof window !== 'undefined' && !API_URL) {
  console.error('❌ NEXT_PUBLIC_API_URL is not defined in .env.local')
}