import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateProduct from './CreateProduct';

global.URL.createObjectURL = jest.fn(() => 'preview-url');

describe('CreateProduct', () => {
  const setup = () => {
    render(<CreateProduct magasinId="123" onProductCreated={jest.fn()} />);
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('affiche tous les champs du formulaire', () => {
    setup();

    expect(screen.getByLabelText('Désignation:')).toBeInTheDocument;
    expect(screen.getByLabelText('Description:')).toBeInTheDocument;
    expect(screen.getByLabelText('Prix (€):')).toBeInTheDocument;
    expect(screen.getByLabelText('Stock:')).toBeInTheDocument;
    expect(screen.getByLabelText('Catégorie:')).toBeInTheDocument;
    expect(screen.getByLabelText('Images (max 1):')).toBeInTheDocument;
    expect(screen.getByRole('button', { name: 'Créer produit' })).toBeInTheDocument;
  });

  test('affiche des erreurs si on soumet sans remplir', async () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: 'Créer produit' }));

    await waitFor(() => {
        const errors = screen.getAllByRole('alert');
        expect(errors.length).toBeGreaterThan(0); // ou un nombre exact, ex: 5
    });
 });



  test('affiche un aperçu de l’image sélectionnée', async () => {
    setup();

    const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('Images (max 1):');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText('Aperçu 1')).toBeInTheDocument;
    });
  });

  test('soumet le formulaire avec succès', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true });

    const mockOnProductCreated = jest.fn();
    render(<CreateProduct magasinId="123" onProductCreated={mockOnProductCreated} />);

    fireEvent.input(screen.getByLabelText('Désignation:'), { target: { value: 'Produit test' } });
    fireEvent.input(screen.getByLabelText('Description:'), { target: { value: 'Une belle description' } });
    fireEvent.input(screen.getByLabelText('Prix (€):'), { target: { value: '9.99' } });
    fireEvent.input(screen.getByLabelText('Stock:'), { target: { value: '20' } });

    fireEvent.change(screen.getByLabelText('Catégorie:'), { target: { value: 'produit' } });

    fireEvent.click(screen.getByRole('button', { name: 'Créer produit' }));

    await waitFor(() => {
      expect(screen.getByText('Produit créé avec succès')).toBeInTheDocument;
      expect(mockOnProductCreated).toHaveBeenCalled();
    });
  });

  test('affiche une erreur si la requête échoue', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });

    setup();

    fireEvent.input(screen.getByLabelText('Désignation:'), { target: { value: 'Erreur test' } });
    fireEvent.input(screen.getByLabelText('Description:'), { target: { value: 'Oops' } });
    fireEvent.input(screen.getByLabelText('Prix (€):'), { target: { value: '5' } });
    fireEvent.input(screen.getByLabelText('Stock:'), { target: { value: '1' } });

    fireEvent.click(screen.getByRole('button', { name: 'Créer produit' }));

    await waitFor(() => {
      expect(screen.getByText('Erreur lors de la création du produit')).toBeInTheDocument;
    });
  });
});
