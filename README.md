# 📚 DOCUMENTATION COMPLÈTE - ANONBOX FRONTEND

Documentation détaillée de chaque fichier et dossier du projet.

---

## 📂 STRUCTURE RACINE

```
src/
├── app/          # Pages et routes Next.js (App Router)
├── components/   # Composants React réutilisables
├── lib/          # Logique métier, utilitaires, API
└── styles/       # Fichiers CSS globaux et animations
```

---

# 🗂️ `/src/app/` - PAGES ET ROUTES

## 📁 `app/`

Dossier racine de l'App Router de Next.js. Chaque dossier représente une route.

### 📄 `app/layout.js`
**Rôle** : Layout racine de l'application  
**Responsabilités** :
- Définir la structure HTML de base (`<html>`, `<body>`)
- Importer les styles globaux (`globals.css`)
- Configurer les providers (Zustand, Toaster pour notifications)
- Définir les metadata SEO globales

**Exemple de structure** :
```javascript
export const metadata = {
  title: 'AnonBox',
  description: 'Messages anonymes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
```

---

### 📄 `app/page.js`
**Rôle** : Page d'accueil (`/`)  
**Responsabilités** :
- Présenter AnonBox aux visiteurs
- Call-to-action pour créer un profil
- Expliquer le concept (messages anonymes)
- Design attractif avec Hero section

**Routes** : `/`

---

### 📄 `app/not-found.js`
**Rôle** : Page 404 personnalisée  
**Responsabilités** :
- Afficher un message convivial pour les pages introuvables
- Proposer un lien de retour à l'accueil
- Maintenir le design cohérent

**Routes** : Automatique pour toute route inexistante

---

### 📄 `app/globals.css`
**Rôle** : Styles CSS globaux  
**Responsabilités** :
- Importer Tailwind CSS (`@tailwind base/components/utilities`)
- Définir les CSS variables (couleurs, spacing)
- Styles de base pour le body, liens, etc.
- Thème clair/sombre (si applicable)

---

### 📄 `app/favicon.ico`
**Rôle** : Icône du site  
**Format** : Fichier `.ico`  
**Utilisation** : Automatiquement utilisé par Next.js comme favicon

---

## 📁 `app/create/`

Route de création de profil.

### 📄 `app/create/page.js`
**Rôle** : Page de création de profil (`/create`)  
**Responsabilités** :
- Afficher le formulaire de création (via `CreateProfileForm`)
- Afficher l'avertissement critique sur le token (via `SaveTokenWarning`)
- Gérer la redirection vers l'inbox après création
- Appeler l'API `POST /users` via `authService`

**Routes** : `/create`

**Flux utilisateur** :
1. Utilisateur saisit son `display_name`
2. Soumission du formulaire
3. API retourne `{ handle, private_token, inbox_url }`
4. Token stocké dans localStorage
5. Affichage du token à sauvegarder
6. Redirection vers `/inbox/[token]`

---

## 📁 `app/feed/`

**⚠️ Note** : Ce dossier n'était pas dans la spec initiale. À clarifier avec l'équipe.

### 📄 `app/feed/page.jsx`
**Rôle potentiel** : Feed public de questions/réponses ?  
**À définir** : Fonctionnalité non spécifiée dans le cahier des charges.

---

## 📁 `app/u/[handle]/`

Route dynamique pour les profils publics.

### 📄 `app/u/[handle]/page.js`
**Rôle** : Page profil public (`/u/:handle` ou `/u/:handle?q=:promptId`)  
**Responsabilités** :
- Récupérer le profil public via `getPublicProfile(handle)`
- Afficher le nom d'affichage (via `ProfileHeader`)
- Afficher le formulaire d'envoi de message (via `MessageForm`)
- Gérer le paramètre `?q=promptId` pour afficher une question spécifique
- Fallback si la question n'existe plus → afficher le profil général

**Routes** :
- `/u/kyle-z2p` (profil général)
- `/u/kyle-z2p?q=123` (question spécifique)

**Params** :
- `handle` : Handle unique de l'utilisateur
- `searchParams.q` : ID de la question (optionnel)

**Flux visiteur** :
1. Clique sur un lien partagé
2. Voit la question (ou le profil)
3. Saisit un message anonyme (max 1000 caractères)
4. Envoie via `POST /messages`

---

### 📄 `app/u/[handle]/loading.js`
**Rôle** : État de chargement pendant le fetch du profil  
**Responsabilités** :
- Afficher un skeleton loader (via `Skeleton` de shadcn)
- Améliorer l'UX pendant le chargement

---

### 📄 `app/u/[handle]/error.js`
**Rôle** : Gestion d'erreur pour cette route  
**Responsabilités** :
- Afficher un message d'erreur si le profil n'existe pas
- Proposer un bouton "Réessayer"
- Cas d'usage : handle invalide, API down, etc.

---

## 📁 `app/inbox/[token]/`

Route dynamique pour l'inbox privée (protégée par token).

### 📄 `app/inbox/[token]/page.js`
**Rôle** : Page inbox privée (`/inbox/:token`)  
**Responsabilités** :
- Vérifier la validité du token via `verifyToken()`
- Afficher tous les messages reçus (via `InboxContainer`)
- Permettre de filtrer (tous/non lus/par prompt)
- Afficher les stats (total messages, non lus)
- Permettre de répondre, supprimer, partager

**Routes** : `/inbox/uuid-token-123`

