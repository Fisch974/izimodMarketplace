import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Formulaire from './Form_Registration.jsx';

global.fetch = jest.fn(); // mock de fetch

describe('Formulaire', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('affiche tous les champs du formulaire', () => {
    render(<MemoryRouter><Formulaire /></MemoryRouter>);

    expect(screen.getByLabelText('Nom:')).toBeInTheDocument;
    expect(screen.getByLabelText('Prénom:')).toBeInTheDocument;
    expect(screen.getByLabelText('Adresse:')).toBeInTheDocument;
    expect(screen.getByLabelText('Email:')).toBeInTheDocument;
    expect(screen.getByLabelText('Mot de passe:')).toBeInTheDocument;
  });

  test('affiche les erreurs si champs vides', async () => {
    render(<MemoryRouter><Formulaire /></MemoryRouter>);

    fireEvent.click(screen.getByRole('button', { name: 'Créer le compte' }));

    await waitFor(() => {
      expect(screen.getByText('Nom requis')).toBeInTheDocument;
      expect(screen.getByText('Prénom requis')).toBeInTheDocument;
      expect(screen.getByText('Adresse requise')).toBeInTheDocument;
      expect(screen.getByText('Email requis')).toBeInTheDocument;
      expect(screen.getByText('Mot de passe requis')).toBeInTheDocument;
    });
  });

  test('affiche une erreur si aucun rôle sélectionné', async () => {
    render(<MemoryRouter><Formulaire /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText('Nom:'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByLabelText('Prénom:'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByLabelText('Adresse:'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe:'), { target: { value: 'pass1234' } });

    fireEvent.click(screen.getByRole('button', { name: 'Créer le compte' }));

    await waitFor(() => {
      expect(screen.getByText('Choisissez votre profil :')).toBeInTheDocument;
    });
  });

  test('appelle l’API et affiche le message de succès', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: { id: 1, role: 'acheteur' }
      }),
    });

    render(<MemoryRouter><Formulaire /></MemoryRouter>);

    // Remplir les champs
    fireEvent.change(screen.getByLabelText('Nom:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Prénom:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Adresse:'), { target: { value: 'Rue de Paris' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe:'), { target: { value: 'abc12345' } });

    // Simule une sélection de rôle
    const roleSelector = screen.getByText('Choisissez votre profil :');
    fireEvent.click(roleSelector);
    fireEvent.click(screen.getByText('Client')); // selon le composant

    fireEvent.click(screen.getByRole('button', { name: 'Créer le compte' }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('✅ Utilisateur inscrit avec succès ! Vous allez être redirigé vers la page de connexion.')).toBeInTheDocument;
    });
  });
});
