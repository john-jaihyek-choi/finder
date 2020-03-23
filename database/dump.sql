
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

ALTER TABLE ONLY public."likedRestaurants" DROP CONSTRAINT "likedRestaurants_fk1";
ALTER TABLE ONLY public."likedRestaurants" DROP CONSTRAINT "likedRestaurants_fk0";
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
    reviews json NOT NULL,
    price text NOT NULL
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
    "thumbsRate" boolean,
    note text,
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
2	V8KXkj4sDhRlS5G6z8-79g
1	V8KXkj4sDhRlS5G6z8-79g
3	V8KXkj4sDhRlS5G6z8-79g
17	1paBLJMSqiBb_grOuy9SCQ
17	WavvLdfdP6g8aZTtbBQHTw
17	V8KXkj4sDhRlS5G6z8-79g
18	1paBLJMSqiBb_grOuy9SCQ
18	V8KXkj4sDhRlS5G6z8-79g
18	WavvLdfdP6g8aZTtbBQHTw
19	WavvLdfdP6g8aZTtbBQHTw
19	1paBLJMSqiBb_grOuy9SCQ
19	V8KXkj4sDhRlS5G6z8-79g
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.restaurants ("restaurantId", "yelpId", "restaurantName", "yelpUrl", "storeImageUrl", distance, "photosUrl", hours, location, categories, coordinates, reviews, price) FROM stdin;
1	WavvLdfdP6g8aZTtbBQHTw	Gary Danko	https://www.yelp.com/biz/gary-danko-san-francisco?adjust_creative=wpr6gw4FnptTrk1CeT8POg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=wpr6gw4FnptTrk1CeT8POg	https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg	1000.22998	[\n"https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg",\n"https://s3-media4.fl.yelpcdn.com/bphoto/FmXn6cYO1Mm03UNO5cbOqw/o.jpg",\n"https://s3-media4.fl.yelpcdn.com/bphoto/HZVDyYaghwPl2kVbvHuHjA/o.jpg"\n]	[\n{\n"open": [\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 0\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 1\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 2\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 3\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 4\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 5\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 6\n}\n],\n"hours_type": "REGULAR",\n"is_open_now": false\n}\n]	{\n"address1": "800 N Point St",\n"address2": "",\n"address3": "",\n"city": "San Francisco",\n"zip_code": "94109",\n"country": "US",\n"state": "CA",\n"display_address": [\n"800 N Point St",\n"San Francisco, CA 94109"\n],\n"cross_streets": ""\n}	[\n{\n"alias": "newamerican",\n"title": "American (New)"\n},\n{\n"alias": "french",\n"title": "French"\n},\n{\n"alias": "wine_bars",\n"title": "Wine Bars"\n}\n]	{\n"latitude": 37.80587,\n"longitude": -122.42058\n}	[\n{\n"id": "xAG4O7l-t1ubbwVAlPnDKg",\n"rating": 5,\n"user": {\n"id": "W8UK02IDdRS2GL_66fuq6w",\n"profile_url": "https://www.yelp.com/user_details?userid=W8UK02IDdRS2GL_66fuq6w",\n"image_url": "https://s3-media3.fl.yelpcdn.com/photo/iwoAD12zkONZxJ94ChAaMg/o.jpg",\n"name": "Ella A."\n},\n"text": "Went back again to this place since the last time i visited the bay area 5 months ago, and nothing has changed. Still the sketchy Mission, Still the cashier...",\n"time_created": "2016-08-29 00:41:13",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=hp8hAJ-AnlpqxCCu7kyCWA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n},\n{\n"id": "1JNmYjJXr9ZbsfZUAgkeXQ",\n"rating": 4,\n"user": {\n"id": "rk-MwIUejOj6LWFkBwZ98Q",\n"profile_url": "https://www.yelp.com/user_details?userid=rk-MwIUejOj6LWFkBwZ98Q",\n"image_url": null,\n"name": "Yanni L."\n},\n"text": "The \\"restaurant\\" is inside a small deli so there is no sit down area. Just grab and go.\\n\\nInside, they sell individually packaged ingredients so that you can...",\n"time_created": "2016-09-28 08:55:29",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=fj87uymFDJbq0Cy5hXTHIA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n},\n{\n"id": "SIoiwwVRH6R2s2ipFfs4Ww",\n"rating": 4,\n"user": {\n"id": "rpOyqD_893cqmDAtJLbdog",\n"profile_url": "https://www.yelp.com/user_details?userid=rpOyqD_893cqmDAtJLbdog",\n"image_url": null,\n"name": "Suavecito M."\n},\n"text": "Dear Mission District,\\n\\nI miss you and your many delicious late night food establishments and vibrant atmosphere.  I miss the way you sound and smell on a...",\n"time_created": "2016-08-10 07:56:44",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=m_tnQox9jqWeIrU87sN-IQ&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n}\n]	$$$
2	1paBLJMSqiBb_grOuy9SCQ	Honey & Butter Macarons	https://www.yelp.com/biz/honey-and-butter-macarons-irvine?adjust_creative=9xXg9BhqoCtTyu56nj7GmQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=9xXg9BhqoCtTyu56nj7GmQ	https://s3-media1.fl.yelpcdn.com/bphoto/HF8XDaVO0HOQ-QSKXBUjaw/o.jpg	1000.22998	[\n"https://s3-media1.fl.yelpcdn.com/bphoto/HF8XDaVO0HOQ-QSKXBUjaw/o.jpg",\n"https://s3-media4.fl.yelpcdn.com/bphoto/ojlRY_fdF4wHNSEp1pjH6w/o.jpg",\n"https://s3-media3.fl.yelpcdn.com/bphoto/80l_WUceSeOuqKNhjt-w-w/o.jpg"\n]	[\n{\n"open": [\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 0\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 1\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 2\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 3\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 4\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 5\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 6\n}\n],\n"hours_type": "REGULAR",\n"is_open_now": false\n}\n]	{\n"address1": "800 N Point St",\n"address2": "",\n"address3": "",\n"city": "San Francisco",\n"zip_code": "94109",\n"country": "US",\n"state": "CA",\n"display_address": [\n"800 N Point St",\n"San Francisco, CA 94109"\n],\n"cross_streets": ""\n}	[\n{\n"alias": "newamerican",\n"title": "American (New)"\n},\n{\n"alias": "french",\n"title": "French"\n},\n{\n"alias": "wine_bars",\n"title": "Wine Bars"\n}\n]	{\n"latitude": 37.80587,\n"longitude": -122.42058\n}	[\n{\n"id": "xAG4O7l-t1ubbwVAlPnDKg",\n"rating": 5,\n"user": {\n"id": "W8UK02IDdRS2GL_66fuq6w",\n"profile_url": "https://www.yelp.com/user_details?userid=W8UK02IDdRS2GL_66fuq6w",\n"image_url": "https://s3-media3.fl.yelpcdn.com/photo/iwoAD12zkONZxJ94ChAaMg/o.jpg",\n"name": "Ella A."\n},\n"text": "Went back again to this place since the last time i visited the bay area 5 months ago, and nothing has changed. Still the sketchy Mission, Still the cashier...",\n"time_created": "2016-08-29 00:41:13",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=hp8hAJ-AnlpqxCCu7kyCWA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n},\n{\n"id": "1JNmYjJXr9ZbsfZUAgkeXQ",\n"rating": 4,\n"user": {\n"id": "rk-MwIUejOj6LWFkBwZ98Q",\n"profile_url": "https://www.yelp.com/user_details?userid=rk-MwIUejOj6LWFkBwZ98Q",\n"image_url": null,\n"name": "Yanni L."\n},\n"text": "The \\"restaurant\\" is inside a small deli so there is no sit down area. Just grab and go.\\n\\nInside, they sell individually packaged ingredients so that you can...",\n"time_created": "2016-09-28 08:55:29",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=fj87uymFDJbq0Cy5hXTHIA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n},\n{\n"id": "SIoiwwVRH6R2s2ipFfs4Ww",\n"rating": 4,\n"user": {\n"id": "rpOyqD_893cqmDAtJLbdog",\n"profile_url": "https://www.yelp.com/user_details?userid=rpOyqD_893cqmDAtJLbdog",\n"image_url": null,\n"name": "Suavecito M."\n},\n"text": "Dear Mission District,\\n\\nI miss you and your many delicious late night food establishments and vibrant atmosphere.  I miss the way you sound and smell on a...",\n"time_created": "2016-08-10 07:56:44",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=m_tnQox9jqWeIrU87sN-IQ&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n}\n]	$$$
3	V8KXkj4sDhRlS5G6z8-79g	Fukada	https://www.yelp.com/biz/fukada-irvine?adjust_creative=9xXg9BhqoCtTyu56nj7GmQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=9xXg9BhqoCtTyu56nj7GmQ	https://s3-media2.fl.yelpcdn.com/bphoto/j8TswkrypuPeKDrWb7SEEg/o.jpg	1003.22998	[\n"https://s3-media2.fl.yelpcdn.com/bphoto/j8TswkrypuPeKDrWb7SEEg/o.jpg",\n"https://s3-media1.fl.yelpcdn.com/bphoto/CrygR8VwpgiO0LbBtA7oCw/o.jpg",\n"https://s3-media1.fl.yelpcdn.com/bphoto/j1GhUVHaFSeHsqbFdhuCLQ/o.jpg"\n]	[\n{\n"open": [\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 0\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 1\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 2\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 3\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 4\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 5\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 6\n}\n],\n"hours_type": "REGULAR",\n"is_open_now": false\n}\n]	{\n"address1": "800 N Point St",\n"address2": "",\n"address3": "",\n"city": "San Francisco",\n"zip_code": "94109",\n"country": "US",\n"state": "CA",\n"display_address": [\n"800 N Point St",\n"San Francisco, CA 94109"\n],\n"cross_streets": ""\n}	[\n{\n"alias": "newamerican",\n"title": "American (New)"\n},\n{\n"alias": "french",\n"title": "French"\n},\n{\n"alias": "wine_bars",\n"title": "Wine Bars"\n}\n]	{\n"latitude": 37.80587,\n"longitude": -122.42058\n}	[\n{\n"id": "xAG4O7l-t1ubbwVAlPnDKg",\n"rating": 5,\n"user": {\n"id": "W8UK02IDdRS2GL_66fuq6w",\n"profile_url": "https://www.yelp.com/user_details?userid=W8UK02IDdRS2GL_66fuq6w",\n"image_url": "https://s3-media3.fl.yelpcdn.com/photo/iwoAD12zkONZxJ94ChAaMg/o.jpg",\n"name": "Ella A."\n},\n"text": "Went back again to this place since the last time i visited the bay area 5 months ago, and nothing has changed. Still the sketchy Mission, Still the cashier...",\n"time_created": "2016-08-29 00:41:13",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=hp8hAJ-AnlpqxCCu7kyCWA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n},\n{\n"id": "1JNmYjJXr9ZbsfZUAgkeXQ",\n"rating": 4,\n"user": {\n"id": "rk-MwIUejOj6LWFkBwZ98Q",\n"profile_url": "https://www.yelp.com/user_details?userid=rk-MwIUejOj6LWFkBwZ98Q",\n"image_url": null,\n"name": "Yanni L."\n},\n"text": "The \\"restaurant\\" is inside a small deli so there is no sit down area. Just grab and go.\\n\\nInside, they sell individually packaged ingredients so that you can...",\n"time_created": "2016-09-28 08:55:29",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=fj87uymFDJbq0Cy5hXTHIA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n},\n{\n"id": "SIoiwwVRH6R2s2ipFfs4Ww",\n"rating": 4,\n"user": {\n"id": "rpOyqD_893cqmDAtJLbdog",\n"profile_url": "https://www.yelp.com/user_details?userid=rpOyqD_893cqmDAtJLbdog",\n"image_url": null,\n"name": "Suavecito M."\n},\n"text": "Dear Mission District,\\n\\nI miss you and your many delicious late night food establishments and vibrant atmosphere.  I miss the way you sound and smell on a...",\n"time_created": "2016-08-10 07:56:44",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=m_tnQox9jqWeIrU87sN-IQ&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n}\n]	$$$
\.


--
-- Data for Name: reviewedRestaurants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."reviewedRestaurants" ("reviewedRestaurantId", "userId", "yelpId", "thumbsRate", note, "timeCreated") FROM stdin;
1	2	V8KXkj4sDhRlS5G6z8-79g	\N	\N	2020-03-21 12:00:43.258112+00
2	1	V8KXkj4sDhRlS5G6z8-79g	\N	\N	2020-03-21 12:01:01.973009+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "distanceRadius") FROM stdin;
1	15
2	10
3	12
5	10
6	10
7	10
8	10
9	10
10	10
11	10
12	10
13	10
14	10
15	10
16	10
17	10
18	10
19	10
\.


--
-- Name: likedRestaurants_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."likedRestaurants_userId_seq"', 1, false);


--
-- Name: restaurants_restaurantId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."restaurants_restaurantId_seq"', 3, true);


--
-- Name: reviewedRestaurants_reviewedRestaurantId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."reviewedRestaurants_reviewedRestaurantId_seq"', 2, true);


--
-- Name: reviewedRestaurants_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."reviewedRestaurants_userId_seq"', 1, false);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 19, true);


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
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