**Sécurité** :
- Si token invalide → redirection vers `/create`
- Token stocké dans localStorage pour reconnexion auto

**Flux utilisateur** :
1. Accède via le lien privé (reçu lors de la création)
2. Voit la liste de ses messages
3. Peut répondre → génère une carte → partage sur réseaux sociaux

---

### 📄 `app/inbox/[token]/layout.js`
**Rôle** : Layout spécifique à l'inbox  
**Responsabilités** :
- Ajouter une sidebar avec la liste des prompts (optionnel)
- Wrapper spécifique pour le design de l'inbox
- Header persistant avec bouton "Partager ma page"

---

### 📄 `app/inbox/[token]/loading.js`
**Rôle** : État de chargement de l'inbox  
**Responsabilités** :
- Afficher des skeletons pour les messages
- Skeleton pour le header avec stats

---

### 📄 `app/inbox/[token]/error.js`
**Rôle** : Gestion d'erreur pour l'inbox  
**Responsabilités** :
- Afficher un message si le token est invalide
- Proposer de créer un nouveau compte
- Gérer les erreurs API

---

## 📁 `app/api/og/`

API Route Next.js pour les Open Graph images.

### 📄 `app/api/og/route.js`
**Rôle** : Générer des images Open Graph dynamiques  
**Responsabilités** :
- Générer une image PNG avec les infos du profil
- Affichée lors du partage d'un lien (Twitter, FB, WhatsApp)
- Utiliser `@vercel/og` ou similaire

**Route** : `/api/og?handle=kyle-z2p`

**Exemple de retour** :
```
Image PNG 1200x630 avec :
- "Envoie un message secret à Kyle"
- Logo AnonBox
```

---

# 🧩 `/src/components/` - COMPOSANTS REACT

## 📁 `components/account/`

Composants liés à la gestion du compte.

### 📄 `AccountSettings.jsx`
**Rôle** : Page paramètres du compte (future feature)  
**Props** : Aucune pour le moment  
**Responsabilités** :
- Afficher le handle, display_name
- Bouton pour régénérer le token
- (Futur) Gérer la suppression du compte

---

### 📄 `RegenerateTokenDialog.jsx`
**Rôle** : Modal de régénération du token privé  
**Props** :
- `isOpen` : boolean
- `onClose` : function

**Responsabilités** :
- Avertir l'utilisateur que l'ancien token sera détruit
- Confirmer l'action
- Appeler `POST /users/regenerate-token`
- Afficher le nouveau token à sauvegarder
- Mettre à jour le localStorage

**Flux** :
1. Utilisateur clique "Régénérer mon lien"
2. Confirmation : "L'ancien lien ne fonctionnera plus"
3. API génère un nouveau token
4. Affichage du nouveau lien à copier
5. Redirection vers `/inbox/[new-token]`

---

## 📁 `components/inbox/`

Composants pour la page inbox privée.

### 📄 `InboxContainer.jsx`
**Rôle** : Container principal de l'inbox  
**Props** :
- `token` : string (private_token)

**Responsabilités** :
- Fetch les messages via `useInbox()`
- Orchestrer les sous-composants (Header, Filters, MessageList)
- Gérer le state des filtres
- Polling optionnel pour nouveaux messages

**Structure** :
```jsx
<InboxContainer>
  <InboxHeader />
  <InboxFilters />
  <MessageList />
</InboxContainer>
```

---

### 📄 `InboxHeader.jsx`
**Rôle** : Header de l'inbox avec stats  
**Props** :
- `totalMessages` : number
- `unreadCount` : number

**Responsabilités** :
- Afficher "124 messages reçus"
- Badge "3 non lus"
- Bouton "Partager ma page" (copie le lien public)
- Bouton menu (prompts, paramètres)

---

### 📄 `InboxFilters.jsx`
**Rôle** : Filtres pour la liste de messages  
**Props** :
- `activeFilter` : string ('all' | 'unread' | prompt_id)
- `onFilterChange` : function
- `prompts` : array (liste des prompts pour filtrer)

**Responsabilités** :
- Tabs "Tous les messages" / "Non lus"
- Dropdown pour filtrer par prompt spécifique

---

### 📄 `MessageList.jsx`
**Rôle** : Liste scrollable des messages  
**Props** :
- `messages` : array
- `isLoading` : boolean

**Responsabilités** :
- Mapper les messages en `MessageCard`
- Virtual scrolling si > 100 messages (optionnel)
- Afficher `EmptyInbox` si aucun message

---

### 📄 `MessageCard.jsx`
**Rôle** : Carte individuelle pour un message  
**Props** :
- `message` : object { id, content, prompt_text, response_text, is_read, created_at }
- `onReply` : function
- `onDelete` : function

**Responsabilités** :
- Afficher le contenu du message
- Afficher la question associée
- Badge "Nouveau" si non lu
- Timestamp relatif ("il y a 5 min")
- Boutons d'action (répondre, supprimer)
- Si réponse existe → bouton "Partager la réponse"

**Design** :
- Carte blanche avec ombre
- Border rouge si non lu
- Icône prompt en haut

---

### 📄 `MessageActions.jsx`
**Rôle** : Boutons d'action pour un message  
**Props** :
- `messageId` : number
- `hasResponse` : boolean
- `onReply` : function
- `onDelete` : function
- `onShare` : function

