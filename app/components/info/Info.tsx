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
    <div className="main__info info">
      <div className="info__container">
        <h2 className="info__title">{t('Developers')}:</h2>
        <div className="main__developers">
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
        <h2 className="info__sub-title">{t('About course')}:</h2>
        <div className="info__text">
          {t(
            'No matter your age, professional employment, or place of residence. RS School offers a unique learning experience as a free,community-based online education initiative. The RS School has been run by the Rolling Scopes community since 2013. Today, over 600 developer-volunteers from various countries and companies assist as mentors.'
          )}
        </div>
        <h2 className="info__sub-title">{t('About project')}:</h2>
        <div className="info__text">
          {t(
            'This app is a lightweight version of Postman and GraphQL, combined into one app. Postman is a feature-rich platform for consuming (and creating) APIs. GraphiQL is a playground/IDE for graphQL queries. Extra parts: Authorization and authentication capabilities to ensure that access to the tool is limited to authorized users. History section that will redirect the user to a specific section for previously executed queries.'
          )}
        </div>
      </div>
    </div>
  );
}
