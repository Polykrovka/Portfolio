import { Carousel } from '@mantine/carousel';
import classes from './PersonalPhotosCarousel.module.css';

const photos = [
  '/me/1.jpg',
  '/me/2.jpg',
  '/me/3.jpg',
  '/me/4.jpg',
  '/me/5.jpg',
  '/me/6.jpg',
  '/me/7.jpg',
  '/me/8.jpg',
  '/me/9.jpg',
  '/me/10.jpg',
];

export function PersonalPhotosCarousel() {
  return (
    <Carousel
      slideSize="76%"
      withIndicators
      withControls={photos.length > 1}
      emblaOptions={{ align: 'start', loop: true, slidesToScroll: 1 }}
    >
      {photos.map((src) => (
        <Carousel.Slide key={src}>
          <img src={src} alt="" className={classes.photo} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