**Responsabilités** :
- Bouton "Répondre" (ouvre `RespondDialog`)
- Bouton "Supprimer" (appelle `deleteMessage`)
- Bouton "Partager" (si réponse existe)
- Dropdown menu pour actions secondaires

---

### 📄 `RespondDialog.jsx`
**Rôle** : Modal pour répondre à un message  
**Props** :
- `isOpen` : boolean
- `onClose` : function
- `message` : object

**Responsabilités** :
- Afficher le message original en haut
- Textarea pour la réponse
- Compteur de caractères
- Bouton "Générer la carte et partager"
- Appeler `POST /messages/:id/respond`
- Afficher `ResponsePreview` après génération

**Flux** :
1. Utilisateur clique "Répondre"
2. Modal s'ouvre avec le message
3. Saisit sa réponse
4. Clique "Générer la carte"
5. API génère une image PNG
6. Preview s'affiche
7. Boutons de partage social apparaissent

---

### 📄 `ResponsePreview.jsx`
**Rôle** : Aperçu de la carte générée  
**Props** :
- `imageUrl` : string (URL de l'image générée)
- `message` : object
- `response` : string

**Responsabilités** :
- Afficher l'image générée (carte PNG)
- Boutons de téléchargement
- Boutons de partage social (IG, WA, FB)

---

### 📄 `ShareButtons.jsx`
**Rôle** : Boutons de partage social  
**Props** :
- `imageUrl` : string
- `publicUrl` : string (ex: anonbox.com/u/kyle-z2p)

**Responsabilités** :
- Bouton Instagram (télécharge image + copie lien + instruction)
- Bouton WhatsApp (idem)
- Bouton Facebook (idem)
- Utiliser `useShareCard()` pour triple action

**Triple action** :
1. Télécharger l'image automatiquement
2. Copier le lien public dans le presse-papier
3. Afficher le message d'instruction (toast)

---

### 📄 `EmptyInbox.jsx`
**Rôle** : État vide de l'inbox  
**Props** : Aucune

**Responsabilités** :
- Afficher une illustration
- Message "Aucun message pour le moment"
- Bouton "Partager ma page" pour recevoir des messages

---

## 📁 `components/layout/`

Composants de layout réutilisables.

### 📄 `Navbar.jsx`
**Rôle** : Barre de navigation principale  
**Props** : Aucune

**Responsabilités** :
- Logo AnonBox (lien vers `/`)
- Menu : Accueil, Créer ma page
- Si connecté : lien vers l'inbox
- Responsive (burger menu mobile)

---

### 📄 `Footer.jsx`
**Rôle** : Pied de page  
**Props** : Aucune

**Responsabilités** :
- Copyright
- Liens : CGU, Politique de confidentialité, Contact
- Réseaux sociaux d'AnonBox (optionnel)

---

### 📄 `Container.jsx`
**Rôle** : Wrapper pour centrer le contenu  
**Props** :
- `children` : ReactNode
- `className` : string (optionnel)

**Responsabilités** :
- Max-width fixe (ex: 1200px)
- Padding horizontal
- Centrage automatique

**Utilisation** :
```jsx
<Container>
  <h1>Mon contenu</h1>
</Container>
```

---

## 📁 `components/onboarding/`

Composants pour la création de profil.

### 📄 `CreateProfileForm.jsx`
**Rôle** : Formulaire de création de profil  
**Props** :
- `onSuccess` : function (callback après création)

**Responsabilités** :
- Input pour `display_name` (max 50 caractères)
- Validation (pas de caractères spéciaux)
- Appeler `authService.createProfile()`
- Afficher `SaveTokenWarning` avant soumission
- Stocker le token dans localStorage
- Rediriger vers `/inbox/[token]`

**Flux** :
1. Utilisateur saisit son nom
2. Clic "Créer ma page"
3. Avertissement critique s'affiche
4. Confirmation
5. API crée l'utilisateur
6. Token affiché via `TokenDisplay`

---

### 📄 `SaveTokenWarning.jsx`
**Rôle** : Avertissement critique avant création  
**Props** :
- `isOpen` : boolean
- `onConfirm` : function
- `onCancel` : function

**Responsabilités** :
- Afficher un message bloquant
- Expliquer que le lien est la seule preuve de propriété
- Avertir de la perte définitive si lien perdu
- Bouton "J'ai compris, continuer"

**Message type** :
```
⚠️ ATTENTION CRITIQUE

Votre lien privé est la SEULE façon d'accéder à vos messages.
Si vous le perdez, AUCUNE récupération n'est possible.

✅ Sauvegardez-le dans vos favoris
✅ Copiez-le dans un endroit sûr

[ Annuler ] [ J'ai compris, créer mon compte ]
```

---

### 📄 `TokenDisplay.jsx`
**Rôle** : Affichage du token à sauvegarder  
**Props** :
- `token` : string
- `inboxUrl` : string

**Responsabilités** :
- Afficher le lien complet `/inbox/[token]`
- Bouton "Copier le lien"
- Instructions de sauvegarde
- Bouton "Accéder à mon inbox"

---

### 📄 `WelcomeDialog.jsx`
**Rôle** : Message de bienvenue après création  
**Props** :
- `isOpen` : boolean
- `handle` : string
- `publicUrl` : string

**Responsabilités** :
- Féliciter l'utilisateur
- Afficher son lien public à partager
- Expliquer le fonctionnement
- Bouton "Commencer"

---

## 📁 `components/prompts/`

Composants pour la gestion des questions.

### 📄 `PromptManager.jsx`
**Rôle** : Gestionnaire principal des prompts  
**Props** :
- `userHandle` : string

**Responsabilités** :
- Afficher `PromptList`
- Bouton "Créer une nouvelle question"
- Ouvrir `PromptCreator` en modal
- Orchestrer les CRUD via `usePrompts()`

---

### 📄 `PromptCreator.jsx`
**Rôle** : Formulaire de création de prompt  
**Props** :
- `isOpen` : boolean
- `onClose` : function
- `onSuccess` : function

**Responsabilités** :
- Input pour le texte de la question
- Validation (max 200 caractères)
- Appeler `POST /prompts`
- Fermer le modal et rafraîchir la liste

**Exemple** :
```
Créer une nouvelle question

"Quel est mon meilleur souvenir avec toi ?"

[ Annuler ] [ Créer ]
```

---

### 📄 `PromptList.jsx`
**Rôle** : Liste des prompts de l'utilisateur  
**Props** :
- `prompts` : array

**Responsabilités** :
- Mapper les prompts en `PromptCard`
- Afficher un message si aucun prompt

---

### 📄 `PromptCard.jsx`
**Rôle** : Carte individuelle pour un prompt  
**Props** :
- `prompt` : object { id, text, share_count }
- `onShare` : function
- `onDelete` : function

**Responsabilités** :
- Afficher le texte de la question
- Compteur de partages
- Bouton "Partager cette question"
- Bouton "Supprimer"

---

### 📄 `PromptShareDialog.jsx`
**Rôle** : Modal de partage d'un prompt  
**Props** :
- `isOpen` : boolean
- `prompt` : object
- `userHandle` : string

**Responsabilités** :
- Afficher le lien spécifique : `/u/handle?q=promptId`
- Bouton "Copier le lien"
- Incrémenter le compteur de partages

---

### 📄 `DeletePromptDialog.jsx`
**Rôle** : Confirmation de suppression  
**Props** :
- `isOpen` : boolean
- `promptText` : string
- `onConfirm` : function
- `onCancel` : function

**Responsabilités** :
- Afficher un message de confirmation
- Avertir que les messages liés resteront visibles
- Appeler `DELETE /prompts/:id`

---

## 📁 `components/public/`

Composants pour la page profil public.

### 📄 `PublicProfile.jsx`
**Rôle** : Container principal du profil public  
**Props** :
- `handle` : string
- `promptId` : number (optionnel)

**Responsabilités** :
- Fetch le profil via `usePublicProfile()`
- Orchestrer `ProfileHeader`, `MessageForm`, `PromptSelector`
- Gérer le fallback si prompt supprimé

---

### 📄 `ProfileHeader.jsx`
**Rôle** : En-tête du profil public  
**Props** :
- `displayName` : string
- `handle` : string

**Responsabilités** :
- Afficher "Envoie un message secret à [Nom]"
- Avatar (optionnel)
- Design attractif avec gradient

---

### 📄 `MessageForm.jsx`
**Rôle** : Formulaire d'envoi de message anonyme  
**Props** :
- `handle` : string
- `promptId` : number (optionnel)
- `promptText` : string (optionnel)

**Responsabilités** :
- Afficher la question (si spécifique)
- Textarea pour le message (max 1000 caractères)
- Compteur de caractères (via `CharacterCounter`)
- Bouton "Envoyer"
- Rate limiting client-side
- Appeler `POST /messages`
- Afficher un toast de confirmation

**Flux** :
1. Visiteur saisit son message
2. Clique "Envoyer"
3. API enregistre le message
4. Toast : "Message envoyé ! 🎉"
5. Textarea se vide

---

### 📄 `PromptSelector.jsx`
**Rôle** : Sélection de question (si multiple)  
**Props** :
- `prompts` : array
- `selectedPromptId` : number
- `onSelect` : function

**Responsabilités** :
- Afficher des cartes cliquables pour chaque prompt
- Mettre en surbrillance le prompt sélectionné
- Modifier l'URL avec `?q=promptId`

---

### 📄 `PublicPromptCard.jsx`
**Rôle** : Carte d'affichage d'un prompt spécifique  
**Props** :
- `promptText` : string

**Responsabilités** :
- Afficher la question dans une bulle stylisée
- Design inspiré des screenshots (bulles flottantes)

---

## 📁 `components/shared/`

Composants réutilisables dans toute l'app.

### 📄 `CopyButton.jsx`
**Rôle** : Bouton pour copier dans le presse-papier  
**Props** :
- `text` : string (texte à copier)
- `label` : string (texte du bouton)

**Responsabilités** :
- Utiliser `useCopyToClipboard()`
- Afficher "Copié !" pendant 2 secondes
- Icône clipboard

---

### 📄 `ShareButton.jsx`
**Rôle** : Bouton de partage générique  
**Props** :
- `platform` : string ('instagram' | 'whatsapp' | 'facebook')
- `imageUrl` : string
- `publicUrl` : string

**Responsabilités** :
- Déclencher la triple action via `useShareCard()`
- Afficher le message d'instruction après clic

---

### 📄 `SocialShareButtons.jsx`
**Rôle** : Groupe de boutons de partage social  
**Props** :
- `imageUrl` : string
- `publicUrl` : string

**Responsabilités** :
- Afficher 3 boutons : Instagram, WhatsApp, Facebook
- Utiliser `ShareButton` pour chacun

---

### 📄 `LoadingSpinner.jsx`
**Rôle** : Spinner de chargement  
**Props** :
- `size` : string ('sm' | 'md' | 'lg')

**Responsabilités** :
- Afficher une animation de chargement
- Utiliser Tailwind pour les animations

---

### 📄 `ErrorMessage.jsx`
**Rôle** : Message d'erreur  
**Props** :
- `message` : string
- `onRetry` : function (optionnel)

**Responsabilités** :
- Afficher un message d'erreur stylisé
- Bouton "Réessayer" si `onRetry` fourni

---

### 📄 `EmptyState.jsx`
**Rôle** : État vide générique  
**Props** :
- `title` : string
- `description` : string
- `action` : ReactNode (bouton optionnel)

**Responsabilités** :
- Afficher une illustration
- Message centré
- Bouton d'action (ex: "Créer ma première question")

---

### 📄 `ConfirmDialog.jsx`
**Rôle** : Dialog de confirmation générique  
**Props** :
- `isOpen` : boolean
- `title` : string
- `description` : string
- `onConfirm` : function
- `onCancel` : function

**Responsabilités** :
- Afficher un message de confirmation
- Boutons "Annuler" et "Confirmer"
- Utilisé pour suppressions, régénération token, etc.

---

### 📄 `CharacterCounter.jsx`
**Rôle** : Compteur de caractères pour textarea  
**Props** :
- `currentLength` : number
- `maxLength` : number

**Responsabilités** :
- Afficher "245 / 1000"
- Couleur rouge si proche de la limite
- Mise à jour en temps réel

---

## 📁 `components/ui/`

Composants shadcn/ui (générés automatiquement).

**Note** : Ces fichiers sont créés par la CLI shadcn. Chaque composant est documenté sur https://ui.shadcn.com

### Composants installés :
- `button.jsx` - Boutons avec variants
- `input.jsx` - Champs de saisie
- `textarea.jsx` - Zones de texte
- `card.jsx` - Cartes avec header/content/footer
- `dialog.jsx` - Modales
- `alert.jsx` - Messages d'alerte
- `alert-dialog.jsx` - Dialogs de confirmation
- `badge.jsx` - Badges (ex: "Nouveau", "3 non lus")
- `separator.jsx` - Séparateurs
- `skeleton.jsx` - Placeholders de chargement
- `tabs.jsx` - Onglets
- `sonner.jsx` - Toast notifications (via Sonner)
- `popover.jsx` - Popovers
- `scroll-area.jsx` - Zones scrollables
- `avatar.jsx` - Avatars
- `dropdown-menu.jsx` - Menus déroulants

**Utilisation** :
```jsx
import { Button } from '@/components/ui/button'

<Button variant="default">Envoyer</Button>
```

---

# 📚 `/src/lib/` - LOGIQUE MÉTIER

## 📁 `lib/api/`

Configuration et endpoints API.

### 📄 `lib/api/client.js`
**Rôle** : Configuration Axios globale  
**Responsabilités** :
- Créer une instance Axios avec `baseURL` (depuis `.env.local`)
- Ajouter des interceptors de requête (pour injecter `X-Private-Token`)
- Ajouter des interceptors de réponse (pour gérer les erreurs)
- Timeout global (10 secondes)

**Structure** :
```javascript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('anonbox_private_token')
  if (token) {
    config.headers['X-Private-Token'] = token
  }
  return config
})

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Gérer les erreurs 401, 500, etc.
    return Promise.reject(error)
  }
)

export default apiClient
```

---

### 📄 `lib/api/endpoints.js`
**Rôle** : Tous les endpoints Laravel mappés  
**Responsabilités** :
- Exporter des fonctions pour chaque route API
- Utiliser `apiClient` pour les appels
- Documenter chaque fonction avec JSDoc

**Endpoints disponibles** :
- `createUser(data)`
- `getPublicProfile(handle)`
- `verifyToken(token)`
- `getMe()`
- `regenerateToken()`
- `getUserPrompts(handle)`
- `getPrompt(id)`
- `createPrompt(data)`
- `deletePrompt(id)`
- `incrementPromptShare(id)`
- `sendMessage(data)`
- `getInbox(filters)`
- `markMessageAsRead(id)`
- `respondToMessage(id, data)`
- `deleteMessage(id)`
- `markMessageAsShared(id)`
- `generateCard(data)`
- `getCardDownloadUrl(filename)`
- `checkHealth()`

**Exemple** :
```javascript
export const createUser = (data) => {
  return apiClient.post('/users', data)
}

export const getInbox = (filters = {}) => {
  return apiClient.get('/inbox', { params: filters })
}
```

---

## 📁 `lib/hooks/`

Hooks React personnalisés.

### 📄 `lib/hooks/useAuth.js`
**Rôle** : Gérer l'authentification  
**Retourne** :
```javascript
{
  isAuthenticated: boolean,
  token: string | null,
  login: (token) => void,
  logout: () => void,
  verifyToken: () => Promise<boolean>
}
```

**Responsabilités** :
- Vérifier si un token existe dans localStorage
- Valider le token au mount via `verifyToken()`
- Fournir des méthodes login/logout
- Synchroniser avec `useAuthStore`

---

### 📄 `lib/hooks/useInbox.js`
**Rôle** : Gérer l'inbox  
**Retourne** :
```javascript
{
  messages: array,
  isLoading: boolean,
  error: string | null,
  unreadCount: number,
  fetchInbox: () => Promise<void>,
  filterMessages: (filter) => void
}
```

**Responsabilités** :
- Fetch les messages via `getInbox()`
- Gérer le loading et les erreurs
- Calculer le compteur de non lus
- Filtrer par statut ou prompt

---

### 📄 `lib/hooks/useMessages.js`
**Rôle** : CRUD messages  
**Retourne** :
```javascript
{
  sendMessage: (data) => Promise<void>,
  deleteMessage: (id) => Promise<void>,
  markAsRead: (id) => Promise<void>,
  respondToMessage: (id, response) => Promise<void>
}
```

**Responsabilités** :
- Wrapper des endpoints de messages
- Gérer le loading et les erreurs
- Mettre à jour le store après chaque action

---

### 📄 `lib/hooks/usePrompts.js`
**Rôle** : CRUD prompts  
**Retourne** :
```javascript
{
  prompts: array,
  createPrompt: (text) => Promise<void>,
  deletePrompt: (id) => Promise<void>,
  sharePrompt: (id) => Promise<void>
}
```

**Responsabilités** :
- Fetch les prompts de l'utilisateur
- Créer, supprimer, partager des prompts
- Synchroniser avec `usePromptsStore`

---

### 📄 `lib/hooks/usePublicProfile.js`
**Rôle** : Récupérer un profil public  
**Retourne** :
```javascript
{
  profile: object | null,
  prompts: array,
  isLoading: boolean,
  error: string | null
}
```

**Responsabilités** :
- Fetch le profil via `getPublicProfile(handle)`
- Fetch les prompts via `getUserPrompts(handle)`
- Gérer le cas où le profil n'existe pas

---

### 📄 `lib/hooks/useLocalStorage.js`
**Rôle** : Hook pour localStorage persistant  
**Retourne** :
```javascript
[value, setValue, removeValue]
```

**Responsabilités** :
- Wrapper de localStorage avec synchronisation React
- Gérer la sérialisation JSON
- Support SSR (vérifier si `window` existe)

---

### 📄 `lib/hooks/useCopyToClipboard.js`
**Rôle** : Copier du texte dans le presse-papier  
**Retourne** :
```javascript
{
  isCopied: boolean,
  copyToClipboard: (text) => Promise<void>
}
```

**Responsabilités** :
- Utiliser l'API Clipboard
- Afficher un état "Copié !" pendant 2 secondes
- Gérer les erreurs (permission refusée)

---

### 📄 `lib/hooks/useShareCard.js`
**Rôle** : Triple action de partage social  
**Retourne** :
```javascript
{
  shareToInstagram: (imageUrl, publicUrl) => void,
  shareToWhatsApp: (imageUrl, publicUrl) => void,
  shareToFacebook: (imageUrl, publicUrl) => void
}
```

**Responsabilités** :
1. Télécharger l'image
2. Copier le lien public
3. Afficher le message d'instruction (toast)

---

### 📄 `lib/hooks/useCardGenerator.js`
**Rôle** : Générer une carte de réponse  
**Retourne** :
```javascript
{
  isGenerating: boolean,
  generatedImageUrl: string | null,
  generateCard: (messageId) => Promise<void>
}
```

**Responsabilités** :
- Appeler `POST /cards/generate`
- Gérer le blob retourné
- Créer une URL locale pour l'image
- Gérer les erreurs

---

## 📁 `lib/services/`

Services métier (logique pure, pas de hooks).

### 📄 `lib/services/authService.js`
**Rôle** : Logique métier authentification  
**Fonctions** :
```javascript
createProfile(displayName)
verifyToken(token)
regenerateToken()
logout()
```

**Responsabilités** :
- Appeler les endpoints auth
- Stocker/supprimer le token dans localStorage
- Valider les données avant envoi

---

### 📄 `lib/services/messageService.js`
**Rôle** : Logique métier messages  
**Fonctions** :
```javascript
sendAnonymousMessage(handle, promptId, content)
validateMessageContent(content)
```

**Responsabilités** :
- Valider le contenu (longueur, caractères)
- Rate limiting client-side
- Formater les données pour l'API

---

### 📄 `lib/services/promptService.js`
**Rôle** : Logique métier prompts  
**Fonctions** :
```javascript
validatePromptText(text)
buildPromptShareUrl(handle, promptId)
```

**Responsabilités** :
- Valider le texte de la question
- Construire les URLs de partage

---

### 📄 `lib/services/shareService.js`
**Rôle** : Logique métier partage social  
**Fonctions** :
```javascript
downloadImage(url, filename)
copyToClipboard(text)
showShareInstructions(platform)
```

**Responsabilités** :
- Télécharger des images programmatiquement
- Copier dans le presse-papier
- Retourner les messages d'instruction par plateforme

---

### 📄 `lib/services/cardService.js`
**Rôle** : Logique métier génération de cartes  
**Fonctions** :
```javascript
generateResponseCard(messageId)
downloadCardImage(imageBlob, filename)
```

**Responsabilités** :
- Gérer la génération de cartes
- Convertir blob en URL
- Télécharger l'image localement

---

### 📄 `lib/services/storageService.js`
**Rôle** : Logique métier localStorage  
**Fonctions** :
```javascript
saveToken(token)
getToken()
removeToken()
saveUserData(data)
getUserData()
```

**Responsabilités** :
- Wrapper de localStorage
- Sérialisation/désérialisation JSON
- Gestion des erreurs (quota dépassé)

---

## 📁 `lib/store/`

Stores Zustand pour la gestion d'état globale.

### 📄 `lib/store/useAuthStore.js`
**Rôle** : State d'authentification  
**State** :
```javascript
{
  privateToken: string | null,
  handle: string | null,
  displayName: string | null,
  isAuthenticated: boolean
}
```

**Actions** :
```javascript
setAuth(data)
clearAuth()
getInboxUrl()
getPublicUrl()
```

**Persistance** : Via `zustand/middleware` (persist)

---

### 📄 `lib/store/useInboxStore.js`
**Rôle** : State de l'inbox et messages  
**State** :
```javascript
{
  messages: array,
  unreadCount: number,
  totalCount: number,
  filters: object,
  isLoading: boolean
}
```

**Actions** :
```javascript
setMessages(messages)
addMessage(message)
updateMessage(id, data)
deleteMessage(id)
setFilters(filters)
markAsRead(id)
```

---

### 📄 `lib/store/usePromptsStore.js`
**Rôle** : State des prompts  
**State** :
```javascript
{
  prompts: array,
  activePrompt: object | null,
  isLoading: boolean
}
```

**Actions** :
```javascript
setPrompts(prompts)
addPrompt(prompt)
deletePrompt(id)
setActivePrompt(prompt)
incrementShareCount(id)
```

---

### 📄 `lib/store/useUIStore.js`
**Rôle** : State de l'UI (modals, toasts, etc.)  
**State** :
```javascript
{
  isRespondDialogOpen: boolean,
  isPromptCreatorOpen: boolean,
  activeMessageId: number | null,
  toasts: array
}
```

**Actions** :
```javascript
openRespondDialog(messageId)
closeRespondDialog()
openPromptCreator()
closePromptCreator()
addToast(message)
removeToast(id)
```

---

## 📁 `lib/utils/`

Utilitaires divers.

### 📄 `lib/utils/cn.js`
**Rôle** : Merge classNames Tailwind  
**Fonction** :
```javascript
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

**Utilisation** :
```jsx
<div className={cn('p-4', isActive && 'bg-blue-500')}>
```

**⚠️ Note** : Ce fichier fait doublon avec `lib/utils.js` créé par shadcn. À fusionner.

---

### 📄 `lib/utils/constants.js`
**Rôle** : Constantes de l'application  
**Contenu** :
```javascript
export const APP_NAME = 'AnonBox'
export const MAX_MESSAGE_LENGTH = 1000
export const MAX_PROMPT_LENGTH = 200
export const MAX_DISPLAY_NAME_LENGTH = 50
export const RATE_LIMIT_MESSAGES = 3
export const RATE_LIMIT_WINDOW = 60000

export const ROUTES = {
  HOME: '/',
  CREATE: '/create',
  INBOX: (token) => `/inbox/${token}`,
  PUBLIC_PROFILE: (handle) => `/u/${handle}`,
}

export const STORAGE_KEYS = {
  PRIVATE_TOKEN: 'anonbox_private_token',
  USER_DATA: 'anonbox_user_data',
}

export const SHARE_MESSAGES = {
  INSTAGRAM: '📸 Image enregistrée ! Poste-la en story...',
  WHATSAPP: '💬 Image enregistrée ! Partage-la en statut...',
  FACEBOOK: '👍 Image enregistrée ! Poste-la...',
}
```

---

### 📄 `lib/utils/errorHandlers.js`
**Rôle** : Gestion centralisée des erreurs  
**Fonctions** :
```javascript
handleApiError(error)
showErrorToast(message)
getErrorMessage(error)
```

**Responsabilités** :
- Parser les erreurs API
- Afficher des messages utilisateur-friendly
- Logger les erreurs en console (dev)

---

### 📄 `lib/utils/formatters.js`
**Rôle** : Formatage de données  
**Fonctions** :
```javascript
formatDate(date) // "il y a 5 min"
formatNumber(num) // "1,234"
truncateText(text, maxLength)
formatHandle(displayName) // "Kyle" → "kyle-z2p"
```

**Responsabilités** :
- Formater les dates (date-fns)
- Formater les nombres
- Tronquer les textes longs

---

### 📄 `lib/utils/rateLimiter.js`
**Rôle** : Rate limiting client-side  
**Fonctions** :
```javascript
canSendMessage(handle) // Vérifie si rate limit OK
recordMessageSent(handle)
getRemainingTime(handle)
```

**Responsabilités** :
- Limiter à 3 messages / minute par IP (côté client)
- Stocker dans localStorage
- Retourner le temps restant avant prochain message

---

### 📄 `lib/utils/urlHelpers.js`
**Rôle** : Construction d'URLs  
**Fonctions** :
```javascript
buildPublicUrl(handle)
buildInboxUrl(token)
buildPromptUrl(handle, promptId)
getAppUrl()
```

**Responsabilités** :
- Construire des URLs complètes (avec domaine)
- Gérer les environnements (dev/prod)

---

### 📄 `lib/utils/validators.js`
**Rôle** : Validations  
**Fonctions** :
```javascript
validateDisplayName(name)
validateMessageContent(content)
validatePromptText(text)
isValidHandle(handle)
```

**Responsabilités** :
- Valider les inputs utilisateur
- Retourner des messages d'erreur clairs
- Regex pour caractères autorisés

**Exemple** :
```javascript
export function validateDisplayName(name) {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Le nom est requis' }
  }
  if (name.length > 50) {
    return { valid: false, error: 'Maximum 50 caractères' }
  }
  if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
    return { valid: false, error: 'Caractères spéciaux non autorisés' }
  }
  return { valid: true }
}
```

---

## 📁 `lib/config/`

Configuration de l'application.

### 📄 `lib/config/env.js`
**Rôle** : Validation des variables d'environnement  
**Contenu** :
```javascript
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  appName: process.env.NEXT_PUBLIC_APP_NAME,
}

