import React from "react";
import ReactHelmet from "react-helmet";

import favicon1 from "./favicon1.png";
import favicon2 from "./favicon2.png";

export const Helmet = props => {
  return (
    <ReactHelmet
      title="Как москвичи покупают цветы к 8 марта"
      link={[
        { rel: "apple-touch-icon", sizes: "64x64", href: `${favicon2}` },
        { rel: "icon", type: "image/png", sizes: "64x64", href: `${favicon2}` },
        { rel: "shortcut icon", href: `${favicon1}` }
      ]}
      meta={[
        { name: "title", content: "Как москвичи покупают цветы к 8 марта" },
        {
          name: "keywords",
          content: "GIS, LOCATION INTELLIGENCE, MAPS, DATA ANALYTICS, DATA VISUALIZATION"
        },
        { name: "description", content: "Разработчик геоинформационных систем и сервисов." },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { property: "og:title", content: "Как москвичи покупают цветы к 8 марта" },
        { property: "twitter:title", content: "Как москвичи покупают цветы к 8 марта" },
        { property: "og:url", content: "https://8mar.everpoint.ru" },
        { property: "og:image", content: favicon2 },
        { name: "twitter:image:src", contet: favicon2 },
        { property: "og:description", content: "Как москвичи покупают цветы к 8 марта" },
        { property: "og:type", contet: "website" },
        { property: "og:site_name", contet: "Everpoint" },
        {
          name: "twitter:description",
          content: "Разработчик геоинформационных систем и сервисов."
        }
      ]}
      {...props}
    />
  );
};
