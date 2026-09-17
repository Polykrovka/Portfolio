export const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
  e.preventDefault();
  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
