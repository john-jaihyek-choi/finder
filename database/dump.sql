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
    price text NOT NULL,
    rating double precision
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
34	VorxT5a3_fmw16jbFAbygQ
34	W4Gsj9DXh9fFQ3vLOVUyuA
34	O8-e3IkpbSYjwHyPKEiaGg
34	BfxNSxdBTKG402JjT0acBA
34	-Wzmp4w6DpflnppoIJ9Tog
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.restaurants ("restaurantId", "yelpId", "restaurantName", "yelpUrl", "storeImageUrl", distance, "photosUrl", hours, location, categories, coordinates, reviews, price, rating) FROM stdin;
1	WavvLdfdP6g8aZTtbBQHTw	Gary Danko	https://www.yelp.com/biz/gary-danko-san-francisco?adjust_creative=wpr6gw4FnptTrk1CeT8POg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=wpr6gw4FnptTrk1CeT8POg	https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg	1000.22998	[\n"https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg",\n"https://s3-media4.fl.yelpcdn.com/bphoto/FmXn6cYO1Mm03UNO5cbOqw/o.jpg",\n"https://s3-media4.fl.yelpcdn.com/bphoto/HZVDyYaghwPl2kVbvHuHjA/o.jpg"\n]	[\n{\n"open": [\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 0\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 1\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 2\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 3\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 4\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 5\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 6\n}\n],\n"hours_type": "REGULAR",\n"is_open_now": false\n}\n]	{\n"address1": "800 N Point St",\n"address2": "",\n"address3": "",\n"city": "San Francisco",\n"zip_code": "94109",\n"country": "US",\n"state": "CA",\n"display_address": [\n"800 N Point St",\n"San Francisco, CA 94109"\n],\n"cross_streets": ""\n}	[\n{\n"alias": "newamerican",\n"title": "American (New)"\n},\n{\n"alias": "french",\n"title": "French"\n},\n{\n"alias": "wine_bars",\n"title": "Wine Bars"\n}\n]	{\n"latitude": 37.80587,\n"longitude": -122.42058\n}	[\n{\n"id": "xAG4O7l-t1ubbwVAlPnDKg",\n"rating": 5,\n"user": {\n"id": "W8UK02IDdRS2GL_66fuq6w",\n"profile_url": "https://www.yelp.com/user_details?userid=W8UK02IDdRS2GL_66fuq6w",\n"image_url": "https://s3-media3.fl.yelpcdn.com/photo/iwoAD12zkONZxJ94ChAaMg/o.jpg",\n"name": "Ella A."\n},\n"text": "Went back again to this place since the last time i visited the bay area 5 months ago, and nothing has changed. Still the sketchy Mission, Still the cashier...",\n"time_created": "2016-08-29 00:41:13",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=hp8hAJ-AnlpqxCCu7kyCWA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n},\n{\n"id": "1JNmYjJXr9ZbsfZUAgkeXQ",\n"rating": 4,\n"user": {\n"id": "rk-MwIUejOj6LWFkBwZ98Q",\n"profile_url": "https://www.yelp.com/user_details?userid=rk-MwIUejOj6LWFkBwZ98Q",\n"image_url": null,\n"name": "Yanni L."\n},\n"text": "The \\"restaurant\\" is inside a small deli so there is no sit down area. Just grab and go.\\n\\nInside, they sell individually packaged ingredients so that you can...",\n"time_created": "2016-09-28 08:55:29",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=fj87uymFDJbq0Cy5hXTHIA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n},\n{\n"id": "SIoiwwVRH6R2s2ipFfs4Ww",\n"rating": 4,\n"user": {\n"id": "rpOyqD_893cqmDAtJLbdog",\n"profile_url": "https://www.yelp.com/user_details?userid=rpOyqD_893cqmDAtJLbdog",\n"image_url": null,\n"name": "Suavecito M."\n},\n"text": "Dear Mission District,\\n\\nI miss you and your many delicious late night food establishments and vibrant atmosphere.  I miss the way you sound and smell on a...",\n"time_created": "2016-08-10 07:56:44",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=m_tnQox9jqWeIrU87sN-IQ&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n}\n]	$$$	\N
2	1paBLJMSqiBb_grOuy9SCQ	Honey & Butter Macarons	https://www.yelp.com/biz/honey-and-butter-macarons-irvine?adjust_creative=9xXg9BhqoCtTyu56nj7GmQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=9xXg9BhqoCtTyu56nj7GmQ	https://s3-media1.fl.yelpcdn.com/bphoto/HF8XDaVO0HOQ-QSKXBUjaw/o.jpg	1000.22998	[\n"https://s3-media1.fl.yelpcdn.com/bphoto/HF8XDaVO0HOQ-QSKXBUjaw/o.jpg",\n"https://s3-media4.fl.yelpcdn.com/bphoto/ojlRY_fdF4wHNSEp1pjH6w/o.jpg",\n"https://s3-media3.fl.yelpcdn.com/bphoto/80l_WUceSeOuqKNhjt-w-w/o.jpg"\n]	[\n{\n"open": [\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 0\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 1\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 2\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 3\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 4\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 5\n},\n{\n"is_overnight": false,\n"start": "1730",\n"end": "2200",\n"day": 6\n}\n],\n"hours_type": "REGULAR",\n"is_open_now": false\n}\n]	{\n"address1": "800 N Point St",\n"address2": "",\n"address3": "",\n"city": "San Francisco",\n"zip_code": "94109",\n"country": "US",\n"state": "CA",\n"display_address": [\n"800 N Point St",\n"San Francisco, CA 94109"\n],\n"cross_streets": ""\n}	[\n{\n"alias": "newamerican",\n"title": "American (New)"\n},\n{\n"alias": "french",\n"title": "French"\n},\n{\n"alias": "wine_bars",\n"title": "Wine Bars"\n}\n]	{\n"latitude": 37.80587,\n"longitude": -122.42058\n}	[\n{\n"id": "xAG4O7l-t1ubbwVAlPnDKg",\n"rating": 5,\n"user": {\n"id": "W8UK02IDdRS2GL_66fuq6w",\n"profile_url": "https://www.yelp.com/user_details?userid=W8UK02IDdRS2GL_66fuq6w",\n"image_url": "https://s3-media3.fl.yelpcdn.com/photo/iwoAD12zkONZxJ94ChAaMg/o.jpg",\n"name": "Ella A."\n},\n"text": "Went back again to this place since the last time i visited the bay area 5 months ago, and nothing has changed. Still the sketchy Mission, Still the cashier...",\n"time_created": "2016-08-29 00:41:13",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=hp8hAJ-AnlpqxCCu7kyCWA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n},\n{\n"id": "1JNmYjJXr9ZbsfZUAgkeXQ",\n"rating": 4,\n"user": {\n"id": "rk-MwIUejOj6LWFkBwZ98Q",\n"profile_url": "https://www.yelp.com/user_details?userid=rk-MwIUejOj6LWFkBwZ98Q",\n"image_url": null,\n"name": "Yanni L."\n},\n"text": "The \\"restaurant\\" is inside a small deli so there is no sit down area. Just grab and go.\\n\\nInside, they sell individually packaged ingredients so that you can...",\n"time_created": "2016-09-28 08:55:29",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=fj87uymFDJbq0Cy5hXTHIA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n},\n{\n"id": "SIoiwwVRH6R2s2ipFfs4Ww",\n"rating": 4,\n"user": {\n"id": "rpOyqD_893cqmDAtJLbdog",\n"profile_url": "https://www.yelp.com/user_details?userid=rpOyqD_893cqmDAtJLbdog",\n"image_url": null,\n"name": "Suavecito M."\n},\n"text": "Dear Mission District,\\n\\nI miss you and your many delicious late night food establishments and vibrant atmosphere.  I miss the way you sound and smell on a...",\n"time_created": "2016-08-10 07:56:44",\n"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=m_tnQox9jqWeIrU87sN-IQ&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"\n}\n]	$$$	\N
3	V8KXkj4sDhRlS5G6z8-79g	Fukada	https://www.yelp.com/biz/fukada-irvine?adjust_creative=9xXg9BhqoCtTyu56nj7GmQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=9xXg9BhqoCtTyu56nj7GmQ	https://s3-media2.fl.yelpcdn.com/bphoto/j8TswkrypuPeKDrWb7SEEg/o.jpg	1003.22998	["https://s3-media2.fl.yelpcdn.com/bphoto/j8TswkrypuPeKDrWb7SEEg/o.jpg","https://s3-media1.fl.yelpcdn.com/bphoto/CrygR8VwpgiO0LbBtA7oCw/o.jpg","https://s3-media1.fl.yelpcdn.com/bphoto/j1GhUVHaFSeHsqbFdhuCLQ/o.jpg"]	[{"open":[{"is_overnight":false,"start":"1130","end":"1400","day":1},{"is_overnight":false,"start":"1700","end":"2100","day":1},{"is_overnight":false,"start":"1130","end":"1400","day":2},{"is_overnight":false,"start":"1700","end":"2100","day":2},{"is_overnight":false,"start":"1130","end":"1400","day":3},{"is_overnight":false,"start":"1700","end":"2100","day":3},{"is_overnight":false,"start":"1130","end":"1400","day":4},{"is_overnight":false,"start":"1700","end":"2100","day":4},{"is_overnight":false,"start":"1130","end":"1400","day":5},{"is_overnight":false,"start":"1700","end":"2100","day":5},{"is_overnight":false,"start":"1130","end":"1400","day":6},{"is_overnight":false,"start":"1700","end":"2100","day":6}],"hours_type":"REGULAR","is_open_now":false}]	{\n"address1": "800 N Point St",\n"address2": "",\n"address3": "",\n"city": "San Francisco",\n"zip_code": "94109",\n"country": "US",\n"state": "CA",\n"display_address": [\n"800 N Point St",\n"San Francisco, CA 94109"\n],\n"cross_streets": ""\n}	[\n{\n"alias": "newamerican",\n"title": "American (New)"\n},\n{\n"alias": "french",\n"title": "French"\n},\n{\n"alias": "wine_bars",\n"title": "Wine Bars"\n}\n]	{\n"latitude": 37.80587,\n"longitude": -122.42058\n}	[{"id":"6PkHD-fEMXQtPkz4HByWTQ","url":"https://www.yelp.com/biz/fukada-irvine?adjust_creative=9xXg9BhqoCtTyu56nj7GmQ&hrid=6PkHD-fEMXQtPkz4HByWTQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=9xXg9BhqoCtTyu56nj7GmQ","text":"OPEN FOR TAKEOUT AS OF 3.22.20!!!\\n\\nOne of my favorite udon places- their combos are unbeatable and everything is freshly made! I love their hot sansai udon...","rating":5,"time_created":"2020-03-22 17:14:14","user":{"id":"7vpKHN399zLYjFbgHn4uFg","profile_url":"https://www.yelp.com/user_details?userid=7vpKHN399zLYjFbgHn4uFg","image_url":"https://s3-media1.fl.yelpcdn.com/photo/RP7zToH-q6O-fZyKW4L_GA/o.jpg","name":"J W."}},{"id":"i3EqOwJA85rEyRkDBezC2g","url":"https://www.yelp.com/biz/fukada-irvine?adjust_creative=9xXg9BhqoCtTyu56nj7GmQ&hrid=i3EqOwJA85rEyRkDBezC2g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=9xXg9BhqoCtTyu56nj7GmQ","text":"This is one of the few places where I can absolutely say I want to come back and try their entire menu..however, that spicy tuna don is amazing, it's hard...","rating":4,"time_created":"2020-03-18 17:53:18","user":{"id":"YFfmQXcuXzhxE3Kzq7omGQ","profile_url":"https://www.yelp.com/user_details?userid=YFfmQXcuXzhxE3Kzq7omGQ","image_url":"https://s3-media3.fl.yelpcdn.com/photo/ZmpfNj23kK8PHiDM2yoivQ/o.jpg","name":"Bruce F."}},{"id":"MuXE8NIZnJLBoPsv3u6i5g","url":"https://www.yelp.com/biz/fukada-irvine?adjust_creative=9xXg9BhqoCtTyu56nj7GmQ&hrid=MuXE8NIZnJLBoPsv3u6i5g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=9xXg9BhqoCtTyu56nj7GmQ","text":"Just another place I miss now that I don't live in SoCal anymore. Sigh. I would give Fukada a giant thumbs up, any day, no question, for the lunch specials...","rating":5,"time_created":"2020-03-17 12:45:01","user":{"id":"SgGsI-JQQ56CAtwCbdMt1Q","profile_url":"https://www.yelp.com/user_details?userid=SgGsI-JQQ56CAtwCbdMt1Q","image_url":"https://s3-media2.fl.yelpcdn.com/photo/AO8JuYTMPjt4V4Hc2jutxA/o.jpg","name":"Melissa O."}}]	$$$	\N
\.


