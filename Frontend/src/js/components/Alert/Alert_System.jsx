
// This file is part of the "Alert System" project
const API_URL = '/api/alerts';

/**
 * Function for sending alerts to the backend
 * @param {string} type - Exemple : "Signalement", "Erreur serveur", etc.
 * @param {string} message - Le message détaillé de l'alerte
 */

// This function sends an alert to the backend API
// It takes the type and message of the alert as parameters
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
