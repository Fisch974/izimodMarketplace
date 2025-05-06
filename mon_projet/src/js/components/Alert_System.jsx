// Alert_System.js
const API_URL = '/api/alerts'; // adapte au bon endpoint backend

/**
 * Envoie une alerte au backend
 * @param {string} type - Exemple : "Signalement", "Erreur serveur", etc.
 * @param {string} message - Le message détaillé de l'alerte
 */
export async function sendAlert(type, message) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        message,
        status: 'Non lu',
        createdAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error('Échec de l\'envoi de l\'alerte');
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'alerte :', error);
  }
}
