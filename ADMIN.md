# Interface d'administration

Page protégée sur `/admin` pour gérer le catalogue sans passer par le code.

## Ce qu'elle permet

- Ajouter, modifier et supprimer une montre
- Basculer le statut en un clic : **Disponible**, **Réservée**, **Vendue**
- Envoyer photos et vidéos (glisser-déposer depuis le sélecteur de fichiers)
- Réordonner le catalogue (flèches, bouton « En tête », ou glisser sur ordinateur)

## Comment ça marche

Les montres sont stockées dans `data/watches.json`, lu par `lib/watches.ts`.
Enregistrer depuis `/admin` écrit ce fichier **directement dans le dépôt GitHub**
via un commit. Vercel détecte le commit et redéploie : le site est à jour en une
minute environ. Git reste donc la source de vérité, et chaque modification est
tracée dans l'historique.

Les photos envoyées sont commitées dans `public/montre/<dossier>/`. Pour une
montre existante, elles rejoignent son dossier actuel ; pour une nouvelle, un
dossier est créé à partir de son identifiant.

## Langue

La saisie se fait **en français uniquement**. Le site affiche le texte français
aux visiteurs anglophones lorsqu'une valeur n'a pas de version anglaise.

Les fiches rédigées avant ce changement gardent leurs traductions, qui restent
affichées en anglais. En revanche, **modifier un champ remplace son ancienne
traduction** : sans cela, un texte français réécrit laisserait une version
anglaise périmée visible aux anglophones.

## Mise en route (à faire une fois)

Dans **Vercel → Project Settings → Environment Variables**, ajouter :

| Variable | Valeur |
| --- | --- |
| `ADMIN_PASSWORD` | le mot de passe de la page `/admin` |
| `ADMIN_SECRET` | une longue chaîne aléatoire (signe le cookie de session) |
| `GITHUB_TOKEN` | un *fine-grained token* GitHub |
| `GITHUB_REPO` | `azoklearn/2121` |
| `GITHUB_BRANCH` | `main` |

Le token GitHub se crée sur
<https://github.com/settings/personal-access-tokens/new> :
restreindre l'accès au seul dépôt `2121`, et accorder la permission
**Repository permissions → Contents → Read and write**. Rien d'autre.

Ne jamais coller ces valeurs dans un fichier du projet : `.env*` est ignoré par
git, et les variables Vercel sont le seul endroit où elles doivent vivre.

## En local

Avec `npm run dev`, si `GITHUB_TOKEN` n'est pas défini, l'admin écrit
directement les fichiers du projet au lieu de commiter. Pratique pour préparer
des fiches hors ligne, puis pousser soi-même. Il suffit d'un `.env.local` avec
`ADMIN_PASSWORD=...`. Cette bascule est désactivée en production.

## Limites connues

- Un fichier envoyé ne peut pas dépasser **4 Mo** (plafond des fonctions
  Vercel). Au-delà, déposer le fichier dans `public/montre/` et le pousser par
  git.
- Supprimer une montre retire sa fiche, mais laisse ses photos dans le dépôt.
- Si quelqu'un modifie le catalogue ailleurs pendant une session, l'enregistrement
  est refusé plutôt qu'écrasé : il faut recharger la page.