--
-- Data for Name: reviewedRestaurants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."reviewedRestaurants" ("reviewedRestaurantId", "userId", "yelpId", "thumbsRate", note, "timeCreated") FROM stdin;
1	2	V8KXkj4sDhRlS5G6z8-79g	\N	\N	2020-03-21 05:00:43.258112-07
2	1	V8KXkj4sDhRlS5G6z8-79g	\N	\N	2020-03-21 05:01:01.973009-07
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
20	10
21	10
22	10
23	10
24	10
25	10
26	10
27	10
28	10
29	10
30	10
31	10
32	10
33	10
34	10
35	10
36	10
37	10
38	10
39	10
40	10
41	10
42	10
43	10
44	10
45	10
46	10
47	10
48	10
49	10
50	10
51	10
52	10
53	10
54	10
55	10
56	10
57	10
58	10
59	10
60	10
61	10
62	10
63	10
64	10
65	10
66	10
67	10
68	10
69	10
70	10
71	10
72	10
73	10
74	10
\.


--
-- Name: likedRestaurants_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."likedRestaurants_userId_seq"', 1, false);


--
-- Name: restaurants_restaurantId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."restaurants_restaurantId_seq"', 568, true);


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

SELECT pg_catalog.setval('public."users_userId_seq"', 74, true);


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
