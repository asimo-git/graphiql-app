'use client';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import './info.scss';
import { useTranslation } from 'react-i18next';
import { dataAboutUs } from './infoData';

export default function Info() {
  const { t } = useTranslation();
  return (
    <div className="info">
      {dataAboutUs.map((elem) => (
        <Card sx={{ maxWidth: 345 }} key={elem.title}>
          <CardMedia
            sx={{ height: 340 }}
            image={elem.image}
            title={elem.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {t(elem.name)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t(elem.content)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href={elem.github}>
              GITHUB
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
