--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."reviewedRestaurants" DROP CONSTRAINT "reviewedRestaurants_fk1";
ALTER TABLE ONLY public."reviewedRestaurants" DROP CONSTRAINT "reviewedRestaurants_fk0";
ALTER TABLE ONLY public."likedRestaurants" DROP CONSTRAINT "likedRestaurants_fk1";
ALTER TABLE ONLY public."likedRestaurants" DROP CONSTRAINT "likedRestaurants_fk0";
ALTER TABLE ONLY public.users DROP CONSTRAINT "users_userName_key";
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
ALTER TABLE ONLY public."reviewedRestaurants" DROP CONSTRAINT "reviewedRestaurants_pk";
ALTER TABLE ONLY public.restaurants DROP CONSTRAINT "restaurants_yelpUrl_key";
ALTER TABLE ONLY public.restaurants DROP CONSTRAINT "restaurants_yelpId_key";
ALTER TABLE ONLY public.restaurants DROP CONSTRAINT restaurants_pk;
ALTER TABLE ONLY public."likedRestaurants" DROP CONSTRAINT "likedRestaurants_pk";
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public."reviewedRestaurants" ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public."reviewedRestaurants" ALTER COLUMN "reviewedRestaurantId" DROP DEFAULT;
ALTER TABLE public.restaurants ALTER COLUMN "restaurantId" DROP DEFAULT;
ALTER TABLE public."likedRestaurants" ALTER COLUMN "userId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP SEQUENCE public."reviewedRestaurants_userId_seq";
DROP SEQUENCE public."reviewedRestaurants_reviewedRestaurantId_seq";
DROP TABLE public."reviewedRestaurants";
DROP SEQUENCE public."restaurants_restaurantId_seq";
DROP TABLE public.restaurants;
DROP SEQUENCE public."likedRestaurants_userId_seq";
DROP TABLE public."likedRestaurants";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: likedRestaurants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."likedRestaurants" (
    "userId" integer NOT NULL,
    "yelpId" text NOT NULL
);


--
-- Name: likedRestaurants_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."likedRestaurants_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likedRestaurants_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."likedRestaurants_userId_seq" OWNED BY public."likedRestaurants"."userId";


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.restaurants (
    "restaurantId" integer NOT NULL,
    "yelpId" text NOT NULL,
    "restaurantName" text NOT NULL,
    "yelpUrl" text NOT NULL,
    "storeImageUrl" text NOT NULL,
    distance real NOT NULL,
    "photosUrl" json NOT NULL,
    hours json NOT NULL,
    location json NOT NULL,
    categories json NOT NULL,
    coordinates json NOT NULL,
    reviews json NOT NULL
);


--
-- Name: restaurants_restaurantId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."restaurants_restaurantId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: restaurants_restaurantId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."restaurants_restaurantId_seq" OWNED BY public.restaurants."restaurantId";


--
-- Name: reviewedRestaurants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."reviewedRestaurants" (
    "reviewedRestaurantId" integer NOT NULL,
    "userId" integer NOT NULL,
    "yelpId" text NOT NULL,
    "thumbsRate" boolean NOT NULL,
    note text NOT NULL,
    "timeCreated" timestamp with time zone NOT NULL
);


--
-- Name: reviewedRestaurants_reviewedRestaurantId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."reviewedRestaurants_reviewedRestaurantId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reviewedRestaurants_reviewedRestaurantId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."reviewedRestaurants_reviewedRestaurantId_seq" OWNED BY public."reviewedRestaurants"."reviewedRestaurantId";


--
-- Name: reviewedRestaurants_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."reviewedRestaurants_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reviewedRestaurants_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."reviewedRestaurants_userId_seq" OWNED BY public."reviewedRestaurants"."userId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "userName" text NOT NULL,
    "distanceRadius" numeric NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: likedRestaurants userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."likedRestaurants" ALTER COLUMN "userId" SET DEFAULT nextval('public."likedRestaurants_userId_seq"'::regclass);


--
-- Name: restaurants restaurantId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN "restaurantId" SET DEFAULT nextval('public."restaurants_restaurantId_seq"'::regclass);


--
-- Name: reviewedRestaurants reviewedRestaurantId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."reviewedRestaurants" ALTER COLUMN "reviewedRestaurantId" SET DEFAULT nextval('public."reviewedRestaurants_reviewedRestaurantId_seq"'::regclass);


--
-- Name: reviewedRestaurants userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."reviewedRestaurants" ALTER COLUMN "userId" SET DEFAULT nextval('public."reviewedRestaurants_userId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: likedRestaurants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."likedRestaurants" ("userId", "yelpId") FROM stdin;
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.restaurants ("restaurantId", "yelpId", "restaurantName", "yelpUrl", "storeImageUrl", distance, "photosUrl", hours, location, categories, coordinates, reviews) FROM stdin;
\.


--
-- Data for Name: reviewedRestaurants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."reviewedRestaurants" ("reviewedRestaurantId", "userId", "yelpId", "thumbsRate", note, "timeCreated") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "userName", "distanceRadius") FROM stdin;
\.


--
-- Name: likedRestaurants_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."likedRestaurants_userId_seq"', 1, false);


--
-- Name: restaurants_restaurantId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."restaurants_restaurantId_seq"', 1, false);


--
-- Name: reviewedRestaurants_reviewedRestaurantId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."reviewedRestaurants_reviewedRestaurantId_seq"', 1, false);


--
-- Name: reviewedRestaurants_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."reviewedRestaurants_userId_seq"', 1, false);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, false);


--
-- Name: likedRestaurants likedRestaurants_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."likedRestaurants"
    ADD CONSTRAINT "likedRestaurants_pk" PRIMARY KEY ("userId", "yelpId");


--
-- Name: restaurants restaurants_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pk PRIMARY KEY ("restaurantId");


--
-- Name: restaurants restaurants_yelpId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT "restaurants_yelpId_key" UNIQUE ("yelpId");


--
-- Name: restaurants restaurants_yelpUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT "restaurants_yelpUrl_key" UNIQUE ("yelpUrl");


--
-- Name: reviewedRestaurants reviewedRestaurants_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."reviewedRestaurants"
    ADD CONSTRAINT "reviewedRestaurants_pk" PRIMARY KEY ("reviewedRestaurantId");


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY ("userId");


--
-- Name: users users_userName_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_userName_key" UNIQUE ("userName");


--
-- Name: likedRestaurants likedRestaurants_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."likedRestaurants"
    ADD CONSTRAINT "likedRestaurants_fk0" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: likedRestaurants likedRestaurants_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."likedRestaurants"
    ADD CONSTRAINT "likedRestaurants_fk1" FOREIGN KEY ("yelpId") REFERENCES public.restaurants("yelpId");


--
-- Name: reviewedRestaurants reviewedRestaurants_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."reviewedRestaurants"
    ADD CONSTRAINT "reviewedRestaurants_fk0" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: reviewedRestaurants reviewedRestaurants_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."reviewedRestaurants"
    ADD CONSTRAINT "reviewedRestaurants_fk1" FOREIGN KEY ("yelpId") REFERENCES public.restaurants("yelpId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