// Validation au démarrage
if (!env.apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined')
}

if (!env.appUrl) {
  throw new Error('NEXT_PUBLIC_APP_URL is not defined')
}
```

**Utilisation** :
```javascript
import { env } from '@/lib/config/env'

const apiUrl = env.apiUrl
```

---

### 📄 `lib/config/site.js`
**Rôle** : Configuration SEO et branding  
**Contenu** :
```javascript
export const siteConfig = {
  name: 'AnonBox',
  description: 'Recevez des messages anonymes de vos amis',
  url: 'https://anonbox.com',
  ogImage: 'https://anonbox.com/og-image.png',
  links: {
    twitter: 'https://twitter.com/anonbox',
    instagram: 'https://instagram.com/anonbox',
  },
}
```

**Utilisation** :
```jsx
// Dans layout.js
export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    images: [siteConfig.ogImage],
  },
}
```

---

# 🎨 `/src/styles/` - STYLES

## 📄 `styles/animations.css`
**Rôle** : Animations Tailwind personnalisées  
**Contenu** :
```css
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  .animate-slide-up {
    animation: slideUp 0.4s ease-out;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    transform: translateY(20px); 
    opacity: 0; 
  }
  to { 
    transform: translateY(0); 
    opacity: 1; 
  }
}
```

**Utilisation** :
```jsx
<div className="animate-fade-in">Contenu</div>
```

---

## 📄 `styles/card-templates.css`
**Rôle** : Styles pour la génération de cartes PNG  
**Contenu** :
```css
.response-card {
  width: 1080px;
  height: 1920px; /* Format Instagram Story */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.response-card__message {
  font-size: 48px;
  font-weight: 600;
  color: white;
  text-align: center;
  margin-bottom: 40px;
}

.response-card__response {
  font-size: 36px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 80px;
}

.response-card__footer {
  font-size: 28px;
  color: rgba(255, 255, 255, 0.7);
}
```

**Utilisation** : Côté backend pour générer les images PNG.

---

# 🌍 VARIABLES D'ENVIRONNEMENT

## 📄 `.env.local`
**Rôle** : Variables d'environnement pour le développement  
**Contenu** :
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AnonBox
```

**⚠️ Important** : Ne JAMAIS commiter ce fichier.

---

## 📄 `.env.example`
**Rôle** : Template pour `.env.local`  
**Contenu** :
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=AnonBox
```

**Utilisation** : Copier et renommer en `.env.local`, puis remplir les valeurs.

---

# 📊 RÉCAPITULATIF DES RESPONSABILITÉS

| Dossier | Responsabilité |
|---------|----------------|
| `app/` | Routing et pages Next.js |
| `components/` | Composants UI réutilisables |
| `lib/api/` | Communication avec le backend Laravel |
| `lib/hooks/` | Logique métier avec state React |
| `lib/services/` | Logique métier pure (sans state) |
| `lib/store/` | State management global (Zustand) |
| `lib/utils/` | Utilitaires divers (formatage, validation) |
| `lib/config/` | Configuration et constantes |
| `styles/` | CSS global et animations |

---

# 🎯 ORDRE DE LECTURE RECOMMANDÉ

Pour comprendre le projet, lire dans cet ordre :

1. **`lib/utils/constants.js`** → Comprendre les constantes
2. **`lib/config/env.js`** → Variables d'environnement
3. **`lib/api/client.js`** → Configuration API
4. **`lib/api/endpoints.js`** → Tous les endpoints disponibles
5. **`lib/store/useAuthStore.js`** → State d'authentification
6. **`lib/hooks/useAuth.js`** → Logique d'auth
7. **`app/create/page.js`** → Flux de création de profil
8. **`app/u/[handle]/page.js`** → Profil public
9. **`app/inbox/[token]/page.js`** → Inbox privée
10. **`components/`** → Explorer les composants par feature

---

# 🚀 CONVENTIONS DE CODE

## Naming
- **Composants** : PascalCase (ex: `MessageCard.jsx`)
- **Hooks** : camelCase avec préfixe `use` (ex: `useAuth.js`)
- **Services** : camelCase avec suffix `Service` (ex: `authService.js`)
- **Stores** : camelCase avec préfixe `use` (ex: `useAuthStore.js`)
- **Utils** : camelCase (ex: `validators.js`)

## Structure de fichier
```javascript
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types/Interfaces (si TypeScript était activé)

// 3. Composant principal
export default function MonComposant({ prop1, prop2 }) {
  // State
  const [state, setState] = useState()

  // Hooks
  const { data } = useHook()

  // Handlers
  const handleClick = () => {}

  // Render
  return <div>...</div>
}

// 4. Sous-composants (si nécessaire)
function SousComposant() {}
```

---

# 📖 RESSOURCES SUPPLÉMENTAIRES

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)

---

**🎉 Cette documentation couvre l'ensemble du projet AnonBox Frontend !**