import { render, screen } from '@testing-library/react';
import Footer from '../../app/components/footer/Footer';
import { GITHUB_LINKS, RS_REACT_LINK } from '../../app/utils/constants';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('should render the footer', () => {
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('should display the correct year', () => {
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('should contain the correct links', () => {
    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(4);

    expect(links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: GITHUB_LINKS.MARIA,
        }),
        expect.objectContaining({
          href: GITHUB_LINKS.RINA,
        }),
        expect.objectContaining({
          href: GITHUB_LINKS.VLADIMIR,
        }),
        expect.objectContaining({
          href: RS_REACT_LINK,
        }),
      ])
    );
  });
});
