import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Info from '@/app/components/info/Info';
import { dataAboutUs } from '@/app/components/info/infoData';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Info Component', () => {
  it('renders developer cards correctly', () => {
    render(<Info />);
    dataAboutUs.forEach((dev) => {
      const card = screen.getByText(dev.name).closest('div.MuiCard-root'); // Убедитесь что правильно указан класс или элемент
      const withinCard = within(card as HTMLElement);

      expect(withinCard.getByText(dev.name)).toBeInTheDocument();
      expect(withinCard.getByText(dev.content)).toBeInTheDocument();
      const image = withinCard.getByRole('img', { name: dev.title });
      expect(image).toHaveStyle(`background-image: url(${dev.image})`);

      const githubLink = withinCard.getByRole('link', { name: 'GITHUB' });
      expect(githubLink).toHaveAttribute('href', dev.github);
    });
  });

  it('renders static text correctly', () => {
    render(<Info />);
    expect(screen.getByText('Developers:')).toBeInTheDocument();
    expect(screen.getByText('About course:')).toBeInTheDocument();
    expect(screen.getByText('About project:')).toBeInTheDocument();
  });
});
