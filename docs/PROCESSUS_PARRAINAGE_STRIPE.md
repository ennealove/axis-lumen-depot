# Processus parrainage + Stripe — Axis Lumen Studio

## Principe validé

Le flux métier prévu est :

1. Un visiteur arrive avec un lien de parrainage :
   `abonnement.html?ref=CODEPARRAIN`

2. Le navigateur conserve le code dans `localStorage`.

3. À l’inscription, le code est envoyé au backend dans le champ :
   `referralCode`

4. Le backend rattache le nouveau client au parrain.

5. Le client achète un abonnement ou un produit via Stripe Checkout.

6. Le front envoie au backend :
   - productId
   - priceId
   - plan
   - referralCode
   - clientReferenceId

7. Le backend crée une session Stripe Checkout.

8. Stripe confirme le paiement via webhook.

9. Le backend vérifie si le client a un parrain.

10. Le backend crée une commission payable.

11. L’admin voit la commission dans le registre.

12. L’admin effectue le règlement manuel puis marque la commission comme payée.

## Produits prévus

- Abonnement mensuel : 19 €
- Abonnement annuel : 190 €
- JE SUIS — Rendre son temple vivant
- Le Livre des Vertus
- Le Livre de l’Alimentation
- Le Livre d’Exercices
- Pack complet — 4 livres

## Commission

Taux prévu : 20 %

Exemples validés par test local :

- 19 € → 3,80 €
- 190 € → 38,00 €

## À compléter avant production

Dans `js/stripe-products.js` :

- compléter les `priceId`
- ou compléter temporairement les `paymentLink`

Dans `backend/.env` :

- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_SUB_MONTHLY
- STRIPE_PRICE_SUB_YEARLY
- autres price IDs

## Recommandation

Pour un parrainage fiable, utiliser le backend `/api/stripe/create-checkout-session`.

Les Payment Links peuvent servir de secours, mais le suivi automatique parrain/filleul/commission est plus propre avec une session Checkout créée côté serveur.